import { Feedback } from '../types';

export const initialFeedbackList: Feedback[] = [
  {
    id: 'rev-101',
    orderId: 'FB-2026-10001',
    customerName: 'Aarav Sharma',
    rating: 5,
    foodQualityRating: 5,
    tasteRating: 5,
    deliveryRating: 5,
    comment: 'Reminds me completely of my mother’s cooking in Lucknow! The rotis were piping hot, soft, and the dal tadka tasted clean without heavy restaurant oils. Lifesaver for working professionals.',
    suggestions: 'Please keep the yellow dal fry in the regular rotation.',
    mealReviewed: 'Regular Veg Tiffin + Boondi Raita',
    createdAt: '2026-10-22T13:45:00Z',
    status: 'approved'
  },
  {
    id: 'rev-102',
    orderId: 'FB-2026-10002',
    customerName: 'Priya Iyer',
    rating: 5,
    foodQualityRating: 5,
    tasteRating: 5,
    deliveryRating: 4,
    comment: 'Subscribed to the Standard 26-day plan and it is the best decision I made this month. Zero headache of cooking after long corporate shifts. Special praise for the eco-friendly hot foil packaging!',
    suggestions: 'Add more South Indian breakfast options like idli sambar on weekends.',
    mealReviewed: 'Standard Monthly Subscription',
    createdAt: '2026-10-21T20:10:00Z',
    status: 'approved'
  },
  {
    id: 'rev-103',
    orderId: 'FB-2026-10003',
    customerName: 'Vikram Malhotra',
    rating: 5,
    foodQualityRating: 5,
    tasteRating: 4,
    deliveryRating: 5,
    comment: 'The Paneer Tiffin was outstanding! Rich paneer cubes and fragrant jeera rice. Also ordered a 20L water jar with the meal and both arrived together in 25 minutes. Super seamless experience.',
    suggestions: 'Would love an option for garlic butter naan occasionally.',
    mealReviewed: 'Paneer Tiffin Deluxe + 20L Jar',
    createdAt: '2026-10-20T14:15:00Z',
    status: 'approved'
  },
  {
    id: 'rev-104',
    orderId: 'FB-2026-10004',
    customerName: 'Neha Verma',
    rating: 4,
    foodQualityRating: 4,
    tasteRating: 5,
    deliveryRating: 4,
    comment: 'Really like how easy it is to add extra rotis and cucumber salad to my tiffin. The customization feature is so practical! Pricing is extremely fair for the portion size.',
    suggestions: 'Add sweet lassi to the breakfast combo options.',
    mealReviewed: 'Special Veg Thali + Extra Rotis',
    createdAt: '2026-10-19T13:00:00Z',
    status: 'approved'
  },
  {
    id: 'rev-105',
    orderId: 'FB-2026-10005',
    customerName: 'Rohan Deshmukh',
    rating: 4,
    foodQualityRating: 4,
    tasteRating: 4,
    deliveryRating: 5,
    comment: 'Good food, arrived warm. I asked for less oil and they followed the instructions carefully. Will reorder again.',
    suggestions: 'Keep a spicy chutney option.',
    mealReviewed: 'Dal Rice Combo + Papad',
    createdAt: '2026-10-23T09:30:00Z',
    status: 'pending' // Demo pending review for admin moderation test
  }
];
