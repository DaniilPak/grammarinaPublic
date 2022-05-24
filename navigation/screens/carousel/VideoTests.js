// Inspiration: https://dribbble.com/shots/14139308-Simple-Scroll-Animation
// Illustrations by: SAMji https://dribbble.com/SAMji_illustrator

import * as React from 'react';
import { StatusBar,
    FlatList,
    Image,
    Animated,
    Text,
    View, 
    Dimensions,
    StyleSheet, 
    TouchableOpacity,
    Button } from 'react-native';

// Video 
import Video from 'react-native-video';

// Icons 
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from 'react-native/Libraries/NewAppScreen';

// SOUNDS::
// FAIL SOUND
import Sound from 'react-native-sound';
Sound.setCategory('Playback');
var FAIL_SOUND = new Sound(require('../../../android/app/src/main/res/raw/fail.mp3'), error => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
});

// WIN SOUND
var WIN_SOUND = new Sound(require('../../../android/app/src/main/res/raw/win.mp3'), error => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
});

// VOLUME SETTINGS
FAIL_SOUND.setVolume(0.6);
WIN_SOUND.setVolume(0.6);
// ...

const { width, height } = Dimensions.get('screen');
const window = Dimensions.get('window');

const imageW = width * 0.9; // Длина блока ответов (4 штук)
const imageH = imageW * 0.22; // Высота блока ответов (4 штук)

const videoWidth = width;
const videoHeight = videoWidth * 0.55;

// Информация которую приложение получает
// от сервера
// Каждный блок - один видеотест
var data = [{ 
    source: 'https://paksol.ru/gramma/Forest.mp4',
    poster: 'https://paksol.ru/gramma/Forest.png',
    tip: "Там можно спросить - что смешного?",
    server_choice_1: {
        text: "What's so funny?",
        correct: true,
        choice_index: 0,
    },
    server_choice_2: {
        text: "What funny?",
        correct: false,
        choice_index: 1,
    },
    server_choice_3: {
        text: "So so funny?",
        correct: false,
        choice_index: 2,
    },
    server_choice_4: {
        text: "What no funny?",
        correct: false,
        choice_index: 3,
    },
},
{ 
    source: 'https://paksol.ru/gramma/wallstreet.mp4',
    poster: 'https://paksol.ru/gramma/wolf.png',
    tip: "Какой же отличный день!",
    server_choice_1: {
        text: "Wooh, what a day!",
        correct: false,
        choice_index: 0,
    },
    server_choice_2: {
        text: "Wooh, what day!",
        correct: false,
        choice_index: 1,
    },
    server_choice_3: {
        text: "Wooh, what a nice day!",
        correct: true,
        choice_index: 2,
    },
    server_choice_4: {
        text: "Wow, what nice day!",
        correct: false,
        choice_index: 3,
    },
},
];

export default class VideoTests extends React.Component {
    // Аним валю для Флет Листа
    // не трогать
    scrollX = new Animated.Value(0);

    state = {
        data: [],
        // Переменные для
        // анимации тряски
        // при неправильном ответе
        shakeAnimation: new Animated.Value(0),
        shakeAnimation2: new Animated.Value(0),
        shakeAnimation3: new Animated.Value(0),
        shakeAnimation4: new Animated.Value(0),
        // Переменные для анимации 
        // изменения цвета бекграунда
        // на зеленый или красный в 
        // зависимости от правильности
        // ответа
        backAnim: new Animated.Value(0),
        backAnim2: new Animated.Value(0),
        backAnim3: new Animated.Value(0),
        backAnim4: new Animated.Value(0),
        // Переменная для
        // прогрес бара
        progressVal: 0,
    };

    // API request
    // Getting Tests as JSON from API
    async getApiTests() {
        try {
            // API for Tests
            const response = await fetch(this.props.route.params.apilink); // Apilink is data from initialParams from Stack.Screen
            // Getting API JSON as TEXT
            // and replacing all &quot; to " character
            const api_data_text = await (await response.text()).replaceAll('&quot;', '"');
            let api_json = JSON.parse(api_data_text);
            // Finally saving api data to state
            this.setState({ data: api_json });
            data = api_json;
            // console.log(this.state.data);
        } catch (error) {
            console.log(error);
        }
    }

