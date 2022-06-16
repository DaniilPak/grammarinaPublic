import * as React from 'react'
import { View, Text } from 'react-native'

export default function ProgressScreen(navigation) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#000'}}>
            <Text 
                onPress={() => alert('This is a Check Screen')}
                style={{ fontSize: 26, fontWeight: 'bold', color: '#eee' }}
            >Progress Screen</Text>
        </View>
    );
}