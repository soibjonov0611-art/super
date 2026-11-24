/* =============================================
   FreshMart - Products JavaScript (products.js)
   Product data, filtering, search, rendering
   ============================================= */

'use strict';

// =============================================
// PRODUCTS DATA (25+ items)
// =============================================

const PRODUCTS = [
  {
    id: 1,
    name: 'Organic Baby Spinach (16oz)',
    category: 'Vegetables',
    price: 3.99,
    originalPrice: 4.99,
    rating: 4.8,
    ratingCount: 342,
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isNew: false,
    discountPercent: 20
  },
  {
    id: 2,
    name: 'Fresh Crisp Broccoli Crowns',
    category: 'Vegetables',
    price: 2.49,
    originalPrice: null,
    rating: 4.5,
    ratingCount: 219,
    image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isNew: false,
    discountPercent: 0
  },
  {
    id: 3,
    name: 'Sweet Bell Peppers Trio (3pk)',
    category: 'Vegetables',
    price: 4.79,
    originalPrice: 5.99,
    rating: 4.7,
    ratingCount: 388,
    image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isNew: true,
    discountPercent: 20
  },
  {
    id: 4,
    name: 'Fresh Garden Carrots Bunch',
    category: 'Vegetables',
    price: 2.99,
    originalPrice: null,
    rating: 4.6,
    ratingCount: 195,
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isNew: false,
    discountPercent: 0
  },
  {
    id: 5,
    name: 'Vine-Ripened Cherry Tomatoes',
    category: 'Vegetables',
    price: 3.49,
    originalPrice: 4.29,
    rating: 4.9,
    ratingCount: 450,
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isNew: false,
    discountPercent: 19
  },
  {
    id: 6,
    name: 'Premium Red Onions (3lb)',
    category: 'Vegetables',
    price: 2.29,
    originalPrice: null,
    rating: 4.3,
    ratingCount: 114,
    image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isNew: false,
    discountPercent: 0
  },
  {
    id: 7,
    name: 'Crisp Honeycrisp Apples (3lb)',
    category: 'Fruits',
    price: 5.99,
    originalPrice: 7.49,
    rating: 4.9,
    ratingCount: 520,
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isNew: false,
    discountPercent: 20
  },
  {
    id: 8,
    name: 'Organic Golden Bananas (Bunch)',
    category: 'Fruits',
    price: 1.69,
    originalPrice: null,
    rating: 4.7,
    ratingCount: 680,
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isNew: false,
    discountPercent: 0
  },
  {
    id: 9,
    name: 'Fresh Sweet Strawberries (1lb)',
    category: 'Fruits',
    price: 4.99,
    originalPrice: 6.49,
    rating: 4.9,
    ratingCount: 910,
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isNew: true,
    discountPercent: 23
  },
  {
    id: 10,
    name: 'Sweet Seedless Red Grapes (2lb)',
    category: 'Fruits',
    price: 6.49,
    originalPrice: 7.99,
    rating: 4.7,
    ratingCount: 290,
    image: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isNew: false,
    discountPercent: 19
  },
  {
    id: 11,
    name: 'Juicy Valencia Oranges (4lb bag)',
    category: 'Fruits',
    price: 5.49,
    originalPrice: null,
    rating: 4.6,
    ratingCount: 340,
    image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isNew: false,
    discountPercent: 0
  },
  {
    id: 12,
    name: 'Organic Whole Pasteurized Milk (1 Gal)',
    category: 'Dairy',
    price: 4.29,
    originalPrice: 4.99,
    rating: 4.8,
    ratingCount: 812,
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isNew: false,
    discountPercent: 14
  },
  {
    id: 13,
    name: 'Greek Yogurt Plain & Rich (32oz)',
    category: 'Dairy',
    price: 6.99,
    originalPrice: 8.49,
    rating: 4.8,
    ratingCount: 512,
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isNew: false,
    discountPercent: 18
  },
  {
    id: 14,
    name: 'Artisan Sharp Cheddar Cheese',
    category: 'Dairy',
    price: 4.49,
    originalPrice: null,
    rating: 4.7,
    ratingCount: 420,
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isNew: true,
    discountPercent: 0
  },
  {
    id: 15,
    name: 'Yangi Tovuq Tuxumi (12 dona)',
    category: 'Dairy',
    price: 3.79,
    originalPrice: 4.99,
    rating: 4.9,
    ratingCount: 950,
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=600&q=80&v=2',
    inStock: true,
    isNew: false,
    discountPercent: 24
  },
  {
    id: 16,
    name: 'Grass-Fed Creamery Butter (1lb)',
    category: 'Dairy',
    price: 5.29,
    originalPrice: null,
    rating: 4.6,
    ratingCount: 310,
    image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isNew: false,
    discountPercent: 0
  },
  {
    id: 17,
    name: 'Halal Yangi Tovuq Filesi (2kg)',
    category: 'Meat',
    price: 8.99,
    originalPrice: 11.99,
    rating: 4.8,
    ratingCount: 680,
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isNew: false,
    discountPercent: 25
  },
  {
    id: 18,
    name: 'Halal Yangi Mol Go\'shti Qiyma Angus (1kg)',
    category: 'Meat',
    price: 7.49,
    originalPrice: null,
    rating: 4.9,
    ratingCount: 520,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isNew: false,
    discountPercent: 0
  },
  {
    id: 181,
    name: 'Halal Yangi Qo\'zi Go\'shti Qovurg\'asi (Tender Lamb)',
    category: 'Meat',
    price: 11.99,
    originalPrice: 14.50,
    rating: 4.9,
    ratingCount: 390,
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isNew: true,
    discountPercent: 17
  },
  {
    id: 19,
    name: 'Wild Atlantic Salmon Fillet',
    category: 'Seafood',
    price: 12.99,
    originalPrice: 15.99,
    rating: 4.9,
    ratingCount: 560,
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isNew: true,
    discountPercent: 19
  },
  {
    id: 20,
    name: 'Wild Caught Jumbo Shrimp (1lb)',
    category: 'Seafood',
    price: 10.99,
    originalPrice: 13.99,
    rating: 4.7,
    ratingCount: 310,
    image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isNew: false,
    discountPercent: 21
  },
  {
    id: 21,
    name: 'Rustic Artisan Sourdough Bread',
    category: 'Bakery',
    price: 4.99,
    originalPrice: null,
    rating: 4.9,
    ratingCount: 820,
    image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isNew: false,
    discountPercent: 0
  },
  {
    id: 22,
    name: 'Fresh Baked Blueberry Muffins (6pk)',
    category: 'Bakery',
    price: 5.49,
    originalPrice: 6.99,
    rating: 4.8,
    ratingCount: 390,
    image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isNew: true,
    discountPercent: 21
  },
  {
    id: 23,
    name: 'Sparkling Lime Mineral Water (12pk)',
    category: 'Beverages',
    price: 7.99,
    originalPrice: 9.99,
    rating: 4.6,
    ratingCount: 620,
    image: 'https://images.unsplash.com/photo-1559839914-ba2ae1043f77?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isNew: false,
    discountPercent: 20
  },
  {
    id: 24,
    name: 'Freshly Squeezed Orange Juice (52oz)',
    category: 'Beverages',
    price: 5.99,
    originalPrice: null,
    rating: 4.8,
    ratingCount: 510,
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isNew: false,
    discountPercent: 0
  },
  {
    id: 25,
    name: 'Deluxe Roasted Mixed Nuts (10oz)',
    category: 'Snacks',
    price: 8.49,
    originalPrice: 10.49,
    rating: 4.7,
    ratingCount: 350,
    image: 'https://images.unsplash.com/photo-1536591375315-1b83886562ea?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isNew: false,
    discountPercent: 19
  },
  {
    id: 26,
    name: 'Sea Salt Crunchy Potato Chips',
    category: 'Snacks',
    price: 3.99,
    originalPrice: 4.99,
    rating: 4.5,
    ratingCount: 480,
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isNew: false,
    discountPercent: 20
  },
  {
    id: 27,
    name: 'Stone-Baked Margherita Pizza (2pk)',
    category: 'Frozen',
    price: 11.99,
    originalPrice: 14.99,
    rating: 4.7,
    ratingCount: 710,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isNew: false,
    discountPercent: 20
  },
  {
    id: 28,
    name: 'Creamy Madagascan Vanilla Ice Cream',
    category: 'Frozen',
    price: 7.49,
    originalPrice: 8.99,
    rating: 4.9,
    ratingCount: 920,
    image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isNew: false,
    discountPercent: 17
  },
  {
    id: 29,
    name: 'Eco-Friendly Plant Dish Soap (25oz)',
    category: 'Household',
    price: 3.49,
    originalPrice: null,
    rating: 4.6,
    ratingCount: 290,
    image: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isNew: false,
    discountPercent: 0
  },
  {
    id: 30,
    name: 'Ultra Absorbent Paper Towels (6 Rolls)',
    category: 'Household',
    price: 9.99,
    originalPrice: 12.99,
    rating: 4.7,
    ratingCount: 590,
    image: 'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isNew: true,
    discountPercent: 23
  },
  {
    id: 31,
    name: 'Yangi Qarsildoq Bodring (1kg)',
    category: 'Vegetables',
    price: 2.19,
    originalPrice: 2.89,
    rating: 4.7,
    ratingCount: 260,
    image: 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isNew: false,
    discountPercent: 24
  },
  {
    id: 32,
    name: 'Yumshoq Hass Avokado (3 dona)',
    category: 'Vegetables',
    price: 4.99,
    originalPrice: null,
    rating: 4.8,
    ratingCount: 410,
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isNew: true,
    discountPercent: 0
  },
  {
    id: 33,
    name: 'Oltin Kartoshka Tozalangan (5kg)',
    category: 'Vegetables',
    price: 3.49,
    originalPrice: 4.20,
    rating: 4.6,
    ratingCount: 540,
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isNew: false,
    discountPercent: 17
  },
  {
    id: 34,
    name: 'Yangi Oq Shampinyon Qo\'ziqorini (500g)',
    category: 'Vegetables',
    price: 3.89,
    originalPrice: null,
    rating: 4.7,
    ratingCount: 180,
    image: 'https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isNew: false,
    discountPercent: 0
  },
  {
    id: 35,
    name: 'Muzdek Aysberg Salati (1 dona)',
    category: 'Vegetables',
    price: 1.89,
    originalPrice: 2.49,
    rating: 4.5,
    ratingCount: 165,
    image: 'https://images.unsplash.com/photo-1556801712-76c8eb07bbc9?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isNew: false,
    discountPercent: 24
  },
  {
    id: 36,
    name: 'Yangi Shirin Qorag\'at (Blueberries 300g)',
    category: 'Fruits',
    price: 5.99,
    originalPrice: 7.99,
    rating: 4.9,
    ratingCount: 480,
    image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isNew: true,
    discountPercent: 25
  },
  {
    id: 37,
    name: 'Tropik Shirin Mango (2 dona)',
    category: 'Fruits',
    price: 4.29,
    originalPrice: null,
    rating: 4.8,
    ratingCount: 310,
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isNew: false,
    discountPercent: 0
  },
  {
    id: 38,
    name: 'Qizil Shirin Tarvuz Tilimlari (1.5kg)',
    category: 'Fruits',
    price: 3.99,
    originalPrice: 4.99,
    rating: 4.7,
    ratingCount: 620,
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isNew: false,
    discountPercent: 20
  },
  {
    id: 39,
    name: 'Sersuv Shirin Shaftoli (1kg)',
    category: 'Fruits',
    price: 4.49,
    originalPrice: null,
    rating: 4.6,
    ratingCount: 220,
    image: 'https://images.unsplash.com/photo-1595126731133-c6ec43896dfa?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isNew: false,
    discountPercent: 0
  },
  {
    id: 40,
    name: 'Yangi Yetilgan Ananas (1 dona)',
    category: 'Fruits',
    price: 4.89,
    originalPrice: 5.99,
    rating: 4.7,
    ratingCount: 340,
    image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isNew: false,
    discountPercent: 18
  },
  {
    id: 41,
    name: 'Yumshoq Mozzarella Pishlog\'i (250g)',
    category: 'Dairy',
    price: 4.89,
    originalPrice: 5.99,
    rating: 4.8,
    ratingCount: 290,
    image: 'https://images.unsplash.com/photo-1589881133595-a3c085cb731d?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isNew: false,
    discountPercent: 18
  },
  {
    id: 42,
    name: 'Bodom Suti Shakar Qo\'shilmagan (1L)',
    category: 'Dairy',
    price: 3.99,
    originalPrice: null,
    rating: 4.6,
    ratingCount: 320,
    image: 'https://images.unsplash.com/photo-1568651316654-e91b6e4e0847?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isNew: false,
    discountPercent: 0
  },
  {
    id: 43,
    name: 'Halal Angus Mol Go\'shti Ribeye Steyk (500g)',
    category: 'Meat',
    price: 13.99,
    originalPrice: 16.99,
    rating: 4.9,
    ratingCount: 440,
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isNew: false,
    discountPercent: 18
  },
  {
    id: 44,
    name: 'Halal Tovuq Qanotchalari Fresh Wings (1.5kg)',
    category: 'Meat',
    price: 6.99,
    originalPrice: 8.49,
    rating: 4.7,
    ratingCount: 510,
    image: 'https://images.unsplash.com/photo-1527477245837-77eb618fa9c9?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isNew: false,
    discountPercent: 18
  },
  {
    id: 45,
    name: 'Yangi Dengiz Lavrak Filesi (Seabass 1kg)',
    category: 'Seafood',
    price: 11.49,
    originalPrice: null,
    rating: 4.8,
    ratingCount: 230,
    image: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isNew: false,
    discountPercent: 0
  },
  {
    id: 46,
    name: 'Fransuzcha Sariyoqli Kruassan (4 dona)',
    category: 'Bakery',
    price: 4.79,
    originalPrice: 5.99,
    rating: 4.9,
    ratingCount: 560,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isNew: false,
    discountPercent: 20
  },
  {
    id: 47,
    name: 'Shokoladli Yumshoq Cookie Pechenyelar (8 dona)',
    category: 'Bakery',
    price: 3.99,
    originalPrice: null,
    rating: 4.8,
    ratingCount: 420,
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isNew: false,
    discountPercent: 0
  },
  {
    id: 48,
    name: 'Fransuz Baget Non (2 dona)',
    category: 'Bakery',
    price: 2.89,
    originalPrice: 3.49,
    rating: 4.7,
    ratingCount: 310,
    image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isNew: false,
    discountPercent: 17
  },
  {
    id: 49,
    name: 'Premium Cold Brew Muzdek Qahva (1L)',
    category: 'Beverages',
    price: 6.49,
    originalPrice: 7.99,
    rating: 4.9,
    ratingCount: 380,
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isNew: true,
    discountPercent: 19
  },
  {
    id: 50,
    name: 'Tabiiy Anor Sharbat 100% Sof (1L)',
    category: 'Beverages',
    price: 4.99,
    originalPrice: null,
    rating: 4.7,
    ratingCount: 290,
    image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isNew: false,
    discountPercent: 0
  },
  {
    id: 51,
    name: 'Organik Yashil Choy Premium (50 paketchasi)',
    category: 'Beverages',
    price: 4.29,
    originalPrice: 5.29,
    rating: 4.8,
    ratingCount: 460,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isNew: false,
    discountPercent: 19
  },
  {
    id: 52,
    name: 'Qora Belgiya Shokoladi 75% (100g)',
    category: 'Snacks',
    price: 3.49,
    originalPrice: null,
    rating: 4.9,
    ratingCount: 610,
    image: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isNew: false,
    discountPercent: 0
  },
  {
    id: 53,
    name: 'Asalli Granola va Yong\'oqlar (500g)',
    category: 'Snacks',
    price: 5.79,
    originalPrice: 6.99,
    rating: 4.8,
    ratingCount: 320,
    image: 'https://images.unsplash.com/photo-1517093157656-b9ec81c9a6cc?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isNew: true,
    discountPercent: 17
  },
  {
    id: 54,
    name: 'Shirin Mayiz va Qora O\'rik Qo\'rg\'oni (500g)',
    category: 'Snacks',
    price: 6.29,
    originalPrice: 7.50,
    rating: 4.7,
    ratingCount: 280,
    image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isNew: false,
    discountPercent: 16
  },
  {
    id: 55,
    name: 'Muzlatilgan Mevalar Miksi (Qulupnay, Moruq 1kg)',
    category: 'Frozen',
    price: 8.99,
    originalPrice: 10.99,
    rating: 4.8,
    ratingCount: 440,
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isNew: false,
    discountPercent: 18
  },
  {
    id: 56,
    name: 'Qarsildoq Kartoshka Fri Qovurishga Tayyor (1.5kg)',
    category: 'Frozen',
    price: 4.99,
    originalPrice: null,
    rating: 4.6,
    ratingCount: 520,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isNew: false,
    discountPercent: 0
  },
  {
    id: 57,
    name: 'Organik Lavandali Kir Yuvish Geli (2L)',
    category: 'Household',
    price: 11.49,
    originalPrice: 13.99,
    rating: 4.8,
    ratingCount: 370,
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isNew: false,
    discountPercent: 18
  },
  {
    id: 58,
    name: 'Universal Oshxona Tozalash Spreyi (750ml)',
    category: 'Household',
    price: 3.99,
    originalPrice: null,
    rating: 4.6,
    ratingCount: 210,
    image: 'https://images.unsplash.com/photo-1585421514753-2614a82619d8?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    isNew: false,
    discountPercent: 0
  }
];

