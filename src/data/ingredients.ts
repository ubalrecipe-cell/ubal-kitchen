import { MasterIngredient } from '../types/recipe';

export const MASTER_INGREDIENTS: MasterIngredient[] = [
  // Vegetables
  { id: 'potato', nameEn: 'Potato (Aloo)', nameHi: 'आलू', category: 'Vegetables' },
  { id: 'onion', nameEn: 'Onion (Pyaz)', nameHi: 'प्याज़', category: 'Vegetables' },
  { id: 'tomato', nameEn: 'Tomato (Tamatar)', nameHi: 'टमाटर', category: 'Vegetables' },
  { id: 'green_peas', nameEn: 'Green Peas (Matar)', nameHi: 'मटर', category: 'Vegetables' },
  { id: 'cauliflower', nameEn: 'Cauliflower (Gobi)', nameHi: 'फूलगोभी', category: 'Vegetables' },
  { id: 'cabbage', nameEn: 'Cabbage (Patta Gobi)', nameHi: 'पत्तागोभी', category: 'Vegetables' },
  { id: 'capsicum', nameEn: 'Capsicum (Shimla Mirch)', nameHi: 'शिमला मिर्च', category: 'Vegetables' },
  { id: 'spinach', nameEn: 'Spinach (Palak)', nameHi: 'पालक', category: 'Vegetables' },
  { id: 'carrot', nameEn: 'Carrot (Gajar)', nameHi: 'गाजर', category: 'Vegetables' },
  { id: 'bhindi', nameEn: 'Okra (Bhindi)', nameHi: 'भिंडी', category: 'Vegetables' },
  { id: 'brinjal', nameEn: 'Eggplant (Baingan)', nameHi: 'बैंगन', category: 'Vegetables' },
  { id: 'sweet_corn', nameEn: 'Sweet Corn (Makka)', nameHi: 'मक्का / कॉर्न', category: 'Vegetables' },
  { id: 'cucumber', nameEn: 'Cucumber (Kheera)', nameHi: 'खीरा', category: 'Vegetables' },
  { id: 'fenugreek_leaves', nameEn: 'Fenugreek Leaves (Methi)', nameHi: 'हरी मेथी', category: 'Vegetables' },

  // Aromatics & Herbs
  { id: 'green_chilli', nameEn: 'Green Chilli (Hari Mirch)', nameHi: 'हरी मिर्च', category: 'Aromatics & Herbs' },
  { id: 'ginger', nameEn: 'Ginger (Adrak)', nameHi: 'अदरक', category: 'Aromatics & Herbs' },
  { id: 'garlic', nameEn: 'Garlic (Lehsun)', nameHi: 'लहसुन', category: 'Aromatics & Herbs' },
  { id: 'coriander_leaves', nameEn: 'Fresh Coriander (Hara Dhaniya)', nameHi: 'हरा धनिया', category: 'Aromatics & Herbs' },
  { id: 'curry_leaves', nameEn: 'Curry Leaves (Kadi Patta)', nameHi: 'कढ़ी पत्ता', category: 'Aromatics & Herbs' },
  { id: 'lemon', nameEn: 'Lemon (Nimbu)', nameHi: 'नींबू', category: 'Aromatics & Herbs' },
  { id: 'mint', nameEn: 'Mint Leaves (Pudina)', nameHi: 'पुदीना', category: 'Aromatics & Herbs' },

  // Grains & Flours
  { id: 'wheat_flour', nameEn: 'Wheat Flour (Atta)', nameHi: 'गेहूं का आटा', category: 'Grains & Flours' },
  { id: 'rice', nameEn: 'Rice (Chawal)', nameHi: 'चावल', category: 'Grains & Flours' },
  { id: 'besan', nameEn: 'Gram Flour (Besan)', nameHi: 'बेसन', category: 'Grains & Flours' },
  { id: 'semolina', nameEn: 'Semolina (Suji / Rava)', nameHi: 'सूजी / रवा', category: 'Grains & Flours' },
  { id: 'poha', nameEn: 'Flattened Rice (Poha)', nameHi: 'पोहा', category: 'Grains & Flours' },
  { id: 'bread', nameEn: 'Bread Slices', nameHi: 'ब्रेड', category: 'Grains & Flours' },
  { id: 'oats', nameEn: 'Oats', nameHi: 'ओट्स', category: 'Grains & Flours' },
  { id: 'noodles', nameEn: 'Noodles / Sevian', nameHi: 'नूडल्स / सेवइयां', category: 'Grains & Flours' },
  { id: 'sabudana', nameEn: 'Tapioca Pearls (Sabudana)', nameHi: 'साबूदाना', category: 'Grains & Flours' },
  { id: 'all_purpose_flour', nameEn: 'All Purpose Flour (Maida)', nameHi: 'मैदा', category: 'Grains & Flours' },
  { id: 'pav', nameEn: 'Pav / Buns', nameHi: 'पाव / बन', category: 'Grains & Flours' },

  // Dairy & Eggs
  { id: 'milk', nameEn: 'Milk (Doodh)', nameHi: 'दूध', category: 'Dairy & Eggs' },
  { id: 'curd', nameEn: 'Curd / Yogurt (Dahi)', nameHi: 'दही', category: 'Dairy & Eggs' },
  { id: 'paneer', nameEn: 'Cottage Cheese (Paneer)', nameHi: 'पनीर', category: 'Dairy & Eggs' },
  { id: 'butter', nameEn: 'Butter (Makhan)', nameHi: 'मक्खन', category: 'Dairy & Eggs' },
  { id: 'ghee', nameEn: 'Desi Ghee', nameHi: 'देसी घी', category: 'Dairy & Eggs' },
  { id: 'egg', nameEn: 'Eggs (Ande)', nameHi: 'अंडे', category: 'Dairy & Eggs' },
  { id: 'fresh_cream', nameEn: 'Fresh Cream (Malai)', nameHi: 'मलाई / क्रीम', category: 'Dairy & Eggs' },

  // Lentils & Pulses
  { id: 'toor_dal', nameEn: 'Pigeon Pea (Toor / Arhar Dal)', nameHi: 'अरहर / तूर दाल', category: 'Lentils & Pulses' },
  { id: 'moong_dal', nameEn: 'Yellow Moong Dal', nameHi: 'मूंग दाल', category: 'Lentils & Pulses' },
  { id: 'chana_dal', nameEn: 'Bengal Gram (Chana Dal)', nameHi: 'चना दाल', category: 'Lentils & Pulses' },
  { id: 'masoor_dal', nameEn: 'Red Lentils (Masoor Dal)', nameHi: 'मसूर दाल', category: 'Lentils & Pulses' },
  { id: 'urad_dal', nameEn: 'Split Black Gram (Urad Dal)', nameHi: 'उड़द दाल', category: 'Lentils & Pulses' },
  { id: 'chickpeas', nameEn: 'Chickpeas (Kabuli Chana)', nameHi: 'काबुली चना / छोले', category: 'Lentils & Pulses' },
  { id: 'rajma', nameEn: 'Kidney Beans (Rajma)', nameHi: 'राजमा', category: 'Lentils & Pulses' },
  { id: 'kala_chana', nameEn: 'Black Chickpeas (Kala Chana)', nameHi: 'काला चना', category: 'Lentils & Pulses' },

  // Pantry & Spices
  { id: 'salt', nameEn: 'Salt (Namak)', nameHi: 'नमक', category: 'Pantry & Spices', isStaple: true },
  { id: 'cooking_oil', nameEn: 'Cooking Oil (Tel)', nameHi: 'तेल', category: 'Pantry & Spices', isStaple: true },
  { id: 'turmeric_powder', nameEn: 'Turmeric Powder (Haldi)', nameHi: 'हल्दी पाउडर', category: 'Pantry & Spices', isStaple: true },
  { id: 'red_chilli_powder', nameEn: 'Red Chilli Powder (Lal Mirch)', nameHi: 'लाल मिर्च पाउडर', category: 'Pantry & Spices', isStaple: true },
  { id: 'cumin_seeds', nameEn: 'Cumin Seeds (Jeera)', nameHi: 'ज़ीरा', category: 'Pantry & Spices', isStaple: true },
  { id: 'mustard_seeds', nameEn: 'Mustard Seeds (Rai / Sarson)', nameHi: 'राई / सरसों', category: 'Pantry & Spices', isStaple: true },
  { id: 'coriander_powder', nameEn: 'Coriander Powder (Dhaniya Powder)', nameHi: 'धनिया पाउडर', category: 'Pantry & Spices', isStaple: true },
  { id: 'garam_masala', nameEn: 'Garam Masala', nameHi: 'गरम मसाला', category: 'Pantry & Spices', isStaple: true },
  { id: 'sugar', nameEn: 'Sugar (Cheeni)', nameHi: 'चीनी', category: 'Pantry & Spices', isStaple: true },
  { id: 'kasuri_methi', nameEn: 'Dry Fenugreek (Kasuri Methi)', nameHi: 'कसूरी मेथी', category: 'Pantry & Spices' },
  { id: 'hing', nameEn: 'Asafoetida (Hing)', nameHi: 'हींग', category: 'Pantry & Spices', isStaple: true },
  { id: 'chaat_masala', nameEn: 'Chaat Masala', nameHi: 'चाट मसाला', category: 'Pantry & Spices' },
  { id: 'peanuts', nameEn: 'Peanuts (Mungfali)', nameHi: 'मूंगफली', category: 'Pantry & Spices' },
  { id: 'sev', nameEn: 'Besan Sev (Bhujia)', nameHi: 'सेव / भुजिया', category: 'Pantry & Spices' },
  { id: 'dry_fruits', nameEn: 'Cashews / Raisins (Kaju / Kishmish)', nameHi: 'काजू / किशमिश', category: 'Pantry & Spices' },
  { id: 'black_salt', nameEn: 'Black Salt (Kala Namak)', nameHi: 'काला नमक', category: 'Pantry & Spices', isStaple: true },
  { id: 'sabja_seeds', nameEn: 'Basil Seeds (Sabja / Chia)', nameHi: 'सब्जा / चिया बीज', category: 'Pantry & Spices' },
  { id: 'honey', nameEn: 'Honey (Shehad)', nameHi: 'शहद', category: 'Pantry & Spices' },

  // Beverages & Syrups
  { id: 'club_soda', nameEn: 'Club Soda / Sparkling Water', nameHi: 'क्लब सोडा / स्पार्कलिंग वाटर', category: 'Beverages & Syrups' },
  { id: 'rose_syrup', nameEn: 'Rose Syrup (Gulab Sharbat)', nameHi: 'गुलाब का शर्बत', category: 'Beverages & Syrups' },
  { id: 'guava_juice', nameEn: 'Guava Juice (Amrood Ras)', nameHi: 'अमरूद का जूस', category: 'Beverages & Syrups' },
  { id: 'mango_pulp', nameEn: 'Mango Pulp / Juice', nameHi: 'आम का रस / पल्प', category: 'Beverages & Syrups' },
  { id: 'pomegranate_juice', nameEn: 'Pomegranate Juice (Anar Ras)', nameHi: 'अनार का रस', category: 'Beverages & Syrups' },
  { id: 'coconut_water', nameEn: 'Tender Coconut Water (Nariyal Pani)', nameHi: 'नारियल पानी', category: 'Beverages & Syrups' },
  { id: 'orange_juice', nameEn: 'Fresh Orange Juice (Santra Ras)', nameHi: 'संतरे का रस', category: 'Beverages & Syrups' },
  { id: 'pineapple_juice', nameEn: 'Pineapple Juice (Ananas Ras)', nameHi: 'अनानास का जूस', category: 'Beverages & Syrups' },
  { id: 'kokum_syrup', nameEn: 'Kokum Extract / Agal', nameHi: 'कोकम का रस', category: 'Beverages & Syrups' },
  { id: 'blue_curacao_syrup', nameEn: 'Blue Curacao Syrup (Non-Alcoholic)', nameHi: 'ब्लू कुराकाओ सिरप', category: 'Beverages & Syrups' },
  { id: 'tamarind_pulp', nameEn: 'Tamarind Pulp (Imli)', nameHi: 'इमली का गूदा', category: 'Pantry & Spices' },
  { id: 'ginger_ale', nameEn: 'Ginger Ale / Ginger Beer', nameHi: 'जिंजर एल / बीयर', category: 'Beverages & Syrups' },
];

export const PANTRY_STAPLE_IDS = MASTER_INGREDIENTS.filter(i => i.isStaple).map(i => i.id);
