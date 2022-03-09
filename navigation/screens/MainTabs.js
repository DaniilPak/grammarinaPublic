// Basic 
import * as React from 'react';
import { View, Text, Platform, StatusBar, StyleSheet, Image, Dimensions, TouchableOpacity, Animated, FlatList } from 'react-native';

// Bottom tab, basic navigations
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens 
import DetailsScreen from './DetailsScreen';
import SettingsScreen from './SettingsScreen';

// VideoCards, VideoTests
import VideoCards from './carousel/VideoCards';
import VideoTests from './carousel/VideoTests';

// Context to deliver data
// Through screens
import { MyContext } from '../../MyContext';

// Moti for animation
import { MotiView } from 'moti';
import 'react-native-reanimated';

// Width and Height of the screen
const { widthDevice, heightDevice } = Dimensions.get('screen');

// Bottom navigator colors
const MyTheme = {
    dark: true,
    colors: {
      primary: 'rgb(255, 255, 255)',
      background: 'rgb(255, 255, 255)', // White
      card: 'rgb(0, 0, 0)', // Black
      text: 'rgb(255, 255, 255)',
      border: 'rgb(255, 255, 255)',
      notification: 'rgb(255, 255, 255)',
    },
};

// Creating bottom tab navigator
// It is a nested stack
// It's parent is basic Stack Screens
const Tab = createBottomTabNavigator();

function HomeTabs(){
    return(
        <Tab.Navigator
            initialRouteName={'Home'}
            screenOptions={({route}) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let rn = route.name;

                    if (rn === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (rn === 'Details') {
                        iconName = focused ? 'list' : 'list-outline';
                    } else if (rn === 'Settings') {
                        iconName = focused ? 'settings' : 'settings-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />
                }
            })}
        >
            <Tab.Screen name={'Home'} component={InitialScreen} options={{header: () => null}} />
            <Tab.Screen name={'Details'} component={DetailsScreen} options={{header: () => null}} />
            <Tab.Screen name={'Settings'} component={SettingsScreen} options={{header: () => null}} />
        </Tab.Navigator>
    );
}

// Sliding down panel
// With subcources
const FadeInView = (props) => {
    const heightAnim = React.useRef(new Animated.Value(0)).current
    const opacityAnim = React.useRef(new Animated.Value(0)).current

    React.useEffect(() => {
        Animated.parallel([
            Animated.timing(opacityAnim, {
                delay: 25,
                duration: 200,
                toValue: 1,
                useNativeDriver: false
            }),
            Animated.timing(heightAnim, {
                duration: 100,
                toValue: 300,
                useNativeDriver: false
            })
        ]).start();
    }, []);

    return (
        <Animated.View                 // Special animatable View
            style={{
                ...props.style,
                height: heightAnim,         // Bind opacity to animated value
                opacity: opacityAnim,
            }}
            >
            {props.children}
        </Animated.View>
    );
}

// TESTING
const DATA = [
    {
      id: "1",
      title: "First Item",
    },
    {
      id: "2",
      title: "Second Item",
    },
    {
      id: "3",
      title: "Third Item",
    },
];

const CourseItem = ({ item, onPress, object }) => {
    const animVal = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.loop(
            Animated.timing(animVal, {
            toValue: 150,
            duration: 3000,
            useNativeDriver: false
            })
        ).start()
    }, []);

    var dropDown = object ? 
    <FadeInView style={{ 
        width: widthDevice,
        height: 300,
        backgroundColor: '#3f4b59',
        marginTop: 25,
    }}>
        <View style={styles.triangle}></View>
    </FadeInView> : null;

    return (
    <>
        <View style={{ marginTop: 25,
                    marginVertical: 24,
                    marginHorizontal: 36,
                    alignItems: 'flex-start' 
                }}>
            <View style={{ height: 125, alignItems: 'center', justifyContent: 'center' }}>

                <TouchableOpacity 
                    style={{ alignItems: 'center' }}
                    onPress={onPress}
                    activeOpacity={1} // Disable darken effect on click
                >
                    <Image
                        style={{ width: 125, height: 125 }}
                        source={{uri: 'https://paksol.ru/gramma/rigby.png'}}
                    />
                    <Text style={{ 
                        position: 'absolute',
                        bottom: -20,
                        fontSize: 17,
                        color: 'white',
                        backgroundColor: '#00b6f5',
                        borderRadius: 35,
                        paddingTop: 7,
                        paddingBottom: 7,
                        paddingLeft: 17,
                        paddingRight: 17,
                        fontWeight: 'bold',
                    }}>
                    Краткий разговор
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
        {dropDown}
    </>
    );
};

