/* ═══════════════════════════════════════════════════════
   FOODIEDASH — SAMPLE DATA (INDIAN VARIANT)
   ═══════════════════════════════════════════════════════ */

const foodImages = {
  burger: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=400&fit=crop',
  pizza: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&h=400&fit=crop',
  sushi: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&h=400&fit=crop',
  pasta: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500&h=400&fit=crop',
  salad: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=400&fit=crop',
  steak: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=500&h=400&fit=crop',
  tacos: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&h=400&fit=crop',
  ramen: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&h=400&fit=crop',
  curry: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&h=400&fit=crop',
  dessert: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=500&h=400&fit=crop',
  sandwich: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&h=400&fit=crop',
  wings: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=500&h=400&fit=crop',
  biryani: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&h=400&fit=crop',
  noodles: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=500&h=400&fit=crop',
  fries: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&h=400&fit=crop',
  icecream: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=500&h=400&fit=crop',
  smoothie: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=500&h=400&fit=crop',
  wrap: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500&h=400&fit=crop',
  dosa: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500&h=400&fit=crop',
  thali: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&h=400&fit=crop',
};

const restaurantImages = {
  northIndian: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=400&fit=crop',
  southIndian: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=600&h=400&fit=crop',
  biryani: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&h=400&fit=crop',
  streetFood: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&h=400&fit=crop',
  cafe: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&h=400&fit=crop',
  asian: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&h=400&fit=crop',
  pizza: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop',
  healthy: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop',
  dessert: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&h=400&fit=crop',
  fastfood: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=600&h=400&fit=crop',
};

export const restaurants = [
  { id: 'r1', name: 'Punjab Grill', cuisine: 'North Indian • Mughlai', image: restaurantImages.northIndian, rating: 4.8, reviews: 1243, deliveryTime: '25-35 min', deliveryFee: 40, priceRange: '₹', isOpen: true, featured: true, address: 'Connaught Place, New Delhi', description: 'Authentic rich flavors of Punjab and Mughlai delicacies.' },
  { id: 'r2', name: 'Paradise Biryani', cuisine: 'Biryani • Hyderabadi', image: restaurantImages.biryani, rating: 4.6, reviews: 2156, deliveryTime: '20-30 min', deliveryFee: 30, priceRange: '₹', isOpen: true, featured: true, address: 'Secunderabad, Hyderabad', description: 'World famous Hyderabadi Dum Biryani cooked to perfection.' },
  { id: 'r3', name: 'Saravana Bhavan', cuisine: 'South Indian • Pure Veg', image: restaurantImages.southIndian, rating: 4.7, reviews: 987, deliveryTime: '30-40 min', deliveryFee: 35, priceRange: '₹', isOpen: true, featured: true, address: 'T Nagar, Chennai', description: 'Crispy dosas, fluffy idlis and the authentic taste of South India.' },
  { id: 'r4', name: 'Bikanervala', cuisine: 'Street Food • Sweets', image: restaurantImages.streetFood, rating: 4.5, reviews: 1532, deliveryTime: '15-25 min', deliveryFee: 20, priceRange: '₹', isOpen: true, featured: false, address: 'Banjara Hills, Hyderabad', description: 'Chaat, Chole Bhature, and rich traditional Indian sweets.' },
  { id: 'r5', name: 'Truffles Cafe', cuisine: 'Burgers • Continental', image: restaurantImages.cafe, rating: 4.4, reviews: 876, deliveryTime: '25-35 min', deliveryFee: 50, priceRange: '₹', isOpen: true, featured: false, address: 'Koramangala, Bangalore', description: 'Gourmet burgers, thick shakes, and perfect continental fast food.' },
  { id: 'r6', name: 'Mainland China', cuisine: 'Chinese • Asian', image: restaurantImages.asian, rating: 4.6, reviews: 1105, deliveryTime: '20-30 min', deliveryFee: 45, priceRange: '₹', isOpen: true, featured: true, address: 'Andheri West, Mumbai', description: 'Fine dining Indo-Chinese and authentic Asian cuisine.' },
  { id: 'r7', name: 'Oven Story', cuisine: 'Pizza • Fast Food', image: restaurantImages.pizza, rating: 4.3, reviews: 1678, deliveryTime: '25-35 min', deliveryFee: 30, priceRange: '₹', isOpen: true, featured: false, address: 'Magarpatta, Pune', description: 'Next-level standout pizzas with different cheese bases.' },
  { id: 'r8', name: 'Haldiram\'s', cuisine: 'North Indian • Snacks', image: restaurantImages.fastfood, rating: 4.7, reviews: 645, deliveryTime: '30-40 min', deliveryFee: 25, priceRange: '₹', isOpen: true, featured: false, address: 'Park Street, Kolkata', description: 'Iconic vegetarian restaurant known for its Raj Kachori and Thalis.' },
  { id: 'r9', name: 'Eat.Fit', cuisine: 'Healthy • Salads • Bowls', image: restaurantImages.healthy, rating: 4.5, reviews: 892, deliveryTime: '20-30 min', deliveryFee: 40, priceRange: '₹', isOpen: true, featured: true, address: 'HSR Layout, Bangalore', description: 'Guilt-free, calorie-counted, highly nutritious Indian meals.' },
  { id: 'r10', name: 'Naturals Ice Cream', cuisine: 'Desserts • Ice Cream', image: restaurantImages.dessert, rating: 4.9, reviews: 423, deliveryTime: '15-25 min', deliveryFee: 20, priceRange: '₹', isOpen: true, featured: false, address: 'Juhu, Mumbai', description: 'Artisanal ice creams made with real fruits and milk.' },
];

