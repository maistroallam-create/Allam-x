module.exports = {
    command: 'ping',
    desc: 'اختبار اتصال البوت',
    category: 'system',
    alias: ['بونق', 'اختبار'],
    async execute(sock, msg, args, text, ctx) {
        const start = Date.now();
        const from = msg.key.remoteJid;
        await sock.sendMessage(from, { text: '🏓 جارٍ الاختبار...' });
        const end = Date.now();
        await sock.sendMessage(from, { text: `🏓 بونق! \`${end - start}ms\`` });
    }
};