    componentDidMount() {
        // getting API function
        this.getApiTests();
    }
    // API request end...

    incrementProgressVal = () => {
        if(this.state.progressVal < this.state.data.length) {
            this.setState({
                progressVal: this.state.progressVal + 1
            });
        }
    };

    // Вызывается когда юзер
    // нажал на верный ответ
    winCheck = (choice, index) => {
        // Добавить единицу в прогрес бар
        this.incrementProgressVal();
        // Посмотреть какой номер у ответа
        // и в зависимости от номера изменить
        // внутренний стейт
        switch(choice.choice_index) {
            case 0:
                // Анимация бекграунда тачбл
                Animated.sequence([
                    Animated.timing(this.state.backAnim, {
                        duration: 100,
                        toValue: 1,
                        useNativeDriver: false
                    }),
                    Animated.timing(this.state.backAnim, {
                        delay: 400,
                        duration: 100,
                        toValue: 0,
                        useNativeDriver: false
                    })
                ]).start();
                // ...
                break;
            case 1:
                // Анимация бекграунда тачбл
                Animated.sequence([
                    Animated.timing(this.state.backAnim2, {
                        duration: 100,
                        toValue: 1,
                        useNativeDriver: false
                    }),
                    Animated.timing(this.state.backAnim2, {
                        delay: 400,
                        duration: 100,
                        toValue: 0,
                        useNativeDriver: false
                    })
                ]).start();
                // ...
                break;
            case 2:
                // Анимация бекграунда тачбл
                Animated.sequence([
                    Animated.timing(this.state.backAnim3, {
                        duration: 100,
                        toValue: 1,
                        useNativeDriver: false
                    }),
                    Animated.timing(this.state.backAnim3, {
                        delay: 400,
                        duration: 100,
                        toValue: 0,
                        useNativeDriver: false
                    })
                ]).start();
                // ...
                break;
            case 3:
                // Анимация бекграунда тачбл
                Animated.sequence([
                    Animated.timing(this.state.backAnim4, {
                        duration: 100,
                        toValue: 1,
                        useNativeDriver: false
                    }),
                    Animated.timing(this.state.backAnim4, {
                        delay: 400,
                        duration: 100,
                        toValue: 0,
                        useNativeDriver: false
                    })
                ]).start();
                // ...
                break;
            default:
                break;
        }

        // Звук правильного ответа
        WIN_SOUND.play();

        // Пролистнуть страницу 
        // через полсекунды
        setTimeout(() => {
            if(index + 1 == this.state.data.length) {
                this.props.navigation.navigate('HomeTabs');
            } else {
                this.flatListRef.scrollToIndex({animated: true, index: index + 1 });
            }
        }, 800);
    }