export const menuItems = [
  // Punjab Grill (r1)
  { id: 'm1', restaurantId: 'r1', name: 'Butter Chicken', description: 'Tender chicken roasted in tandoor then simmered in a rich tomato gravy', price: 350, image: foodImages.curry, category: 'Mains', popular: true },
  { id: 'm2', restaurantId: 'r1', name: 'Dal Makhani', description: 'Black lentils slow cooked overnight with butter and cream', price: 250, image: foodImages.curry, category: 'Mains', popular: true },
  { id: 'm3', restaurantId: 'r1', name: 'Garlic Naan', description: 'Soft tandoori bread infused with garlic and butter', price: 60, image: foodImages.curry, category: 'Breads', popular: false },
  { id: 'm4', restaurantId: 'r1', name: 'Chicken Tikka', description: 'Juicy chunks of chicken marinated in spiced yogurt and roasted', price: 280, image: foodImages.wings, category: 'Starters', popular: false },
  { id: 'm5', restaurantId: 'r1', name: 'Paneer Tikka Masala', description: 'Grilled paneer cubes in a spicy onion-tomato gravy', price: 290, image: foodImages.curry, category: 'Mains', popular: true },

  // Paradise Biryani (r2)
  { id: 'm6', restaurantId: 'r2', name: 'Chicken Dum Biryani', description: 'Authentic Hyderabadi biryani with tender chicken and basmati rice', price: 320, image: foodImages.biryani, category: 'Biryani', popular: true },
  { id: 'm7', restaurantId: 'r2', name: 'Mutton Biryani', description: 'Special dum biryani packed with flavorful mutton pieces', price: 450, image: foodImages.biryani, category: 'Biryani', popular: true },
  { id: 'm8', restaurantId: 'r2', name: 'Mirchi Ka Salan', description: 'Spicy peanut and sesame based curry, perfect with biryani', price: 80, image: foodImages.curry, category: 'Sides', popular: false },
  { id: 'm9', restaurantId: 'r2', name: 'Double Ka Meetha', description: 'Bread pudding dessert of fried bread slices soaked in hot milk', price: 120, image: foodImages.dessert, category: 'Desserts', popular: false },
  { id: 'm10', restaurantId: 'r2', name: 'Chicken 65', description: 'Deep fried spicy chicken appetizer with curry leaves', price: 260, image: foodImages.wings, category: 'Starters', popular: true },

  // Saravana Bhavan (r3)
  { id: 'm11', restaurantId: 'r3', name: 'Masala Dosa', description: 'Crispy rice crepe filled with spiced potato curry', price: 120, image: foodImages.dosa, category: 'Dosa', popular: true },
  { id: 'm12', restaurantId: 'r3', name: 'Idli Vada Set', description: 'Steamed rice cakes and lentil donut served with sambar/chutney', price: 90, image: foodImages.dosa, category: 'Tiffin', popular: true },
  { id: 'm13', restaurantId: 'r3', name: 'South Indian Thali', description: 'Complete meal with rice, sambar, rasam, kootu, poriyal, curd, appalam', price: 220, image: foodImages.thali, category: 'Meals', popular: false },
  { id: 'm14', restaurantId: 'r3', name: 'Filter Coffee', description: 'Authentic strong South Indian filter coffee', price: 50, image: foodImages.smoothie, category: 'Beverages', popular: false },
  { id: 'm15', restaurantId: 'r3', name: 'Rava Kesari', description: 'Semolina sweet pudding with ghee and cashews', price: 80, image: foodImages.dessert, category: 'Desserts', popular: true },

  // Bikanervala (r4)
  { id: 'm16', restaurantId: 'r4', name: 'Chole Bhature', description: 'Spicy chickpea curry served with fluffy fried bread', price: 150, image: foodImages.thali, category: 'Street Food', popular: true },
  { id: 'm17', restaurantId: 'r4', name: 'Raj Kachori', description: 'Crispy oversized poori stuffed with chaat ingredients', price: 130, image: foodImages.salad, category: 'Chaat', popular: true },
  { id: 'm18', restaurantId: 'r4', name: 'Rasmalai', description: 'Soft paneer discs soaked in thickened sweetened milk', price: 100, image: foodImages.dessert, category: 'Sweets', popular: false },
  { id: 'm19', restaurantId: 'r4', name: 'Pani Puri (10 pcs)', description: 'Crispy puris with tangy, spicy mint water', price: 60, image: foodImages.streetFood, category: 'Chaat', popular: true },
  { id: 'm20', restaurantId: 'r4', name: 'Samosa (2 pcs)', description: 'Fried pastry with savory potato stuffing', price: 40, image: foodImages.streetFood, category: 'Snacks', popular: false },

  // Truffles Cafe (r5)
  { id: 'm21', restaurantId: 'r5', name: 'All American Cheese Burger', description: 'Juicy beef/chicken patty, double cheese, caramelized onions', price: 280, image: foodImages.burger, category: 'Burgers', popular: true },
  { id: 'm22', restaurantId: 'r5', name: 'Peri Peri Fries', description: 'Crispy fries tossed in spicy peri peri mix', price: 140, image: foodImages.fries, category: 'Sides', popular: true },
  { id: 'm23', restaurantId: 'r5', name: 'Ferrero Rocher Shake', description: 'Thick chocolate shake blended with Ferrero Rocher', price: 220, image: foodImages.smoothie, category: 'Beverages', popular: false },
  { id: 'm24', restaurantId: 'r5', name: 'Penne Alfredo', description: 'Pasta in rich, creamy cheesy white sauce with mushrooms', price: 290, image: foodImages.pasta, category: 'Pasta', popular: false },
  { id: 'm25', restaurantId: 'r5', name: 'Chicken Wings', description: 'BBQ sticky chicken wings', price: 250, image: foodImages.wings, category: 'Starters', popular: true },

  // Mainland China (r6)
  { id: 'm26', restaurantId: 'r6', name: 'Hakka Noodles', description: 'Wok tossed noodles with julienne veggies and soy sauce', price: 220, image: foodImages.noodles, category: 'Noodles', popular: true },
  { id: 'm27', restaurantId: 'r6', name: 'Chilli Chicken Dry', description: 'Crispy chicken tossed with bell peppers and spicy sauce', price: 280, image: foodImages.wings, category: 'Starters', popular: true },
  { id: 'm28', restaurantId: 'r6', name: 'Chicken Manchurian', description: 'Minced chicken balls in dark soy, garlic sauce', price: 270, image: foodImages.curry, category: 'Mains', popular: false },
  { id: 'm29', restaurantId: 'r6', name: 'Dim Sum Platter', description: 'Assortment of steamed crystal dumplings', price: 320, image: foodImages.sushi, category: 'Dim Sum', popular: false },
  { id: 'm30', restaurantId: 'r6', name: 'Fried Rice', description: 'Classic wok-tossed fried rice', price: 210, image: foodImages.biryani, category: 'Rice', popular: true },

  // Oven Story (r7)
  { id: 'm31', restaurantId: 'r7', name: 'Paneer Tikka Pizza', description: 'Desi style pizza with paneer tikka chunks and capsicum', price: 350, image: foodImages.pizza, category: 'Pizza', popular: true },
  { id: 'm32', restaurantId: 'r7', name: 'Chicken Pepperoni', description: 'Loaded with classic chicken pepperoni slices and extra cheese', price: 400, image: foodImages.pizza, category: 'Pizza', popular: true },
  { id: 'm33', restaurantId: 'r7', name: 'Garlic Breadsticks', description: 'Freshly baked cheese garlic bread', price: 150, image: foodImages.sandwich, category: 'Sides', popular: false },
  { id: 'm34', restaurantId: 'r7', name: 'Choco Lava Cake', description: 'Warm chocolate cake with a gooey molten center', price: 110, image: foodImages.dessert, category: 'Desserts', popular: true },
  { id: 'm35', restaurantId: 'r7', name: 'Mac & Cheese', description: 'Creamy macaroni loaded with cheese', price: 220, image: foodImages.pasta, category: 'Pasta', popular: false },

  // Haldiram's (r8)
  { id: 'm36', restaurantId: 'r8', name: 'Special Deluxe Thali', description: 'Shahi Paneer, Dal Makhani, Mix Veg, Rice, Raita, Naan, Sweet', price: 320, image: foodImages.thali, category: 'Meals', popular: true },
  { id: 'm37', restaurantId: 'r8', name: 'P पाव Bhaji', description: 'Spicy mashed vegetables served with butter-toasted pav', price: 160, image: foodImages.streetFood, category: 'Street Food', popular: true },
  { id: 'm38', restaurantId: 'r8', name: 'Kaju Katli (250g)', description: 'Premium cashew fudge sweet', price: 280, image: foodImages.dessert, category: 'Sweets', popular: false },
  { id: 'm39', restaurantId: 'r8', name: 'Aloo Tikki Chaat', description: 'Fried potato patties topped with yogurt and chutneys', price: 120, image: foodImages.salad, category: 'Chaat', popular: true },
  { id: 'm40', restaurantId: 'r8', name: 'Lassi', description: 'Thick, sweet yogurt beverage', price: 70, image: foodImages.smoothie, category: 'Beverages', popular: false },

  // Eat.Fit (r9)
  { id: 'm41', restaurantId: 'r9', name: 'High Protein Chicken Salad', description: 'Grilled chicken, quinoa, mixed greens, low-fat dressing', price: 250, image: foodImages.salad, category: 'Salads', popular: true },
  { id: 'm42', restaurantId: 'r9', name: 'Millet Khichdi', description: 'Comforting superfood khichdi made with foxtail millet and veggies', price: 180, image: foodImages.thali, category: 'Healthy Bowls', popular: true },
  { id: 'm43', restaurantId: 'r9', name: 'Roasted Veggie Wrap', description: 'Whole wheat wrap stuffed with grilled vegetables and hummus', price: 190, image: foodImages.wrap, category: 'Wraps', popular: false },
  { id: 'm44', restaurantId: 'r9', name: 'Fruit Bowl', description: 'Fresh seasonal fruits cut daily', price: 160, image: foodImages.salad, category: 'Healthy', popular: false },
  { id: 'm45', restaurantId: 'r9', name: 'Cold Pressed Juice', description: 'Apple, beetroot, and carrot mix', price: 120, image: foodImages.smoothie, category: 'Beverages', popular: true },

  // Naturals Ice Cream (r10)
  { id: 'm46', restaurantId: 'r10', name: 'Tender Coconut Ice Cream', description: 'Signature ice cream with real tender coconut bits', price: 85, image: foodImages.icecream, category: 'Scoops', popular: true },
  { id: 'm47', restaurantId: 'r10', name: 'Mango Ice Cream', description: 'Made with fresh Alphonso mangoes', price: 85, image: foodImages.icecream, category: 'Scoops', popular: true },
  { id: 'm48', restaurantId: 'r10', name: 'Sitaphal Ice Cream', description: 'Creamy custard apple goodness', price: 85, image: foodImages.icecream, category: 'Scoops', popular: false },
  { id: 'm49', restaurantId: 'r10', name: 'Roasted Almond Ice Cream', description: 'Rich vanilla base packed with roasted almonds', price: 90, image: foodImages.icecream, category: 'Scoops', popular: true },
  { id: 'm50', restaurantId: 'r10', name: 'Choco Bite Ice Cream', description: 'Chocolate ice cream loaded with choco chips', price: 85, image: foodImages.icecream, category: 'Scoops', popular: false },
];

