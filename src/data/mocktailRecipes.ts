import { Recipe } from '../types/recipe';

export const MOCKTAIL_RECIPES: Recipe[] = [
  // 1. Classic Virgin Mint Mojito
  {
    id: 'virgin_mint_mojito',
    nameEn: 'Classic Virgin Mint Mojito',
    nameHi: 'क्लासिक वर्जिन मिंट मोजिटो',
    taglineEn: 'Crisp garden mint, fresh lime muddled with sparkling club soda over crushed ice',
    taglineHi: 'ताजा पुदीना, नींबू और स्पार्कलिंग सोडे के साथ चिल्ड समर मोजिटो',
    descriptionEn: 'The benchmark of refreshing mixology. Hand-muddled fresh garden mint leaves and lime wedges balanced with cane sugar syrup, packed with crushed ice and crowned with effervescent sparkling soda.',
    descriptionHi: 'ताजगी से भरपूर दुनिया का सबसे लोकप्रिय मॉकटेल। ताज़े पुदीने की पत्तियां और रसीले नींबू को चीनी के साथ क्रश करके बर्फ और ठंडे क्लब सोडे के साथ तैयार किया जाता है।',
    prepTime: 5,
    cookTime: 0,
    totalTime: 5,
    defaultServings: 2,
    difficulty: 'Easy',
    dietary: 'Vegan',
    mealCategory: 'Beverages',
    cuisine: 'Fusion',
    featured: true,
    quickRecipe: true,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&auto=format&fit=crop&q=80',
    allergensEn: ['None'],
    allergensHi: ['कोई एलर्जी नहीं'],
    tipsEn: [
      'Gently slap mint leaves between your palms before muddling to activate the fragrant essential oils without tearing bitterness.',
      'Always use finely crushed ice rather than large cubes for rapid cooling and optimal dilution.'
    ],
    tipsHi: [
      'पुदीने की पत्तियों को क्रश करने से पहले हथेलियों के बीच हल्का सा थपथपाएं, इससे खुशबू दोगुनी हो जाती है।',
      'बड़े बर्फ के टुकड़ों की जगह क्रश की हुई बर्फ (कुटी हुई बर्फ) का इस्तेमाल करें ताकि ड्रिंक तुरंत चिल्ड हो जाए।'
    ],
    ingredients: [
      { id: 'mint', nameEn: 'Fresh Mint Leaves (Pudina)', nameHi: 'ताज़ा पुदीना', amount: 20, unit: 'leaves', isRequired: true },
      { id: 'lemon', nameEn: 'Fresh Lime Wedges', nameHi: 'नींबू के टुकड़े', amount: 2, unit: 'whole', isRequired: true },
      { id: 'sugar', nameEn: 'Simple Sugar Syrup or Powdered Sugar', nameHi: 'शुगर सिरप या पिसी चीनी', amount: 3, unit: 'tbsp', isRequired: true, isPantryStaple: true },
      { id: 'club_soda', nameEn: 'Chilled Club Soda / Sparkling Water', nameHi: 'ठंडा क्लब सोडा', amount: 350, unit: 'ml', isRequired: true },
      { id: 'salt', nameEn: 'Pinch of Black Salt (Optional)', nameHi: 'चुटकी भर काला नमक', amount: 0.25, unit: 'tsp', isRequired: false, isPantryStaple: true },
    ],
    steps: [
      {
        stepNumber: 1,
        titleEn: 'Muddle Aromatics',
        titleHi: 'पुदीना व नींबू मैश करें',
        instructionEn: 'Place fresh lime wedges and fresh mint leaves in highball glasses. Add simple sugar syrup.',
        instructionHi: 'लंबे ग्लास में नींबू के कटे टुकड़े और ताज़ी पुदीने की पत्तियां डालें। साथ में 3 चम्मच शुगर सिरप डालें।',
        durationMinutes: 2,
        timerSeconds: 120,
        tipEn: 'Press with a muddler or wooden spoon just enough to release juices and oils; do not pulverize.',
        tipHi: 'मडलर या बेलन के पिछले हिस्से से हल्के हाथ से दबाएं ताकि नींबू का रस और पुदीने का तेल निकले, ज़्यादा न रगड़ें।'
      },
      {
        stepNumber: 2,
        titleEn: 'Pack with Crushed Ice',
        titleHi: 'क्रश बर्फ भरें',
        instructionEn: 'Fill each glass to the brim with tightly packed crushed ice. This chills the drink instantly.',
        instructionHi: 'ग्लास को ऊपर तक कुटी हुई बर्फ (क्रश आइस) से भर दें।',
        durationMinutes: 1,
      },
      {
        stepNumber: 3,
        titleEn: 'Top with Fizz & Garnish',
        titleHi: 'सोडा डालें व सजाएं',
        instructionEn: 'Slowly pour chilled sparkling soda over the ice. Stir gently from the bottom up. Garnish with a fresh mint bouquet and a lime wheel.',
        instructionHi: 'ऊपर से धीरे-धीरे ठंडा क्लब सोडा डालें। नीचे से चम्मच घुमाकर हल्का मिलाएं। पुदीने की टहनी और नींबू के स्लाइस से सजाकर तुरंत परोसें।',
        durationMinutes: 2,
        timerSeconds: 60,
      }
    ]
  },

  // 2. Spicy Peru Chilli Cooler (Chilli Guava Mary)
  {
    id: 'spicy_guava_chilli_mary',
    nameEn: 'Spicy Peru Chilli Cooler (Chilli Guava)',
    nameHi: 'पेरू मिर्च रॉकर - स्पाइसी अमरूद मॉकटेल',
    taglineEn: 'Lounge-style spiced pink guava elixir with a fiery deggi mirch & rock salt rim',
    taglineHi: 'लाल मिर्च और काले नमक के तीखे रिम के साथ प्रीमियम पिंक अमरूद मॉकटेल',
    descriptionEn: 'The undisputed superstar of modern Indian lounges. Luscious pink guava juice shaken with tangy lime, black salt, and chaat masala, served in a glass rimmed with fiery red chilli powder and rock salt.',
    descriptionHi: 'भारतीय लाउंज और कैफे का सबसे हिट मॉकटेल। मीठे-रसीले अमरूद के रस में नींबू, काला नमक और चाट मसाला मिलाकर, ग्लास के किनारों पर लाल मिर्च-नमक की रिम लगाकर सर्व किया जाता है।',
    prepTime: 5,
    cookTime: 0,
    totalTime: 5,
    defaultServings: 2,
    difficulty: 'Easy',
    dietary: 'Vegan',
    mealCategory: 'Beverages',
    cuisine: 'Pan-Indian',
    featured: true,
    quickRecipe: true,
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=800&auto=format&fit=crop&q=80',
    allergensEn: ['None'],
    allergensHi: ['कोई एलर्जी नहीं'],
    tipsEn: [
      'Mix 1 tsp red chilli powder with 1 tsp rock salt or black salt on a flat saucer for the signature cafe rim.',
      'Add 2 dashes of Tabasco or crushed green chilli for an extra fiery kick.'
    ],
    tipsHi: [
      'प्लेट में एक चम्मच लाल मिर्च पाउडर और एक चम्मच काला नमक मिलाकर ग्लास के किनारे को नींबू से गीला करके घुमाएं।',
      'हल्का और तीखापन पसंद हो तो हरी मिर्च का एक छोटा टुकड़ा भी शेक करते समय डाल सकते हैं।'
    ],
    ingredients: [
      { id: 'guava_juice', nameEn: 'Chilled Pink Guava Juice', nameHi: 'ठंडा अमरूद (पेरू) का जूस', amount: 350, unit: 'ml', isRequired: true },
      { id: 'lemon', nameEn: 'Fresh Lemon Juice', nameHi: 'नींबू का रस', amount: 2, unit: 'tbsp', isRequired: true },
      { id: 'black_salt', nameEn: 'Black Salt (Kala Namak)', nameHi: 'काला नमक', amount: 0.5, unit: 'tsp', isRequired: true, isPantryStaple: true },
      { id: 'chaat_masala', nameEn: 'Chaat Masala', nameHi: 'चाट मसाला', amount: 0.5, unit: 'tsp', isRequired: true },
      { id: 'red_chilli_powder', nameEn: 'Red Chilli Powder (Deggi Mirch for rim)', nameHi: 'लाल मिर्च पाउडर (रिम के लिए)', amount: 1, unit: 'tsp', isRequired: true, isPantryStaple: true },
      { id: 'club_soda', nameEn: 'Chilled Club Soda (Optional for spritz)', nameHi: 'ठंडा सोडा (स्प्रिट्ज़ के लिए)', amount: 100, unit: 'ml', isRequired: false },
      { id: 'mint', nameEn: 'Mint Sprig (Garnish)', nameHi: 'पुदीने की पत्तियां', amount: 4, unit: 'leaves', isRequired: false },
    ],
    steps: [
      {
        stepNumber: 1,
        titleEn: 'Rim the Glass',
        titleHi: 'ग्लास पर मिर्च-नमक रिम बनाएं',
        instructionEn: 'Rub a cut lime wedge along the rim of two glasses. Invert into a plate containing red chilli powder and salt to coat the rim evenly.',
        instructionHi: 'ग्लास के रिम पर नींबू का टुकड़ा फेरें। फिर प्लेट में रखी लाल मिर्च और काले नमक में ग्लास उल्टा करके घुमाएं ताकि रिम पर परत चढ़ जाए।',
        durationMinutes: 2,
      },
      {
        stepNumber: 2,
        titleEn: 'Shake the Concoction',
        titleHi: 'शेक करें',
        instructionEn: 'In a cocktail shaker or jar with ice cubes, combine chilled guava juice, fresh lemon juice, black salt, and chaat masala. Shake vigorously for 15 seconds.',
        instructionHi: 'शेक करने वाले जार में बर्फ, अमरूद का जूस, नींबू का रस, काला नमक और चाट मसाला डालकर 15 सेकंड तेज़ी से शेक करें।',
        durationMinutes: 1,
        timerSeconds: 15,
      },
      {
        stepNumber: 3,
        titleEn: 'Pour & Serve',
        titleHi: 'ग्लास में डालें',
        instructionEn: 'Strain into the rimmed glasses filled with fresh ice. Top with a splash of soda if you prefer fizz. Garnish with a slit green chilli or lime wedge.',
        instructionHi: 'तैयार रिम वाले गिलासों में बर्फ डालकर जूस डालें। ऊपर से थोड़ा सोडा डालें और हरी मिर्च से सजाकर ठंडा-ठंडा परोसें।',
        durationMinutes: 2,
      }
    ]
  },

  // 3. Royal Blue Curacao Lagoon Sparkler
  {
    id: 'blue_curacao_lagoon_fizz',
    nameEn: 'Blue Curacao Lagoon Fizz',
    nameHi: 'रॉयल ब्लू लगून फिज़ मॉकटेल',
    taglineEn: 'Vibrant azure tropical cooler with zesty citrus and sparkling bubbles',
    taglineHi: 'शानदार नीला रंग, रसीला नींबू और स्पार्कलिंग सोडे का ताजगी भरा संगम',
    descriptionEn: 'An eye-catching sapphire mocktail blending non-alcoholic blue curacao syrup with freshly squeezed citrus and crisp lemon-lime sparkling fizz. Refreshing, vibrant, and photogenic.',
    descriptionHi: 'नीले समंदर जैसा खूबसूरत मॉकटेल। ब्लू कुराकाओ सिरप, ताज़ा नींबू का रस और फ़िज़ी लेमन-सोडा मिलाकर तैयार किया जाने वाला पार्टी-फेवरेट ड्रिंक।',
    prepTime: 4,
    cookTime: 0,
    totalTime: 4,
    defaultServings: 2,
    difficulty: 'Easy',
    dietary: 'Vegan',
    mealCategory: 'Beverages',
    cuisine: 'Fusion',
    featured: true,
    quickRecipe: true,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80',
    allergensEn: ['None'],
    allergensHi: ['कोई एलर्जी नहीं'],
    tipsEn: [
      'Pour the blue syrup at the very bottom, add ice, then slowly float the sparkling soda over a bar spoon for an ombre two-tone ocean gradient.',
      'Garnish with an orange wheel or maraschino cherry for contrast.'
    ],
    tipsHi: [
      'सिरप को सबसे नीचे डालें, फिर बर्फ भरकर चम्मच के सहारे धीरे से सोडा डालें ताकि खूबसूरत दो रंगों की लेयर दिखे।',
      'संतरे या नींबू की पतली स्लाइस ग्लास के किनारे लगाकर सर्व करें।'
    ],
    ingredients: [
      { id: 'blue_curacao_syrup', nameEn: 'Blue Curacao Syrup (Non-Alcoholic)', nameHi: 'ब्लू कुराकाओ सिरप', amount: 4, unit: 'tbsp', isRequired: true },
      { id: 'lemon', nameEn: 'Fresh Lemon Juice', nameHi: 'नींबू का रस', amount: 2, unit: 'tbsp', isRequired: true },
      { id: 'club_soda', nameEn: 'Chilled Club Soda or Lemon-Lime Soda', nameHi: 'ठंडा क्लब सोडा या स्प्राइट', amount: 350, unit: 'ml', isRequired: true },
      { id: 'mint', nameEn: 'Fresh Mint Sprig', nameHi: 'पुदीने की पत्तियां', amount: 4, unit: 'leaves', isRequired: false },
      { id: 'sugar', nameEn: 'Sugar Syrup (if using plain soda)', nameHi: 'शुगर सिरप (यदि प्लेन सोडा हो)', amount: 1, unit: 'tbsp', isRequired: false, isPantryStaple: true },
    ],
    steps: [
      {
        stepNumber: 1,
        titleEn: 'Foundation Base',
        titleHi: 'सिरप और नींबू मिलाएं',
        instructionEn: 'Add 2 tablespoons of non-alcoholic blue curacao syrup and 1 tablespoon fresh lemon juice into each glass.',
        instructionHi: 'दोनों गिलासों में 2-2 चम्मच ब्लू कुराकाओ सिरप और 1-1 चम्मच ताज़ा नींबू का रस डालें।',
        durationMinutes: 1,
      },
      {
        stepNumber: 2,
        titleEn: 'Fill with Ice',
        titleHi: 'बर्फ डालें',
        instructionEn: 'Fill the glasses with clear ice cubes and a couple of bruised mint leaves.',
        instructionHi: 'ग्लास को बर्फ के क्यूब्स और 2-3 पुदीने की पत्तियों से भर दें।',
        durationMinutes: 1,
      },
      {
        stepNumber: 3,
        titleEn: 'Float Soda & Stir',
        titleHi: 'सोडा डालें व सर्व करें',
        instructionEn: 'Top up with chilled sparkling soda or lemon-lime soda. Stir gently to create a deep blue tropical lagoon effect. Garnish with a citrus wheel.',
        instructionHi: 'ऊपर से ठंडा सोडा डालें। हल्के हाथ से एक बार घुमाएं ताकि नीला रंग फैल जाए। नींबू या संतरे के स्लाइस से सजाएं।',
        durationMinutes: 2,
      }
    ]
  },

  // 4. Masala Kokum & Sabja Spritzer
  {
    id: 'masala_kokum_sabja_spritzer',
    nameEn: 'Masala Kokum & Sabja Spritzer',
    nameHi: 'मसाला कोकम और सब्जा स्प्रिट्ज़र',
    taglineEn: 'Konkan-style cooling agal kokum infused with plump basil seeds & roasted jeera fizz',
    taglineHi: 'कोंकण का प्राकृतिक कोकम, फूला हुआ सब्जा और भुने ज़ीरे का पाचक रिफ्रेशिंग ड्रिंक',
    descriptionEn: 'A coastal digestive masterpiece. Natural sour-sweet kokum agal spiced with roasted cumin, rock salt, and mint, complemented by swollen cooling sabja (basil) seeds and bubbly soda.',
    descriptionHi: 'महाराष्ट्र और गोवा के तटीय इलाकों का बेहद लोकप्रिय पाचक पेय। खट्टे-मीठे कोकम के अर्क में भुना ज़ीरा, काला नमक, सब्जा के बीज और ठंडा सोडा मिलाकर बनाया जाता है।',
    prepTime: 8,
    cookTime: 0,
    totalTime: 8,
    defaultServings: 2,
    difficulty: 'Easy',
    dietary: 'Vegan',
    mealCategory: 'Beverages',
    cuisine: 'Maharashtrian',
    featured: true,
    quickRecipe: true,
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&auto=format&fit=crop&q=80',
    allergensEn: ['None'],
    allergensHi: ['कोई एलर्जी नहीं'],
    tipsEn: [
      'Soak sabja (basil seeds) in warm water for 5 minutes beforehand until they puff into jelly-coated pearls.',
      'Kokum is naturally rich in hydroxycitric acid and acts as an ultimate body coolant.'
    ],
    tipsHi: [
      'सब्जा (तुलसी के बीज) को 5 मिनट पहले पानी में भिगो दें ताकि वे मोतियों जैसे फूल जाएं।',
      'कोकम पेट को ठंडक पहुंचाने और पाचन सुधारने के लिए सबसे उत्तम प्राकृतिक औषधि है।'
    ],
    ingredients: [
      { id: 'kokum_syrup', nameEn: 'Kokum Extract / Agal / Kokum Sharbat', nameHi: 'कोकम का रस / शर्बत', amount: 4, unit: 'tbsp', isRequired: true },
      { id: 'sabja_seeds', nameEn: 'Soaked Basil Seeds (Sabja)', nameHi: 'भीगा हुआ सब्जा (चिया बीज)', amount: 2, unit: 'tbsp', isRequired: true },
      { id: 'black_salt', nameEn: 'Black Salt (Kala Namak)', nameHi: 'काला नमक', amount: 0.5, unit: 'tsp', isRequired: true, isPantryStaple: true },
      { id: 'cumin_seeds', nameEn: 'Roasted Cumin Powder (Bhuna Jeera)', nameHi: 'भुना ज़ीरा पाउडर', amount: 0.5, unit: 'tsp', isRequired: true, isPantryStaple: true },
      { id: 'club_soda', nameEn: 'Chilled Club Soda', nameHi: 'ठंडा क्लब सोडा', amount: 350, unit: 'ml', isRequired: true },
      { id: 'sugar', nameEn: 'Sugar or Honey (if using unsweetened agal)', nameHi: 'चीनी या शहद', amount: 1.5, unit: 'tbsp', isRequired: false, isPantryStaple: true },
      { id: 'mint', nameEn: 'Fresh Mint', nameHi: 'पुदीना', amount: 6, unit: 'leaves', isRequired: false },
    ],
    steps: [
      {
        stepNumber: 1,
        titleEn: 'Bloom the Sabja',
        titleHi: 'सब्जा भिगोएं',
        instructionEn: 'Soak 1 tsp dry sabja seeds in 4 tbsp water for 5 minutes until fully bloomed.',
        instructionHi: 'एक चम्मच सूखे सब्जा के बीजों को 4 चम्मच पानी में 5 मिनट भिगो दें जब तक वे जेली जैसे फूल न जाएं।',
        durationMinutes: 5,
        timerSeconds: 300,
      },
      {
        stepNumber: 2,
        titleEn: 'Mix Spices & Kokum',
        titleHi: 'मसाले और कोकम मिलाएं',
        instructionEn: 'In each glass, add 2 tbsp kokum syrup, roasted cumin powder, black salt, and 1 tbsp of bloomed sabja seeds. Stir well.',
        instructionHi: 'ग्लास में 2 चम्मच कोकम सिरप, भुना ज़ीरा, काला नमक और 1 चम्मच फूला हुआ सब्जा डालकर अच्छे से मिलाएं।',
        durationMinutes: 1,
      },
      {
        stepNumber: 3,
        titleEn: 'Pour Soda & Chill',
        titleHi: 'सोडा डालें',
        instructionEn: 'Add ice cubes, then gently pour chilled soda. Garnish with a mint leaf and roasted cumin pinch. Serve with a thick straw.',
        instructionHi: 'बर्फ डालें और ऊपर से ठंडा सोडा भरें। पुदीने की पत्ती से सजाएं और मोटी स्ट्रॉ के साथ ठंडा-ठंडा पिएं।',
        durationMinutes: 2,
      }
    ]
  },

  // 5. Kala Khatta Pomegranate Bomb
  {
    id: 'kala_khatta_pomegranate_sparkler',
    nameEn: 'Kala Khatta Pomegranate Bomb',
    nameHi: 'काला खट्टा अनार बॉम्ब मॉकटेल',
    taglineEn: 'Nostalgic tangy-sweet jamun & kala khatta elevated with sparkling pomegranate juice',
    taglineHi: 'बचपन के काला खट्टा का चटपटा स्वाद, ताज़ा अनार के रस और सोडे के साथ',
    descriptionEn: 'The beloved Indian street-side gola flavor transformed into a luxurious cafe cocktail. Tangy kala khatta syrup shaken with fresh ruby pomegranate juice, chaat masala, lemon, and chilled fizz.',
    descriptionHi: 'बचपन की यादों को ताज़ा करने वाला चटपटा मॉकटेल। काला खट्टा सिरप में ताज़ा अनार का रस, नींबू, भुना ज़ीरा और काला नमक मिलाकर ऊपर से स्पार्कलिंग सोडे का तड़का लगाया जाता है।',
    prepTime: 5,
    cookTime: 0,
    totalTime: 5,
    defaultServings: 2,
    difficulty: 'Easy',
    dietary: 'Vegan',
    mealCategory: 'Beverages',
    cuisine: 'Pan-Indian',
    featured: true,
    quickRecipe: true,
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop&q=80',
    allergensEn: ['None'],
    allergensHi: ['कोई एलर्जी नहीं'],
    tipsEn: [
      'Rim the glass with roasted cumin powder and black salt for genuine desi gola nostalgia.',
      'Drop fresh pomegranate arils into the glass for a burst of crunch with every sip.'
    ],
    tipsHi: [
      'ग्लास के किनारे पर भुना ज़ीरा और काला नमक लगाएं।',
      'ग्लास में ताज़े अनार के दाने डालें जो हर घूंट में क्रंची स्वाद देते हैं।'
    ],
    ingredients: [
      { id: 'pomegranate_juice', nameEn: 'Fresh Pomegranate Juice', nameHi: 'ताज़ा अनार का रस', amount: 200, unit: 'ml', isRequired: true },
      { id: 'sugar', nameEn: 'Kala Khatta Syrup', nameHi: 'काला खट्टा सिरप', amount: 3, unit: 'tbsp', isRequired: true },
      { id: 'lemon', nameEn: 'Fresh Lemon Juice', nameHi: 'नींबू का रस', amount: 2, unit: 'tbsp', isRequired: true },
      { id: 'black_salt', nameEn: 'Black Salt (Kala Namak)', nameHi: 'काला नमक', amount: 0.5, unit: 'tsp', isRequired: true, isPantryStaple: true },
      { id: 'chaat_masala', nameEn: 'Chaat Masala', nameHi: 'चाट मसाला', amount: 0.5, unit: 'tsp', isRequired: true },
      { id: 'club_soda', nameEn: 'Chilled Club Soda', nameHi: 'ठंडा क्लब सोडा', amount: 200, unit: 'ml', isRequired: true },
      { id: 'mint', nameEn: 'Mint Leaves', nameHi: 'पुदीना', amount: 6, unit: 'leaves', isRequired: false },
    ],
    steps: [
      {
        stepNumber: 1,
        titleEn: 'Blend Flavor Base',
        titleHi: 'फ्लेवर बेस तैयार करें',
        instructionEn: 'In a mixing glass, blend kala khatta syrup, fresh pomegranate juice, lemon juice, black salt, and chaat masala.',
        instructionHi: 'एक जार में काला खट्टा सिरप, अनार का रस, नींबू का रस, काला नमक और चाट मसाला डालकर मिला लें।',
        durationMinutes: 2,
      },
      {
        stepNumber: 2,
        titleEn: 'Ice & Arils',
        titleHi: 'बर्फ और अनार दाने डालें',
        instructionEn: 'Add plenty of ice cubes and 1 tbsp of fresh pomegranate seeds into serving glasses.',
        instructionHi: 'सर्विंग ग्लास में खूब सारी बर्फ और 1 चम्मच ताज़ा अनार के दाने डालें।',
        durationMinutes: 1,
      },
      {
        stepNumber: 3,
        titleEn: 'Pour & Sparkle',
        titleHi: 'जूस और सोडा डालें',
        instructionEn: 'Pour the spiced pomegranate mixture halfway up the glasses, then top with vigorous chilled soda. Stir once and serve immediately.',
        instructionHi: 'मसालेदार अनार का मिश्रण आधा ग्लास डालें और ऊपर से ठंडा सोडा भरें। एक बार घुमाकर तुरंत परोसें।',
        durationMinutes: 2,
      }
    ]
  },

  // 6. Cucumber Basil Detox Gimlet
  {
    id: 'cucumber_basil_detox_gimlet',
    nameEn: 'Cucumber Basil Detox Gimlet',
    nameHi: 'खीरा तुलसी डिटॉक्स गिमलेट',
    taglineEn: 'Refreshing artisanal mixology with garden cucumber, sweet basil, and tonic effervescence',
    taglineHi: 'ताजा खीरा, मीठी तुलसी और टॉनिक वाटर से बना हाई-एंड स्पा मॉकटेल',
    descriptionEn: 'The definition of elegance and hydration. Crisp English cucumber ribbons muddled with Italian sweet basil leaves, balanced with cold-pressed lime juice, organic honey syrup, and premium sparkling tonic.',
    descriptionHi: 'फाइव-स्टार लाउंज का बेहद रिफ्रेशिंग डिटॉक्स ड्रिंक। ताज़ा खीरा और तुलसी की पत्तियों को शहद, नींबू के रस और चिल्ड टॉनिक वाटर के साथ मिलाकर बनाया जाता है।',
    prepTime: 5,
    cookTime: 0,
    totalTime: 5,
    defaultServings: 2,
    difficulty: 'Easy',
    dietary: 'Vegan',
    mealCategory: 'Beverages',
    cuisine: 'Fusion',
    featured: false,
    quickRecipe: true,
    image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?w=800&auto=format&fit=crop&q=80',
    allergensEn: ['None'],
    allergensHi: ['कोई एलर्जी नहीं'],
    tipsEn: [
      'Use a vegetable peeler to shave thin vertical ribbons of cucumber and spiral them inside the glass walls before adding ice.',
      'Sweet basil or holy basil (tulsi) adds an earthy, complex botanical aroma.'
    ],
    tipsHi: [
      'पीलर से खीरे की पतली लंबी पट्टियां काटकर ग्लास के अंदर चिपका दें, इससे ग्लास बेहद खूबसूरत दिखता है।',
      'मीठी तुलसी या ताज़ी श्याम तुलसी के पत्ते डालने से प्राकृतिक सौंधी खुशबू आती है।'
    ],
    ingredients: [
      { id: 'cucumber', nameEn: 'Fresh Cucumber Slices / Juice', nameHi: 'ताज़ा खीरा (स्लाइस या जूस)', amount: 1, unit: 'medium', isRequired: true },
      { id: 'lemon', nameEn: 'Fresh Lime Juice', nameHi: 'नींबू का रस', amount: 2, unit: 'tbsp', isRequired: true },
      { id: 'honey', nameEn: 'Honey or Agave Nectar', nameHi: 'शहद या शुगर सिरप', amount: 2, unit: 'tbsp', isRequired: true },
      { id: 'club_soda', nameEn: 'Tonic Water or Sparkling Water', nameHi: 'टॉनिक वाटर या क्लब सोडा', amount: 300, unit: 'ml', isRequired: true },
      { id: 'mint', nameEn: 'Sweet Basil or Mint Leaves', nameHi: 'तुलसी या पुदीना के पत्ते', amount: 8, unit: 'leaves', isRequired: true },
      { id: 'black_salt', nameEn: 'Pinch of Himalayan Pink Salt', nameHi: 'चुटकी भर सेंधा नमक', amount: 0.25, unit: 'tsp', isRequired: false, isPantryStaple: true },
    ],
    steps: [
      {
        stepNumber: 1,
        titleEn: 'Muddle Herbs & Cucumber',
        titleHi: 'खीरा व तुलसी मैश करें',
        instructionEn: 'Muddle diced cucumber and fresh basil leaves with lime juice and honey in a cocktail shaker.',
        instructionHi: 'शेक करने वाले बर्तन में खीरे के टुकड़े, तुलसी के पत्ते, नींबू का रस और शहद डालकर हल्का क्रश करें।',
        durationMinutes: 2,
      },
      {
        stepNumber: 2,
        titleEn: 'Shake with Ice',
        titleHi: 'बर्फ के साथ शेक करें',
        instructionEn: 'Add ice cubes and shake vigorously for 10 seconds to infuse the botanical flavors.',
        instructionHi: 'बर्फ डालें और 10 सेकंड ज़ोर से शेक करें ताकि खीरे और तुलसी का रस आपस में मिल जाए।',
        durationMinutes: 1,
        timerSeconds: 10,
      },
      {
        stepNumber: 3,
        titleEn: 'Fine Strain & Top',
        titleHi: 'छानें और टॉनिक डालें',
        instructionEn: 'Double-strain into chilled coupe glasses lined with cucumber ribbons. Top with crisp tonic water.',
        instructionHi: 'खीरे की रिबन लगे गिलासों में छलनी से छानकर डालें और ऊपर से ठंडा टॉनिक वाटर या सोडा भरें।',
        durationMinutes: 2,
      }
    ]
  },

  // 7. Royal Rose Cardamom Blossom
  {
    id: 'royal_rose_cardamom_blossom',
    nameEn: 'Royal Rose Cardamom Blossom',
    nameHi: 'शाही गुलाब इलायची फिज़',
    taglineEn: 'Mughal-inspired floral nectar kissed with aromatic green cardamom and chilled fizz',
    taglineHi: 'देसी गुलाब की खुशबू, हरी इलायची और सब्जा के साथ शाही मॉकटेल',
    descriptionEn: 'A magnificent heritage refresher reminiscent of royal Mughal gardens. Pure Damask rose syrup blended with freshly cracked cardamom pods, lemon juice, bloomed sabja seeds, and effervescent sparkling water.',
    descriptionHi: 'शाही नवाबी अंदाज़ का मनमोहक मॉकटेल। देसी गुलाब के शर्बत में ताज़ी कुटी हरी इलायची, नींबू का रस, फूला हुआ सब्जा और स्पार्कलिंग सोडा मिलाकर बनाया जाता है।',
    prepTime: 5,
    cookTime: 0,
    totalTime: 5,
    defaultServings: 2,
    difficulty: 'Easy',
    dietary: 'Vegan',
    mealCategory: 'Beverages',
    cuisine: 'North Indian',
    featured: false,
    quickRecipe: true,
    image: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?w=800&auto=format&fit=crop&q=80',
    allergensEn: ['None'],
    allergensHi: ['कोई एलर्जी नहीं'],
    tipsEn: [
      'Crack green cardamom freshly with a pestle right before mixing so the floral oils disperse into the rose syrup.',
      'Garnish with dried organic rose petals for a banquet presentation.'
    ],
    tipsHi: [
      'इलायची को उसी समय ताज़ा कूटें ताकि उसकी खुशबू गुलाब के साथ पूरी तरह घुल जाए।',
      'ऊपर से गुलाब की सूखी पंखुड़ियां छिड़कें जिससे यह बेहद शाही दिखे।'
    ],
    ingredients: [
      { id: 'rose_syrup', nameEn: 'Premium Rose Syrup (Gulab Sharbat / Rooh Afza)', nameHi: 'प्रीमियम गुलाब शर्बत', amount: 4, unit: 'tbsp', isRequired: true },
      { id: 'sabja_seeds', nameEn: 'Soaked Basil Seeds (Sabja)', nameHi: 'भीगा हुआ सब्जा', amount: 2, unit: 'tbsp', isRequired: true },
      { id: 'lemon', nameEn: 'Fresh Lemon Juice', nameHi: 'नींबू का रस', amount: 2, unit: 'tbsp', isRequired: true },
      { id: 'club_soda', nameEn: 'Chilled Club Soda / Sparkling Water', nameHi: 'ठंडा क्लब सोडा', amount: 350, unit: 'ml', isRequired: true },
      { id: 'mint', nameEn: 'Fresh Mint', nameHi: 'पुदीने की पत्तियां', amount: 6, unit: 'leaves', isRequired: false },
      { id: 'sugar', nameEn: 'Crushed Green Cardamom (Elaichi)', nameHi: 'कुटी हुई हरी इलायची', amount: 3, unit: 'pods', isRequired: true },
    ],
    steps: [
      {
        stepNumber: 1,
        titleEn: 'Infuse Rose & Cardamom',
        titleHi: 'गुलाब और इलायची मिलाएं',
        instructionEn: 'In each glass, place 2 tbsp rose syrup, freshly crushed cardamom seeds, and 1 tbsp lemon juice.',
        instructionHi: 'ग्लास में 2 चम्मच गुलाब का शर्बत, कुटी इलायची के दाने और 1 चम्मच नींबू का रस डालें।',
        durationMinutes: 1,
      },
      {
        stepNumber: 2,
        titleEn: 'Add Sabja & Ice',
        titleHi: 'सब्जा और बर्फ डालें',
        instructionEn: 'Stir in 1 tbsp soaked sabja seeds and pack the glass with clear ice cubes.',
        instructionHi: '1 चम्मच फूला हुआ सब्जा डालें और ग्लास को बर्फ के टुकड़ों से भरें।',
        durationMinutes: 1,
      },
      {
        stepNumber: 3,
        titleEn: 'Top with Bubbles',
        titleHi: 'सोडा डालें व परोसें',
        instructionEn: 'Top slowly with chilled sparkling soda. Swirl gently so the pink rose color diffuses upward. Garnish with rose petals and mint.',
        instructionHi: 'धीरे-धीरे ठंडा सोडा डालें ताकि नीचे गहरा गुलाबी और ऊपर हल्का रंग दिखे। गुलाब की पंखुड़ियों से सजाकर परोसें।',
        durationMinutes: 2,
      }
    ]
  },

  // 8. Aam Panna Sparkling Sangria
  {
    id: 'aam_panna_sparkling_sangria',
    nameEn: 'Aam Panna Sparkling Sangria',
    nameHi: 'आम पन्ना स्पार्कलिंग सैंग्रिया',
    taglineEn: 'Charred raw green mango concentrate topped with diced crisp apples and sparkling bubbles',
    taglineHi: 'भुने कच्चे आम का खट्टा-मीठा पन्ना, कटे सेब और स्पार्कलिंग फिज़ के साथ',
    descriptionEn: 'The traditional North Indian heat-buster reimagined as a festive non-alcoholic sangria. Roasted raw mango pulp spiced with mint, cumin, and black salt, steeped with crisp diced apples and topped with sparkling fizz.',
    descriptionHi: 'गर्मियों का सबसे मशहूर पेय अब नए अंदाज़ में। भुनी हुई कैरी (कच्चे आम) के पल्प में पुदीना, भुना ज़ीरा, काला नमक और कटे हुए सेब डालकर ठंडे सोडे के साथ बनाया गया शानदार सैंग्रिया।',
    prepTime: 8,
    cookTime: 0,
    totalTime: 8,
    defaultServings: 2,
    difficulty: 'Easy',
    dietary: 'Vegan',
    mealCategory: 'Beverages',
    cuisine: 'North Indian',
    featured: false,
    quickRecipe: true,
    image: 'https://images.unsplash.com/photo-1546171753-97d7676e4602?w=800&auto=format&fit=crop&q=80',
    allergensEn: ['None'],
    allergensHi: ['कोई एलर्जी नहीं'],
    tipsEn: [
      'Roasting or pressure-cooking raw mango with its peel adds a subtle smoky depth.',
      'Dicing crisp green apples and pomegranate provides a delightful sangria crunch.'
    ],
    tipsHi: [
      'कच्चे आम को हल्का भूनकर गूदा निकालने से बढ़िया सौंधी खुशबू आती है।',
      'बारीक कटे सेब और अनार के दाने डालकर 5 मिनट रखें ताकि फलों में पन्ना का स्वाद समा जाए।'
    ],
    ingredients: [
      { id: 'mango_pulp', nameEn: 'Raw Green Mango Pulp (Aam Panna Paste)', nameHi: 'कच्चे आम का पल्प (आम पन्ना)', amount: 4, unit: 'tbsp', isRequired: true },
      { id: 'mint', nameEn: 'Fresh Mint Paste or Leaves', nameHi: 'पुदीना पेस्ट या पत्तियां', amount: 1, unit: 'tbsp', isRequired: true },
      { id: 'black_salt', nameEn: 'Black Salt (Kala Namak)', nameHi: 'काला नमक', amount: 0.5, unit: 'tsp', isRequired: true, isPantryStaple: true },
      { id: 'cumin_seeds', nameEn: 'Roasted Cumin Powder (Bhuna Jeera)', nameHi: 'भुना ज़ीरा पाउडर', amount: 0.5, unit: 'tsp', isRequired: true, isPantryStaple: true },
      { id: 'sugar', nameEn: 'Jaggery Powder or Sugar', nameHi: 'गुड़ या चीनी', amount: 2, unit: 'tbsp', isRequired: true, isPantryStaple: true },
      { id: 'club_soda', nameEn: 'Chilled Club Soda or Ginger Ale', nameHi: 'ठंडा क्लब सोडा या जिंजर एल', amount: 350, unit: 'ml', isRequired: true },
      { id: 'lemon', nameEn: 'Fresh Lemon Juice', nameHi: 'नींबू का रस', amount: 1, unit: 'tbsp', isRequired: true },
    ],
    steps: [
      {
        stepNumber: 1,
        titleEn: 'Prepare Panna Elixir',
        titleHi: 'पन्ना बेस मिलाएं',
        instructionEn: 'Whisk raw mango pulp with jaggery/sugar, roasted cumin, black salt, and mint paste until smooth.',
        instructionHi: 'कच्चे आम के पल्प में गुड़/चीनी, भुना ज़ीरा, काला नमक और पुदीना मिलाकर स्मूथ पेस्ट बना लें।',
        durationMinutes: 3,
      },
      {
        stepNumber: 2,
        titleEn: 'Fruit Maceration',
        titleHi: 'फलों के टुकड़े डालें',
        instructionEn: 'Divide into large wine glasses. Drop in diced crisp apple cubes and crushed ice.',
        instructionHi: 'ग्लासों में पन्ना पेस्ट डालें, साथ में बारीक कटे सेब के टुकड़े और क्रश की हुई बर्फ डालें।',
        durationMinutes: 2,
      },
      {
        stepNumber: 3,
        titleEn: 'Fizz Up & Serve',
        titleHi: 'सोडा डालें',
        instructionEn: 'Pour chilled sparkling soda to fill. Stir gently and enjoy the fizzy, sweet-tangy rush.',
        instructionHi: 'ऊपर से ठंडा सोडा डालें। चम्मच से धीरे से मिलाएं और ताज़ा-ताज़ा पिएं।',
        durationMinutes: 2,
      }
    ]
  },

  // 9. Smoked Jamun Shikanji
  {
    id: 'smoked_jamun_shikanji',
    nameEn: 'Smoked Jamun Shikanji',
    nameHi: 'स्मोक्ड जामुन शिकंजी मॉकटेल',
    taglineEn: 'Velvety deep purple jamun pulp balanced with tangy shikanji spices and delicate clove smoke',
    taglineHi: 'जामुन का गाढ़ा रस, शिकंजी मसाला और लौंग के सौंधे धुएं से भरपूर खास ड्रिंक',
    descriptionEn: 'An artisanal Indian cocktail sensation. Rich wild black plum (jamun) puree seasoned with Delhi-style shikanji spices, black salt, and lime, infused with a whiff of clove smoke and charged with cold soda.',
    descriptionHi: 'शाही अंदाज का अनोखा मॉकटेल। काले जामुन के पल्प में दिल्ली की मशहूर शिकंजी के मसाले, काला नमक और नींबू मिलाकर ऊपर से लौंग की धूनी (स्मोक) दी जाती है।',
    prepTime: 7,
    cookTime: 1,
    totalTime: 8,
    defaultServings: 2,
    difficulty: 'Medium',
    dietary: 'Vegan',
    mealCategory: 'Beverages',
    cuisine: 'North Indian',
    featured: false,
    quickRecipe: true,
    image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=800&auto=format&fit=crop&q=80',
    allergensEn: ['None'],
    allergensHi: ['कोई एलर्जी नहीं'],
    tipsEn: [
      'To smoke: Heat a piece of charcoal on stove, place in a small steel bowl over the pulp, add 1 drop ghee and 2 cloves, cover with a lid for 45 seconds.',
      'Black salt cuts through jamun’s natural astringency and creates an unforgettable flavor profile.'
    ],
    tipsHi: [
      'स्मोकी फ्लेवर के लिए: कोयले के छोटे टुकड़े को गैस पर लाल करें, कटोरी में रखकर 1 बूंद घी और 2 लौंग डालकर 45 सेकंड बर्तन ढंक दें।',
      'काला नमक जामुन के कसैलेपन को खत्म करके लाजवाब स्वाद देता है।'
    ],
    ingredients: [
      { id: 'pomegranate_juice', nameEn: 'Fresh Jamun Puree / Black Plum Juice', nameHi: 'जामुन का पल्प / रस', amount: 150, unit: 'ml', isRequired: true },
      { id: 'lemon', nameEn: 'Fresh Lemon Juice', nameHi: 'नींबू का रस', amount: 2, unit: 'tbsp', isRequired: true },
      { id: 'black_salt', nameEn: 'Black Salt (Kala Namak)', nameHi: 'काला नमक', amount: 0.5, unit: 'tsp', isRequired: true, isPantryStaple: true },
      { id: 'chaat_masala', nameEn: 'Shikanji / Chaat Masala', nameHi: 'शिकंजी मसाला / चाट मसाला', amount: 0.5, unit: 'tsp', isRequired: true },
      { id: 'sugar', nameEn: 'Sugar Syrup', nameHi: 'शुगर सिरप', amount: 2, unit: 'tbsp', isRequired: true, isPantryStaple: true },
      { id: 'club_soda', nameEn: 'Chilled Club Soda', nameHi: 'ठंडा क्लब सोडा', amount: 300, unit: 'ml', isRequired: true },
      { id: 'mint', nameEn: 'Mint Sprigs', nameHi: 'पुदीना', amount: 6, unit: 'leaves', isRequired: false },
    ],
    steps: [
      {
        stepNumber: 1,
        titleEn: 'Season Jamun Pulp',
        titleHi: 'जामुन पल्प तैयार करें',
        instructionEn: 'In a bowl, mix jamun puree with lemon juice, sugar syrup, black salt, and shikanji masala.',
        instructionHi: 'एक कटोरी में जामुन का पल्प, नींबू का रस, शुगर सिरप, काला नमक और शिकंजी मसाला मिलाएं।',
        durationMinutes: 2,
      },
      {
        stepNumber: 2,
        titleEn: 'Smoke (Dhungar Method)',
        titleHi: 'धुंगार (स्मोक) लगाएं',
        instructionEn: 'Place a burning piece of charcoal with 1 clove and a drop of ghee inside the bowl. Cover for 1 minute to impart a rustic barbecue aroma.',
        instructionHi: 'जलते कोयले पर 1 बूंद घी और लौंग डालकर 1 मिनट ढक्कन लगा दें ताकि सौंधी खुशबू समा जाए।',
        durationMinutes: 2,
        timerSeconds: 60,
      },
      {
        stepNumber: 3,
        titleEn: 'Assemble & Pour Soda',
        titleHi: 'सोडा डालें व परोसें',
        instructionEn: 'Divide the smoked puree into glasses packed with crushed ice. Pour chilled club soda over it, stir gently, and serve.',
        instructionHi: 'ग्लास में बर्फ भरकर स्मोक्ड पल्प डालें और ऊपर से ठंडा सोडा डालकर तुरंत परोसें।',
        durationMinutes: 2,
      }
    ]
  },

  // 10. Passionfruit Mango Jalapeno Fizz
  {
    id: 'passionfruit_mango_jalapeno_fizz',
    nameEn: 'Passionfruit Mango Jalapeno Fizz',
    nameHi: 'पैशनफ्रूट मैंगो जलापेनो पंच',
    taglineEn: 'Tropical sweetness of king mango paired with sharp passionfruit and spicy jalapeno heat',
    taglineHi: 'अल्फांसो आम की मिठास, खट्टा पैशनफ्रूट और तीखे जलापेनो का अनोखा फ्यूज़न',
    descriptionEn: 'A bold, zesty crowd-pleaser combining sun-ripened Alphonso mango pulp with exotic passion fruit nectar and crisp green jalapeno slices that lend an intoxicating warmth without overpowering.',
    descriptionHi: 'गर्मियों की शाम के लिए खास विदेशी स्वाद। पके आम के पल्प में पैशनफ्रूट का खट्टापन और जलापेनो मिर्च का हल्का तीखापन मिलाकर सोडे के साथ सर्व किया जाता है।',
    prepTime: 5,
    cookTime: 0,
    totalTime: 5,
    defaultServings: 2,
    difficulty: 'Easy',
    dietary: 'Vegan',
    mealCategory: 'Beverages',
    cuisine: 'Fusion',
    featured: false,
    quickRecipe: true,
    image: 'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=800&auto=format&fit=crop&q=80',
    allergensEn: ['None'],
    allergensHi: ['कोई एलर्जी नहीं'],
    tipsEn: [
      'Remove jalapeno seeds if you want purely aromatic green pepper flavor without spicy fire.',
      'A splash of lime keeps the sweet mango bright and vibrant.'
    ],
    tipsHi: [
      'अगर कम तीखा चाहिए तो जलापेनो मिर्च के बीज निकाल दें।',
      'नींबू का रस आम की मिठास को परफेक्ट बैलेंस देता है।'
    ],
    ingredients: [
      { id: 'mango_pulp', nameEn: 'Ripe Alphonso Mango Pulp', nameHi: 'पके आम का पल्प', amount: 150, unit: 'ml', isRequired: true },
      { id: 'orange_juice', nameEn: 'Passionfruit or Orange Juice', nameHi: 'पैशनफ्रूट या संतरे का जूस', amount: 100, unit: 'ml', isRequired: true },
      { id: 'green_chilli', nameEn: 'Fresh Jalapeno or Mild Green Chilli Slices', nameHi: 'जलापेनो या हरी मिर्च के स्लाइस', amount: 4, unit: 'slices', isRequired: true },
      { id: 'lemon', nameEn: 'Fresh Lime Juice', nameHi: 'नींबू का रस', amount: 2, unit: 'tbsp', isRequired: true },
      { id: 'club_soda', nameEn: 'Chilled Club Soda', nameHi: 'ठंडा क्लब सोडा', amount: 250, unit: 'ml', isRequired: true },
      { id: 'sugar', nameEn: 'Agave or Sugar Syrup', nameHi: 'शुगर सिरप', amount: 1.5, unit: 'tbsp', isRequired: false, isPantryStaple: true },
    ],
    steps: [
      {
        stepNumber: 1,
        titleEn: 'Muddle Jalapeno & Citrus',
        titleHi: 'जलापेनो और नींबू क्रश करें',
        instructionEn: 'Lightly muddle jalapeno slices with lime juice and sugar syrup in a shaker glass.',
        instructionHi: 'शेक करने वाले ग्लास में जलापेनो के स्लाइस, नींबू का रस और शुगर सिरप डालकर हल्का दबाएं।',
        durationMinutes: 1,
      },
      {
        stepNumber: 2,
        titleEn: 'Shake Tropical Puree',
        titleHi: 'पल्प शेक करें',
        instructionEn: 'Add mango pulp, passionfruit juice, and ice cubes. Shake briskly for 12 seconds.',
        instructionHi: 'आम का पल्प, जूस और बर्फ डालकर 12 सेकंड अच्छी तरह शेक करें।',
        durationMinutes: 1,
        timerSeconds: 12,
      },
      {
        stepNumber: 3,
        titleEn: 'Pour & Fizz',
        titleHi: 'ग्लास में डालें',
        instructionEn: 'Pour over fresh ice into highball glasses. Top with crisp sparkling soda and garnish with a jalapeno wheel.',
        instructionHi: 'ग्लास में बर्फ डालकर ड्रिंक डालें। ऊपर से ठंडा सोडा भरें और जलापेनो के गोल टुकड़े से सजाएं।',
        durationMinutes: 2,
      }
    ]
  },

  // 11. Lychee Lemongrass Sparkler
  {
    id: 'lychee_lemongrass_sparkler',
    nameEn: 'Lychee Lemongrass Sparkler',
    nameHi: 'लीची लेमनग्रास स्पार्कलर',
    taglineEn: 'Fragrant Thai-inspired lemongrass aroma infused with juicy lychee and effervescent soda',
    taglineHi: 'मीठी रसीली लीची, ताज़ा लेमनग्रास की सौंधी महक और ठंडे सोडे का रिफ्रेशर',
    descriptionEn: 'An aromatic pan-Asian masterpiece. Floral, sweet whole lychees muddled with bruised aromatic lemongrass stalks, fresh ginger extract, and lime, charged with sparkling club soda.',
    descriptionHi: 'एशियन कैफे स्टाइल का सुगंधित मॉकटेल। मीठी लीची के रस में ताज़ा लेमनग्रास, अदरक का अर्क और नींबू मिलाकर सोडे के साथ बनाया जाता है।',
    prepTime: 5,
    cookTime: 0,
    totalTime: 5,
    defaultServings: 2,
    difficulty: 'Easy',
    dietary: 'Vegan',
    mealCategory: 'Beverages',
    cuisine: 'Fusion',
    featured: false,
    quickRecipe: true,
    image: 'https://images.unsplash.com/photo-1560512823-829485b8bf24?w=800&auto=format&fit=crop&q=80',
    allergensEn: ['None'],
    allergensHi: ['कोई एलर्जी नहीं'],
    tipsEn: [
      'Bruise the bottom bulb of the lemongrass stalk with a knife handle to release the citronella essential oils.',
      'Drop whole canned or peeled fresh lychees at the bottom of the glass for a fun edible treat.'
    ],
    tipsHi: [
      'लेमनग्रास की डंडी के निचले हिस्से को बेलन या चाकू से हल्का कुचलें ताकि उसकी खुशबू ड्रिंक में आ जाए।',
      'ग्लास के तल में 2-3 साबुत लीची डालें, जो ड्रिंक पीने के बाद खाने में बहुत स्वादिष्ट लगती हैं।'
    ],
    ingredients: [
      { id: 'sugar', nameEn: 'Lychee Juice or Canned Lychee Syrup', nameHi: 'लीची का रस', amount: 250, unit: 'ml', isRequired: true },
      { id: 'lemon', nameEn: 'Fresh Lemongrass Stalks', nameHi: 'ताज़ा लेमनग्रास (चाय की पत्ती डंडी)', amount: 2, unit: 'stalks', isRequired: true },
      { id: 'ginger', nameEn: 'Fresh Ginger Juice', nameHi: 'अदरक का रस', amount: 1, unit: 'tsp', isRequired: true },
      { id: 'lemon', nameEn: 'Fresh Lime Juice', nameHi: 'नींबू का रस', amount: 2, unit: 'tbsp', isRequired: true },
      { id: 'club_soda', nameEn: 'Chilled Club Soda', nameHi: 'ठंडा क्लब सोडा', amount: 250, unit: 'ml', isRequired: true },
      { id: 'mint', nameEn: 'Fresh Mint', nameHi: 'पुदीना', amount: 6, unit: 'leaves', isRequired: false },
    ],
    steps: [
      {
        stepNumber: 1,
        titleEn: 'Bruise Lemongrass',
        titleHi: 'लेमनग्रास कुचलें',
        instructionEn: 'Bruise lemongrass stalks and place into glasses with fresh ginger juice and lime juice.',
        instructionHi: 'लेमनग्रास की डंडियों को हल्का कुचलकर ग्लास में डालें, साथ में अदरक का रस और नींबू का रस मिलाएं।',
        durationMinutes: 1,
      },
      {
        stepNumber: 2,
        titleEn: 'Add Lychee & Ice',
        titleHi: 'लीची और बर्फ डालें',
        instructionEn: 'Pour lychee juice, add whole lychees, and fill each glass with cubed ice.',
        instructionHi: 'लीची का रस डालें, 2-2 साबुत लीची डालें और ग्लास को बर्फ से भर दें।',
        durationMinutes: 1,
      },
      {
        stepNumber: 3,
        titleEn: 'Top with Soda',
        titleHi: 'सोडा डालें',
        instructionEn: 'Top up with chilled soda water and stir gently. Garnish with a lemongrass stirrer and mint sprig.',
        instructionHi: 'ऊपर से ठंडा सोडा भरें और धीरे से मिलाएं। लेमनग्रास की स्टिक लगाकर सर्व करें।',
        durationMinutes: 2,
      }
    ]
  },

  // 12. Watermelon Mint & Ginger Smash
  {
    id: 'watermelon_mint_ginger_smash',
    nameEn: 'Watermelon Mint & Ginger Smash',
    nameHi: 'तरबूज पुदीना अदरक स्मैश',
    taglineEn: 'Crisp summer watermelon smashed with peppery ginger and aromatic garden mint',
    taglineHi: 'ताजा रसीला तरबूज, अदरक का तीखापन और पुदीने की ठंडक का लाजवाब स्मैश',
    descriptionEn: 'The quintessential summer reviver. Seedless sweet red watermelon cubes hand-crushed with spicy fresh ginger, lime juice, garden mint, and black salt, lengthened with sparkling bubbles.',
    descriptionHi: 'गर्मियों की तपिश मिटाने वाला सबसे ताज़गी भरा ड्रिंक। ताज़े तरबूज के टुकड़ों को अदरक, नींबू, पुदीने की पत्तियों और काले नमक के साथ क्रश करके सोडे के साथ बनाया जाता है।',
    prepTime: 5,
    cookTime: 0,
    totalTime: 5,
    defaultServings: 2,
    difficulty: 'Easy',
    dietary: 'Vegan',
    mealCategory: 'Beverages',
    cuisine: 'Pan-Indian',
    featured: false,
    quickRecipe: true,
    image: 'https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?w=800&auto=format&fit=crop&q=80',
    allergensEn: ['None'],
    allergensHi: ['कोई एलर्जी नहीं'],
    tipsEn: [
      'Do not blend in a mixer; hand muddling keeps the fresh textured pulp without frothing.',
      'Black salt accentuates watermelon sweetness dramatically.'
    ],
    tipsHi: [
      'मिक्सर में पीसने के बजाय चम्मच या मडलर से हाथ से दबाएं, इससे तरबूज का पल्प क्रंची रहता है।',
      'चुटकी भर काला नमक तरबूज की प्राकृतिक मिठास को बहुत बढ़ा देता है।'
    ],
    ingredients: [
      { id: 'sugar', nameEn: 'Fresh Seedless Watermelon Cubes', nameHi: 'कटा हुआ ताजा तरबूज', amount: 2, unit: 'cups', isRequired: true },
      { id: 'ginger', nameEn: 'Grated Fresh Ginger', nameHi: 'कद्दूकस किया अदरक', amount: 1, unit: 'tsp', isRequired: true },
      { id: 'mint', nameEn: 'Fresh Mint Leaves', nameHi: 'पुदीने की पत्तियां', amount: 15, unit: 'leaves', isRequired: true },
      { id: 'lemon', nameEn: 'Fresh Lime Juice', nameHi: 'नींबू का रस', amount: 2, unit: 'tbsp', isRequired: true },
      { id: 'black_salt', nameEn: 'Black Salt', nameHi: 'काला नमक', amount: 0.25, unit: 'tsp', isRequired: true, isPantryStaple: true },
      { id: 'club_soda', nameEn: 'Chilled Club Soda', nameHi: 'ठंडा क्लब सोडा', amount: 250, unit: 'ml', isRequired: true },
    ],
    steps: [
      {
        stepNumber: 1,
        titleEn: 'Muddle the Melon',
        titleHi: 'तरबूज मैश करें',
        instructionEn: 'In a sturdy pitcher or shaker, muddle fresh watermelon cubes, grated ginger, mint leaves, and lime juice thoroughly.',
        instructionHi: 'एक बड़े जार में तरबूज के टुकड़े, अदरक, पुदीना और नींबू का रस डालकर अच्छी तरह दबाकर रस निकालें।',
        durationMinutes: 2,
      },
      {
        stepNumber: 2,
        titleEn: 'Chill with Ice',
        titleHi: 'बर्फ डालें',
        instructionEn: 'Divide the muddled fruit and juices into two large glasses filled with crushed ice. Add a pinch of black salt.',
        instructionHi: 'कुटी हुई बर्फ से भरे दो गिलासों में तरबूज का मिश्रण डालें और ऊपर से काला नमक छिड़कें।',
        durationMinutes: 1,
      },
      {
        stepNumber: 3,
        titleEn: 'Top & Garnish',
        titleHi: 'सोडा डालें',
        instructionEn: 'Top with chilled soda. Garnish with a small triangular watermelon slice perched on the glass rim and a mint sprig.',
        instructionHi: 'ऊपर से ठंडा सोडा डालें। ग्लास के किनारे तरबूज का छोटा टुकड़ा और पुदीने की पत्ती लगाकर तुरंत परोसें।',
        durationMinutes: 2,
      }
    ]
  },

  // 13. Tamarind Chilli Imli Twist
  {
    id: 'imli_chilli_tang_cooler',
    nameEn: 'Tamarind Chilli Imli Twist',
    nameHi: 'इमली मिर्च ट्विस्ट मॉकटेल',
    taglineEn: 'Sweet-and-sour desi tamarind street twist balanced with warm jaggery and sparkling fizz',
    taglineHi: 'खट्टी-मीठी देसी इमली, गुड़, भुना ज़ीरा और मिर्च के चटकारे वाला मॉकटेल',
    descriptionEn: 'An electrifying homage to Indian street flavors. Tangy tamarind pulp reduced with organic jaggery, roasted cumin, and black salt, shaken with lime and poured over ice with a fiery red chilli rim.',
    descriptionHi: 'भारतीय गलियों की चटपटी चाट का अनोखा ड्रिंक रूप। खट्टी इमली के गूदे में देसी गुड़, भुना ज़ीरा और काला नमक मिलाकर, लाल मिर्च के रिम वाले ग्लास में सोडे के साथ परोसा जाता है।',
    prepTime: 6,
    cookTime: 0,
    totalTime: 6,
    defaultServings: 2,
    difficulty: 'Easy',
    dietary: 'Vegan',
    mealCategory: 'Beverages',
    cuisine: 'Pan-Indian',
    featured: false,
    quickRecipe: true,
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=800&auto=format&fit=crop&q=80',
    allergensEn: ['None'],
    allergensHi: ['कोई एलर्जी नहीं'],
    tipsEn: [
      'Warm the tamarind with jaggery water for 2 minutes to create a smooth, velvety syrup.',
      'Rim glasses with a blend of chaat masala and deggi mirch.'
    ],
    tipsHi: [
      'इमली के पल्प में गुड़ का पानी मिलाकर हल्का गुनगुना करने से स्मूथ सिरप बन जाता है।',
      'ग्लास के किनारे पर चाट मसाला और कश्मीरी लाल मिर्च लगाएं।'
    ],
    ingredients: [
      { id: 'tamarind_pulp', nameEn: 'Tamarind Pulp (Imli Extract)', nameHi: 'इमली का गाढ़ा गूदा', amount: 3, unit: 'tbsp', isRequired: true },
      { id: 'sugar', nameEn: 'Jaggery Powder or Jaggery Syrup', nameHi: 'गुड़ का सिरप या पाउडर', amount: 3, unit: 'tbsp', isRequired: true, isPantryStaple: true },
      { id: 'black_salt', nameEn: 'Black Salt (Kala Namak)', nameHi: 'काला नमक', amount: 0.5, unit: 'tsp', isRequired: true, isPantryStaple: true },
      { id: 'cumin_seeds', nameEn: 'Roasted Cumin Powder (Bhuna Jeera)', nameHi: 'भुना ज़ीरा पाउडर', amount: 0.5, unit: 'tsp', isRequired: true, isPantryStaple: true },
      { id: 'red_chilli_powder', nameEn: 'Kashmiri Red Chilli Powder (For rim)', nameHi: 'कश्मीरी लाल मिर्च', amount: 0.5, unit: 'tsp', isRequired: true, isPantryStaple: true },
      { id: 'lemon', nameEn: 'Fresh Lime Juice', nameHi: 'नींबू का रस', amount: 1.5, unit: 'tbsp', isRequired: true },
      { id: 'club_soda', nameEn: 'Chilled Club Soda', nameHi: 'ठंडा क्लब सोडा', amount: 350, unit: 'ml', isRequired: true },
    ],
    steps: [
      {
        stepNumber: 1,
        titleEn: 'Rim the Glass',
        titleHi: 'रिम तैयार करें',
        instructionEn: 'Moisten glass rims with lime juice and dip into mixed chaat masala and red chilli powder.',
        instructionHi: 'ग्लास के किनारों पर नींबू का रस लगाकर चाट मसाला और लाल मिर्च के मिश्रण में घुमाएं।',
        durationMinutes: 1,
      },
      {
        stepNumber: 2,
        titleEn: 'Mix Imli Syrup',
        titleHi: 'इमली मसाला घोलें',
        instructionEn: 'Whisk tamarind pulp with jaggery syrup, roasted cumin, black salt, and lime juice until completely dissolved.',
        instructionHi: 'इमली के गूदे में गुड़, भुना ज़ीरा, काला नमक और नींबू का रस अच्छी तरह फेंट लें।',
        durationMinutes: 2,
      },
      {
        stepNumber: 3,
        titleEn: 'Shake & Fizz',
        titleHi: 'बर्फ व सोडा डालें',
        instructionEn: 'Pour the spiced tamarind syrup over ice in the glasses. Fill with chilled club soda and stir gently.',
        instructionHi: 'रिम वाले गिलासों में बर्फ डालें, इमली का मिश्रण डालें और ऊपर से ठंडा सोडा भरकर तुरंत परोसें।',
        durationMinutes: 2,
      }
    ]
  },

  // 14. Virgin Piña Colada Cooler
  {
    id: 'virgin_pina_colada_cooler',
    nameEn: 'Virgin Coconut Lime Piña Colada',
    nameHi: 'वर्जिन नारियल पाइनएप्पल कोलाडा',
    taglineEn: 'Velvety tropical blend of sun-ripened pineapple and silky coconut cream over crushed ice',
    taglineHi: 'ताजा अनानास, गाढ़ी नारियल क्रीम और नींबू का क्रीमी ट्रॉपिकल मॉकटेल',
    descriptionEn: 'The undisputed royalty of creamy mocktails. Golden ripe pineapple juice blended with thick coconut cream, tender coconut water, and a squeeze of lime, blended frothy and garnished with toasted coconut flakes.',
    descriptionHi: 'बेहद मखमली और क्रीमी ट्रॉपिकल ड्रिंक। पके अनानास के रस में गाढ़ी नारियल की मलाई, नारियल पानी और हल्का नींबू का रस मिलाकर झागदार बनाया जाता है।',
    prepTime: 5,
    cookTime: 0,
    totalTime: 5,
    defaultServings: 2,
    difficulty: 'Easy',
    dietary: 'Vegan',
    mealCategory: 'Beverages',
    cuisine: 'Fusion',
    featured: false,
    quickRecipe: true,
    image: 'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=800&auto=format&fit=crop&q=80',
    allergensEn: ['Coconut'],
    allergensHi: ['नारियल'],
    tipsEn: [
      'Use chilled coconut cream (the thick layer from canned coconut milk) for a luxurious restaurant-grade velvet mouthfeel.',
      'A squeeze of fresh lime cuts through the coconut richness perfectly.'
    ],
    tipsHi: [
      'नारियल की गाढ़ी क्रीम का इस्तेमाल करें जिससे ड्रिंक एकदम गाढ़ा और मखमली बने।',
      'आधा चम्मच नींबू का रस नारियल की मिठास को परफेक्ट बैलेंस देता है।'
    ],
    ingredients: [
      { id: 'pineapple_juice', nameEn: 'Fresh Pineapple Juice', nameHi: 'ताज़ा अनानास का रस', amount: 250, unit: 'ml', isRequired: true },
      { id: 'coconut_water', nameEn: 'Tender Coconut Water', nameHi: 'नारियल पानी', amount: 100, unit: 'ml', isRequired: true },
      { id: 'sugar', nameEn: 'Thick Coconut Milk / Cream', nameHi: 'नारियल की गाढ़ी क्रीम / दूध', amount: 4, unit: 'tbsp', isRequired: true },
      { id: 'lemon', nameEn: 'Fresh Lime Juice', nameHi: 'नींबू का रस', amount: 1, unit: 'tbsp', isRequired: true },
      { id: 'sugar', nameEn: 'Sugar or Maple Syrup', nameHi: 'चीनी या शहद', amount: 1.5, unit: 'tbsp', isRequired: false, isPantryStaple: true },
    ],
    steps: [
      {
        stepNumber: 1,
        titleEn: 'Blend the Tropical Nectar',
        titleHi: 'क्रीम व जूस ब्लेंड करें',
        instructionEn: 'Combine pineapple juice, coconut cream, tender coconut water, lime juice, and sweetener in a blender with 1 cup of crushed ice.',
        instructionHi: 'ब्लेंडर में अनानास का जूस, नारियल क्रीम, नारियल पानी, नींबू का रस और 1 कप क्रश आइस डालें।',
        durationMinutes: 2,
      },
      {
        stepNumber: 2,
        titleEn: 'Froth for 20 Seconds',
        titleHi: '20 सेकंड ब्लेंड करें',
        instructionEn: 'Blend on high speed until thick, creamy, and thoroughly frothy.',
        instructionHi: 'तेज स्पीड पर 20 सेकंड ब्लेंड करें जब तक कि ऊपर गाढ़ा झाग न आ जाए।',
        durationMinutes: 1,
        timerSeconds: 20,
      },
      {
        stepNumber: 3,
        titleEn: 'Pour & Garnish',
        titleHi: 'परोसें',
        instructionEn: 'Pour into hurricane glasses. Garnish with a fresh pineapple wedge, maraschino cherry, and a paper umbrella.',
        instructionHi: 'लंबे ग्लास में डालें। अनानास की स्लाइस और चेरी से सजाकर ठंडी-ठंडी परोसें।',
        durationMinutes: 2,
      }
    ]
  },

  // 15. Hibiscus Cranberry Ruby Bloom
  {
    id: 'hibiscus_cranberry_ruby_bloom',
    nameEn: 'Hibiscus Cranberry Ruby Bloom',
    nameHi: 'गुड़हल क्रैनबेरी रूबी ब्लूम',
    taglineEn: 'Jewel-toned botanical hibiscus infusion paired with crisp cranberry and warm aromatic spices',
    taglineHi: 'गुड़हल के फूलों का काढ़ा, क्रैनबेरी और दालचीनी की खुशबू वाला लाल रूबी मॉकटेल',
    descriptionEn: 'A sophisticated European-style botanical cooler. Deep ruby steeped dried hibiscus (roselle) tea blended with tart cranberry juice, cinnamon-honey syrup, fresh orange peel, and sparkling water.',
    descriptionHi: 'शानदार गहरे लाल रंग का विदेशी बॉटनिकल ड्रिंक। गुड़हल के फूलों के अर्क में क्रैनबेरी का जूस, दालचीनी-शहद का सिरप और संतरा मिलाकर सोडे के साथ बनाया जाता है।',
    prepTime: 7,
    cookTime: 3,
    totalTime: 10,
    defaultServings: 2,
    difficulty: 'Easy',
    dietary: 'Vegan',
    mealCategory: 'Beverages',
    cuisine: 'Fusion',
    featured: false,
    quickRecipe: true,
    image: 'https://images.unsplash.com/photo-1587888637140-849b25d80ef9?w=800&auto=format&fit=crop&q=80',
    allergensEn: ['None'],
    allergensHi: ['कोई एलर्जी नहीं'],
    tipsEn: [
      'Steep dried hibiscus flowers in boiling water for 3 minutes, then chill completely for an intense natural ruby hue.',
      'Express fresh orange peel over the glass rim to release citrus oils.'
    ],
    tipsHi: [
      'गुड़हल के सूखे फूलों को 3 मिनट उबलते पानी में भिगोकर छानें और ठंडा कर लें, इससे गहरा लाल रंग मिलता है।',
      'संतरे के छिलके को हल्का दबाकर ग्लास के ऊपर छिड़कें ताकि भीनी-भीनी खुशबू आए।'
    ],
    ingredients: [
      { id: 'sugar', nameEn: 'Dried Hibiscus Flower Tea (Chilled)', nameHi: 'गुड़हल की चाय (ठंडी की हुई)', amount: 150, unit: 'ml', isRequired: true },
      { id: 'pomegranate_juice', nameEn: 'Tart Cranberry Juice', nameHi: 'क्रैनबेरी का रस', amount: 150, unit: 'ml', isRequired: true },
      { id: 'honey', nameEn: 'Honey or Cinnamon Syrup', nameHi: 'शहद या दालचीनी सिरप', amount: 2, unit: 'tbsp', isRequired: true },
      { id: 'lemon', nameEn: 'Fresh Lemon Juice', nameHi: 'नींबू का रस', amount: 1.5, unit: 'tbsp', isRequired: true },
      { id: 'club_soda', nameEn: 'Chilled Sparkling Water', nameHi: 'ठंडा स्पार्कलिंग वाटर / सोडा', amount: 200, unit: 'ml', isRequired: true },
      { id: 'mint', nameEn: 'Fresh Rosemary or Mint Sprig', nameHi: 'रोज़मेरी या पुदीना', amount: 2, unit: 'sprigs', isRequired: false },
    ],
    steps: [
      {
        stepNumber: 1,
        titleEn: 'Brew & Chill Hibiscus',
        titleHi: 'गुड़हल का अर्क तैयार करें',
        instructionEn: 'Brew dried hibiscus in hot water for 3 minutes, strain, stir in honey, and chill over ice.',
        instructionHi: 'गुड़हल के फूलों को गर्म पानी में 3 मिनट उबालकर छान लें, शहद मिलाएं और बर्फ में रखकर ठंडा करें।',
        durationMinutes: 3,
        timerSeconds: 180,
      },
      {
        stepNumber: 2,
        titleEn: 'Shake with Cranberry',
        titleHi: 'क्रैनबेरी के साथ शेक करें',
        instructionEn: 'In a shaker, combine chilled hibiscus tea, cranberry juice, and lemon juice with ice.',
        instructionHi: 'शेक करने वाले बर्तन में ठंडा गुड़हल का अर्क, क्रैनबेरी जूस और नींबू का रस बर्फ के साथ शेक करें।',
        durationMinutes: 1,
      },
      {
        stepNumber: 3,
        titleEn: 'Top & Garnish',
        titleHi: 'सोडा डालें व सजाएं',
        instructionEn: 'Strain into tall glasses filled with clear ice cubes. Top with sparkling water and a rosemary sprig.',
        instructionHi: 'बर्फ से भरे ग्लास में छानकर डालें, ऊपर से स्पार्कलिंग वाटर भरें और रोज़मेरी की डंडी से सजाएं।',
        durationMinutes: 2,
      }
    ]
  },

  // 16. Orange Sunrise Grenadine Tonic
  {
    id: 'orange_sunrise_grenadine_tonic',
    nameEn: 'Orange Sunrise Grenadine Tonic',
    nameHi: 'ऑरेंज सनराइज टॉनिक मॉकटेल',
    taglineEn: 'Striking layered sunset mocktail with crisp citrus brightness and botanical tonic water',
    taglineHi: 'उगते सूरज जैसा दो रंगों का खूबसूरत ड्रिंक, संतरा और अनार के गाढ़े सिरप के साथ',
    descriptionEn: 'A breathtaking layered visual masterpiece. Cold-pressed sweet orange juice layered over dense ruby pomegranate grenadine and crowned with botanical tonic water, producing an ethereal morning sunrise gradation.',
    descriptionHi: 'देखने में सबसे खूबसूरत लेयर्ड मॉकटेल। ताज़े संतरे के रस को नीचे रखे अनार के गाढ़े ग्रेनेडीन सिरप पर धीरे से डाला जाता है, जिससे उगते सूरज जैसी लाल-नारंगी लेयर बनती है।',
    prepTime: 4,
    cookTime: 0,
    totalTime: 4,
    defaultServings: 2,
    difficulty: 'Easy',
    dietary: 'Vegan',
    mealCategory: 'Beverages',
    cuisine: 'Fusion',
    featured: false,
    quickRecipe: true,
    image: 'https://images.unsplash.com/photo-1621263764843-09435b0b1c05?w=800&auto=format&fit=crop&q=80',
    allergensEn: ['None'],
    allergensHi: ['कोई एलर्जी नहीं'],
    tipsEn: [
      'Pour grenadine slowly down the inside edge of the glass so it sinks naturally beneath the orange juice without mixing.',
      'Do not stir before serving to preserve the dramatic gradient.'
    ],
    tipsHi: [
      'ग्रेनेडीन सिरप को ग्लास की दीवार से सटाकर धीरे से डालें ताकि वह नीचे बैठ जाए और संतरे के साथ न घुले।',
      'सर्व करते समय इसे हिलाएं नहीं ताकि शानदार दो रंगों का सनराइज इफेक्ट बना रहे।'
    ],
    ingredients: [
      { id: 'orange_juice', nameEn: 'Fresh Valencia Orange Juice', nameHi: 'ताज़ा संतरे का रस', amount: 300, unit: 'ml', isRequired: true },
      { id: 'pomegranate_juice', nameEn: 'Grenadine or Thick Pomegranate Syrup', nameHi: 'ग्रेनेडीन या गाढ़ा अनार सिरप', amount: 3, unit: 'tbsp', isRequired: true },
      { id: 'club_soda', nameEn: 'Tonic Water or Sparkling Club Soda', nameHi: 'टॉनिक वाटर या क्लब सोडा', amount: 150, unit: 'ml', isRequired: true },
      { id: 'lemon', nameEn: 'Lime Juice', nameHi: 'नींबू का रस', amount: 1, unit: 'tbsp', isRequired: true },
      { id: 'mint', nameEn: 'Fresh Mint & Orange Wheels', nameHi: 'संतरे की स्लाइस व पुदीना', amount: 2, unit: 'slices', isRequired: false },
    ],
    steps: [
      {
        stepNumber: 1,
        titleEn: 'Fill with Ice & Citrus',
        titleHi: 'बर्फ और जूस भरें',
        instructionEn: 'Fill highball glasses completely with ice cubes. Pour fresh orange juice and lime juice until three-quarters full.',
        instructionHi: 'लंबे गिलासों को बर्फ से भरें। तीन-चौथाई हिस्से तक ताज़ा संतरे का रस और थोड़ा नींबू का रस डालें।',
        durationMinutes: 1,
      },
      {
        stepNumber: 2,
        titleEn: 'Sink the Grenadine',
        titleHi: 'ग्रेनेडीन सिरप डालें',
        instructionEn: 'Slowly pour 1.5 tbsp grenadine syrup down the inside wall of each glass. It will sink to the bottom, creating the fiery red sunrise base.',
        instructionHi: 'डेढ़ चम्मच ग्रेनेडीन सिरप ग्लास के किनारे से धीरे-धीरे डालें। यह भारी होने के कारण नीचे जाकर बैठ जाएगा।',
        durationMinutes: 1,
      },
      {
        stepNumber: 3,
        titleEn: 'Float Tonic & Garnish',
        titleHi: 'टॉनिक डालें',
        instructionEn: 'Gently float tonic water on top. Garnish with a half orange wheel clipped to the rim and a fresh mint sprig.',
        instructionHi: 'ऊपर से हल्का टॉनिक वाटर या सोडा डालें। संतरे के स्लाइस से सजाकर स्ट्रॉ के साथ सर्व करें।',
        durationMinutes: 2,
      }
    ]
  },

  // 17. Green Apple Cinnamon Mule
  {
    id: 'green_apple_cinnamon_mule',
    nameEn: 'Green Apple Cinnamon Mule',
    nameHi: 'ग्रीन एप्पल दालचीनी म्यूल',
    taglineEn: 'Tart granny smith apple spiced with fiery ginger beer and aromatic Ceylon cinnamon',
    taglineHi: 'खट्टे-मीठे हरे सेब, दालचीनी और तीखे जिंजर बीयर का कॉपर मग मॉकटेल',
    descriptionEn: 'A tavern-inspired non-alcoholic mule. Fresh green apple juice infused with aromatic Ceylon cinnamon and lime, topped with spicy non-alcoholic ginger beer and served in ice-cold glasses.',
    descriptionHi: 'विश्वप्रसिद्ध मॉस्को म्यूल का नॉन-अल्कोहलिक रूप। हरे सेब के ताज़े रस में दालचीनी, नींबू और तीखा जिंजर बीयर (सोडा) मिलाकर बर्फ के साथ चिल्ड सर्व किया जाता है।',
    prepTime: 5,
    cookTime: 0,
    totalTime: 5,
    defaultServings: 2,
    difficulty: 'Easy',
    dietary: 'Vegan',
    mealCategory: 'Beverages',
    cuisine: 'Fusion',
    featured: false,
    quickRecipe: true,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&auto=format&fit=crop&q=80',
    allergensEn: ['None'],
    allergensHi: ['कोई एलर्जी नहीं'],
    tipsEn: [
      'Garnish with a cinnamon stick and thin fan of green apple slices dusted with cinnamon powder.',
      'Spicy ginger beer provides far more character than sweet ginger ale.'
    ],
    tipsHi: [
      'ग्लास में साबुत दालचीनी की स्टिक और सेब के पतले स्लाइस सजाएं।',
      'जिंजर बीयर (नॉन-अल्कोहलिक) का तीखापन सेब के खट्टेपन के साथ बेहतरीन मेल खाता है।'
    ],
    ingredients: [
      { id: 'sugar', nameEn: 'Cold-Pressed Green Apple Juice', nameHi: 'हरे सेब का ताजा जूस', amount: 250, unit: 'ml', isRequired: true },
      { id: 'ginger_ale', nameEn: 'Spicy Non-Alcoholic Ginger Beer or Ginger Ale', nameHi: 'जिंजर बीयर या जिंजर एल', amount: 250, unit: 'ml', isRequired: true },
      { id: 'lemon', nameEn: 'Fresh Lime Juice', nameHi: 'नींबू का रस', amount: 2, unit: 'tbsp', isRequired: true },
      { id: 'sugar', nameEn: 'Ground Cinnamon / Cinnamon Stick', nameHi: 'दालचीनी पाउडर / साबुत स्टिक', amount: 0.25, unit: 'tsp', isRequired: true, isPantryStaple: true },
      { id: 'honey', nameEn: 'Maple Syrup or Honey', nameHi: 'शहद या मेपल सिरप', amount: 1, unit: 'tbsp', isRequired: false },
    ],
    steps: [
      {
        stepNumber: 1,
        titleEn: 'Mix Apple & Spice',
        titleHi: 'सेब व दालचीनी मिलाएं',
        instructionEn: 'Stir green apple juice, lime juice, a pinch of ground cinnamon, and honey together in a pitcher.',
        instructionHi: 'जार में हरे सेब का रस, नींबू का रस, चुटकी भर दालचीनी पाउडर और शहद अच्छी तरह मिला लें।',
        durationMinutes: 2,
      },
      {
        stepNumber: 2,
        titleEn: 'Pack with Ice',
        titleHi: 'बर्फ भरें',
        instructionEn: 'Fill copper mugs or rocks glasses with crushed ice and insert a whole cinnamon stick.',
        instructionHi: 'कॉपर मग या ग्लास को कुटी हुई बर्फ से भरें और एक दालचीनी की लकड़ी अंदर खड़ी करें।',
        durationMinutes: 1,
      },
      {
        stepNumber: 3,
        titleEn: 'Top with Ginger Beer',
        titleHi: 'जिंजर बीयर डालें',
        instructionEn: 'Pour the apple mixture halfway, then top to the rim with fizzy ginger beer. Garnish with crisp apple fan slices.',
        instructionHi: 'आधा सेब का रस डालें और ऊपर से चिल्ड जिंजर बीयर भरें। सेब के स्लाइस से सजाकर परोसें।',
        durationMinutes: 2,
      }
    ]
  },

  // 18. Peach Thyme Cold Brew Iced Tea
  {
    id: 'peach_thyme_cold_brew_tea',
    nameEn: 'Peach Thyme Cold Brew Iced Tea',
    nameHi: 'आड़ू थाइम कोल्ड ब्रू टी मॉकटेल',
    taglineEn: 'Delicate sweet peach combined with robust Assam single-estate tea and fresh earthy garden thyme',
    taglineHi: 'असम की कड़क चाय, मीठा आड़ू (पीच) और थाइम की ताज़ा खुशबूदार आइस्ड टी',
    descriptionEn: 'The peak of artisanal iced tea crafting. Rich Assam cold-brewed black tea infused with sweet white peach puree, bruised aromatic garden thyme sprigs, lemon juice, and a gentle fizz.',
    descriptionHi: 'गर्मियों की दोपहर के लिए कैफे-स्टाइल आइस्ड टी मॉकटेल। असम की ठंडी ब्लैक टी में मीठे आड़ू (पीच) का पल्प, ताज़ा थाइम और नींबू मिलाकर स्पार्कलिंग सोडे के साथ बनाया जाता है।',
    prepTime: 5,
    cookTime: 0,
    totalTime: 5,
    defaultServings: 2,
    difficulty: 'Easy',
    dietary: 'Vegan',
    mealCategory: 'Beverages',
    cuisine: 'Fusion',
    featured: false,
    quickRecipe: true,
    image: 'https://images.unsplash.com/photo-1499638673689-79a0b5115d87?w=800&auto=format&fit=crop&q=80',
    allergensEn: ['None'],
    allergensHi: ['कोई एलर्जी नहीं'],
    tipsEn: [
      'Clap fresh thyme between hands to wake up the floral herbal oils before dropping into the glass.',
      'Cold brewing tea prevents the bitterness often found in hot-brewed iced teas.'
    ],
    tipsHi: [
      'थाइम की टहनी को हथेलियों में हल्का मसलकर डालें ताकि खुशबू तुरंत घुल जाए।',
      'चाय को ठंडे पानी में 4-6 घंटे रख कर कोल्ड ब्रू करने से कड़वाहट बिल्कुल नहीं आती।'
    ],
    ingredients: [
      { id: 'sugar', nameEn: 'Cold Brewed Assam Black Tea', nameHi: 'ठंडी बनाई गई असम ब्लैक टी', amount: 250, unit: 'ml', isRequired: true },
      { id: 'sugar', nameEn: 'White Peach Puree or Peach Nectar', nameHi: 'आड़ू (पीच) का पल्प या रस', amount: 150, unit: 'ml', isRequired: true },
      { id: 'lemon', nameEn: 'Fresh Lemon Juice', nameHi: 'नींबू का रस', amount: 2, unit: 'tbsp', isRequired: true },
      { id: 'honey', nameEn: 'Honey or Agave', nameHi: 'शहद या सिरप', amount: 2, unit: 'tbsp', isRequired: true },
      { id: 'mint', nameEn: 'Fresh Thyme Sprigs', nameHi: 'ताज़ा थाइम या पुदीना', amount: 4, unit: 'sprigs', isRequired: true },
      { id: 'club_soda', nameEn: 'Chilled Club Soda (Optional top-up)', nameHi: 'ठंडा क्लब सोडा', amount: 100, unit: 'ml', isRequired: false },
    ],
    steps: [
      {
        stepNumber: 1,
        titleEn: 'Shake Tea & Peach',
        titleHi: 'चाय और आड़ू शेक करें',
        instructionEn: 'In a shaker with ice, vigorously combine cold brew black tea, peach puree, lemon juice, honey, and fresh thyme.',
        instructionHi: 'शेक करने वाले जार में ठंडी ब्लैक टी, पीच पल्प, नींबू का रस, शहद और थाइम डालकर बर्फ के साथ शेक करें।',
        durationMinutes: 2,
        timerSeconds: 15,
      },
      {
        stepNumber: 2,
        titleEn: 'Strain into Glasses',
        titleHi: 'ग्लास में छानें',
        instructionEn: 'Strain over fresh crystal ice into tall Collins glasses.',
        instructionHi: 'बर्फ से भरे लंबे गिलासों में छलनी से छानकर डालें।',
        durationMinutes: 1,
      },
      {
        stepNumber: 3,
        titleEn: 'Top & Garnish',
        titleHi: 'सजाएं',
        instructionEn: 'Top with a splash of soda. Garnish with a peach slice and a fresh thyme sprig.',
        instructionHi: 'ऊपर से थोड़ा सोडा डालें और आड़ू के स्लाइस तथा थाइम की टहनी से सजाकर परोसें।',
        durationMinutes: 2,
      }
    ]
  },

  // 19. Starfruit Spiced Shandy (Kamrakh Cooler)
  {
    id: 'starfruit_spiced_shandy',
    nameEn: 'Starfruit Spiced Shandy (Kamrakh Cooler)',
    nameHi: 'कमरख मसाला शैन्डी मॉकटेल',
    taglineEn: 'Tart five-point starfruit juice blended with zesty ginger ale and chatpata rock salt',
    taglineHi: 'खट्टे कमरख (स्टारफ्रूट) का रस, जिंजर एल और चाट मसाले का चटपटा रिफ्रेशर',
    descriptionEn: 'A dazzling tribute to roadside starfruit vendors. Fresh tart starfruit (kamrakh) juice spiced with roasted cumin, black salt, and lemon, topped with non-alcoholic ginger ale for a bubbly golden shandy.',
    descriptionHi: 'सर्दियों और गर्मियों का अनोखा देशी स्वाद। खट्टे-मीठे कमरख के ताज़े रस में भुना ज़ीरा, काला नमक और नींबू मिलाकर ऊपर से चिल्ड जिंजर एल का तड़का दिया जाता है।',
    prepTime: 5,
    cookTime: 0,
    totalTime: 5,
    defaultServings: 2,
    difficulty: 'Easy',
    dietary: 'Vegan',
    mealCategory: 'Beverages',
    cuisine: 'Pan-Indian',
    featured: false,
    quickRecipe: true,
    image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=800&auto=format&fit=crop&q=80',
    allergensEn: ['None'],
    allergensHi: ['कोई एलर्जी नहीं'],
    tipsEn: [
      'Slice starfruit crosswise to obtain picturesque five-point star stars to float as garnishes.',
      'Slightly ripe yellow starfruit balances tartness with subtle natural sweetness.'
    ],
    tipsHi: [
      'कमरख को आड़ा काटने पर प्राकृतिक 5-कोनों वाले तारे जैसे सुंदर स्लाइस बनते हैं, जिन्हें ग्लास पर लगाएं।',
      'हल्के पीले पके कमरख का इस्तेमाल करने से खटास और मिठास दोनों का अच्छा बैलेंस मिलता है।'
    ],
    ingredients: [
      { id: 'sugar', nameEn: 'Fresh Starfruit (Kamrakh) Juice', nameHi: 'कमरख (स्टारफ्रूट) का ताज़ा रस', amount: 200, unit: 'ml', isRequired: true },
      { id: 'ginger_ale', nameEn: 'Chilled Ginger Ale', nameHi: 'ठंडी जिंजर एल / लेमन सोडा', amount: 250, unit: 'ml', isRequired: true },
      { id: 'black_salt', nameEn: 'Black Salt (Kala Namak)', nameHi: 'काला नमक', amount: 0.5, unit: 'tsp', isRequired: true, isPantryStaple: true },
      { id: 'chaat_masala', nameEn: 'Chaat Masala', nameHi: 'चाट मसाला', amount: 0.5, unit: 'tsp', isRequired: true },
      { id: 'lemon', nameEn: 'Fresh Lime Juice', nameHi: 'नींबू का रस', amount: 1.5, unit: 'tbsp', isRequired: true },
      { id: 'sugar', nameEn: 'Starfruit Star Slices (Garnish)', nameHi: 'कमरख के स्टार स्लाइस', amount: 4, unit: 'slices', isRequired: false },
    ],
    steps: [
      {
        stepNumber: 1,
        titleEn: 'Season Kamrakh Juice',
        titleHi: 'कमरख रस में मसाले मिलाएं',
        instructionEn: 'In a pitcher, stir starfruit juice with lime juice, black salt, and chaat masala until unified.',
        instructionHi: 'जार में कमरख का रस, नींबू का रस, काला नमक और चाट मसाला डालकर मिला लें।',
        durationMinutes: 2,
      },
      {
        stepNumber: 2,
        titleEn: 'Fill with Ice & Slices',
        titleHi: 'बर्फ और स्टार स्लाइस डालें',
        instructionEn: 'Fill beer glasses with ice cubes and place starfruit star slices pressed against the glass sides.',
        instructionHi: 'ग्लासों में बर्फ डालें और कमरख के कटे हुए तारे जैसे सुंदर स्लाइस ग्लास के अंदर चिपका दें।',
        durationMinutes: 1,
      },
      {
        stepNumber: 3,
        titleEn: 'Pour Ginger Ale',
        titleHi: 'जिंजर एल डालें',
        instructionEn: 'Pour spiced starfruit juice halfway and top with fizzy ginger ale. Stir once and serve chilled.',
        instructionHi: 'मसालेदार कमरख रस आधा डालें और ऊपर से चिल्ड जिंजर एल भरें। तुरंत सर्व करें।',
        durationMinutes: 2,
      }
    ]
  },

  // 20. Royal Kesar Pista Mastani Float
  {
    id: 'royal_kesar_pista_mastani',
    nameEn: 'Royal Kesar Pista Mastani Float',
    nameHi: 'शाही केसर पिस्ता मस्तानी मॉकटेल',
    taglineEn: 'Luxurious Pune-style dessert mocktail crowned with royal Kashmiri saffron and crushed pistachios',
    taglineHi: 'पुणे का सुप्रसिद्ध केसर-पिस्ता मस्तानी ड्रिंक, मलाई कुल्फी और सूखे मेवों के साथ',
    descriptionEn: 'The crown jewel of Indian dessert mocktails born in Pune. Creamy saffron-infused chilled milk shake crowned with a scoop of malai kulfi ice cream, toasted pistachios, slivered almonds, and royal rose syrup drizzle.',
    descriptionHi: 'पुणे का शाही और समृद्ध डेज़र्ट ड्रिंक। कश्मीरी केसर से बने गाढ़े शेक में मलाई कुल्फी का स्कूप, भुने पिस्ता-बादाम की कतरन और ऊपर से गुलाब के शर्बत की ड्रिज़ल की जाती है।',
    prepTime: 5,
    cookTime: 0,
    totalTime: 5,
    defaultServings: 2,
    difficulty: 'Easy',
    dietary: 'Veg',
    mealCategory: 'Beverages',
    cuisine: 'Maharashtrian',
    featured: true,
    quickRecipe: true,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&auto=format&fit=crop&q=80',
    allergensEn: ['Dairy (Milk, Ice Cream)', 'Tree Nuts (Pistachio, Almond)'],
    allergensHi: ['डेयरी (दूध, आइसक्रीम)', 'मेवे (पिस्ता, बादाम)'],
    tipsEn: [
      'Steep saffron threads in 2 tbsp warm milk for 10 minutes beforehand to unlock the golden yellow color and aroma.',
      'Serve with both a thick straw and a long dessert spoon to enjoy the float.'
    ],
    tipsHi: [
      'केसर के धागों को 2 चम्मच गुनगुने दूध में 10 मिनट पहले भिगो दें ताकि गहरा सुनहरा रंग और खुशबू निकले।',
      'इसे स्ट्रॉ और चम्मच दोनों के साथ सर्व करें ताकि आइसक्रीम और शेक दोनों का मज़ा लिया जा सके।'
    ],
    ingredients: [
      { id: 'milk', nameEn: 'Full Cream Milk (Chilled)', nameHi: 'ठंडा फुल क्रीम दूध', amount: 350, unit: 'ml', isRequired: true },
      { id: 'sugar', nameEn: 'Kashmiri Saffron (Kesar Threads)', nameHi: 'कश्मीरी केसर के धागे', amount: 15, unit: 'strands', isRequired: true },
      { id: 'sugar', nameEn: 'Vanilla or Malai Kulfi Ice Cream', nameHi: 'वैनिला या मलाई कुल्फी आइसक्रीम', amount: 2, unit: 'scoops', isRequired: true },
      { id: 'dry_fruits', nameEn: 'Slivered Pistachios & Almonds (Pista/Badam)', nameHi: 'कटा पिस्ता और बादाम', amount: 2, unit: 'tbsp', isRequired: true },
      { id: 'rose_syrup', nameEn: 'Rose Syrup (For Drizzle)', nameHi: 'गुलाब का शर्बत (ड्रिज़ल के लिए)', amount: 1.5, unit: 'tbsp', isRequired: true },
      { id: 'sugar', nameEn: 'Cardamom Powder', nameHi: 'इलायची पाउडर', amount: 0.25, unit: 'tsp', isRequired: false },
      { id: 'sugar', nameEn: 'Sugar', nameHi: 'चीनी', amount: 2, unit: 'tbsp', isRequired: true, isPantryStaple: true },
    ],
    steps: [
      {
        stepNumber: 1,
        titleEn: 'Blend Saffron Milkshake',
        titleHi: 'केसर शेक ब्लेंड करें',
        instructionEn: 'In a blender, blend chilled milk with bloomed saffron, sugar, cardamom powder, and 1 scoop of ice cream until frothy and golden.',
        instructionHi: 'ब्लेंडर में ठंडा दूध, भीगा केसर, चीनी, इलायची पाउडर और 1 स्कूप आइसक्रीम डालकर झागदार होने तक चलाएं।',
        durationMinutes: 2,
      },
      {
        stepNumber: 2,
        titleEn: 'Assemble in Glasses',
        titleHi: 'ग्लास में डालें',
        instructionEn: 'Drizzle rose syrup along the insides of two tall sundae glasses. Pour the thick saffron shake up to 80% full.',
        instructionHi: 'ग्लास के अंदर किनारों पर गुलाब का शर्बत ड्रिज़ल करें। फिर 80% तक गाढ़ा केसर शेक भरें।',
        durationMinutes: 1,
      },
      {
        stepNumber: 3,
        titleEn: 'Crown with Ice Cream & Nuts',
        titleHi: 'आइसक्रीम व मेवे से सजाएं',
        instructionEn: 'Top each glass with a generous scoop of ice cream. Shower with toasted pistachios, slivered almonds, and a touch of saffron. Serve with a spoon and straw.',
        instructionHi: 'ऊपर 1 बड़ा स्कूप आइसक्रीम रखें। ढेर सारा कटा पिस्ता, बादाम और केसर के धागे छिड़कें। चम्मच व स्ट्रॉ के साथ शाही अंदाज़ में परोसें।',
        durationMinutes: 2,
      }
    ]
  }
];