// Make globally accessible
window.PRODUCTS_DATA = PRODUCTS;

// =============================================
// STATE
// =============================================

let state = {
  products: [...PRODUCTS],
  filtered: [...PRODUCTS],
  view: 'grid',         // 'grid' | 'list'
  sort: 'default',
  search: '',
  categories: [],
  priceMin: 0,
  priceMax: 30,
  rating: 0,
  page: 1,
  perPage: 12
};

// =============================================
// INIT
// =============================================

document.addEventListener('DOMContentLoaded', () => {
  parseUrlParams();
  initFilters();
  initToolbar();
  applyFilters();
  initMobileFilterToggle();
});

function parseUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const search = params.get('search');
  const cat = params.get('cat');

  if (search) {
    state.search = search;
    const searchInput = document.querySelector('.search-input');
    if (searchInput) searchInput.value = search;
    const productsSearch = document.getElementById('productsSearchInput');
    if (productsSearch) productsSearch.value = search;
  }

  if (cat) {
    state.categories = [cat];
    const catSelects = document.querySelectorAll('.search-category');
    catSelects.forEach(s => { s.value = cat; });
  }
}

// =============================================
// FILTER INITIALIZATION
// =============================================

function initFilters() {
  // Category Icons Map
  const catIcons = {
    'Vegetables': '🥦',
    'Fruits': '🍎',
    'Dairy': '🥛',
    'Meat': '🥩',
    'Seafood': '🐟',
    'Bakery': '🥖',
    'Beverages': '🥤',
    'Snacks': '🍪',
    'Frozen': '❄️',
    'Household': '🧼'
  };

  const categories = [...new Set(PRODUCTS.map(p => p.category))].sort();

  // 1. Horizontal Category Pills Bar
  const pillsContainer = document.getElementById('productsCategoryPills');
  if (pillsContainer) {
    const isAllActive = state.categories.length === 0;
    let pillsHTML = `
      <button class="cat-pill-btn ${isAllActive ? 'active' : ''}" onclick="selectCategoryPill('all')">
        <span>✨ Barchasi</span>
        <span class="cat-pill-badge">${PRODUCTS.length}</span>
      </button>
    `;

    categories.forEach(cat => {
      const count = PRODUCTS.filter(p => p.category === cat).length;
      const isActive = state.categories.includes(cat);
      const icon = catIcons[cat] || '🏷️';
      pillsHTML += `
        <button class="cat-pill-btn ${isActive ? 'active' : ''}" data-cat="${cat}" onclick="selectCategoryPill('${cat}')">
          <span>${icon} ${cat}</span>
          <span class="cat-pill-badge">${count}</span>
        </button>
      `;
    });

    pillsContainer.innerHTML = pillsHTML;
  }

  // 2. Category Checkboxes in Sidebar
  const catContainer = document.getElementById('categoryFilters');
  if (catContainer) {
    catContainer.innerHTML = categories.map(cat => {
      const count = PRODUCTS.filter(p => p.category === cat).length;
      const checked = state.categories.includes(cat) ? 'checked' : '';
      return `
        <label class="filter-checkbox">
          <input type="checkbox" value="${cat}" ${checked} onchange="onCategoryChange(this)">
          <span class="checkmark"><i class="fa-solid fa-check"></i></span>
          ${cat}
          <span class="filter-count">${count}</span>
        </label>
      `;
    }).join('');
  }

  // Price range
  const priceMin = document.getElementById('priceMin');
  const priceMax = document.getElementById('priceMax');
  if (priceMin && priceMax) {
    priceMin.addEventListener('input', onPriceChange);
    priceMax.addEventListener('input', onPriceChange);
    onPriceChange();
  }

  // Rating filter
  document.querySelectorAll('.star-filter-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.star-filter-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      state.rating = parseInt(item.dataset.rating || '0');
      state.page = 1;
      applyFilters();
    });
  });

  // Clear filters
  const clearBtn = document.getElementById('clearFiltersBtn');
  if (clearBtn) {
    clearBtn.addEventListener('click', clearAllFilters);
  }

  // Filter group toggles
  document.querySelectorAll('.filter-group-title').forEach(title => {
    title.addEventListener('click', () => {
      const items = title.nextElementSibling;
      title.classList.toggle('collapsed');
      if (items) items.classList.toggle('hidden');
    });
  });
}