export const deliveryPartners = [
  { id: 'dp1', name: 'Ramesh Kumar', avatar: '🏍️', avatarBg: 'linear-gradient(135deg, #ff6b35, #ff8f65)', vehicle: 'Motorcycle', rating: 4.9, deliveries: 2834, price: 45, time: '15-20 min', timeMinutes: 17, available: true },
  { id: 'dp2', name: 'Suresh Patil', avatar: '🛵', avatarBg: 'linear-gradient(135deg, #00d97e, #34e89e)', vehicle: 'Scooter', rating: 4.7, deliveries: 1567, price: 35, time: '18-25 min', timeMinutes: 21, available: true },
  { id: 'dp3', name: 'Vikas Sharma', avatar: '🚴', avatarBg: 'linear-gradient(135deg, #3b82f6, #60a5fa)', vehicle: 'Bicycle', rating: 4.6, deliveries: 956, price: 20, time: '25-35 min', timeMinutes: 30, available: true },
  { id: 'dp4', name: 'Anjali Desai', avatar: '🛵', avatarBg: 'linear-gradient(135deg, #ec4899, #f472b6)', vehicle: 'Scooter', rating: 4.9, deliveries: 3102, price: 30, time: '14-22 min', timeMinutes: 18, available: true },
  { id: 'dp5', name: 'Prakash Rao', avatar: '🏍️', avatarBg: 'linear-gradient(135deg, #8b5cf6, #a78bfa)', vehicle: 'Motorcycle', rating: 4.8, deliveries: 4521, price: 40, time: '12-18 min', timeMinutes: 15, available: true },
  { id: 'dp6', name: 'Manoj Singh', avatar: '🚗', avatarBg: 'linear-gradient(135deg, #f59e0b, #fbbf24)', vehicle: 'Car', rating: 4.5, deliveries: 789, price: 60, time: '10-15 min', timeMinutes: 12, available: false },
];

