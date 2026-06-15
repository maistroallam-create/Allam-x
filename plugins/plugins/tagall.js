module.exports = {
    command: 'tagall',
    desc: 'منشن جميع أعضاء المجموعة',
    category: 'group',
    alias: ['منشن', 'تاغ', 'الكل'],
    groupOnly: true,
    async execute(sock, msg, args, text, ctx) {
        const from = msg.key.remoteJid;
        
        try {
            const groupMetadata = await sock.groupMetadata(from);
            const participants = groupMetadata.participants;
            let mentions = [];
            let message = `📢 ${text || 'تنبيه من المالك'}\n\n`;
            
            for (let participant of participants) {
                mentions.push(participant.id);
                message += `@${participant.id.split('@')[0]}\n`;
            }
            
            await sock.sendMessage(from, { text: message, mentions });
        } catch (err) {
            await sock.sendMessage(from, { text: `❌ خطأ: ${err.message}` });
        }
    }
};
