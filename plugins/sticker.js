const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

module.exports = {
    command: 'sticker',
    desc: 'تحويل الصورة إلى ملصق',
    category: 'convert',
    alias: ['ملصق', 'ستيكر'],
    async execute(sock, msg, args, text, ctx) {
        const from = msg.key.remoteJid;
        
        // التحقق من وجود صورة
        if (msg.message?.imageMessage) {
            const media = await sock.downloadMediaMessage(msg);
            const buffer = Buffer.from(media);
            const inputPath = path.join(__dirname, '../temp_input.jpg');
            const outputPath = path.join(__dirname, '../temp_output.webp');
            
            fs.writeFileSync(inputPath, buffer);
            
            exec(`ffmpeg -i ${inputPath} -vf "scale=512:512" ${outputPath}`, async (err) => {
                if (err) {
                    await sock.sendMessage(from, { text: '❌ فشل التحويل' });
                } else {
                    const stickerBuffer = fs.readFileSync(outputPath);
                    await sock.sendMessage(from, { sticker: stickerBuffer });
                    fs.unlinkSync(inputPath);
                    fs.unlinkSync(outputPath);
                }
            });
        } else {
            await sock.sendMessage(from, { text: '❌ أرسل صورة مع الأمر: 8sticker' });
        }
    }
};
