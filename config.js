// ========== إعدادات البوت ==========
global.bot = {
    name: "maisteo",
    number: "212653595016",
    prefix: "8",
    owner: "212653595016"
};

global.mess = {
    success: "✅ تم التنفيذ بنجاح سيدي",
    error: "❌ حدث خطأ سيدي",
    owner: "🔐 هذا الأمر للمالك فقط",
    group: "👥 هذا الأمر للمجموعات فقط",
    notFound: "❌ الأمر غير موجود. استخدم 8help لعرض الأوامر",
    wait: "⏳ جاري التنفيذ... صبراً سيدي"
};

module.exports = {
    botName: global.bot.name,
    prefix: global.bot.prefix,
    ownerNumber: global.bot.owner,
    botNumber: global.bot.number,
    mess: global.mess
};
