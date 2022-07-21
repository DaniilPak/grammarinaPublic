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
import Ionicons from 'react-native-vector-icons/Ionicons';
Ionicons.loadFont();

// Navigation bottom Screens 
import SettingsScreen from './SettingsScreen';
import ProgressScreen from './Progress';

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

// Words components 
import MainWordsScreen from './Words';

// ### CONSTANTS ### 

// Width and Height of the screen
const { widthDevice, heightDevice } = Dimensions.get('screen');

// Colors 
const OCEANBLUE = '#00b1fd';
const GRAYBLUE = '#3f4b59';

// Entire App color
// Edit this value means changing the main App color
const interfaceColor = '#2b2723';

// For button's width 
const { width, height } = Dimensions.get('screen');
const buttonWidth = width * 0.8;

// Bottom navigator colors
const MyTheme = {
    dark: true,
    colors: {
      primary: 'rgb(255, 255, 255)', // Active screen color 
      background: 'rgb(255, 255, 255)', // Dont know what
      card: interfaceColor, // Tab bar background color 
      text: 'rgb(255, 255, 255)', // Inactive screen color
      border: 'rgb(156,156,150)', // Top border color
      notification: 'rgb(255, 255, 255)', // Dont know what
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
            initialRouteName={'Видеокурсы'}
            screenOptions={({ route }) => ({
                tabBarStyle: { height: 70, paddingBottom: 10, paddingTop: 10 }, // Custom tabbar settings padding and height
                tabBarIcon: ({ focused }) => {
                    let iconColor;
                    let rn = route.name;

                    if (rn === 'Видеокурсы') {
                        iconColor = focused ? 'white' : '#999';
                        return <Ionicons name="easel-outline" size={30} color={iconColor} />
                    } else if (rn === 'Слова и фразы') {
                        iconColor = focused ? 'white' : '#999';
                        return <Ionicons name="bulb-outline" size={30} color={iconColor} />
                    } else if (rn === 'Прогресс') {
                        iconColor = focused ? 'white' : '#999';
                        return <Ionicons name="calendar-sharp" size={30} color={iconColor} />
                    } else if (rn === 'Настройки') {
                        iconColor = focused ? 'white' : '#999';
                        return <Ionicons name="settings-outline" size={30} color={iconColor} />
                    }
                }
            })}
        >
            <Tab.Screen name={'Видеокурсы'} component={InitialScreen} options={{header: () => null}} />
            <Tab.Screen name={'Слова и фразы'} component={MainWordsScreen} options={{header: () => null}} />
            <Tab.Screen name={'Прогресс'} component={ProgressScreen} options={{header: () => null}} />
            <Tab.Screen name={'Настройки'} component={SettingsScreen} options={{header: () => null}} />
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
const CourseItem = ({ item, onPress, object, props }) => {
    const result = Object.keys(item.sub_courses).map(key => ({[key]: item.sub_courses[key]}));

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
                        source={{uri: item.img_uri}}
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
                    {item.course_name}
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
                            }}>{rlt[index].subcourse_title}</Text>
                            <Text 
                            onPress={() => props.navigation.navigate('Play', { api_link_cards: rlt[index].api_link_cards, api_link_tests: rlt[index].api_link_tests } )}
                            style={{
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
            data: [], // DATA from API
            selectedId: null
        }
    }
    
    // Getting data from API
    async getCoursesFromApi() {
        try {
            // API for Courses
            const response = await fetch('https://grina.paksol.ru/');
            // Getting API JSON as TEXT
            // and replacing all &quot; to " character
            const api_data_text = await (await response.text()).replaceAll('&quot;', '"');
            let api_json = JSON.parse(api_data_text);
            // Finally saving api data to state
            this.setState({ data: api_json });
            // console.log(this.state.data);
        } catch (error) {
            console.log(error);
        }
    }
    
    componentDidMount() {
        this.getCoursesFromApi();
    }
    // Getting API end

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
                    props={this.props}
                />
            );
        }

        return (
            <View style={{ flex: 1, backgroundColor: interfaceColor }}>
                {/* style={{ paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }} */}
                <View>

                    <SectionList
                        sections={this.state.data}
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
const StackPlay = createNativeStackNavigator();

function PlayScreen({ route }) {
    // Saving api data
    const { api_link_cards, api_link_tests } = route.params;
    
    {/* <View style={{ flex: 1 }}>
        { /* <VideoCards apilink={api_link_cards} /> 
        <VideoTests apilink={api_link_tests} />
    </View> */ }

    return (

        <StackPlay.Navigator>
            <StackPlay.Screen 
                name='Videocards'
                component={VideoCards}
                options={{ header: () => null }} // Makes header disappear: header: () => null,
                initialParams={{ apilink: api_link_cards }} 
            />
            <StackPlay.Screen
                name='Videotests' 
                component={VideoTests}
                options={{ header: () => null }} // Makes header disappear: header: () => null,
                initialParams={{ apilink: api_link_tests }} 
            />
        </StackPlay.Navigator>
            
    );

};


// Words Or Phrase
function WordOrPhrase({ route, navigation }) {
    return (
        <View style={{ 
            flex: 1,
            backgroundColor: interfaceColor,
            alignItems: 'center'
        }}>
            <TouchableOpacity 
                style={{ position: 'absolute', left: 20, top: 15 }}
                onPress={ () => { navigation.navigate('HomeTabs', { screen: 'Слова и фразы' })}}
            >
                <Ionicons name='close' size={40} color={'#eee'} />
            </TouchableOpacity>
            {/* Letters */}
            <View style={{ 
                    flex: 1.5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Image source={{ uri: 'https://paksol.ru/gramma/bulb.png' }} style={{ width: 125, height: 125 }} />
                <View style={{ height: 10 }}></View>
                <Text style={{ fontSize: 30, textAlign: 'center', color: 'white' }}>Что хочешь учить?</Text>
                <View style={{ height: 10 }}></View>
                <Text style={{ fontSize: 20, textAlign: 'center', color: 'white' }}>Можно учить слова или полноценные фразы и обороты</Text>
            </View>
            {/* Choose Words or Phrase buttons containter */}
            <View style={{ flex: 0.5 }}>
                {/* Choose Words */}
                <TouchableOpacity activeOpacity={1}>
                    <View style={styles.chooseButton}>
                        <Text style={{ color: 'white', fontSize: 25 }}>Слова</Text>
                    </View>
                </TouchableOpacity>
                {/* Space between buttons */}
                <View style={{ height: 15 }}></View> 
                {/* Choose Phrase */}
                <TouchableOpacity activeOpacity={1}>
                    <View style={styles.chooseButton}>
                        <Text style={{ color: 'white', fontSize: 25 }}>Фразы</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}





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
                                options={{ header: () => null,
                                    animation: "slide_from_right",
                                }} // Makes header disappear: header: () => null,
                            />
                            <Stack.Screen 
                                name="WordOrPhrase"
                                component={WordOrPhrase}
                                options={{ header: () => null,
                                    animation: "slide_from_right",
                                }} // Makes header disappear: header: () => null,
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
    chooseButton: {
        backgroundColor: '#05b919',
        width: buttonWidth,
        height: 70,
        borderRadius: 50, 
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default MainContainer;