    loseCheck = (choice) => {
        switch(choice.choice_index) {
            case 0:
                // Анимация тряски при
                // неправильном ответе
                Animated.parallel([
                    Animated.sequence([
                        Animated.timing(this.state.shakeAnimation, { toValue: 1.5, duration: 70, useNativeDriver: true }),
                        Animated.timing(this.state.shakeAnimation, { toValue: -1.5, duration: 70, useNativeDriver: true }),
                        Animated.timing(this.state.shakeAnimation, { toValue: 1.5, duration: 70, useNativeDriver: true }),
                        Animated.timing(this.state.shakeAnimation, { toValue: 0, duration: 70, useNativeDriver: true })
                    ]),
                    Animated.sequence([
                        Animated.timing(this.state.backAnim, {
                            duration: 100,
                            toValue: 1,
                            useNativeDriver: false
                        }),
                        Animated.timing(this.state.backAnim, {
                            delay: 500,
                            duration: 100,
                            toValue: 0,
                            useNativeDriver: false
                        })
                    ]),
                ]).start();
                // ...
                break;
            case 1:
                // Анимация тряски при
                // неправильном ответе
                Animated.parallel([
                    Animated.sequence([
                        Animated.timing(this.state.shakeAnimation2, { toValue: 1.5, duration: 70, useNativeDriver: true }),
                        Animated.timing(this.state.shakeAnimation2, { toValue: -1.5, duration: 70, useNativeDriver: true }),
                        Animated.timing(this.state.shakeAnimation2, { toValue: 1.5, duration: 70, useNativeDriver: true }),
                        Animated.timing(this.state.shakeAnimation2, { toValue: 0, duration: 70, useNativeDriver: true })
                    ]),
                    Animated.sequence([
                        Animated.timing(this.state.backAnim2, {
                            duration: 100,
                            toValue: 1,
                            useNativeDriver: false
                        }),
                        Animated.timing(this.state.backAnim2, {
                            delay: 500,
                            duration: 100,
                            toValue: 0,
                            useNativeDriver: false
                        })
                    ]),
                ]).start();
                // ...
                break;
            case 2:
                // Анимация тряски при
                // неправильном ответе
                Animated.parallel([
                    Animated.sequence([
                        Animated.timing(this.state.shakeAnimation3, { toValue: 1.5, duration: 70, useNativeDriver: true }),
                        Animated.timing(this.state.shakeAnimation3, { toValue: -1.5, duration: 70, useNativeDriver: true }),
                        Animated.timing(this.state.shakeAnimation3, { toValue: 1.5, duration: 70, useNativeDriver: true }),
                        Animated.timing(this.state.shakeAnimation3, { toValue: 0, duration: 70, useNativeDriver: true })
                    ]),
                    Animated.sequence([
                        Animated.timing(this.state.backAnim3, {
                            duration: 100,
                            toValue: 1,
                            useNativeDriver: false
                        }),
                        Animated.timing(this.state.backAnim3, {
                            delay: 500,
                            duration: 100,
                            toValue: 0,
                            useNativeDriver: false
                        })
                    ]),
                ]).start();
                // ...
                break;
            case 3:
                // Анимация тряски при
                // неправильном ответе
                Animated.parallel([
                    Animated.sequence([
                        Animated.timing(this.state.shakeAnimation4, { toValue: 1.5, duration: 70, useNativeDriver: true }),
                        Animated.timing(this.state.shakeAnimation4, { toValue: -1.5, duration: 70, useNativeDriver: true }),
                        Animated.timing(this.state.shakeAnimation4, { toValue: 1.5, duration: 70, useNativeDriver: true }),
                        Animated.timing(this.state.shakeAnimation4, { toValue: 0, duration: 70, useNativeDriver: true })
                    ]),
                    Animated.sequence([
                        Animated.timing(this.state.backAnim4, {
                            duration: 100,
                            toValue: 1,
                            useNativeDriver: false
                        }),
                        Animated.timing(this.state.backAnim4, {
                            delay: 500,
                            duration: 100,
                            toValue: 0,
                            useNativeDriver: false
                        })
                    ]),
                ]).start();
                // ...
                break;
            default:
                break;
        }

        // Звук неправильного ответа
        FAIL_SOUND.play();
    }

