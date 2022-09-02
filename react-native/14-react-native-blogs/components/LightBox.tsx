import React, { Component, createRef } from 'react';
import { Animated, Dimensions, ImageBackground, ImageStore, Pressable, ScaledSize, ScrollView, StyleSheet, Text, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Hoverable from './hover-web/Hoverable';

export const Sample_Images = [
    'https://media.istockphoto.com/vectors/halloween-black-cat-vector-id165677842?k=20&m=165677842&s=612x612&w=0&h=u4GzrEzJXxILxE4kiowoAnTt66k_o4NtV8I1hrUTBZQ=',
    'https://m.media-amazon.com/images/I/617cTej-ZOL._AC_SX466_.jpg',
    'https://i1.sndcdn.com/avatars-Amnxymt9ouQIr8lN-jIiQqg-t500x500.jpg',
    'https://fsb.zobj.net/crop.php?r=FuMJG9rlxv62imoExKi8mROpViYtSDgKU0nejc4xNlBTfgHSyaJaY-wW2Tx3j_ct14Dqe8e7zCa43CefaYt_O23l8yCqx86KZayKh6sgYC8AWvokDcMeAxbCF04BwriWKP5C3o-y1-b3K6uWhHihjuA2rLriDXFMztRCJm1igBqPe0Y-0C1K6Mg0dvk_AGi5RwsBTDt00m2EG_rN',
    'https://cdna.artstation.com/p/assets/images/images/016/902/948/large/rona-voron-sketch1552605691615.jpg?1553895116',
    'https://i.pinimg.com/originals/43/5f/43/435f43e9badfe0cb35cf4747b879b48c.jpg',
    'https://w0.peakpx.com/wallpaper/441/918/HD-wallpaper-super-cat.jpg',
];

const DEFAULT_HEIGHT = 300;
const window = Dimensions.get("window");

interface LightBoxProps {
    images: string[];
    height?: number;
    width?: number;
}

interface LightBoxState {
    window: ScaledSize;
    isImageHovered: boolean;
}

const createLogger = (...msg: string[]) => () => {
    console.log(...msg);
};

export default class LightBox extends Component<LightBoxProps, LightBoxState> {
    scrollX = new Animated.Value(0);
    scrollViewRef = createRef<ScrollView>();

    state: Readonly<LightBoxState> = {
        window,
        isImageHovered: false,
    }

    onDimensionsChange = ({ window }: { window: ScaledSize; }) => this.setState({ window })

    componentDidMount(): void {
        Dimensions.addEventListener("change", this.onDimensionsChange);
    }

    get width() {
        return this.props.width ? Math.min(this.props.width, this.state.window.width) : this.state.window.width;
    }

    get textBackgroundColor() {
        return `rgba(0, 0, 0, ${this.state.isImageHovered ? 0.7 : 0.3})`
    }

    get textColor() {
        return `rgba(255, 255, 255, ${this.state.isImageHovered ? 0.9 : 0.3})`
    }

    scrollToIndex = (index: number) => {
        const width = this.width;
        const offset = width * index;
        this.scrollViewRef.current?.scrollTo({ x: offset, y: 0, animated: true });
    }

    render() {
        const height = this.props.height || DEFAULT_HEIGHT;
        const width = this.width;
        const imageHeight = Math.floor(0.9 * height);
        return (
            <View style={{ ...styles.scrollContainer, ...{ height: height } }}>
                <ScrollView ref={this.scrollViewRef}
                    style={{ width }}
                    horizontal={true}
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={
                        Animated.event([{
                            nativeEvent: {
                                contentOffset: {
                                    x: this.scrollX
                                }
                            }
                        }], { useNativeDriver: false })
                    }
                    scrollEventThrottle={1}
                >
                    {
                        this.props.images.map((image, index) => (
                            <View style={{
                                width,
                                height: imageHeight,
                            }} key={index}>
                                <Pressable style={{ flex: 1 }}
                                    onPressIn={() => this.setState({ isImageHovered: true })}
                                    onPressOut={() => this.setState({ isImageHovered: false })}>
                                    <Hoverable
                                        onHoverIn={() => this.setState({ isImageHovered: true })}
                                        onHoverOut={() => this.setState({ isImageHovered: false })}
                                    >
                                        <ImageBackground source={{ uri: image }} style={styles.card}>
                                            <Hoverable
                                                onHoverIn={() => this.setState({ isImageHovered: true })}
                                                onHoverOut={() => this.setState({ isImageHovered: false })}
                                            >
                                                <View style={styles.textContainer}>
                                                    <FontAwesome.Button style={styles.chevron}
                                                        backgroundColor={this.textBackgroundColor}
                                                        name="chevron-left" size={32} color={this.textColor}
                                                        onPress={() => this.scrollToIndex(index - 1)} />
                                                    <Text style={[styles.imageText,
                                                    {
                                                        backgroundColor: this.textBackgroundColor,
                                                        color: this.textColor,
                                                    }]}>Image - {index + 1}</Text>
                                                    <FontAwesome.Button style={styles.chevron} backgroundColor={this.textBackgroundColor}
                                                        name="chevron-right" size={32} color={this.textColor}
                                                        onPress={() => this.scrollToIndex(index + 1)} />
                                                </View>
                                            </Hoverable>
                                        </ImageBackground>
                                    </Hoverable>
                                </Pressable>
                            </View>
                        ))
                    }
                </ScrollView>
                <View style={styles.indicatorContainer}>
                    {this.props.images.map((image, index) => {
                        const animatedWidth = this.scrollX.interpolate({
                            inputRange: [
                                width * (index - 1),
                                width * index,
                                width * (index + 1)
                            ],
                            outputRange: [20, 40, 20],
                            extrapolate: 'clamp',

                        })
                        return (
                            <Pressable key={index} onPress={() => this.scrollToIndex(index)}>
                                <Animated.View style={[styles.dot, { width: animatedWidth }]}>
                                </Animated.View>
                            </Pressable>
                        );
                    })}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    scrollContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        flex: 1,
        marginVertical: 4,
        marginHorizontal: 16,
        borderRadius: 5,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    imageText: {
        paddingHorizontal: 24,
        paddingVertical: 8,
        borderRadius: 5,
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    indicatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dot: {
        height: 20,
        width: 20,
        borderRadius: 10,
        backgroundColor: 'silver',
        marginHorizontal: 10,
    },
    chevron: {
        paddingRight: 0,
        backgroundColor: 'transparent',
    }
})