window.selectCategoryPill = function(cat) {
  if (cat === 'all') {
    state.categories = [];
  } else {
    state.categories = [cat];
  }

  // Sync pills UI
  document.querySelectorAll('.cat-pill-btn').forEach(btn => {
    if (cat === 'all') {
      btn.classList.toggle('active', !btn.dataset.cat);
    } else {
      btn.classList.toggle('active', btn.dataset.cat === cat);
    }
  });

  // Sync sidebar checkboxes
  document.querySelectorAll('#categoryFilters input[type="checkbox"]').forEach(cb => {
    cb.checked = state.categories.includes(cb.value);
  });

  // Update URL without reload
  const url = new URL(window.location);
  if (cat === 'all') {
    url.searchParams.delete('cat');
  } else {
    url.searchParams.set('cat', cat);
  }
  window.history.replaceState({}, '', url);

  state.page = 1;
  applyFilters();
};

function onCategoryChange(checkbox) {
  if (checkbox.checked) {
    if (!state.categories.includes(checkbox.value)) {
      state.categories.push(checkbox.value);
    }
  } else {
    state.categories = state.categories.filter(c => c !== checkbox.value);
  }

  // Sync pills UI
  document.querySelectorAll('.cat-pill-btn').forEach(btn => {
    if (state.categories.length === 0) {
      btn.classList.toggle('active', !btn.dataset.cat);
    } else if (state.categories.length === 1) {
      btn.classList.toggle('active', btn.dataset.cat === state.categories[0]);
    } else {
      btn.classList.remove('active');
    }
  });

  state.page = 1;
  applyFilters();
}

