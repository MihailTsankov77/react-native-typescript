import React, { Component, useRef } from "react";
import { PostListener } from "../model/shared-types";
import { Post, PostStatus } from "../model/posts.model"
import { Animated, Button, Image, ScrollView, StyleSheet, Text, View, } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import IconButton from "./IconButton";
import Tags from "./TagsComponent";
import ScrollableTextArea from "./ScrollableTextArea";

export const ITEM_HEIGHT = 400;
export const ITEM_PADDING = 10;

export interface PostItemProps {
    
    post: Post;
    onDelete: PostListener;
    onEdit: PostListener;
    filter: (filterTags: string[]) => void;
    tagsFilter: string[];
    getAnimation: (animation: Animated.CompositeAnimation) => void;
}


export interface PostItemListener {
    (post: Post, postItemComponent: Component<PostItemProps, {}>): void;
}

export default class PostItem extends Component<PostItemProps, {opacity: Animated.Value}> {
    state: Readonly<{opacity: Animated.Value}>={
        opacity: new Animated.Value(0),
    }
    
    componentDidMount(){
        this.props.getAnimation(Animated.timing(this.state.opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }));
    }
    
    render() {
        
        
        const { post, onDelete, onEdit }: PostItemProps = this.props;
        return (
            <Animated.View style={{...styles.itemContainer, opacity: this.state.opacity,
                marginLeft:  this.state.opacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-300, 0],
                  extrapolate: 'clamp',
                }) , height: ITEM_HEIGHT }}>
                <View style={styles.postItem}>
                    <View style={styles.postHeader}>
                        <Image resizeMode='contain' style={styles.postImage} source={{ uri: post.image.uri }}></Image>
                        <View style={styles.postContent} >
                            <Text style={styles.title}>{post.title}</Text>
                            <Text style={styles.postMetadata}>{PostStatus[post.status]},  Author ID: {post.authorId}</Text>
                            <Tags tagsFilter={this.props.tagsFilter} tags={post.tags} onFilter={this.props.filter}/>
                        </View>
                    </View>

                    <ScrollableTextArea style={styles.textScrollView} textStyle={styles.postText} 
                    content={post.content} position={0} nestedScrollEnabled={true}/>
                
                    <View style={styles.postItemButtons}>
                        <IconButton style={styles.button} textStyle={styles.buttonText} name="pencil-square" size={27} color="white" backgroundColor='green'
                            onPress={() => onEdit(post)}>Edit
                        </IconButton>
                        <View style={{ width: 20, backgroundColor: 'transparent' }} />
                        <IconButton style={styles.button} textStyle={styles.buttonText} name="times-circle" size={27} color="white" backgroundColor='#ff4466'
                            onPress={() => onDelete(post)}>Delete
                        </IconButton>
                    </View>
                </View >
            </Animated.View >
        )
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        padding: ITEM_PADDING,
        height: ITEM_HEIGHT,
    },
    postItem: {
        padding: 5,
        backgroundColor: '#eee',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#aaa',
        height: ITEM_HEIGHT - 2 * ITEM_PADDING,
    },
    postHeader: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        gap: 15,
    },
    postImage: {
        width: '30%',
        height: 'auto',
        borderRadius: 10,
        marginRight: 10,
    },
    postContent: {
        width: '70%',
        display: 'flex',
        flexDirection: 'column',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    postMetadata: {
        fontSize: 18,
        fontStyle: 'italic',
    },
    postTags: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    postTag: {
        margin: 5,
        paddingHorizontal: 20,
        paddingVertical: 5,
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: '#fccb58',
        borderRadius: 15,
        borderColor: 'green',
    },
    textScrollView:{
        height: ITEM_HEIGHT * 2 / 3,
        marginTop: 5,
        marginBottom: 10,
    },
    postText: {
        width: '100%',
        fontSize: 18,
    },
    postItemId: {
        paddingRight: 10,
        fontSize: 24,
    },
    postItemButtons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 0,
        backgroundImage: 'gray',
        border: 1
    },
    button: {
        paddingVertical: 3,
        paddingHorizontal: 10,
    },
    buttonText: {
        padding: 0,
    },
    card: {
        padding: 10,
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 10,
        width: 280,
        display: "flex",
        alignItems: "center",
        backgroundColor: "#C4D7E0",
    },

    btnContainer: {
        display: "flex",
        flexDirection: "row",
        gap: 40,
        marginTop: 20,
    },

});