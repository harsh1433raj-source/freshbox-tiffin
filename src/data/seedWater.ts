import { WaterItem, WaterSubscriptionPlan } from '../types';

export const initialWaterItems: WaterItem[] = [
  {
    id: 'water-500ml',
    name: 'FreshPure Natural Mineral Water (500 ml)',
    size: '500 ml',
    price: 10,
    description: 'Chilled RO + UV purified mineral water packed in BPA-free recyclable bottle. Ideal for quick meals on the go.',
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
    bulkDiscount: 'Buy 10 @ ₹90'
  },
  {
    id: 'water-1l',
    name: 'FreshPure Mineral Water (1 Litre)',
    size: '1 Litre',
    price: 20,
    description: '100% pure drinking water with essential minerals & balanced pH 7.2. Fits right into your meal bag.',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
    bulkDiscount: 'Buy 5 @ ₹90'
  },
  {
    id: 'water-2l',
    name: 'FreshPure Family Pack (2 Litre)',
    size: '2 Litre',
    price: 30,
    description: 'Large 2-litre bottle for family dinner tables, desk setups, or day-long hydration.',
    image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
    bulkDiscount: 'Buy 4 @ ₹105'
  },
  {
    id: 'water-20l',
    name: 'FreshPure Commercial 20 Litre Water Jar',
    size: '20 Litre Jar',
    price: 80,
    deposit: 150, // Refundable security deposit per new jar
    description: 'Multi-stage RO, UV and Ozonized pure drinking water in heavy-duty food-grade sanitized 20-litre bubble top jar. ₹150 refundable deposit applied if not exchanging empty jar.',
    image: 'https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
    bulkDiscount: 'Doorstep dispenser delivery included'
  }
];

export const waterSubscriptionPlans: WaterSubscriptionPlan[] = [
  {
    id: 'water-sub-daily',
    title: 'Daily Jar Home Plan',
    bottleSize: '20 Litre Jar',
    quantityPerDelivery: 1,
    frequency: 'Daily',
    priceMonthly: 1999,
    jarDeposit: 150,
    description: '1 fresh 20-litre sealed water jar delivered every morning to your doorstep. Empty jar collected on delivery.',
    features: [
      '26 to 30 Jars per month',
      'Free morning doorstep delivery',
      'Empty jar pickup & return credit',
      'Pause anytime when traveling',
      'No delivery charge'
    ]
  },
  {
    id: 'water-sub-alt',
    title: 'Alternate Days Family Plan',
    bottleSize: '20 Litre Jar',
    quantityPerDelivery: 1,
    frequency: 'Alternate Days',
    priceMonthly: 1199,
    jarDeposit: 150,
    description: 'Ideal for 2-3 member families. 1 jar delivered every alternate day (15 jars/month).',
    features: [
      '15 Jars per month',
      'Scheduled morning delivery slot',
      'Zero delivery fee',
      'Quality lab tested mineral water',
      'Easy schedule pause from account'
    ]
  },
  {
    id: 'water-sub-weekly',
    title: 'Office & Bachelor Weekly Pack',
    bottleSize: '20 Litre Jar',
    quantityPerDelivery: 2,
    frequency: 'Weekly',
    priceMonthly: 699,
    jarDeposit: 300,
    description: '2 jars delivered once a week. Great for small teams, shared apartments, or low consumption homes.',
    features: [
      '8 Jars per month (2 jars every Monday)',
      'Direct floor delivery to office/flat',
      'Automated recurring drop-off',
      'Sanitized tamper-proof seal'
    ]
  }
];
