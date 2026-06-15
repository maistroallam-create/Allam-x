const config = require('../config');
const fs = require('fs-extra');

module.exports = {
    command: 'broadcast',
    desc: 'إرسال رسالة لجميع الدردشات',
    category: 'owner',
    alias: ['اذاعة', 'نشر'],
    ownerOnly: true,
    async execute(sock, msg, args, text, ctx) {
        const from = msg.key.remoteJid;
        
        if (!text) {
            return sock.sendMessage(from, { text: '❌ أرسل النص المراد إذاعته' });
        }
        
        const chats = sock.chats;
        let count = 0;
        
        for (const chat of Object.keys(chats)) {
            if (chat.endsWith('@g.us') || chat.endsWith('@s.whatsapp.net')) {
                try {
                    await sock.sendMessage(chat, { text: `📢 إذاعة عامة:\n\n${text}` });
                    count++;
                } catch (e) {}
            }
        }
        
        await sock.sendMessage(from, { text: `✅ تم الإرسال إلى ${count} دردشة` });
    }
};

// أمر إعادة التشغيل
module.exports = {
    command: 'restart',
    desc: 'إعادة تشغيل البوت',
    category: 'owner',
    alias: ['اعادة', 'ريستارت'],
    ownerOnly: true,
    async execute(sock, msg, args, text, ctx) {
        const from = msg.key.remoteJid;
        await sock.sendMessage(from, { text: '🔄 جاري إعادة التشغيل...' });
        process.exit(0);
    }
};
