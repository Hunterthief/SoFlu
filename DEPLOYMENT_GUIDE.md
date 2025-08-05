# SoFlu App Deployment Guide

## Quick Start Commands

### Android APK Generation
```bash
# Debug version (for testing)
flutter build apk --debug

# Release version (for distribution)
flutter build apk --release
```

### iOS IPA Generation (macOS only)
```bash
# Setup iOS dependencies
cd ios && pod install && cd ..

# Build for iOS
flutter build ipa --release
```

## Detailed Steps

### Android Deployment

#### 1. Prepare for Release Build
```bash
# Clean previous builds
flutter clean
flutter pub get

# Verify everything is working
flutter doctor
```

#### 2. Generate Release APK
```bash
# Build release APK
flutter build apk --release --target-platform android-arm64

# For universal APK (larger file, works on all devices)
flutter build apk --release
```

#### 3. Locate Your APK
- File location: `build/app/outputs/flutter-apk/app-release.apk`
- File size: Approximately 50-80 MB
- Ready for direct installation on Android devices

### iOS Deployment

#### 1. Prerequisites (macOS only)
```bash
# Install CocoaPods if not already installed
sudo gem install cocoapods

# Setup iOS project
cd ios
pod install
cd ..
```

#### 2. Configure Xcode Project
```bash
# Open in Xcode
open ios/Runner.xcworkspace
```

In Xcode:
1. Select "Runner" project
2. Go to "Signing & Capabilities"
3. Select your Apple Developer Team
4. Ensure Bundle Identifier is unique: `com.soflu.app`

#### 3. Build IPA
```bash
# Build for iOS release
flutter build ipa --release
```

#### 4. Locate Your IPA
- File location: `build/ios/ipa/soflu.ipa`
- Ready for TestFlight or App Store submission

## Installation Methods

### Android APK Installation

#### Method 1: Direct Installation
1. Transfer APK to Android device
2. Enable "Install from Unknown Sources" in Settings
3. Tap APK file to install

#### Method 2: ADB Installation
```bash
# Connect device via USB with USB Debugging enabled
adb install build/app/outputs/flutter-apk/app-release.apk
```

### iOS IPA Installation

#### Method 1: Xcode (Development)
1. Connect iOS device
2. Open `ios/Runner.xcworkspace` in Xcode
3. Select your device as target
4. Click "Run" button

#### Method 2: TestFlight (Beta Testing)
1. Upload IPA to App Store Connect
2. Create TestFlight build
3. Invite testers via email

## File Sharing

### Android APK Sharing
- **File size**: ~50-80 MB
- **Share via**: Email, cloud storage, direct transfer
- **Installation**: Direct APK installation

### iOS IPA Sharing
- **For testing**: Use TestFlight (requires Apple Developer Account)
- **For distribution**: App Store submission
- **Enterprise**: Requires Enterprise Developer Account

## Automation Scripts

### Create Build Script (build.sh)
```bash
#!/bin/bash
echo "Building SoFlu App..."

# Clean and prepare
flutter clean
flutter pub get

# Build Android
echo "Building Android APK..."
flutter build apk --release

# Build iOS (macOS only)
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "Building iOS IPA..."
    cd ios && pod install && cd ..
    flutter build ipa --release
fi

echo "Build complete!"
echo "Android APK: build/app/outputs/flutter-apk/app-release.apk"
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "iOS IPA: build/ios/ipa/soflu.ipa"
fi
```

### Make script executable:
```bash
chmod +x build.sh
./build.sh
```

## Distribution Checklist

### Before Building:
- [ ] Update version in `pubspec.yaml`
- [ ] Test app thoroughly on both platforms
- [ ] Verify all assets are included
- [ ] Check app permissions are appropriate

### Android Release:
- [ ] APK builds successfully
- [ ] APK installs on test device
- [ ] All features work correctly
- [ ] App icon displays properly

### iOS Release:
- [ ] IPA builds successfully
- [ ] App runs on test device via Xcode
- [ ] All features work correctly
- [ ] App follows iOS design guidelines

## Troubleshooting

### Build Failures:
```bash
# Reset everything
flutter clean
flutter pub get
cd ios && rm -rf Pods Podfile.lock && pod install && cd ..

# Try building again
flutter build apk --release
```

### Asset Loading Issues:
- Verify asset paths in `pubspec.yaml`
- Check file names match exactly (case-sensitive)
- Ensure all referenced assets exist

### Permission Issues:
- Check AndroidManifest.xml for required permissions
- Verify Info.plist has necessary usage descriptions

## Final Notes

1. **Android APK** is ready for immediate distribution and installation
2. **iOS IPA** requires Apple Developer Account for distribution
3. Keep your keystore file secure for Android releases
4. Test on real devices before distributing
5. Consider using app stores for wider distribution

The generated APK and IPA files are production-ready and can be distributed to end users immediately.