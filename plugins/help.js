const plugins = require('../plugins');
const config = require('../config');

module.exports = {
    command: 'help',
    desc: 'عرض قائمة جميع الأوامر',
    category: 'system',
    alias: ['مساعدة', 'اوامر', 'menu', 'القائمة'],
    async execute(sock, msg, args, text, ctx) {
        const from = msg.key.remoteJid;
        const commands = plugins.commands;
        
        let menu = `╔════════════════════════╗\n`;
        menu += `║    🔥 ${config.botName} بوت 🔥\n`;
        menu += `╠════════════════════════╣\n`;
        menu += `║ 📱 البادئة: ${config.prefix}\n`;
        menu += `║ 📊 عدد الأوامر: ${commands.size}\n`;
        menu += `╠════════════════════════╣\n\n`;
        
        // تجميع الأوامر حسب الفئة
        const categories = {};
        for (const [cmd, plugin] of commands) {
            const cat = plugin.category || 'أخرى';
            if (!categories[cat]) categories[cat] = [];
            categories[cat].push(`┃ ${config.prefix}${cmd} - ${plugin.desc || ''}`);
        }
        
        for (const [cat, cmds] of Object.entries(categories)) {
            menu += `┏━━━ ${cat} ━━━┓\n`;
            menu += cmds.join('\n') + '\n';
            menu += `┗━━━━━━━━━━━━━━━┛\n\n`;
        }
        
        menu += `╔════════════════════════╗\n`;
        menu += `║ 👑 المالك: maisteo\n`;
        menu += `║ 📞 الرقم: ${config.botNumber}\n`;
        menu += `╚════════════════════════╝`;
        
        await sock.sendMessage(from, { text: menu });
    }
};
