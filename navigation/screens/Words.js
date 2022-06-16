import * as React from 'react'
import { View, Text, ScrollView } from 'react-native'

export default function WordsScreen(navigation) {
    return (
        <View style={{ 
                    flex: 1,
                    backgroundColor: '#2b2723',
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
                <View style={{ marginTop: 25 }}>
                    <View style={{
                        width: '50%',
                        height: 150,
                        backgroundColor: 'orange',
                        borderRadius: 18,
                    }}>
                        <Text style={{ position: 'absolute', fontSize: 20, color: '#fff', left: 20, bottom: 20, width: '80%' }}>
                            Учить новые слова и фразы
                        </Text>
                    </View>
                </View>
                {/* Learn new container end */}
            </ScrollView>
        </View>
    );
}