// Inspiration: https://dribbble.com/shots/14139308-Simple-Scroll-Animation
// Illustrations by: SAMji https://dribbble.com/SAMji_illustrator

import * as React from 'react';
import { StatusBar, FlatList, Image, Animated, Text, View, Dimensions, StyleSheet, TouchableOpacity, Button } from 'react-native';

// Video 
import Video from 'react-native-video';

// Icons 
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('screen');
const window = Dimensions.get('window');

const data = [
    'https://cdn.dribbble.com/users/3281732/screenshots/11192830/media/7690704fa8f0566d572a085637dd1eee.jpg?compress=1&resize=1200x1200',
    'https://cdn.dribbble.com/users/3281732/screenshots/13130602/media/592ccac0a949b39f058a297fd1faa38e.jpg?compress=1&resize=1200x1200',
    'https://cdn.dribbble.com/users/3281732/screenshots/9165292/media/ccbfbce040e1941972dbc6a378c35e98.jpg?compress=1&resize=1200x1200',
    'https://cdn.dribbble.com/users/3281732/screenshots/11205211/media/44c854b0a6e381340fbefe276e03e8e4.jpg?compress=1&resize=1200x1200',
    'https://cdn.dribbble.com/users/3281732/screenshots/7003560/media/48d5ac3503d204751a2890ba82cc42ad.jpg?compress=1&resize=1200x1200',
    'https://cdn.dribbble.com/users/3281732/screenshots/6727912/samji_illustrator.jpeg?compress=1&resize=1200x1200',
    'https://cdn.dribbble.com/users/3281732/screenshots/13661330/media/1d9d3cd01504fa3f5ae5016e5ec3a313.jpg?compress=1&resize=1200x1200'
];

const dataReal = [{ 
    image: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    serverChoice1: {
        correct: true,
        choiceIndex: 0,
    },
    serverChoice2: {
        correct: false,
        choiceIndex: 1,
    },
    serverChoice3: {
        correct: false,
        choiceIndex: 2,
    },
    serverChoice4: {
        correct: false,
        choiceIndex: 3,
    },
},
{ 
    image: 'https://www.w3schools.com/html/mov_bbb.mp4',
    serverChoice1: {
        correct: false,
        choiceIndex: 0,
    },
    serverChoice2: {
        correct: false,
        choiceIndex: 1,
    },
    serverChoice3: {
        correct: true,
        choiceIndex: 2,
    },
    serverChoice4: {
        correct: false,
        choiceIndex: 3,
    },
},
{ 
    image: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    serverChoice1: {
        correct: false,
        choiceIndex: 0,
    },
    serverChoice2: {
        correct: false,
        choiceIndex: 1,
    },
    serverChoice3: {
        correct: true,
        choiceIndex: 2,
    },
    serverChoice4: {
        correct: false,
        choiceIndex: 3,
    },
},
{ 
    image: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    serverChoice1: {
        correct: false,
        choiceIndex: 0,
    },
    serverChoice2: {
        correct: false,
        choiceIndex: 1,
    },
    serverChoice3: {
        correct: false,
        choiceIndex: 2,
    },
    serverChoice4: {
        correct: true,
        choiceIndex: 3,
    },
},
{ 
    image: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    serverChoice1: {
        correct: false,
        choiceIndex: 0,
    },
    serverChoice2: {
        correct: true,
        choiceIndex: 1,
    },
    serverChoice3: {
        correct: false,
        choiceIndex: 2,
    },
    serverChoice4: {
        correct: false,
        choiceIndex: 3,
    },
},
{ 
    image: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    serverChoice1: {
        correct: false,
        choiceIndex: 0,
    },
    serverChoice2: {
        correct: false,
        choiceIndex: 1,
    },
    serverChoice3: {
        correct: false,
        choiceIndex: 2,
    },
    serverChoice4: {
        correct: true,
        choiceIndex: 3,
    },
}
];

const imageW = width * 0.9; // initial 0.8
const imageH = imageW * 1.1; // initial 1.54

export default class VideoCards extends React.Component {

    scrollX = new Animated.Value(0);

    state = {
        dimensions: {
            window
        },
    };
    

    onDimensionsChange = ({ window }) => {
        this.setState({ dimensions: { window } });
    }

    dimensionChange = null;

    componentDidMount() {
        this.dimensionChange = Dimensions.addEventListener("change", this.onDimensionsChange);
    }
    
    componentWillUnmount() {
        this.dimensionChange.remove();
    }