export const users = [
  { id: 'u1', name: 'Aditya Mathur', email: 'aditya@example.com', role: 'admin', active: true, orders: 24, spent: 8450.80, joined: '2024-01-15' },
  { id: 'u2', name: 'Sneha Reddy', email: 'sneha@example.com', role: 'user', active: true, orders: 18, spent: 6312.50, joined: '2024-02-20' },
  { id: 'u3', name: 'Rohan Gupta', email: 'rohan@example.com', role: 'user', active: true, orders: 7, spent: 2189.99, joined: '2024-03-10' },
  { id: 'u4', name: 'Priya Verma', email: 'priya@example.com', role: 'user', active: false, orders: 32, spent: 10678.20, joined: '2024-01-05' },
  { id: 'u5', name: 'Amit Joshi', email: 'amit@example.com', role: 'user', active: true, orders: 12, spent: 4195.40, joined: '2024-04-01' },
];

export const coupons = [
  { code: 'WELCOME20', discount: 20, type: 'percent', minOrder: 300, description: '20% off your first order' },
  { code: 'SAVE50', discount: 50, type: 'flat', minOrder: 400, description: '₹50 off orders above ₹400' },
  { code: 'FREEDEL', discount: 100, type: 'delivery', minOrder: 200, description: 'Free delivery on orders above ₹200' },
];

