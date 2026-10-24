import { Order } from '../types';

export const initialOrders: Order[] = [
  {
    id: 'FB-2026-10001',
    createdAt: '2026-10-24T07:45:00Z',
    items: [
      {
        cartItemId: 'item-1001',
        productId: 'meal-1',
        type: 'meal',
        name: 'Regular Veg Tiffin',
        hindiName: 'रोज़ की सादी थाली',
        basePrice: 80,
        price: 92, // With butter roti customization
        quantity: 1,
        portion: 'Serves 1 • 4 Rotis, Dal, Sabzi, Rice, Salad',
        image: 'https://images.unsplash.com/photo-1613292443284-8d10ef9383fe?auto=format&fit=crop&w=800&q=80',
        customization: {
          rotiChoice: '4 Butter Rotis (+₹12)',
          rotiPrice: 12,
          riceChoice: 'Steamed Basmati Rice (Included)',
          ricePrice: 0,
          dalChoice: 'Dal Tadka (Included)',
          dalPrice: 0,
          sabziChoice: 'Seasonal Mix Veg (Included)',
          sabziPrice: 0,
          raitaChoice: 'None',
          raitaPrice: 0,
          spiceLevel: 'Medium',
          instructions: 'Please send less spicy dal, extra lemon wedge in salad',
          totalCustomizationAddon: 12
        }
      },
      {
        cartItemId: 'item-1002',
        productId: 'extra-salad-2',
        type: 'extra',
        name: 'Cucumber Salad',
        hindiName: 'खीरा सलाद',
        basePrice: 20,
        price: 20,
        quantity: 1,
        portion: '1 plate',
        image: 'https://images.unsplash.com/photo-1604544203292-0ec5a06ba67e?auto=format&fit=crop&w=500&q=80'
      },
      {
        cartItemId: 'item-1003',
        productId: 'extra-raita-2',
        type: 'extra',
        name: 'Boondi Raita',
        hindiName: 'बूंदी रायता',
        basePrice: 30,
        price: 30,
        quantity: 1,
        portion: '1 bowl (180ml)',
        image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=500&q=80'
      },
      {
        cartItemId: 'item-1004',
        productId: 'water-1l',
        type: 'water',
        name: 'FreshPure Mineral Water (1 Litre)',
        basePrice: 20,
        price: 20,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80'
      }
    ],
    customer: {
      name: 'Rahul Sharma',
      phone: '+91 98765 43210',
      email: 'rahul.sharma@example.com',
      address: 'Flat 402, Green Glen Heights, Bellandur, Bengaluru',
      landmark: 'Near EcoSpace Tech Park Gate 2',
      instructions: 'Please ring bell and leave with security if unavailable',
      deliverySlot: 'Immediate (30-40 min)'
    },
    subtotal: 162,
    discount: 16,
    couponCode: 'FRESH10',
    deliveryFee: 0,
    tax: 7,
    jarDepositTotal: 0,
    total: 153,
    paymentMethod: 'UPI',
    paymentStatus: 'Demo Confirmed (Simulated)',
    orderStatus: 'Out for Delivery',
    statusHistory: [
      { status: 'Order Placed', timestamp: '07:45 AM', note: 'Order received and payment verified via UPI (Demo)' },
      { status: 'Confirmed', timestamp: '07:48 AM', note: 'Kitchen confirmed preparation slot' },
      { status: 'Preparing Food', timestamp: '07:55 AM', note: 'Chef freshly grilling rotis and packing hot meals' },
      { status: 'Ready for Pickup', timestamp: '08:08 AM', note: 'Quality checked and packed in thermal insulated bag' },
      { status: 'Out for Delivery', timestamp: '08:14 AM', note: 'Rider Suresh Kumar is on the way (approx 12 mins)' }
    ],
    estimatedDelivery: '30-40 mins (Estimated 08:26 AM)',
    deliveryAgent: {
      name: 'Suresh Kumar',
      phone: '+91 98111 22334',
      vehicleNumber: 'KA-01-HG-4589'
    }
  },
  {
    id: 'FB-2026-10002',
    createdAt: '2026-10-23T19:20:00Z',
    items: [
      {
        cartItemId: 'item-2001',
        productId: 'meal-2',
        type: 'meal',
        name: 'Special Veg Thali',
        hindiName: 'स्पेशल वेज थाली',
        basePrice: 120,
        price: 120,
        quantity: 2,
        portion: 'Serves 1 • 4 Butter Rotis, Paneer, Dal Makhani, Rice, Raita & Sweet',
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80'
      }
    ],
    customer: {
      name: 'Rahul Sharma',
      phone: '+91 98765 43210',
      email: 'rahul.sharma@example.com',
      address: 'Flat 402, Green Glen Heights, Bellandur, Bengaluru',
      deliverySlot: 'Dinner: 8:00 PM'
    },
    subtotal: 240,
    discount: 50,
    couponCode: 'WELCOME50',
    deliveryFee: 0,
    tax: 9,
    jarDepositTotal: 0,
    total: 199,
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'Cash Pending on Delivery',
    orderStatus: 'Delivered',
    statusHistory: [
      { status: 'Order Placed', timestamp: '07:20 PM', note: 'Order placed with Cash on Delivery' },
      { status: 'Confirmed', timestamp: '07:22 PM', note: 'Order confirmed' },
      { status: 'Preparing Food', timestamp: '07:30 PM', note: 'Meal prepared fresh' },
      { status: 'Ready for Pickup', timestamp: '07:45 PM', note: 'Dispatched to delivery team' },
      { status: 'Out for Delivery', timestamp: '07:50 PM', note: 'Out for delivery with rider' },
      { status: 'Delivered', timestamp: '08:05 PM', note: 'Handed over to customer' }
    ],
    estimatedDelivery: 'Delivered on time',
    deliveryAgent: {
      name: 'Manoj Singh',
      phone: '+91 98222 33445',
      vehicleNumber: 'KA-03-ER-8912'
    }
  }
];
