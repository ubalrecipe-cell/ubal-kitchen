# Add project specific ProGuard rules here.
-keep class com.ubalkitchen.app.data.** { *; }
-keepclassmembers class * {
    @androidx.compose.runtime.Composable *;
}