export const offers = [
  { id: 'o1', discount: '30% OFF', title: 'Weekend Special', desc: 'On all orders above ₹300', code: 'WEEKEND30', color: 'orange' },
  { id: 'o2', discount: 'FREE DEL', title: 'Free Delivery', desc: 'On orders above ₹200', code: 'FREEDEL', color: 'purple' },
  { id: 'o3', discount: '₹50 OFF', title: 'Flat Discount', desc: 'Save big today', code: 'SAVE50', color: 'green' },
];

export const analyticsData = {
  weeklyOrders: [
    { day: 'Mon', orders: 45, revenue: 12400 },
    { day: 'Tue', orders: 52, revenue: 14500 },
    { day: 'Wed', orders: 38, revenue: 9800 },
    { day: 'Thu', orders: 65, revenue: 18200 },
    { day: 'Fri', orders: 78, revenue: 21000 },
    { day: 'Sat', orders: 92, revenue: 26800 },
    { day: 'Sun', orders: 87, revenue: 24500 },
  ],
  monthlyRevenue: [
    { month: 'Jan', revenue: 284000 },
    { month: 'Feb', revenue: 321000 },
    { month: 'Mar', revenue: 356000 },
    { month: 'Apr', revenue: 298000 },
    { month: 'May', revenue: 382000 },
    { month: 'Jun', revenue: 425000 },
  ],
  topCuisines: [
    { name: 'North Indian', value: 28 },
    { name: 'Biryani', value: 22 },
    { name: 'South Indian', value: 18 },
    { name: 'Street Food', value: 15 },
    { name: 'Chinese', value: 12 },
    { name: 'Others', value: 5 },
  ],
};
