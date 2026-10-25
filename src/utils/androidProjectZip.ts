import JSZip from 'jszip';
import { ALL_RECIPES } from '../data/allRecipes';

export async function generateAndroidStudioProjectZip(): Promise<Blob> {
  const zip = new JSZip();

  // Root gradle files
  zip.file(
    'build.gradle.kts',
    `// Top-level build file where you can add configuration options common to all sub-projects/modules.
plugins {
    alias(libs.plugins.android.application) apply false
    alias(libs.plugins.kotlin.android) apply false
    alias(libs.plugins.kotlin.compose) apply false
}
`
  );

  zip.file(
    'settings.gradle.kts',
    `pluginManagement {
    repositories {
        google {
            content {
                includeGroupByRegex("com\\\\.android.*")
                includeGroupByRegex("com\\\\.google.*")
                includeGroupByRegex("androidx.*")
            }
        }
        mavenCentral()
        gradlePluginPortal()
    }
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}

rootProject.name = "UbalKitchen"
include(":app")
`
  );

  // gradle.properties
  zip.file(
    'gradle.properties',
    `org.gradle.jvmargs=-Xmx2048m -Dfile.encoding=UTF-8
android.useAndroidX=true
android.enableJetifier=true
android.nonTransitiveRClass=true
kotlin.code.style=official
`
  );

  // app/build.gradle.kts with fixed Release signing config
  zip.file(
    'app/build.gradle.kts',
    `plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.compose)
}

android {
    namespace = "com.ubalkitchen.app"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.ubalkitchen.app"
        minSdk = 24
        targetSdk = 35
        versionCode = 1
        versionName = "1.0.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    signingConfigs {
        create("release") {
            // Decoded by GitHub Actions workflow into app/ubalkitchen-release.jks
            val keystoreFile = file("ubalkitchen-release.jks")
            if (keystoreFile.exists()) {
                storeFile = keystoreFile
                storePassword = System.getenv("KEYSTORE_PASSWORD") ?: ""
                keyAlias = System.getenv("KEY_ALIAS") ?: "ubalkitchen"
                keyPassword = System.getenv("KEY_PASSWORD") ?: ""
            }
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = true
            isShrinkResources = true
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
            val releaseConfig = signingConfigs.getByName("release")
            if (releaseConfig.storeFile?.exists() == true) {
                signingConfig = releaseConfig
            }
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlinOptions {
        jvmTarget = "17"
    }
    buildFeatures {
        compose = true
    }
}

dependencies {
    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.lifecycle.runtime.ktx)
    implementation(libs.androidx.activity.compose)
    implementation(platform(libs.androidx.compose.bom))
    implementation(libs.androidx.ui)
    implementation(libs.androidx.ui.graphics)
    implementation(libs.androidx.ui.tooling.preview)
    implementation(libs.androidx.material3)
    implementation(libs.androidx.navigation.compose)
    implementation(libs.androidx.material.icons.extended)
}
`
  );

  // AndroidManifest.xml
  zip.file(
    'app/src/main/AndroidManifest.xml',
    `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.UbalKitchen">
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:theme="@style/Theme.UbalKitchen">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>
`
  );

  // MainActivity.kt
  zip.file(
    'app/src/main/java/com/ubalkitchen/app/MainActivity.kt',
    `package com.ubalkitchen.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.ui.Modifier
import com.ubalkitchen.app.ui.HomeScreen
import com.ubalkitchen.app.ui.theme.UbalKitchenTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            UbalKitchenTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    HomeScreen()
                }
            }
        }
    }
}
`
  );

  // Bundled 50+ recipe JSON
  zip.file(
    'app/src/main/assets/recipes_database.json',
    JSON.stringify(ALL_RECIPES, null, 2)
  );

  // GitHub Actions Workflow to guarantee key never changes and build both APK and AAB
  zip.file(
    '.github/workflows/android-release.yml',
    `name: Build & Sign APK and Play Store AAB

on:
  push:
    branches: [ main, master ]
    tags: [ 'v*' ]
  workflow_dispatch:

jobs:
  bundle:
    name: Build Signed APK & AAB
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Set up Java 17
        uses: actions/setup-java@v4
        with:
          distribution: 'temurin'
          java-version: '17'
          cache: 'gradle'

      - name: Decode Permanent Keystore from Secret
        run: |
          mkdir -p app
          echo "\${{ secrets.RELEASE_KEYSTORE_BASE64 }}" | base64 --decode > app/ubalkitchen-release.jks

      - name: Set up Gradle
        uses: gradle/actions/setup-gradle@v3

      - name: Build Both AAB (Play Store) and APK (Phone Testing)
        env:
          KEYSTORE_PASSWORD: \${{ secrets.KEYSTORE_PASSWORD }}
          KEY_ALIAS: \${{ secrets.KEY_ALIAS }}
          KEY_PASSWORD: \${{ secrets.KEY_PASSWORD }}
        run: |
          chmod +x gradlew || true
          ./gradlew bundleRelease --stacktrace
          ./gradlew assembleRelease --stacktrace

      - name: Upload Play Store AAB
        uses: actions/upload-artifact@v4
        with:
          name: UbalKitchen-PlayStore-AAB
          path: app/build/outputs/bundle/release/*.aab

      - name: Upload Installable APK
        uses: actions/upload-artifact@v4
        with:
          name: UbalKitchen-Installable-APK
          path: app/build/outputs/apk/release/*.apk
`
  );

  // README.md with detailed instructions
  zip.file(
    'README.md',
    `# Ubal Kitchen — Native Android App & Play Store Release Suite
**Tagline:** Jo Ghar Mein Hai, Usi Se Kuch Naya!

## ⚠️ Important Note regarding GitHub Builds and Signing Keys:
As requested, your release key will **NEVER CHANGE** across builds when following the included GitHub Secrets guide.

### Step 1: Generate your permanent Keystore once
\`\`\`bash
keytool -genkey -v -keystore ubalkitchen-release.jks -keyalg RSA -keysize 2048 -validity 10000 -alias ubalkitchen
\`\`\`

### Step 2: Convert to Base64
\`\`\`bash
base64 -w 0 ubalkitchen-release.jks > keystore_base64.txt
\`\`\`

### Step 3: Add to GitHub Secrets (Settings -> Secrets -> Actions)
1. \`RELEASE_KEYSTORE_BASE64\` (Paste content of keystore_base64.txt)
2. \`KEYSTORE_PASSWORD\`
3. \`KEY_ALIAS\` (\`ubalkitchen\`)
4. \`KEY_PASSWORD\`

### Step 4: Push to GitHub & Run Action
Whenever you push to main or trigger the workflow, GitHub Actions will sign your \`.aab\` bundle with the exact same permanent keystore!
`
  );

  return await zip.generateAsync({ type: 'blob' });
}