    render() {
        // Создаем компонент для анимации
        // пространства тачбл для блока
        // ответа
        const AnimatedButton = Animated.createAnimatedComponent(TouchableOpacity);
        // Константы анимации для 4-х
        // блоков ответа
        // бекграунд ЗЕЛЕНОГО цвета
        const backgroundColor = this.state.backAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ['#3c3a3f', '#7dee9e']
        });
        const backgroundColor2 = this.state.backAnim2.interpolate({
            inputRange: [0, 1],
            outputRange: ['#3c3a3f', '#7dee9e']
        });
        const backgroundColor3 = this.state.backAnim3.interpolate({
            inputRange: [0, 1],
            outputRange: ['#3c3a3f', '#7dee9e']
        });
        const backgroundColor4 = this.state.backAnim4.interpolate({
            inputRange: [0, 1],
            outputRange: ['#3c3a3f', '#7dee9e']
        });
        // Константы анимации для 4-х
        // блоков ответа
        // бекграунд КРАСНОГО цвета
        const backgroundColorRed = this.state.backAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ['#3c3a3f', '#cd7180']
        });
        const backgroundColorRed2 = this.state.backAnim2.interpolate({
            inputRange: [0, 1],
            outputRange: ['#3c3a3f', '#cd7180']
        });
        const backgroundColorRed3 = this.state.backAnim3.interpolate({
            inputRange: [0, 1],
            outputRange: ['#3c3a3f', '#cd7180']
        });
        const backgroundColorRed4 = this.state.backAnim4.interpolate({
            inputRange: [0, 1],
            outputRange: ['#3c3a3f', '#cd7180']
        });
        // И для тряски
        const shakingZ = this.state.shakeAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '1deg']
        });
        const shakingZ2 = this.state.shakeAnimation2.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '1deg']
        });
        const shakingZ3 = this.state.shakeAnimation3.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '1deg']
        });
        const shakingZ4 = this.state.shakeAnimation4.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '1deg']
        });

        return ( <>
            <View style={[ styles.container, {
                alignItems: 'center',
            } ]}>
                <StatusBar hidden />
                <Progress step={this.state.progressVal} steps={data.length} height={8} />
            </View>
                <Animated.FlatList
                    data={this.state.data}
                    onScroll={Animated.event([
                        {
                            nativeEvent: {
                                contentOffset: {
                                    x: this.scrollX
                                }
                            } 
                        }
                      ],
                      {useNativeDriver: false}
                    )}
                    keyExtractor={(_, index) => index.toString()}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={false}
                    ref={(ref) => { this.flatListRef = ref; }}
                    renderItem={({item, index}) => {
                        return <>
                            <View
                                style={{
                                    flex: 1,
                                    backgroundColor: '#1d1920',
                                }}
                            >
                                <View
                                    style={{
                                        flex: 3,
                                        backgroundColor: '#000', // Black screen
                                    }}
                                >
                                    <VideoComponent item={item} />
                                </View>
                                <View
                                    style={{
                                        flex: 1.3,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                    >
                                    <Text
                                        style={{
                                            fontSize: 18,
                                            color: '#c7c7c9', // Dim white
                                        }}
                                    >{item.tip}</Text>
                                </View>
                                <View
                                    style={{
                                        flex: 6,
                                        marginBottom: 10,
                                    }}
                                >
                                    <Animated.View style={[styles.choiceFieldContainer, {
                                        transform: [{ rotateZ: shakingZ }],
                                    }
                                    ]}>
                                        <AnimatedButton
                                            activeOpacity={1} // Disable darken effect on click
                                            onPress={
                                                item.server_choice_1.correct ? () => 
                                                {this.winCheck(item.server_choice_1, index)} : () =>
                                                {this.loseCheck(item.server_choice_1)} }
                                            style={[styles.choiceTouchable, { backgroundColor: item.server_choice_1.correct ? backgroundColor : backgroundColorRed }]}>
                                            <Text style={styles.choiceField}>{item.server_choice_1.text}</Text>
                                        </AnimatedButton>
                                    </Animated.View>

                                    <Animated.View style={[styles.choiceFieldContainer, {
                                        transform: [{ rotateZ: shakingZ2 }],
                                    }
                                    ]}>
                                        <AnimatedButton
                                            activeOpacity={1} // Disable darken effect on click
                                            onPress={
                                                item.server_choice_2.correct ? () => 
                                                {this.winCheck(item.server_choice_2, index)} : () =>
                                                {this.loseCheck(item.server_choice_2)} }
                                            style={[styles.choiceTouchable, { backgroundColor: item.server_choice_2.correct ? backgroundColor2 : backgroundColorRed2 }]}>
                                            <Text style={styles.choiceField}>{item.server_choice_2.text}</Text>
                                        </AnimatedButton>
                                    </Animated.View>

                                    <Animated.View style={[styles.choiceFieldContainer, {
                                        transform: [{ rotateZ: shakingZ3 }],
                                    }
                                    ]}>
                                        <AnimatedButton
                                            activeOpacity={1} // Disable darken effect on click
                                            onPress={
                                                item.server_choice_3.correct ? () => 
                                                {this.winCheck(item.server_choice_3, index)} : () =>
                                                {this.loseCheck(item.server_choice_3)} }
                                            style={[styles.choiceTouchable, { backgroundColor: item.server_choice_3.correct ? backgroundColor3 : backgroundColorRed3 }]}>
                                            <Text style={styles.choiceField}>{item.server_choice_3.text}</Text>
                                        </AnimatedButton>
                                    </Animated.View>

                                    <Animated.View style={[styles.choiceFieldContainer, {
                                        transform: [{ rotateZ: shakingZ4 }],
                                    }
                                    ]}>
                                        <AnimatedButton
                                            activeOpacity={1} // Disable darken effect on click
                                            onPress={
                                                item.server_choice_4.correct ? () => 
                                                {this.winCheck(item.server_choice_4, index)} : () =>
                                                {this.loseCheck(item.server_choice_4)} }
                                            style={[styles.choiceTouchable, { backgroundColor: item.server_choice_4.correct ? backgroundColor4 : backgroundColorRed4 }]}>
                                            <Text style={styles.choiceField}>{item.server_choice_4.text}</Text>
                                        </AnimatedButton>
                                    </Animated.View>

                                </View>
                            </View>
                        </>
                    }}>
                </Animated.FlatList>
            </>
        );
    }
};

