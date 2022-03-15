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

add "raw" folder with sounds (name sounds with lowercase, it's case sensitive)



Yarn install: 

In PowerShell 

Set-ExecutionPolicy unrestricted


For moti install you need Yarn
Write:

yarn add react-native-reanimated@next react-native-gesture-handler

npm i moti
npm i @motify/components
npm i @motify/core
npm i react-native-gesture-handler

in  index.js (Everything has to had a access to gesture handler)

import 'react-native-gesture-handler'

in babel.config.js:

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: ['react-native-reanimated/plugin'], 
};

in android/app/build.gradle:

project.ext.react = [
    enableHermes: true,  // clean and rebuild if changing
]


in MainApplication.java:

Under:
List<ReactPackage> packages = new PackageList(this).getPackages();
Add:

@Override
        protected JSIModulePackage getJSIModulePackage() { 
          return new ReanimatedJSIModulePackage(); 
        }

and:

import com.facebook.react.bridge.JSIModulePackage;
import com.swmansion.reanimated.ReanimatedJSIModulePackage;

in your component js file: 

import { MotiView } from 'moti';
import 'react-native-reanimated'; 

to use Moti

Moti installation end.

npm i react-native-secure-storage

For Google Authentication:












