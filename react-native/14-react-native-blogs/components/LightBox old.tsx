import React, { Component } from 'react'
import { Animated, Dimensions, ImageBackground, Pressable, SafeAreaView, ScaledSize, ScrollView, StyleSheet, Text, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export const Sample_Images = [
    'https://media.istockphoto.com/vectors/halloween-black-cat-vector-id165677842?k=20&m=165677842&s=612x612&w=0&h=u4GzrEzJXxILxE4kiowoAnTt66k_o4NtV8I1hrUTBZQ=',
    'https://m.media-amazon.com/images/I/617cTej-ZOL._AC_SX466_.jpg',
    'https://i1.sndcdn.com/avatars-Amnxymt9ouQIr8lN-jIiQqg-t500x500.jpg',
    'https://fsb.zobj.net/crop.php?r=FuMJG9rlxv62imoExKi8mROpViYtSDgKU0nejc4xNlBTfgHSyaJaY-wW2Tx3j_ct14Dqe8e7zCa43CefaYt_O23l8yCqx86KZayKh6sgYC8AWvokDcMeAxbCF04BwriWKP5C3o-y1-b3K6uWhHihjuA2rLriDXFMztRCJm1igBqPe0Y-0C1K6Mg0dvk_AGi5RwsBTDt00m2EG_rN',
    'https://cdna.artstation.com/p/assets/images/images/016/902/948/large/rona-voron-sketch1552605691615.jpg?1553895116',
    'https://i.pinimg.com/originals/43/5f/43/435f43e9badfe0cb35cf4747b879b48c.jpg',
    'https://w0.peakpx.com/wallpaper/441/918/HD-wallpaper-super-cat.jpg',
];

const window = Dimensions.get('window');

interface LightBoxProps{
    images: string[];
    height: number;
    width: number;
}

interface LightBoxState{
  
    window: ScaledSize;
    
}

export default class LightBox extends Component<LightBoxProps, LightBoxState> {

    state: Readonly<LightBoxState>={
        window
    }

    onDimensionsChange = ({window}:{window: ScaledSize;}) => 
        this.setState({window: window});
    
    componentDidMount(){
        Dimensions.addEventListener('change', this.onDimensionsChange);
    }
    

    scrollX = new Animated.Value(0);
    scrollRef = React.createRef<ScrollView>();

  render() {
    const imageWidth = this.props.width;
    const imageHeight = Math.floor(0.8*this.props.height);

    return (
        <SafeAreaView style={{...styles.scrollContainer, height: imageHeight}}>
            <Animated.ScrollView ref={this.scrollRef}
                style={{width: imageWidth, height: imageHeight/2}}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={10}
                
                onScroll={
                    Animated.event([{
                        nativeEvent: {
                            contentOffset: {
                                x: this.scrollX
                            }
                        }
                    }])
                }>
                      
                    {this.props.images.map((image,imageIndex)  => 

                    
                    <View style={{
                        width: imageWidth,
                        height: imageHeight,
                    }}>
                        <ImageBackground source={{ uri: image }} style={styles.card}>
                        <FontAwesome.Button name="chevron-left" style={styles.arrows} />
                        <View style={styles.textContainer}>
                            <Text style={styles.infoText}>
                                {"Image - " + imageIndex}
                            </Text>
                        </View>
                        <FontAwesome.Button name="chevron-right" style={styles.arrows} />
                    </ImageBackground>
                    </View>
                    
                    )}
                
            </Animated.ScrollView>

             <View style={styles.indicatorContainer}>
            {this.props.images.map((image,imageIndex)  => {
                 const width = Animated.divide(this.scrollX, imageWidth);

                return <Pressable onPress={()=> this.scrollRef.current?.scrollTo({x: imageWidth * imageIndex, y: 0, animated: true})}> 
                    <Animated.View key={imageIndex} style={{...styles.normalDot, width: width.interpolate({
                        inputRange: [imageIndex - 1, imageIndex, imageIndex + 1],
                        outputRange: [16, 36, 16],
                        extrapolate: "clamp",
                    })}}/>
                  </Pressable>
            })}
            </View>

            
        </SafeAreaView>
    

    )
  }
}

const styles = StyleSheet.create({
    scrollContainer: {
        alignItems: "center",
        justifyContent: "center"
    },
    card: {
        flex:1,
        marginVertical: 4,
        marginHorizontal: 16,
        borderRadius: 5,
        overflow: "hidden",
        alignItems: "center",
        flexDirection:'row',
        justifyContent: "space-between"
      },
      textContainer: {
       
        backgroundColor: "rgba(0,0,0, 0.7)",
        paddingHorizontal: 24,
        paddingVertical: 8,
        borderRadius: 5
      },
      infoText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold"
      },
      normalDot: {
        height: 16,
        width: 16,
        borderRadius: 16,
        backgroundColor: "silver",
        marginHorizontal: 4
      },
      indicatorContainer: {
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
      },

      arrows:{
        backgroundColor: 'lightgray',
        color: "white",
        padding: 0,
        paddingVertical:10,
      }
});