    render() {
        const windowWidth = this.state.dimensions.window.width;

        return (
            <View style={{ flex: 1, backgroundColor: '#000' }}>
                { /* Page indicators */}
                <View
                    style={styles.indicatorContainer}
                >
                    {dataReal.map((image, index) => {
                        const width = this.scrollX.interpolate({
                            inputRange: [
                                windowWidth * (index - 1),
                                windowWidth * index,
                                windowWidth * (index + 1)
                            ],
                            outputRange: [8, 30, 8],
                            extrapolate: "clamp"
                        });
                        // Color animation
                        const backgroundColor = this.scrollX.interpolate({
                            inputRange: [
                                windowWidth * (index - 1),
                                windowWidth * index,
                                windowWidth * (index + 1)
                            ],
                            outputRange: ['rgb(169, 172, 176)', 'rgb(20, 111, 247)', 'rgb(169, 172, 176)'],
                            extrapolate: "clamp"
                        });
                        return (
                            <Animated.View
                                key={index}
                                style={[styles.normalDot, { width, backgroundColor }]}
                            />
                        )
                    })}
                    {/* Arrow object */}
                    <View>
                        <Animated.View
                            style={[styles.arrowDot, { width: 16 }]}
                        />
                        <Animated.View
                            style={[styles.arrowDot, { width: 14, position: 'absolute', right: 0, transform: [
                                { translateX: 4 },
                                { translateY: -3 },
                                { rotateZ: "45deg" }
                            ] 
                        }]}
                        />
                        <Animated.View
                            style={[styles.arrowDot, { width: 14, position: 'absolute', right: 0, transform: [
                                { translateX: 4 },
                                { translateY: 3 },
                                { rotateZ: "-45deg" }
                            ] 
                        }]}
                        />
                    </View>
                </View>
                { /* Page indicators */}   

                <StatusBar hidden />
                <View
                    style={StyleSheet.absoluteFillObject}
                >
                    {data.map((image, index) => {
                        const inputRange = [
                            (index - 1) * width,
                            index * width,
                            (index + 1) * width
                        ]
                        const opacity = this.scrollX.interpolate({
                            inputRange,
                            outputRange: [0, 1, 0]
                        })

                        return <Animated.Image
                            key={`image-${index}`}
                            source={{uri: image}}
                            style={[
                                StyleSheet.absoluteFillObject,
                                { opacity }
                            ]}
                            blurRadius={50}
                        />
                    })}
                </View>
                <Animated.FlatList
                    data={dataReal}
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
                    renderItem={({item}) => {
                        return <View style={{
                                    width,
                                    marginTop: 40,
                                    height: imageH,
                                    alignItems: 'center',
                                }}>
                                    {/* Card advice text */}
                                    <View
                                        style={{
                                            width: imageW,
                                            height: 80,
                                            marginBottom: 20,
                                            marginTop: 0,
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 20,
                                                color: '#c7c7c9', // Dim white
                                            }}
                                        >Так можно задавать вопрос</Text>
                                    </View>
                                    <View
                                        style={{
                                            width: imageW,
                                            height: imageH,
                                            backgroundColor: '#999',
                                            borderRadius: 10,
                                        }}
                                    >
                                        <VideoComponent item={item} />
                                        {/* 2 Text cards */}
                                        <View
                                            style={{
                                                flex: 1,
                                                backgroundColor: '#3a3a3c',
                                                borderBottomLeftRadius: 10,
                                                borderBottomRightRadius: 10,
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    flex: 1,
                                                    borderBottomWidth: 1,
                                                    borderBottomColor: '#c7c7c9',
                                                    fontSize: 25,
                                                    fontWeight: '400',
                                                    textAlign: 'center',
                                                    textAlignVertical: 'center',
                                                    color: '#07c5e5', // light blue
                                                }}
                                            >Hello, hello. What kind of bird are you?</Text>
                                            <Text
                                                style={{
                                                    flex: 1,
                                                    fontSize: 25,
                                                    textAlign: 'center',
                                                    textAlignVertical: 'center',
                                                    color: '#fff',
                                                }}
                                            >Привет, привет. Что ты за птица такая?</Text>
                                        </View>

                                    </View>
                                </View>
                    }}
                > 
                </Animated.FlatList>
                 
            </View>
        );
    }
};

// Video Component
const VideoComponent = ({ item }) => {
    const [videoPaused, setVideoPaused] = React.useState(true);

    return(
        <>
            <TouchableOpacity 
                activeOpacity={1} // Disable darken effect on click
                onPress={() => { setVideoPaused(!videoPaused) }}
            >
                <Video
                    source={{ uri: item.image }}
                    rate={1.0}
                    volume={1.0}
                    muted={false}
                    paused={videoPaused ? true : false}

                    resizeMode="cover" // contain 
                    shouldPlay // isLooping
                    style={{ width: imageW,
                            height: 200,
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                            backgroundColor: '#111',
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
    normalDot: {
        height: 8,
        width: 8,
        borderRadius: 4,
        backgroundColor: "silver",
        marginHorizontal: 4
    },
    indicatorContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1,
        flex: .3,
    },
    arrowDot: {
        height: 5,
        width: 8,
        borderRadius: 4,
        backgroundColor: "silver",
        marginHorizontal: 4
    },
});
