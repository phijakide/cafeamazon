import { AmbiancePhoto } from '../types';

export const ambiancePhotos: AmbiancePhoto[] = [
  {
    id: 'amb-1',
    title: {
      en: 'The Glasshouse Conservatory',
      th: 'เรือนกระจกพฤกษศาสตร์ธรรมชาติ',
      ja: 'ボタニカル温室建築',
      zh: '热带雨林玻璃阳光房',
    },
    description: {
      en: 'Floor-to-ceiling glass pavilions surrounded by tropical monstera, bird-of-paradise, and soft morning sunlight.',
      th: 'โครงสร้างกระจกโปร่งโล่ง ล้อมรอบด้วยพรรณไม้เขียวขจีและแสงแดดยามเช้าที่อบอุ่น',
      ja: '熱帯のモンステラやストレリチアに囲まれ、柔らかな陽光が降り注ぐガラス張りパビリオン。',
      zh: '通透落地的拱形玻璃天窗，绿意盎然的龟背竹与温柔朝阳交织出静谧氛围。',
    },
    category: 'glasshouse',
    image: '/src/assets/images/hero_cafe_ambiance_1790408821013.jpg',
    highlight: 'Natural Skylight & Rainforest Flora',
  },
  {
    id: 'amb-2',
    title: {
      en: 'Artisan Espresso Counter',
      th: 'เคาน์เตอร์บาริสต้าหินอ่อน',
      ja: 'エスプレッソバーカウンター',
      zh: '手工萃取咖啡吧台',
    },
    description: {
      en: 'Precision multi-boiler machines pulling fresh Northern Thai Arabica shots with rich crema and aromatic steam.',
      th: 'เครื่องชงกาแฟมาตรฐานระดับโลก พร้อมกลิ่นหอมกรุ่นของเมล็ดกาแฟไทยคั่วใหม่ทุกวัน',
      ja: '香ばしいアロマとクレマが立ちのぼる、バリスタが一杯ずつ丁寧に抽出するカウンター。',
      zh: '专业双头多锅炉意式咖啡机，伴着新鲜咖啡豆的迷人油脂与烘焙香气。',
    },
    category: 'barista',
    image: '/src/assets/images/signature_iced_coffee_1790408836776.jpg',
    highlight: 'Single-Origin Thai Arabica Pulls',
  },
  {
    id: 'amb-3',
    title: {
      en: 'Cozy Leather Reading Nook',
      th: 'มุมนั่งอ่านหนังสือโทนอบอุ่น',
      ja: '静寂の読書ラウンジ席',
      zh: '复古真皮阅读惬意一隅',
    },
    description: {
      en: 'Hand-stitched vintage leather armchairs beside full-height shelves and ambient reading lamps.',
      th: 'เก้าอี้หนังนุ่มสบายข้างชั้นหนังสือ พร้อมแสงไฟสลัวชวนพักผ่อนอย่างเป็นส่วนตัว',
      ja: '深い座り心地のレザーチェアと温かい間接照明。読書や思索に没頭できる特等席。',
      zh: '温润的手工缝线皮革沙发，依偎在满载书籍与温润壁灯的隐秘角落。',
    },
    category: 'seating',
    image: '/src/assets/images/cozy_seating_nook_1790408881214.jpg',
    highlight: 'Acoustic Teak & Quiet Atmosphere',
  },
  {
    id: 'amb-4',
    title: {
      en: 'Sunlit Botanical Terrace Table',
      th: 'โต๊ะไม้สักในสวนธรรมชาติ',
      ja: '陽だまりのガーデンウッド席',
      zh: '沐光露天原木茶席',
    },
    description: {
      en: 'Handcrafted solid teak tables overlooking cascading waterfall features and gentle tropical breeze.',
      th: 'โต๊ะไม้สักแท้ริมน้ำตกจำลอง พร้อมสายลมอ่อนๆ เคล้าเสียงน้ำไหลเย็นสบาย',
      ja: '心地よいせせらぎとそよ風を感じながら、冷たいお茶を楽しめる屋外ウッドテーブル。',
      zh: '天然实木茶桌置于流水瀑布旁，微风拂动绿叶，享受悠闲下午茶时光。',
    },
    category: 'garden',
    image: '/src/assets/images/matcha_thai_tea_1790408854310.jpg',
    highlight: 'Cascading Water & Fresh Air',
  },
  {
    id: 'amb-5',
    title: {
      en: 'Fresh Morning Bakery Display',
      th: 'เคาน์เตอร์เบเกอรี่อบใหม่',
      ja: 'モーニング焼きたてペストリー',
      zh: '清晨现烤酥香烘焙台',
    },
    description: {
      en: 'Golden French croissants, warm brownies, and delicate tartlets ready for daily pairing with coffee.',
      th: 'ครัวซองต์เนยแท้ส่งกลิ่นหอมเย้ายวน พร้อมเสิร์ฟคู่กับกาแฟสดแก้วโปรดของคุณ',
      ja: '毎朝店内で焼き上げられるサクサクのクロワッサンや濃厚ブラウニーのショーケース。',
      zh: '金黄千层黄油可颂与浓郁巧克力布朗尼，等待与香浓咖啡相遇。',
    },
    category: 'barista',
    image: '/src/assets/images/bakery_pastry_showcase_1790408868301.jpg',
    highlight: 'Baked Fresh In-Store Every Dawn',
  },
];
