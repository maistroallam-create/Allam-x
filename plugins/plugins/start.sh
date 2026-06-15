#!/bin/bash

# ألوان جميلة
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

clear

echo -e "${BLUE}"
echo "╔═══════════════════════════════════════╗"
echo "║    🔥 MAISTEO WHATSAPP BOT 🔥         ║"
echo "║                                       ║"
echo "║  👑 المالك: maisteo                   ║"
echo "║  📞 الرقم: 212653595016               ║"
echo "║  🎯 البادئة: 8                        ║"
echo "╚═══════════════════════════════════════╝"
echo -e "${NC}"

echo -e "${YELLOW}📦 جاري تثبيت المكتبات...${NC}"
npm install --legacy-peer-deps --no-audit --no-fund

echo -e "${GREEN}✅ تم التثبيت${NC}"
echo -e "${YELLOW}🚀 جاري تشغيل البوت...${NC}"

node index.js
