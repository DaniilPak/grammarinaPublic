
import * as React from 'react';
import { 
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions, 
    TouchableOpacity,
    SectionList,
    TextInput,
    Button,
} from 'react-native';

// Bottom tab, and basic navigations
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Icons
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Navigation bottom Screens 
import DetailsScreen from './DetailsScreen';
import SettingsScreen from './SettingsScreen';
import CheckerScreen from './CheckerScreen';

// Video modules
import VideoCards from './carousel/VideoCards';
import VideoTests from './carousel/VideoTests';

// Context to deliver data
// Through screens
import { MyContext } from '../../MyContext';

// Moti for animation
import { AnimatePresence, MotiView } from 'moti';
import * as Reanimated from 'react-native-reanimated';

// Local secure storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// ### CONSTANTS ### 

// Width and Height of the screen
const { widthDevice, heightDevice } = Dimensions.get('screen');

// Colors 
const OCEANBLUE = '#00b1fd';
const GRAYBLUE = '#3f4b59';

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

// ### Backend data ###
// SectionList data 
const DATA = [
    {
      section: "Основы грамматики",
      data: [
        {
            id: '1',
            courseName: 'Местоимения',
            imgUri: "https://paksol.ru/gramma/girl.png",
            subcourses: [
                { subcourseTitle: "Вопросительные", link: 'https' },
                { subcourseTitle: "Личные", link: 'https' },
            ]
        },
        {
            id: '2',
            courseName: 'Модальные глаголы',
            imgUri: "https://paksol.ru/gramma/mordenr.png",
            subcourses: [
                { subcourseTitle: "Have to / Have got to", link: 'https' },
                { subcourseTitle: "Must", link: 'https' },
                { subcourseTitle: "Can / Could", link: 'https' },
            ]
        },
      ]
    },
    {
        section: "New dishes",
        data: [
          {
              id: '3',
              courseName: 'Прилагательное',
              imgUri: "https://paksol.ru/gramma/girl.png",
              subcourses: [
                  { subcourseTitle: "Определение", link: 'https' },
              ]
          },
          {
              id: '4',
              courseName: 'Существительное',
              imgUri: "https://paksol.ru/gramma/mordenr.png",
              subcourses: [
                  { subcourseTitle: "Определение", link: 'https' },
                  { subcourseTitle: "Род", link: 'https' },
                  { subcourseTitle: "Падеж", link: 'https' },
                  { subcourseTitle: "Функции в предложении", link: 'https' },
              ]
          },
        ]
    },
];

// Creating bottom tab navigator
// It is a nested stack
// It's parent is basic Stack Screens
const Tab = createBottomTabNavigator();

function HomeTabs(){
    return(
        <Tab.Navigator
            initialRouteName={'Home'}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    let iconColor;
                    let rn = route.name;

                    if (rn === 'Home') {
                        iconColor = focused ? 'white' : '#999';
                        return <IconFontAwesome5 name="graduation-cap" size={30} color={iconColor} />
                    } else if (rn === 'Details') {
                        iconColor = focused ? 'white' : '#999';
                        return <Ionicons name='search' size={30} color={iconColor} />
                    } else if (rn === 'Checker') {
                        iconColor = focused ? 'white' : '#999';
                        return <Ionicons name="albums-sharp" size={30} color={iconColor} />
                    } else if (rn === 'Settings') {
                        iconColor = focused ? 'white' : '#999';
                        return <Ionicons name="person" size={30} color={iconColor} />
                    }
                    
                }
            })}
        >
            <Tab.Screen name={'Home'} component={InitialScreen} options={{header: () => null}} />
            <Tab.Screen name={'Checker'} component={CheckerScreen} options={{header: () => null}} />
            <Tab.Screen name={'Details'} component={DetailsScreen} options={{header: () => null}} />
            <Tab.Screen name={'Settings'} component={SettingsScreen} options={{header: () => null}} />
        </Tab.Navigator>
    );
}

// ### Courses
// Course item
// Shining circle animation
const ShineCircle = () => {
    return (
    <View style={{
        width: 100,
        height: 100,
        position: 'absolute'
    }}>
    {[...Array(3).keys()].map((index) => {
        return (
            <MotiView
                from={{ opacity: .7, scale: 0.3 }}
                animate={{ opacity: 0, scale: 2 }}
                transition={{
                    type: 'timing',
                    duration: 3000,
                    easing: Reanimated.Easing.out(Reanimated.Easing.ease),
                    repeatReverse: false,
                    loop: true,
                    delay: index * 600,
                }}
                key={index}
                style={[StyleSheet.absoluteFillObject, { 
                    width: 100,
                    height: 100,
                    borderRadius: 100,
                    backgroundColor: OCEANBLUE,
                }]}
            />
            );
        })}
    </View> 
    );
}