function onPriceChange() {
  const priceMin = document.getElementById('priceMin');
  const priceMax = document.getElementById('priceMax');
  if (!priceMin || !priceMax) return;

  let min = parseFloat(priceMin.value);
  let max = parseFloat(priceMax.value);

  if (min > max) {
    [min, max] = [max, min];
  }

  state.priceMin = min;
  state.priceMax = max;

  const minLabel = document.getElementById('priceMinLabel');
  const maxLabel = document.getElementById('priceMaxLabel');
  if (minLabel) minLabel.textContent = `$${min.toFixed(0)}`;
  if (maxLabel) maxLabel.textContent = `$${max.toFixed(0)}`;

  // Update visual track
  const track = document.querySelector('.range-track');
  if (track) {
    const totalRange = 30;
    track.style.left = `${(min / totalRange) * 100}%`;
    track.style.right = `${100 - (max / totalRange) * 100}%`;
  }

  state.page = 1;
  applyFilters();
}

function clearAllFilters() {
  state.categories = [];
  state.priceMin = 0;
  state.priceMax = 30;
  state.rating = 0;
  state.search = '';
  state.sort = 'default';
  state.page = 1;

  // Reset UI
  document.querySelectorAll('#categoryFilters input[type="checkbox"]').forEach(cb => cb.checked = false);
  document.querySelectorAll('.cat-pill-btn').forEach(btn => {
    btn.classList.toggle('active', !btn.dataset.cat);
  });

  const priceMin = document.getElementById('priceMin');
  const priceMax = document.getElementById('priceMax');
  if (priceMin) priceMin.value = 0;
  if (priceMax) priceMax.value = 30;

  const url = new URL(window.location);
  url.searchParams.delete('cat');
  url.searchParams.delete('search');
  window.history.replaceState({}, '', url);
  if (priceMax) priceMax.value = 20;

  const sortSel = document.getElementById('sortSelect');
  if (sortSel) sortSel.value = 'default';

  document.querySelectorAll('.star-filter-item').forEach(i => i.classList.remove('active'));

  const searchInput = document.getElementById('productsSearchInput');
  if (searchInput) searchInput.value = '';

  onPriceChange();
  applyFilters();
}

