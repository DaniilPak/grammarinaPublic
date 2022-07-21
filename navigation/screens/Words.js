import * as React from 'react'
import { View, Text, ScrollView, TouchableOpacity, Dimensions, StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';

// Moti for animation
import { AnimatePresence, MotiView } from 'moti';
import * as Reanimated from 'react-native-reanimated';

// Icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
MaterialCommunityIcons.loadFont();

// Bottom tab, and basic navigations
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Entire screen color
const interfaceColor = '#2b2723';

export default function MainWordsScreen( {navigation} ) {
    return (
        <View style={{ 
                    flex: 1,
                    backgroundColor: interfaceColor,
                    paddingLeft: 20,
                    paddingRight: 20,
                    paddingTop: 25,
                }}>
            <ScrollView>
                {/* Top letter */}
                <Text style={{ fontSize: 35, fontWeight: 'bold', color: '#fff', width: '60%' }}>
                    Время для новых слов
                </Text>
                {/* Learn new space container */}
                <View style={{ marginTop: 25, marginLeft: 10, marginBottom: 10 }}>
                    {/* Learn new button */}
                    <TouchableOpacity onPress={() => navigation.navigate('WordOrPhrase')} activeOpacity={1} >
                        <MotiView
                            style={{ width: 200 }}
                            from={{ scale: 1 }}
                            animate={{ scale: 1.05 }}
                            transition={{
                                type: 'timing',
                                duration: 900,
                                easing: Reanimated.Easing.ease,
                                repeatReverse: true,
                                loop: true,
                            }}
                        >
                            <LinearGradient colors={['#ffae04', '#ff9702', '#ff8401']} style={{
                                height: 150,
                                borderRadius: 18,
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 3,
                                },
                                shadowOpacity: 0.29,
                                shadowRadius: 4.65,

                                elevation: 7,
                            }}>
                                {/* Icon */}
                                <MaterialCommunityIcons name='lightbulb-on-outline' size={45} color={'#fff'} style={{ position: 'absolute', color: '#eee', left: 20, top: 20 }}/>
                                {/* Letter */}
                                <Text style={{ position: 'absolute', fontSize: 20, color: '#eee', left: 20, bottom: 20, width: '80%' }}>
                                    Учить новые слова и фразы
                                </Text>
                            </LinearGradient>
                        </MotiView>
                    </TouchableOpacity>
                    {/* Learn new button end */}
                </View>
                {/* Learn new container end */}
            </ScrollView>
        </View>
    );
}