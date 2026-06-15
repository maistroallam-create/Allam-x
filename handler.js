const config = require('./config');
const plugins = require('./plugins');

async function processMessage(sock, msg) {
    try {
        const from = msg.key.remoteJid;
        
        // استخراج النص من الرسالة
        let body = '';
        if (msg.message?.conversation) body = msg.message.conversation;
        else if (msg.message?.extendedTextMessage?.text) body = msg.message.extendedTextMessage.text;
        else if (msg.message?.imageMessage?.caption) body = msg.message.imageMessage.caption;
        else if (msg.message?.videoMessage?.caption) body = msg.message.videoMessage.caption;
        else return;
        
        // التحقق من البادئة
        if (!body.startsWith(config.prefix)) return;
        
        // استخراج الأمر والنص
        const args = body.slice(config.prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();
        const text = args.join(' ');
        
        // معلومات المرسل
        const sender = msg.key.participant || from;
        const isOwner = sender.includes(config.ownerNumber) || from.includes(config.ownerNumber);
        const isGroup = from.endsWith('@g.us');
        const isPrivate = from.endsWith('@s.whatsapp.net');
        
        // البحث عن الأمر
        const cmd = plugins.commands.get(command);
        
        if (cmd) {
            // التحقق من صلاحيات المالك
            if (cmd.ownerOnly && !isOwner) {
                return sock.sendMessage(from, { text: config.mess.owner });
            }
            
            // التحقق من صلاحيات المجموعة
            if (cmd.groupOnly && !isGroup) {
                return sock.sendMessage(from, { text: config.mess.group });
            }
            
            try {
                await cmd.execute(sock, msg, args, text, {
                    isOwner,
                    isGroup,
                    isPrivate,
                    sender,
                    command,
                    prefix: config.prefix
                });
            } catch (err) {
                console.error('خطأ في تنفيذ الأمر:', err);
                sock.sendMessage(from, { text: `${config.mess.error}\n\`${err.message}\`` });
            }
        } else {
            // أمر غير موجود
            // يمكن تفعيل الرد على الأوامر غير الموجودة أو تركه
            // sock.sendMessage(from, { text: config.mess.notFound });
        }
        
    } catch (err) {
        console.error('خطأ في المعالج:', err);
    }
}

module.exports = { process };
