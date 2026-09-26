import { LoyaltyVoucher } from '../types';

export const initialVouchers: LoyaltyVoucher[] = [
  {
    id: 'vouch-oat-upgrade',
    code: 'AMZ-OAT-FREE',
    title: {
      en: 'Free Oat or Almond Milk Upgrade',
      th: 'ฟรี อัปเกรดนมโอ๊ต หรือนมอัลมอนด์',
      ja: 'オーツ/アーモンドミルク変更無料',
      zh: '免费升级燕麦奶或巴旦木奶',
    },
    description: {
      en: 'Customize any beverage with plant-based milk at zero extra charge.',
      th: 'เปลี่ยนนมเป็นนมพืชเพื่อสุขภาพในเครื่องดื่มแก้วโปรดฟรี',
      ja: 'お好みのドリンクで植物性ミルクへの変更が1回無料になります。',
      zh: '任选饮品免费升级植物燕麦奶或坚果奶一次。',
    },
    costPoints: 50,
    discountType: 'fixed',
    discountValue: 15,
    expiresInDays: 30,
  },
  {
    id: 'vouch-upsize',
    code: 'AMZ-UPSIZE-22',
    title: {
      en: 'Free Upsize (16oz to 22oz Grande)',
      th: 'ฟรี อัปขนาดแก้ว (16oz เป็น 22oz)',
      ja: 'サイズアップ無料（16oz→22oz）',
      zh: '免费大杯升级（16oz 升级至 22oz）',
    },
    description: {
      en: 'Enjoy more refreshing coffee or tea with an instant size upgrade.',
      th: 'เพิ่มความสดชื่นจุใจ อัปไซซ์แก้วใหญ่ฟรีทันที',
      ja: 'たっぷり飲めるグランデサイズへの無料アップグレード。',
      zh: '免费为您的特调饮品升级至特大杯型。',
    },
    costPoints: 80,
    discountType: 'upsize',
    discountValue: 10,
    expiresInDays: 30,
  },
  {
    id: 'vouch-bakery-half',
    code: 'AMZ-BAKERY-50OFF',
    title: {
      en: '50% Off Any Bakery Pastry',
      th: 'ส่วนลด 50% เบเกอรี่และขนมอบทุกชนิด',
      ja: 'ベーカリー全品 50%OFF',
      zh: '每日现烤烘焙全品类 5折优惠券',
    },
    description: {
      en: 'Pair your morning coffee with a French croissant or chocolate brownie at half price.',
      th: 'จับคู่กาแฟแก้วโปรดกับครัวซองต์หรือบราวนี่ในราคาเพียงครึ่งเดียว',
      ja: 'クロワッサンやブラウニーなどベーカリー商品が半額に。',
      zh: '选购可颂或熔岩布朗尼享半价特权。',
    },
    costPoints: 120,
    discountType: 'percent',
    discountValue: 50,
    expiresInDays: 45,
  },
  {
    id: 'vouch-free-signature',
    code: 'AMZ-FREE-SIGNATURE',
    title: {
      en: 'Free Signature Amazan Beverage',
      th: 'ฟรี เครื่องดื่มซิกเนเจอร์ 1 แก้ว',
      ja: 'シグネチャードリンク 1杯無料券',
      zh: '免费兑换亚马逊招牌特饮1杯',
    },
    description: {
      en: 'Complimentary Signature Iced Coffee, Thai Tea, or Matcha Latte on us.',
      th: 'รับฟรี กาแฟอเมซอนเย็น ชาไทย หรือมัทฉะลาเต้ 1 แก้ว',
      ja: 'アイスコーヒー、タイティー、抹茶ラテ等からお好きな1杯をプレゼント。',
      zh: '可兑换招牌冰咖啡、泰式奶茶或宇治抹茶拿铁一杯。',
    },
    costPoints: 200,
    discountType: 'freeItem',
    discountValue: 65,
    expiresInDays: 60,
  },
];