// First Bottom Tab view 
// Where video cources 
// stored
class InitialScreen extends React.Component {
    constructor(props) {
        super(props);
        this.setSelectedId = this.setSelectedId.bind(this);

        this.state = {
            selectedId: null
        }
    }

    setSelectedId = (id) => {
        if(id === this.state.selectedId) {
            this.setState({
                selectedId: null
            })
        } 
        else {
            this.setState({
                selectedId: id
            })
        }
    }

    render() {
        const renderItem = ({item}) => {
            const object = item.id === this.state.selectedId ? true : false;

            return (
                <CourseItem
                    item={item}
                    onPress={() => this.setSelectedId(item.id)}
                    object={object}
                />
            );
        }

        return (
            <View style={{ flex: 1, backgroundColor: '#000' }}>
                <View style={{ paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, paddingLeft: 15 }}>
                <MotiView
                    from={{ opacity: 0, scale: 1 }}
                    animate={{ opacity: 1, scale: 4}}
                    style={[StyleSheet.absoluteFillObject, { width: 100, height: 100, backgroundColor: 'red'}]}
                />
                    <Text 
                        onPress={() => this.props.navigation.navigate('Play', { data: this.context.data }) }
                        style={{ fontSize: 26, fontWeight: 'bold', color: 'white' }}
                    >Учебные курсы</Text>
                    {/*
                    <View style={{ alignItems: 'center', paddingTop: 20 }}>
                        <Text
                            style={{ fontSize: 26, fontWeight: 'bold', color: 'white' }}
                        >Основы лексики</Text>
                    </View>
                    */}
                    <FlatList
                        data={DATA} // ex data
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={renderItem}
                        extraData={this.state.selectedId}
                    >
                    </FlatList>

                </View>
            </View>
        );
    }
};

// Context of InitialScreen
InitialScreen.contextType = MyContext;

// Tabs Parent
// Creating basic stack navigator
// It owns a bottom tab navigator
// So that PlayScreen not having a bottom tab 
// Only Screens inside "HomeTabs" having a bottom tab
const Stack = createNativeStackNavigator();

class MainContainer extends React.Component {
    render() {
        return(
            // Transfer data using Context Provider
            <MyContext.Provider
                value={{
                        data: 'Context data text',
                    }}
            >
                <NavigationContainer theme={MyTheme}>
                    <Stack.Navigator>
                        <Stack.Screen
                            name="HomeTabs"
                            component={HomeTabs}
                            options={{ header: () => null }} // Makes header disappear: header: () => null,
                        />
                        <Stack.Screen 
                            name="Play"
                            component={PlayScreen}
                            options={{ header: () => null }} // Makes header disappear: header: () => null,
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </MyContext.Provider>
        );
    }
}

// Base screen, where all video learning are 
// playing
// May be used in different parts of App
class PlayScreen extends React.Component {
    render(){
        const data = this.context.data;

        return (
            <View style={{ flex: 1 }}>
                <VideoTests />
            {/* 
            {this.context.isLoading ? <ActivityIndicator/> : (
                <FlatList
                data={this.context.data}
                keyExtractor={({ id }, index) => id}
                renderItem={({ item }) => (
                    <Text>{item.title}, {item.releaseYear}</Text>
                )}
                />
            )}
            */}
            </View>
        );
    }
};

PlayScreen.contextType = MyContext;

// StyleSheet
const styles = StyleSheet.create({
    // ...
    triangle: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderTopWidth: 0,
        borderRightWidth: 10,
        borderBottomWidth: 15,
        borderLeftWidth: 10,
        borderTopColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#3f4b59',
        borderLeftColor: 'transparent',
        position: 'absolute',
        left: 90,
        top: -15,
    },
    triangleRight: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderTopWidth: 0,
        borderRightWidth: 10,
        borderBottomWidth: 15,
        borderLeftWidth: 10,
        borderTopColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#3f4b59',
        borderLeftColor: 'transparent',
        position: 'absolute',
        right: 90,
        top: -15,
    },
});

export default MainContainer;