// Progress bar
const Progress = ({step, steps, height}) => {
    const [width, setWidth] = React.useState(0);
    const animatedValue = React.useRef(new Animated.Value(-1000)).current;
    const reactive = React.useRef(new Animated.Value(-1000)).current;

    React.useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: reactive,
            duration: 300,
            useNativeDriver: true
        }).start();
    }, []);

    React.useEffect(() => {
        reactive.setValue(-width + (width * step) / steps);
    }, [step, width]);

    return(
        <>
            <View
            onLayout={(e) => {
                const newWidth = e.nativeEvent.layout.width;
                setWidth(newWidth);
            }}
            style={{
                height,
                backgroundColor: '#636169',
                borderRadius: height,
                overflow: 'hidden',
                width: '80%',
            }}>
                <Animated.View style={{
                    height,
                    width: '100%',
                    borderRadius: height,
                    backgroundColor: '#ffde00',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    transform: [
                        {
                            translateX: animatedValue,
                        }
                    ],
                }}/>
            </View>
        </>
    );
}

// Video Component
const VideoComponent = ({ item }) => {
    const [videoPaused, setVideoPaused] = React.useState(true);
    
    return(
        <>
            <TouchableOpacity 
                activeOpacity={1} // Disable darken effect on click
                onPress={() => {
                    setVideoPaused(!videoPaused);
                  }}
            >
                <Video
                    source={{ uri: "https://grina.paksol.ru/backend/media/" + item.source }}
                    rate={1.0}
                    volume={1.0}
                    muted={false}
                    paused={videoPaused ? true : false}
                    resizeMode="cover" // contain 
                    // shouldPlay // isLooping
                    poster={item.poster}
                    onEnd={() => setVideoPaused(true)}
                    style={{ width: videoWidth,
                            height: videoHeight,
                        }}
                />
                <View style={{
                    backgroundColor: '#ddddd5',
                    width: 40,
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: width/2, // rounded circle
                    position: 'absolute',
                    top: '45%',
                    left: '47%',
                    display: videoPaused ? 'flex' : 'none',
                }}>
                    <Ionicons name="play" size={17} color="#111" /> 
                </View>
            </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 0.08,
        justifyContent: 'center',
        backgroundColor: '#1d1920',
    },
    choiceField: {
        // backgroundColor: '#777',
        width: imageW,
        height: imageH,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 20,
        color: '#fff',
        borderRadius: 6,
    },
    choiceFieldContainer: {
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    choiceTouchable: {
        backgroundColor: '#777',
        borderRadius: 6,
    },
    new: {
        flex: 1,
        backgroundColor: 'red'
    }
});
