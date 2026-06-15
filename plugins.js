const fs = require('fs');
const path = require('path');

const commands = new Map();
const aliases = new Map();

function loadPlugins() {
    const pluginsPath = path.join(__dirname, 'plugins');
    
    if (!fs.existsSync(pluginsPath)) {
        fs.mkdirSync(pluginsPath);
        console.log('📁 تم إنشاء مجلد plugins');
    }
    
    const files = fs.readdirSync(pluginsPath);
    let loadedCount = 0;
    
    for (const file of files) {
        if (file.endsWith('.js')) {
            try {
                const plugin = require(path.join(pluginsPath, file));
                if (plugin.command) {
                    commands.set(plugin.command, plugin);
                    loadedCount++;
                    
                    // إضافة الأسماء المستعارة
                    if (plugin.alias && Array.isArray(plugin.alias)) {
                        plugin.alias.forEach(alias => {
                            aliases.set(alias, plugin.command);
                        });
                    }
                    
                    console.log(`✅ تم تحميل: ${plugin.command} - ${plugin.desc || 'بدون وصف'}`);
                }
            } catch (err) {
                console.error(`❌ خطأ في تحميل ${file}:`, err.message);
            }
        }
    }
    
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`📦 تم تحميل ${loadedCount} أمر`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
}

// تحميل الأوامر فوراً
loadPlugins();

// دالة للحصول على الأمر (مع دعم الأسماء المستعارة)
function getCommand(name) {
    if (commands.has(name)) return commands.get(name);
    if (aliases.has(name)) return commands.get(aliases.get(name));
    return null;
}

module.exports = { commands, aliases, getCommand, loadPlugins };