// =============================================
// TOOLBAR INITIALIZATION
// =============================================

function initToolbar() {
  // Sort
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      state.sort = sortSelect.value;
      state.page = 1;
      applyFilters();
    });
  }

  // View toggle
  const gridBtn = document.getElementById('viewGrid');
  const listBtn = document.getElementById('viewList');

  if (gridBtn) {
    gridBtn.addEventListener('click', () => {
      state.view = 'grid';
      gridBtn.classList.add('active');
      if (listBtn) listBtn.classList.remove('active');
      renderProducts();
    });
  }

  if (listBtn) {
    listBtn.addEventListener('click', () => {
      state.view = 'list';
      listBtn.classList.add('active');
      if (gridBtn) gridBtn.classList.remove('active');
      renderProducts();
    });
  }

  // Search input
  const searchInput = document.getElementById('productsSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      state.search = searchInput.value;
      state.page = 1;
      applyFilters();
    });
  }
}

// =============================================
// FILTER & SORT LOGIC
// =============================================

function applyFilters() {
  let results = [...PRODUCTS];

  // Search
  if (state.search) {
    const q = state.search.toLowerCase();
    results = results.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }

  // Category filter
  if (state.categories.length > 0) {
    results = results.filter(p => state.categories.includes(p.category));
  }

  // Price filter
  results = results.filter(p => p.price >= state.priceMin && p.price <= state.priceMax);

  // Rating filter
  if (state.rating > 0) {
    results = results.filter(p => p.rating >= state.rating);
  }

  // Availability filters
  const inStockEl = document.getElementById('filterInStock');
  if (inStockEl && inStockEl.checked) {
    results = results.filter(p => p.inStock);
  }

  const onSaleEl = document.getElementById('filterOnSale');
  if (onSaleEl && onSaleEl.checked) {
    results = results.filter(p => (p.discountPercent || 0) > 0 || (p.originalPrice && p.originalPrice > p.price));
  }

  const newEl = document.getElementById('filterNew');
  if (newEl && newEl.checked) {
    results = results.filter(p => p.isNew);
  }

  // Sort
  switch (state.sort) {
    case 'price-asc':
      results.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      results.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      results.sort((a, b) => b.rating - a.rating);
      break;
    case 'newest':
      results.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      break;
    case 'discount':
      results.sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0));
      break;
    default:
      break;
  }

  state.filtered = results;
  renderProducts();
  renderPagination();
  updateResultsInfo();
  renderActiveFilterTags();
}

