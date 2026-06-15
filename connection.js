const { DisconnectReason } = require('@whiskeysockets/baileys');
const fs = require('fs-extra');

function handleConnection(sock) {
    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update;
        
        if (qr) {
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            console.log('🔄 امسح رمز QR من واتساب > الأجهزة المرتبطة');
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        }
        
        if (connection === 'close') {
            const reason = lastDisconnect?.error?.output?.statusCode;
            if (reason === DisconnectReason.loggedOut) {
                console.log('❌ تم تسجيل الخروج، احذف مجلد session وأعد التشغيل');
                fs.rmSync('./session', { recursive: true, force: true });
            } else {
                console.log('🔄 إعادة اتصال خلال 5 ثواني...');
                setTimeout(() => process.exit(0), 5000);
            }
        } else if (connection === 'open') {
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            console.log('✅ البوت متصل بنجاح');
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        }
    });
}

module.exports = { handle };