// Course component
const CourseItem = ({ item, onPress, object }) => {
    const result = Object.keys(item.subcourses).map(key => ({[key]: item.subcourses[key]}));

    return (
    <>
        <View style={{ 
                marginTop: 25,
                marginVertical: 24,
                marginHorizontal: 50,
                alignItems: item.id % 2 ? 'flex-start' : 'flex-end'
            }}>
            <View style={{ height: 125, alignItems: 'center', justifyContent: 'center' }}>
                {object && (<ShineCircle />)}
                <TouchableOpacity 
                    style={{ alignItems: 'center' }}
                    onPress={onPress}
                    activeOpacity={1} // Disable darken effect on click
                >
                    <Image
                        style={{ width: 125, height: 125 }}
                        source={{uri: item.imgUri}}
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
                    {item.courseName}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
  
        {/* Dropdown module with mount/unmout animations */}
        <AnimatePresence>
        {object && (
            <MotiView
                from={{ opacity: 1, height: 0 }}
                animate={{ opacity: 1, height: result.length * 70 }} // 70 is a height of one subcourse
                exit={{
                    opacity: 0,
                    height: 0
                }}
                transition={{
                    type: 'timing',
                    duration: 200,
                    easing: Reanimated.Easing.out(Reanimated.Easing.ease),
                }}
                style={{ 
                    width: widthDevice,
                    height: result.length * 70, // 70 is a height of one subcourse
                    backgroundColor: GRAYBLUE,
                    marginTop: 25,
                }}
            >
                <View style={item.id % 2 ? styles.triangle : styles.triangleRight}></View>
                {result.map((rlt, index) => {
                    return (
                        <MotiView 
                            from={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                type: 'timing',
                                duration: 500,
                                easing: Reanimated.Easing.out(Reanimated.Easing.ease),
                            }}
                            key={index + rlt} 
                            style={{ padding: 20 }}
                        >
                            <Text style={{ 
                                fontSize: 20,
                                color: 'white' 
                            }}>{rlt[index].subcourseTitle}</Text>
                            <Text style={{
                                position: 'absolute',
                                right: 15,
                                top: 20,
                                fontSize: 20,
                                color: 'white',
                                backgroundColor: OCEANBLUE,
                                borderRadius: 5,
                                paddingTop: 5,
                                paddingBottom: 5,
                                paddingLeft: 12,
                                paddingRight: 12,
                            }}>Учить</Text>
                        </MotiView>
                    );
                })}
            </MotiView>
        )}
        </AnimatePresence>
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
        const renderItemSectionList = ({item}) => {
            // SectionList realized courses
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
                {/* style={{ paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }} */}
                <View>
                    <Text 
                        onPress={() => this.props.navigation.navigate('Play') }
                        style={{ 
                            fontSize: 26,
                            fontWeight: 'bold',
                            color: 'white',
                            marginLeft: 20,
                            marginTop: 10,
                            marginBottom: 10
                        }}
                    >Учебные курсы</Text>

                    <SectionList
                        sections={DATA}
                        keyExtractor={(_, index) => index.toString() }
                        contentContainerStyle={{ paddingBottom: 400 }} // Adds space on bottom of Flat List
                        renderItem={renderItemSectionList}
                        renderSectionHeader={({ section: { section } }) => (
                            <View style={{ alignItems: 'center', marginTop: 20 }}>
                                <Text
                                    style={{ fontSize: 26, fontWeight: 'bold', color: 'white' }}
                                >{section}</Text>
                            </View>
                        )}
                    />
                    
                </View>
            </View>
        );
    }
};

// Context of InitialScreen
InitialScreen.contextType = MyContext;

// Base screen, where all video learning are 
// playing
// May be used in different parts of App
class PlayScreen extends React.Component {
    render(){
        return (
            <View style={{ flex: 1 }}>
                <VideoTests />
            </View>
        );
    }
};



// Tabs Parent
// Creating basic stack navigator
// It owns a bottom tab navigator
// So that PlayScreen not having a bottom tab 
// Only Screens inside "HomeTabs" having a bottom tab

// Authentication test
const AuthContext = React.createContext();

const Stack = createNativeStackNavigator();

function MainContainer({ navigation }) {
    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        isLoading: false,
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null,
                    };
            }
        }, 
        {
            isLoading: true, 
            isSignout: false,
            userToken: null
        }
    );

    React.useEffect(() => {
        const boostrapAsync = async () => {
            let userToken;
            
            try {
                userToken = await AsyncStorage.getItem('token');
            } catch (e) {

            }

            dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        };

        boostrapAsync();
    }, [])

    const authContext = React.useMemo(
        () => ({
            signIn: async (data) => {
                const setasyncKey = async () => {
                    try {
                        await AsyncStorage.setItem('token', 'dummy-auth-token');
                    } catch (e) {

                    }
                };
                setasyncKey();
                // ...
                dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
            }, 
            signOut: () => dispatch({ type: 'SIGN_OUT' }),
            signUp: async (data) => {
                dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
            }
        }), []
    );

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer theme={MyTheme}>
                <Stack.Navigator>
                    {state.isLoading ? (
                        <Stack.Screen name='Loading' component={LoadingScreen} />
                    ) : state.userToken == null ? (
                        <Stack.Screen
                            name='SignIn'
                            component={SignInScreen}
                            options={{
                                title: 'Sign In',
                                // When logging out, a pop animation feels intuitive
                                animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                            }}
                        />
                    ) : (
                        <>
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
                        </>
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
    );
}

function SignInScreen() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
  
    const { signIn } = React.useContext(AuthContext);
  
    return (
      <View>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Sign in" onPress={() => signIn({ username, password })} />
      </View>
    );
}

// Loading screen
function LoadingScreen() {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
}



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
        left: 101,
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
        right: 101,
        top: -15,
    },
});

export default MainContainer;