function renderActiveFilterTags() {
  const container = document.getElementById('activeFilters');
  if (!container) return;

  const tags = [];

  state.categories.forEach(cat => {
    tags.push(`
      <span class="active-tag" onclick="selectCategoryPill('all')">
        Toifa: <strong>${cat}</strong> <i class="fa-solid fa-xmark"></i>
      </span>
    `);
  });

  if (state.search) {
    tags.push(`
      <span class="active-tag" onclick="clearSearchFilter()">
        Qidiruv: <strong>"${escapeHtml(state.search)}"</strong> <i class="fa-solid fa-xmark"></i>
      </span>
    `);
  }

  if (state.rating > 0) {
    tags.push(`
      <span class="active-tag" onclick="clearRatingFilter()">
        Reyting: <strong>${state.rating}★ & yuqori</strong> <i class="fa-solid fa-xmark"></i>
      </span>
    `);
  }

  if (tags.length > 0) {
    tags.push(`
      <button class="clear-all-tags-btn" onclick="clearAllFilters()">
        Filtrlarni tozalash
      </button>
    `);
    container.style.display = 'flex';
    container.style.marginBottom = '18px';
    container.innerHTML = tags.join('');
  } else {
    container.style.display = 'none';
    container.innerHTML = '';
  }
}

window.clearSearchFilter = function() {
  state.search = '';
  const searchInput = document.getElementById('productsSearchInput');
  if (searchInput) searchInput.value = '';
  applyFilters();
};

