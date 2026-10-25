export interface ReleaseGuideSection {
  titleEn: string;
  titleHi: string;
  descriptionEn: string;
  descriptionHi: string;
  codeSnippet?: string;
  codeLanguage?: string;
}

export const GITHUB_KEYSTORE_SOLUTION: ReleaseGuideSection[] = [
  {
    titleEn: '1. What GitHub Actions will generate: Both APK & AAB Files',
    titleHi: '1. GitHub Actions से दोनों फाइलें बनेंगी: APK और AAB फाइल',
    descriptionEn: 'Every time you build on GitHub, two files are created with the exact same permanent release key: (1) app-release.aab to upload directly to Google Play Store Console, and (2) app-release.apk to install and test directly on your Android phone!',
    descriptionHi: 'गिटहब पर बिल्ड करने पर एक ही स्थायी की (Key) से दो अलग फाइलें बनेंगी: (1) app-release.aab फाइल जिसे गूगल प्ले स्टोर कंसोल पर अपलोड करना है, और (2) app-release.apk फाइल जिसे आप अपने फोन में सीधे इंस्टॉल करके टेस्ट कर सकते हैं!',
  },
  {
    titleEn: '2. Why does the Release Key change in GitHub Builds? (समस्या का असली कारण)',
    titleHi: '2. गिटहब से बिल्ड करने पर की (Key) बार-बार क्यों बदल जाती है?',
    descriptionEn: 'When GitHub Actions runs, each workflow runs on a temporary fresh virtual machine. If you do not provide a fixed permanent keystore file via GitHub Secrets, Gradle either generates a random temporary keystore or signs with debug key! This changes your SHA-256 fingerprint on every commit, and Google Play rejects your update with: "Your Android App Bundle is signed with the wrong key".',
    descriptionHi: 'गिटहब एक्शन्स (GitHub Actions) हर बार एक नए कंप्यूटर (रनर) पर चलता है। अगर आपने अपनी स्थायी की-स्टोर फाइल (Keystore) को गिटहब सीक्रेट्स में सुरक्षित नहीं रखा है, तो ग्रेडल हर बार नई की बना देता है। इससे हर अपडेट पर SHA-256 फिंगरप्रिंट बदल जाता है और प्ले स्टोर अपडेट को रिजेक्ट कर देता है।',
  },
  {
    titleEn: '2. Generate Permanent Keystore ONCE on your PC (एक बार स्थायी की बनाएं)',
    titleHi: '2. अपने कंप्यूटर पर केवल एक बार स्थायी Keystore फाइल बनाएं',
    descriptionEn: 'Open terminal or command prompt on your computer and run this command once. Keep the password and file safe forever (never delete it):',
    descriptionHi: 'अपने कंप्यूटर के टर्मिनल या कमांड प्रॉम्प्ट पर यह कमांड चलाएं। पासवर्ड और फाइल को जीवन भर संभाल कर रखें:',
    codeLanguage: 'bash',
    codeSnippet: `keytool -genkey -v -keystore ubalkitchen-release.jks -keyalg RSA -keysize 2048 -validity 10000 -alias ubalkitchen -dname "CN=Ubal Kitchen, OU=Food, O=Ubal, L=Mumbai, ST=Maharashtra, C=IN"`,
  },
  {
    titleEn: '3. Convert Keystore to Base64 Text (की-स्टोर को बेस64 में बदलें)',
    titleHi: '3. की-स्टोर फाइल को बेस64 टेक्स्ट में बदलें',
    descriptionEn: 'Convert the .jks file into text so it can be saved in GitHub Repository Secrets safely without uploading binary files:',
    descriptionHi: 'इस फाइल को बेस64 टेक्स्ट में बदलें ताकि इसे गिटहब सीक्रेट्स में कॉपी-पेस्ट किया जा सके:',
    codeLanguage: 'bash',
    codeSnippet: `# On Mac/Linux:
base64 -w 0 ubalkitchen-release.jks > keystore_base64.txt

# On Windows PowerShell:
[Convert]::ToBase64String([IO.File]::ReadAllBytes("ubalkitchen-release.jks")) | Out-File -Encoding utf8 keystore_base64.txt`,
  },
  {
    titleEn: '4. Add GitHub Secrets (गिटहब में 4 सीक्रेट्स जोड़ें)',
    titleHi: '4. अपने गिटहब रिपॉजिटरी में ये 4 सीक्रेट्स सेव करें',
    descriptionEn: 'Go to your GitHub repo -> Settings -> Secrets and variables -> Actions -> New repository secret. Add these 4 secrets:',
    descriptionHi: 'अपने GitHub रिपॉजिटरी में जाएं -> Settings -> Secrets and variables -> Actions -> New repository secret. ये 4 सीक्रेट्स जोड़ें:',
    codeLanguage: 'text',
    codeSnippet: `1. RELEASE_KEYSTORE_BASE64  -> (Paste the entire contents of keystore_base64.txt)
2. KEYSTORE_PASSWORD        -> (Your chosen keystore password)
3. KEY_ALIAS                -> ubalkitchen
4. KEY_PASSWORD             -> (Your chosen key password)`,
  },
  {
    titleEn: '5. Fixed GitHub Actions Workflow (.github/workflows/android-release.yml)',
    titleHi: '5. गिटहब एक्शन्स वर्कफ्लो फाइल (यह कभी की नहीं बदलेगी)',
    descriptionEn: 'Add this workflow to your repository. It automatically decodes your exact keystore before building the release AAB bundle, ensuring 100% identical signature forever!',
    descriptionHi: 'यह फाइल हर बिल्ड पर आपकी वही सुरक्षित की इस्तेमाल करेगी, जिससे प्ले स्टोर पर कभी भी "Wrong Key" का एरर नहीं आएगा:',
    codeLanguage: 'yaml',
    codeSnippet: `name: Build & Sign Android Release AAB

on:
  push:
    tags:
      - 'v*'
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Set up JDK 17
        uses: actions/setup-java@v4
        with:
          distribution: 'temurin'
          java-version: '17'
          cache: 'gradle'

      - name: Decode Release Keystore from GitHub Secret
        run: |
          echo "\${{ secrets.RELEASE_KEYSTORE_BASE64 }}" | base64 --decode > app/ubalkitchen-release.jks

      - name: Build Release Bundle (AAB)
        env:
          KEYSTORE_PASSWORD: \${{ secrets.KEYSTORE_PASSWORD }}
          KEY_ALIAS: \${{ secrets.KEY_ALIAS }}
          KEY_PASSWORD: \${{ secrets.KEY_PASSWORD }}
        run: ./gradlew bundleRelease --stacktrace

      - name: Upload Signed AAB Artifact
        uses: actions/upload-artifact@v4
        with:
          name: app-release.aab
          path: app/build/outputs/bundle/release/app-release.aab`,
  },
  {
    titleEn: '6. app/build.gradle.kts Signing Configuration',
    titleHi: '6. एंड्रॉइड प्रोजेक्ट की build.gradle.kts में साइनिंग सेट करें',
    descriptionEn: 'Configure Gradle to read the signing variables from the environment during release builds:',
    descriptionHi: 'ग्रेडल को ऐसे सेट करें कि वह रिलीज बिल्ड के समय सही की-स्टोर लोड करे:',
    codeLanguage: 'kotlin',
    codeSnippet: `android {
    namespace = "com.ubalkitchen.app"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.ubalkitchen.app"
        minSdk = 24
        targetSdk = 35
        versionCode = 1
        versionName = "1.0.0"
    }

    signingConfigs {
        create("release") {
            storeFile = file("ubalkitchen-release.jks")
            storePassword = System.getenv("KEYSTORE_PASSWORD") ?: ""
            keyAlias = System.getenv("KEY_ALIAS") ?: "ubalkitchen"
            keyPassword = System.getenv("KEY_PASSWORD") ?: ""
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = true
            isShrinkResources = true
            proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
            signingConfig = signingConfigs.getByName("release")
        }
    }
}`,
  },
];

