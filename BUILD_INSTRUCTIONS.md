# SoFlu Mobile App - Build Instructions

## Prerequisites

### For Android Development:
- Flutter SDK (latest stable version)
- Android Studio or VS Code with Flutter extension
- Java Development Kit (JDK) 11 or higher
- Android SDK (API level 21 minimum, 34 recommended)

### For iOS Development (macOS only):
- Xcode 14.0 or later
- iOS 11.0 minimum target
- Apple Developer Account (for distribution)
- CocoaPods

## Setup Instructions

### 1. Install Flutter
```bash
# Download Flutter SDK from https://flutter.dev/docs/get-started/install
# Add Flutter to your PATH
flutter doctor
```

### 2. Clone and Setup Project
```bash
git clone <your-repo-url>
cd soflu
flutter pub get
```

### 3. Generate Keystore for Android (First time only)
```bash
# Navigate to android/app directory
cd android/app

# Generate keystore (replace with your details)
keytool -genkey -v -keystore soflu-keystore.jks -keyalg RSA -keysize 2048 -validity 10000 -alias soflu-key

# When prompted, use:
# Keystore password: soflu123
# Key password: soflu123
# Keep the keystore file safe - you'll need it for all future releases
```

## Building for Android

### Debug APK (for testing)
```bash
flutter build apk --debug
# Output: build/app/outputs/flutter-apk/app-debug.apk
```

### Release APK (for distribution)
```bash
flutter build apk --release
# Output: build/app/outputs/flutter-apk/app-release.apk
```

### Android App Bundle (recommended for Play Store)
```bash
flutter build appbundle --release
# Output: build/app/outputs/bundle/release/app-release.aab
```

## Building for iOS (macOS only)

### 1. Setup iOS Project
```bash
cd ios
pod install
cd ..
```

### 2. Open in Xcode
```bash
open ios/Runner.xcworkspace
```

### 3. Configure Signing in Xcode
1. Select Runner project in navigator
2. Go to "Signing & Capabilities" tab
3. Select your Team (Apple Developer Account)
4. Ensure Bundle Identifier is unique: `com.soflu.app`

### 4. Build IPA
```bash
# For testing on device
flutter build ios --release

# For App Store distribution
flutter build ipa --release
# Output: build/ios/ipa/soflu.ipa
```

## Installation Instructions

### Android APK Installation
1. Enable "Unknown Sources" in Android Settings > Security
2. Transfer APK file to device
3. Tap APK file and follow installation prompts

### iOS IPA Installation
1. **For Development/Testing:**
   - Use Xcode to install directly to connected device
   - Or use TestFlight for beta testing

2. **For Distribution:**
   - Upload IPA to App Store Connect
   - Submit for App Store review

## Troubleshooting

### Common Android Issues:
```bash
# Clean build
flutter clean
flutter pub get
cd android && ./gradlew clean && cd ..
flutter build apk --release
```

### Common iOS Issues:
```bash
# Clean build
flutter clean
flutter pub get
cd ios && rm -rf Pods Podfile.lock && pod install && cd ..
flutter build ios --release
```

### Asset Issues:
- Ensure all asset files exist in the specified paths
- Run `flutter pub get` after adding new assets
- Check pubspec.yaml for correct asset declarations

## File Locations

### Android Outputs:
- Debug APK: `build/app/outputs/flutter-apk/app-debug.apk`
- Release APK: `build/app/outputs/flutter-apk/app-release.apk`
- App Bundle: `build/app/outputs/bundle/release/app-release.aab`

### iOS Outputs:
- IPA: `build/ios/ipa/soflu.ipa`
- Archive: Available through Xcode Organizer

## Version Management

### Update Version:
1. Edit `pubspec.yaml`:
   ```yaml
   version: 1.0.1+2  # version+build_number
   ```

2. Rebuild:
   ```bash
   flutter clean
   flutter pub get
   flutter build apk --release  # for Android
   flutter build ipa --release  # for iOS
   ```

## Distribution

### Android:
- **Direct APK**: Share APK file directly
- **Google Play Store**: Upload AAB file to Play Console

### iOS:
- **TestFlight**: Upload IPA to App Store Connect for beta testing
- **App Store**: Submit through App Store Connect

## Security Notes

1. **Keep keystore file secure** - backup in multiple safe locations
2. **Never commit keystore or key.properties to version control**
3. **Use different keystores for debug and release builds**
4. **For iOS, manage certificates through Apple Developer Portal**

## Support

For build issues:
1. Run `flutter doctor` to check setup
2. Check Flutter documentation: https://flutter.dev/docs
3. Verify all dependencies are compatible with current Flutter version