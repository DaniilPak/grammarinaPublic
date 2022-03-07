For navigation, install:

npm install @react-navigation/native @react-navigation/native-stack
npm install react-native-screens react-native-safe-area-context
npm install @react-navigation/bottom-tabs

then for icons, install:

npm install react-native-vector-icons
npm install react-native-ionicons

for Video and Sound:

npm install react-native-sound
npm install react-native-video


for video work, edit android/build.gradle 
add to repositories{}

jcenter() {
            content {
                includeModule("com.yqritc", "android-scalablevideoview")
            }
        }

add "raw" with sounds






