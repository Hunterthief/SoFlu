# Add project specific ProGuard rules here.
# You can control the set of applied configuration files using the
# proguardFiles setting in build.gradle.

# Keep Flutter classes
-keep class io.flutter.app.** { *; }
-keep class io.flutter.plugin.**  { *; }
-keep class io.flutter.util.**  { *; }
-keep class io.flutter.view.**  { *; }
-keep class io.flutter.**  { *; }
-keep class io.flutter.plugins.**  { *; }

# Keep audio player classes
-keep class xyz.luan.audioplayers.** { *; }
-keep class com.ryanheise.just_audio.** { *; }

# Keep video player classes
-keep class io.flutter.plugins.videoplayer.** { *; }

# Keep shared preferences
-keep class io.flutter.plugins.sharedpreferences.** { *; }

# Keep URL launcher
-keep class io.flutter.plugins.urllauncher.** { *; }