window.clearRatingFilter = function() {
  state.rating = 0;
  document.querySelectorAll('.star-filter-item').forEach(i => i.classList.remove('active'));
  applyFilters();
};

// =============================================
// RENDER PRODUCTS
// =============================================

function renderProducts() {
  const container = document.getElementById('productsGrid');
  if (!container) return;

  // Show skeletons briefly
  renderSkeletonCards(state.perPage, container);

  setTimeout(() => {
    const start = (state.page - 1) * state.perPage;
    const paginated = state.filtered.slice(start, start + state.perPage);

    container.classList.toggle('list-view', state.view === 'list');

    if (paginated.length === 0) {
      container.innerHTML = `
        <div style="grid-column:1/-1; text-align:center; padding:60px 20px;">
          <i class="fa-solid fa-magnifying-glass" style="font-size:3.5rem;color:var(--text-light);margin-bottom:16px;display:inline-block;"></i>
          <h3 style="font-size:1.3rem;font-weight:700;color:var(--text-dark);margin-bottom:8px;">No products found</h3>
          <p style="color:var(--text-medium);margin-bottom:20px;">Try adjusting your filters or search term.</p>
          <button class="btn btn-primary btn-sm" onclick="clearAllFilters()">Clear Filters</button>
        </div>
      `;
      return;
    }

    container.innerHTML = paginated.map(p => buildProductCard(p)).join('');
  }, 300);
}

