import { ExtraItem } from '../types';

export const initialExtras: ExtraItem[] = [
  // 1. Roti and Bread
  {
    id: 'extra-roti-1',
    name: 'Extra Tawa Roti',
    hindiName: 'तवा रोटी',
    category: 'Roti and Bread',
    description: 'Hot, freshly puffed 100% whole wheat tawa roti made on cast iron griddle.',
    price: 8,
    unit: '1 pc',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=500&q=80',
    isAvailable: true,
    calories: '70 kcal'
  },
  {
    id: 'extra-roti-2',
    name: 'Two Rotis Pack',
    hindiName: 'दो तवा रोटियां',
    category: 'Roti and Bread',
    description: 'Pair of hot whole wheat phulkas wrapped in eco foil to keep soft.',
    price: 15,
    unit: '2 pcs',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=500&q=80',
    isAvailable: true,
    calories: '140 kcal'
  },
  {
    id: 'extra-roti-3',
    name: 'Butter Roti',
    hindiName: 'मक्खन वाली रोटी',
    category: 'Roti and Bread',
    description: 'Fresh tawa roti generously brushed with pure Amul butter.',
    price: 12,
    unit: '1 pc',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=500&q=80',
    isAvailable: true,
    calories: '105 kcal'
  },
  {
    id: 'extra-roti-4',
    name: 'Plain Triangle Paratha',
    hindiName: 'सादा पराठा',
    category: 'Roti and Bread',
    description: 'Crispy layered triangular paratha roasted golden with pure ghee.',
    price: 20,
    unit: '1 pc',
    image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=500&q=80',
    isAvailable: true,
    calories: '180 kcal'
  },
  {
    id: 'extra-roti-5',
    name: 'Stuffed Aloo Paratha',
    hindiName: 'भरवां आलू पराठा',
    category: 'Roti and Bread',
    description: 'Thick whole-wheat paratha stuffed with seasoned potato and green herbs.',
    price: 35,
    unit: '1 pc',
    image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=500&q=80',
    isAvailable: true,
    calories: '280 kcal'
  },

  // 2. Rice and Grains
  {
    id: 'extra-rice-1',
    name: 'Extra Steamed Rice',
    hindiName: 'बासमती चावल',
    category: 'Rice and Grains',
    description: 'Aromatic, fluffy long-grain steamed Basmati rice.',
    price: 25,
    unit: '1 bowl (200g)',
    image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=500&q=80',
    isAvailable: true,
    calories: '210 kcal'
  },
  {
    id: 'extra-rice-2',
    name: 'Jeera Rice',
    hindiName: 'जीरा राइस',
    category: 'Rice and Grains',
    description: 'Basmati rice tempered with roasted cumin seeds and pure desi ghee.',
    price: 40,
    unit: '1 bowl (220g)',
    image: 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?auto=format&fit=crop&w=500&q=80',
    isAvailable: true,
    calories: '240 kcal'
  },
  {
    id: 'extra-rice-3',
    name: 'Extra Veg Pulao',
    hindiName: 'वेज पुलाव',
    category: 'Rice and Grains',
    description: 'Spiced aromatic rice tossed with peas, diced carrots and whole garam masala.',
    price: 40,
    unit: '1 bowl (220g)',
    image: 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?auto=format&fit=crop&w=500&q=80',
    isAvailable: true,
    calories: '260 kcal'
  },

  // 3. Salad and Fresh Sides
  {
    id: 'extra-salad-1',
    name: 'Fresh Green Salad',
    hindiName: 'हरा सलाद',
    category: 'Salad and Fresh Sides',
    description: 'Crisp slices of cucumber, juicy tomatoes, red radish, carrot, lemon wedge & green chilli.',
    price: 20,
    unit: '1 plate',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80',
    isAvailable: true,
    calories: '45 kcal'
  },
  {
    id: 'extra-salad-2',
    name: 'Cucumber Salad',
    hindiName: 'खीरा सलाद',
    category: 'Salad and Fresh Sides',
    description: 'Chilled freshly sliced farm cucumbers sprinkled with black salt and roasted cumin.',
    price: 20,
    unit: '1 plate',
    image: 'https://images.unsplash.com/photo-1604544203292-0ec5a06ba67e?auto=format&fit=crop&w=500&q=80',
    isAvailable: true,
    calories: '30 kcal'
  },
  {
    id: 'extra-salad-3',
    name: 'Masala Onion Salad',
    hindiName: 'प्याज़ लच्छा सलाद',
    category: 'Salad and Fresh Sides',
    description: 'Crispy ring onions tossed with Kashmiri red chilli, fresh mint and lemon juice.',
    price: 10,
    unit: '1 plate',
    image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=500&q=80',
    isAvailable: true,
    calories: '35 kcal'
  },
  {
    id: 'extra-salad-4',
    name: 'Sprouts Protein Salad',
    hindiName: 'अंकुरित मूंग सलाद',
    category: 'Salad and Fresh Sides',
    description: 'Sprouted green moong & kala chana with pomegranate, chopped onion, coriander & chaat masala.',
    price: 35,
    unit: '1 bowl',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=80',
    isAvailable: true,
    calories: '110 kcal'
  },

  // 4. Raita and Curd
  {
    id: 'extra-raita-1',
    name: 'Plain Fresh Curd',
    hindiName: 'ताज़ा मीठा दही',
    category: 'Raita and Curd',
    description: 'Thick, creamy set homestyle curd made with fresh cow milk.',
    price: 20,
    unit: '150g cup',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=500&q=80',
    isAvailable: true,
    calories: '90 kcal'
  },
  {
    id: 'extra-raita-2',
    name: 'Boondi Raita',
    hindiName: 'बूंदी रायता',
    category: 'Raita and Curd',
    description: 'Crispy gram flour boondi soaked in seasoned whipped curd with roasted cumin and mint.',
    price: 30,
    unit: '1 bowl (180ml)',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=500&q=80',
    isAvailable: true,
    calories: '120 kcal'
  },
  {
    id: 'extra-raita-3',
    name: 'Cucumber Raita',
    hindiName: 'खीरा रायता',
    category: 'Raita and Curd',
    description: 'Cooling grated cucumber folded into chilled yogurt with rock salt and black pepper.',
    price: 30,
    unit: '1 bowl (180ml)',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=500&q=80',
    isAvailable: true,
    calories: '85 kcal'
  },
  {
    id: 'extra-raita-4',
    name: 'Mixed Vegetable Raita',
    hindiName: 'मिक्स वेज रायता',
    category: 'Raita and Curd',
    description: 'Whipped curd loaded with finely diced cucumber, onions, tomatoes and fresh coriander.',
    price: 35,
    unit: '1 bowl (180ml)',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80',
    isAvailable: true,
    calories: '95 kcal'
  },

  // 5. Dal and Gravy
  {
    id: 'extra-dal-1',
    name: 'Extra Homestyle Dal',
    hindiName: 'घर वाली दाल',
    category: 'Dal and Gravy',
    description: 'Yellow Toor dal slow-cooked with turmeric, tomatoes and mild hing tadka.',
    price: 25,
    unit: '1 container (200ml)',
    image: 'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?auto=format&fit=crop&w=500&q=80',
    isAvailable: true,
    calories: '140 kcal'
  },
  {
    id: 'extra-dal-2',
    name: 'Dal Tadka Special',
    hindiName: 'दाल तड़का',
    category: 'Dal and Gravy',
    description: 'Smoky yellow dal finished with double tadka of garlic, whole red chilies & desi ghee.',
    price: 40,
    unit: '1 container (200ml)',
    image: 'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?auto=format&fit=crop&w=500&q=80',
    isAvailable: true,
    calories: '180 kcal'
  },
  {
    id: 'extra-dal-3',
    name: 'Extra Seasonal Sabzi',
    hindiName: 'मौसमी सब्ज़ी',
    category: 'Dal and Gravy',
    description: "Today's chef special homestyle vegetable cooked with minimal oil and authentic masalas.",
    price: 30,
    unit: '1 container (180g)',
    image: 'https://images.unsplash.com/photo-1613292443284-8d10ef9383fe?auto=format&fit=crop&w=500&q=80',
    isAvailable: true,
    calories: '130 kcal'
  },
  {
    id: 'extra-dal-4',
    name: 'Paneer Butter Masala Sabzi',
    hindiName: 'पनीर बटर मसाला',
    category: 'Dal and Gravy',
    description: 'Soft cottage cheese cubes in luscious cashew tomato butter gravy.',
    price: 60,
    unit: '1 container (180g)',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=500&q=80',
    isAvailable: true,
    calories: '280 kcal'
  },

  // 6. Snacks and Accompaniments
  {
    id: 'extra-snack-1',
    name: 'Green Coriander Chutney',
    hindiName: 'हरी धनिया चटनी',
    category: 'Snacks and Accompaniments',
    description: 'Spicy and zesty dip made with fresh cilantro, green chillies, garlic and lemon.',
    price: 10,
    unit: '50ml tub',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=500&q=80',
    isAvailable: true,
    calories: '25 kcal'
  },
  {
    id: 'extra-snack-2',
    name: 'Fresh Mint Chutney',
    hindiName: 'पुदीना चटनी',
    category: 'Snacks and Accompaniments',
    description: 'Refreshing pudina chutney tempered with anardana and black salt.',
    price: 10,
    unit: '50ml tub',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=500&q=80',
    isAvailable: true,
    calories: '20 kcal'
  },
  {
    id: 'extra-snack-3',
    name: 'Homestyle Mango Pickle',
    hindiName: 'घर का आम का अचार',
    category: 'Snacks and Accompaniments',
    description: 'Sun-dried traditional spicy raw mango pickle cured in mustard oil.',
    price: 5,
    unit: '30g sachet/cup',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=500&q=80',
    isAvailable: true,
    calories: '40 kcal'
  },
  {
    id: 'extra-snack-4',
    name: 'Crispy Fried Papad',
    hindiName: 'तला हुआ पापड़',
    category: 'Snacks and Accompaniments',
    description: 'Crispy lentil papad fried golden.',
    price: 10,
    unit: '1 pc',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=500&q=80',
    isAvailable: true,
    calories: '55 kcal'
  },
  {
    id: 'extra-snack-5',
    name: 'Roasted Papad',
    hindiName: 'भुना पापड़',
    category: 'Snacks and Accompaniments',
    description: 'Healthy dry flame-roasted urad dal papad with black pepper crunch.',
    price: 15,
    unit: '2 pcs',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=500&q=80',
    isAvailable: true,
    calories: '45 kcal'
  },
  {
    id: 'extra-snack-6',
    name: 'Masala Papad',
    hindiName: 'मसाला पापड़',
    category: 'Snacks and Accompaniments',
    description: 'Crisp roasted papad topped with chopped onions, tomatoes, coriander and tangy chaat masala.',
    price: 25,
    unit: '1 pc',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=500&q=80',
    isAvailable: true,
    calories: '75 kcal'
  },

  // 7. Dairy and Other Extras
  {
    id: 'extra-dairy-1',
    name: 'Extra Fresh Paneer Cubes',
    hindiName: 'ताज़ा पनीर',
    category: 'Dairy and Other Extras',
    description: '100g fresh soft malai paneer cubes, lightly sautéed with pinch of jeera salt.',
    price: 40,
    unit: '100g',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=500&q=80',
    isAvailable: true,
    calories: '260 kcal'
  },
  {
    id: 'extra-dairy-2',
    name: 'Masala Buttermilk (Chaas)',
    hindiName: 'मसाला छाछ',
    category: 'Dairy and Other Extras',
    description: 'Chilled spiced buttermilk blended with roasted cumin, rock salt, ginger and fresh coriander.',
    price: 20,
    unit: '250ml pouch',
    image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=500&q=80',
    isAvailable: true,
    calories: '65 kcal'
  },
  {
    id: 'extra-dairy-3',
    name: 'Sweet Punjabi Lassi',
    hindiName: 'मीठी लस्सी',
    category: 'Dairy and Other Extras',
    description: 'Rich, thick whipped sweet yogurt topped with fresh malai and crushed cardamom.',
    price: 35,
    unit: '300ml bottle',
    image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=500&q=80',
    isAvailable: true,
    calories: '190 kcal'
  },
  {
    id: 'extra-dairy-4',
    name: 'Sweet Dish of the Day',
    hindiName: 'आज का मीठा',
    category: 'Dairy and Other Extras',
    description: 'Rotating seasonal dessert: Sooji Halwa / Rice Kheer / Moong Dal Halwa made with pure desi ghee.',
    price: 30,
    unit: '1 cup (100g)',
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=500&q=80',
    isAvailable: true,
    calories: '220 kcal'
  },
  {
    id: 'extra-dairy-5',
    name: 'Gulab Jamun (1 pc)',
    hindiName: 'गुलाब जामुन',
    category: 'Dairy and Other Extras',
    description: 'Hot, juicy saffron-infused khoya gulab jamun.',
    price: 30,
    unit: '1 large pc',
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=500&q=80',
    isAvailable: true,
    calories: '150 kcal'
  }
];