export const PLAY_STORE_METADATA = {
  appTitle: 'Ubal Kitchen: Cook What You Have',
  shortDescriptionEn: 'Discover delicious Indian recipes using ingredients already in your kitchen!',
  shortDescriptionHi: 'जो घर में है, उसी से कुछ नया! अपनी रसोई के सामान से बनाएं 50+ स्वादिष्ट व्यंजन।',
  fullDescriptionEn: `Are you tired of wondering "Aaj kya banayein?" every single day?

Welcome to Ubal Kitchen (जो घर में है, उसी से कुछ नया!), the smart, bilingual Indian cooking companion designed for home cooks.

🌟 KEY FEATURES:
• Cook With My Ingredients: Simply tap the vegetables, flours, lentils, and spices you already have in your pantry. Ubal Kitchen instantly calculates the exact recipe match percentage and shows which required ingredients you have or need.
• 50+ Authentic Indian Recipes: From breakfast classics (Aloo Paratha, Kanda Poha, Upma, Idli) to rich lunch and dinner curries (Paneer Butter Masala, Dal Tadka, Chana Masala, Rajma, Biryani) and evening snacks (Pakora, Pav Bhaji, Chaat).
• Step-by-Step Cooking Mode: Large, distraction-free instructions with functional built-in cooking timers that chime when ready.
• 100% Offline & Private: Browse all recipes, match ingredients, and save favorites without internet access. No accounts, no data collection.
• Bilingual Hindi & English: Complete recipes, instructions, tips, and interface in both languages.
• Dynamic Servings Scaler: Automatically scales ingredient quantities from 1 to 10 people.

Download Ubal Kitchen today and cook something delightful without a grocery run!`,
  fullDescriptionHi: `क्या आप भी हर रोज़ इस सवाल से परेशान रहते हैं कि "आज खाने में क्या बनाएं?"

स्वागत है 'उबाल किचन' (Ubal Kitchen) में — जो घर में है, उसी से कुछ नया!

🌟 मुख्य विशेषताएं:
• घर के सामान से खोजें: आपके किचन में जो भी आलू, प्याज़, टमाटर, दाल, आटा या मसाले मौजूद हैं, उन्हें टिक करें। ऐप तुरंत बताएगा कि कौन सी रेसिपी 100% बन सकती है और किसमें क्या कमी है।
• 50+ प्रामाणिक भारतीय व्यंजन: नाश्ते से लेकर (आलू पराठा, कांदा पोहा, उपमा, इडली, डोसा) लंच और डिनर की शाही सब्जियां (पनीर बटर मसाला, दाल तड़का, राजमा, छोले, दम बिरयानी) और शाम के नाश्ते (पकोड़ा, पाव भाजी, समोसा)।
• स्टेप-बाय-स्टेप कुकिंग मोड: बड़े फॉन्ट में आसान निर्देश और लाइव कुकिंग टाइमर के साथ।
• 100% ऑफलाइन और सुरक्षित: बिना इंटरनेट के भी सभी 50+ रेसिपी देखें।
• हिंदी और अंग्रेजी में उपलब्ध: दोनों भाषाओं में पूरी विधि, सामग्री और टिप्स।
• सर्विंग्स एडजस्ट करें: 1 से 10 लोगों के लिए सामग्री की सही मात्रा खुद कैलकुलेट करें।

आज ही उबाल किचन डाउनलोड करें और घर में मौजूद चीज़ों से ही रोज़ कुछ नया बनाएं!`,
  category: 'Food & Drink',
  tags: ['Indian Recipes', 'Pantry Recipe Finder', 'Hindi Recipes', 'Cooking Timer', 'Veg Recipes'],
};