// =============================================
// PAGINATION
// =============================================

function renderPagination() {
  const container = document.getElementById('pagination');
  if (!container) return;

  const totalPages = Math.ceil(state.filtered.length / state.perPage);
  if (totalPages <= 1) {
    container.innerHTML = '';
    return;
  }

  let html = `
    <button class="page-btn" onclick="changePage(${state.page - 1})" ${state.page === 1 ? 'disabled' : ''}>
      <i class="fa-solid fa-chevron-left"></i>
    </button>
  `;

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || Math.abs(i - state.page) <= 1) {
      html += `<button class="page-btn ${i === state.page ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
    } else if (Math.abs(i - state.page) === 2) {
      html += `<button class="page-btn" disabled>…</button>`;
    }
  }

  html += `
    <button class="page-btn" onclick="changePage(${state.page + 1})" ${state.page === totalPages ? 'disabled' : ''}>
      <i class="fa-solid fa-chevron-right"></i>
    </button>
  `;

  container.innerHTML = html;
}

window.changePage = function(page) {
  const totalPages = Math.ceil(state.filtered.length / state.perPage);
  if (page < 1 || page > totalPages) return;
  state.page = page;
  renderProducts();
  renderPagination();
  updateResultsInfo();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// =============================================
// RESULTS INFO
// =============================================

function updateResultsInfo() {
  const el = document.getElementById('resultsInfo');
  if (!el) return;

  const start = (state.page - 1) * state.perPage + 1;
  const end = Math.min(state.page * state.perPage, state.filtered.length);
  const total = state.filtered.length;

  if (total === 0) {
    el.innerHTML = `<strong>0 results</strong> found`;
    return;
  }

  let searchPart = state.search ? ` for "<em>${escapeHtml(state.search)}</em>"` : '';
  el.innerHTML = `Showing <strong>${start}–${end}</strong> of <strong>${total}</strong> results${searchPart}`;
}

// =============================================
// MOBILE FILTER TOGGLE
// =============================================

function initMobileFilterToggle() {
  const toggle = document.querySelector('.mobile-filter-toggle');
  const sidebar = document.querySelector('.filters-sidebar');

  if (toggle && sidebar) {
    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('mobile-open');
      const icon = toggle.querySelector('i');
      if (sidebar.classList.contains('mobile-open')) {
        toggle.innerHTML = '<i class="fa-solid fa-xmark"></i> Close Filters';
      } else {
        toggle.innerHTML = '<i class="fa-solid fa-sliders"></i> Filters';
      }
    });
  }
}

// Global Export
window.PRODUCTS = PRODUCTS;
window.PRODUCTS_DATA = PRODUCTS;
