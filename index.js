const { makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const Pino = require('pino');
const fs = require('fs-extra');
const path = require('path');
const config = require('./config');
const handler = require('./handler');
const connection = require('./connection');

// إنشاء مجلد الجلسة إذا لم يكن موجوداً
if (!fs.existsSync('./session')) fs.mkdirSync('./session');

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('./session');
    
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true,
        logger: Pino({ level: 'silent' }),
        browser: ['maisteo-bot', 'Chrome', '1.0.0'],
        patchMessageBeforeSending: (message) => {
            const requiresPatch = !!(
                message.buttonsMessage || 
                message.templateMessage || 
                message.listMessage
            );
            if (requiresPatch) {
                message = {
                    viewOnceMessage: {
                        message: {
                            messageContextInfo: {
                                deviceListMetadata: {},
                                deviceListMetadataVersion: 2
                            },
                            ...message
                        }
                    }
                };
            }
            return message;
        }
    });

    // حفظ بيانات الجلسة
    sock.ev.on('creds.update', saveCreds);
    
    // معالجة الاتصال
    connection.handle(sock);
    
    // معالجة الرسائل
    sock.ev.on('messages.upsert', async (m) => {
        const msg = m.messages[0];
        if (!msg.message || msg.key.fromMe) return;
        
        await handler.process(sock, msg);
    });
    
    console.log(`🔥 بوت ${config.botName} شغال - البادئة: ${config.prefix}`);
    console.log(`📱 الرقم: ${config.botNumber}`);
}

startBot();
