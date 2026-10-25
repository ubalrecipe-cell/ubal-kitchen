# Ubal Kitchen — Keystore & GitHub Actions Release Guide
**Tagline:** Jo Ghar Mein Hai, Usi Se Kuch Naya!
**Package Name:** `com.ubalkitchen.app`

---

## 📌 समस्या (The Problem):
> "बार-बार GitHub से ऐप बिल्ड होने पर Key बदल जाती है। प्ले स्टोर में डालने के बाद जब नया अपडेट डालते हैं तो 'Signed with wrong key' का एरर आ जाता है।"

### कारण (Why this happens):
GitHub Actions हर बिल्ड के लिए एक बिल्कुल नया और खाली वर्चुअल कंप्यूटर (रनर) तैयार करता है। अगर आप Keystore फाइल को GitHub Secrets के ज़रिए सुरक्षित तरीके से लोड नहीं करते, तो या तो:
1. वह डिफ़ॉल्ट debug.keystore से साइन हो जाता है (जो प्ले स्टोर स्वीकार नहीं करता), या
2. स्क्रिप्ट हर बार नई की (Key) बना देती है, जिससे SHA-256 फिंगरप्रिंट बदल जाता है।

---

## 🛠️ पक्का समाधान (Permanent Solution):

### चरण 1: अपने कंप्यूटर पर केवल 1 बार Keystore फाइल बनाएं
अपने कंप्यूटर के टर्मिनल (या Windows CMD) में यह कमांड चलाएं:
```bash
keytool -genkey -v -keystore ubalkitchen-release.jks -keyalg RSA -keysize 2048 -validity 10000 -alias ubalkitchen -dname "CN=Ubal Kitchen, OU=Kitchen, O=UbalKitchen, L=Mumbai, ST=Maharashtra, C=IN"
```
*नोट: आपसे पासवर्ड पूछा जाएगा। जो भी पासवर्ड रखें उसे कहीं सुरक्षित लिख लें (उदा. `Ubal@2026Secure`).*

---

### चरण 2: Keystore फाइल को Base64 में बदलें
इस बाइनरी फाइल को टेक्स्ट स्ट्रिंग में बदलने के लिए चलाएं:
- **Mac / Linux:**
  ```bash
  base64 -w 0 ubalkitchen-release.jks > keystore_base64.txt
  ```
- **Windows PowerShell:**
  ```powershell
  [Convert]::ToBase64String([IO.File]::ReadAllBytes("ubalkitchen-release.jks")) | Out-File -Encoding utf8 keystore_base64.txt
  ```

---

### चरण 3: GitHub Secrets में 4 वैल्यूज़ जोड़ें
1. अपने GitHub Repo पर जाएं।
2. **Settings** -> **Secrets and variables** -> **Actions** -> **New repository secret** पर क्लिक करें।
3. ये 4 सीक्रेट्स जोड़ें:
   - `RELEASE_KEYSTORE_BASE64` : `keystore_base64.txt` का पूरा टेक्स्ट कॉपी करके पेस्ट करें।
   - `KEYSTORE_PASSWORD` : जो पासवर्ड आपने Keystore बनाते समय डाला था।
   - `KEY_ALIAS` : `ubalkitchen`
   - `KEY_PASSWORD` : आपकी Key का पासवर्ड।

---

### चरण 4: GitHub Actions से ऑटोमैटिक दोनों फाइलें बनेंगी (APK और AAB)
जब भी आप GitHub पर नया कोड पुश करेंगे या Actions टैब में "Run workflow" दबाएंगे:
1. `.github/workflows/android-release.yml` वर्कफ्लो अपने आप चलेगा।
2. वह आपके सीक्रेट्स से वही मूल Keystore रीस्टोर करेगा।
3. यह दो फाइलें बनाएगा:
   - **`UbalKitchen-PlayStore-AAB` (`.aab` फाइल)**: जिसे आपको Google Play Console में प्रोडक्शन रिलीज़ में अपलोड करना है।
   - **`UbalKitchen-Installable-APK` (`.apk` फाइल)**: जिसे आप तुरंत डाउनलोड करके अपने Android फोन पर टेस्ट कर सकते हैं।
4. **डाउनलोड कैसे करें?**
   - GitHub रिपॉजिटरी में **Actions** टैब पर जाएं।
   - सबसे ऊपर वाली बिल्ड रन पर क्लिक करें।
   - नीचे **Artifacts** सेक्शन में आपको **UbalKitchen-PlayStore-AAB** और **UbalKitchen-Installable-APK** दोनों का डाउनलोड लिंक मिल जाएगा!
5. **परिणाम:** आपकी की (Key) और SHA-256 फिंगरप्रिंट हमेशा 100% एक ही रहेगा, चाहे आप 100 बार भी अपडेट भेजें!

