import { Component, ForwardedRef, forwardRef, useMemo, useState } from "react";
import { Animated, FlatList, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { FilterType, PostListener } from "../model/shared-types";
import { Post } from "../model/posts.model";
import PostItem, { ITEM_HEIGHT, PostItemListener } from "./PostItem";
import PurpleRain from "./PurpleRain";
import Stagger from "./stagger";
import { PAGE_LIMIT } from "../App";
import Progressbar from "./customProgressBar";

interface Props {
    posts: Post[];
    filter: FilterType;
    scrollIndex?: number;
    onDelete: PostListener;
    onEdit: PostListener;
    onFilterTags: (filter: string[]) => void;
    addMorePosts: () => void;
    tagsFilter: string[]
}

const PostList = forwardRef<FlatList<Post>, Props>((props, fRef) => {

    
    const { posts, filter, scrollIndex, onFilterTags, tagsFilter, addMorePosts, ...rest }: Props = props;
    const filterByStatus = (posts: Post[], filter: FilterType) => posts.filter(post => !filter ? true : post.status === filter);

    const filterByTags = (posts: Post[], filterTags: string[]) => 
        posts.filter(post => {
                for(const tag in filterTags){
                    if(!post.tags.includes(filterTags[tag]))
                        return false      
                }
                return true;
        });


        const animations: Animated.CompositeAnimation[] =[];
    const handleAnimations = (newAnimation: Animated.CompositeAnimation) =>{
        animations.push(newAnimation);
        Animated.stagger(1000, animations.filter((value, index)=> index>= animations.length - PAGE_LIMIT)).start();
    }
    
    
    
    const memoizedVisiblePosts = useMemo(() => filterByTags(filterByStatus(posts, filter), tagsFilter), [posts, filter, tagsFilter]);


    // const [progressbar, setProgressbar] = useState(0);

    return (
        

        <SafeAreaView style={{height: 1000}}>
        <FlatList<Post> nestedScrollEnabled={true} ref={fRef} style={{ flex:1, width: '100%' }} 
            data={memoizedVisiblePosts}
            renderItem={({ item: post }) => <PostItem getAnimation={handleAnimations} filter={onFilterTags} tagsFilter={tagsFilter} post={post} key={post.id!} {...rest} />}
            stickyHeaderIndices={[0]}
            ListHeaderComponent={<>
        
{/*                 
                <Progressbar min={0} max={100} value={progressbar} />
                <Pressable onPress={() => setProgressbar(progressbar+ 10)}>
                    <Text  style={styles.tag}>Add 10%</Text>
                </Pressable> */}
               
               
                <Pressable onPress={() => onFilterTags([] as string[])}>
                    <Text  style={styles.tag}>Reset Tags Filter</Text>
                </Pressable>
            </>
                
            }
            initialNumToRender={0}
            onEndReachedThreshold={0.2}
            onEndReached={addMorePosts}
        

            removeClippedSubviews={false}
            getItemLayout={(data: Post[] | null | undefined, index: number) => (
                { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index }
            )}
            ItemSeparatorComponent={ () => <View style={ { width:"100%", height: .7, backgroundColor: 'rgba( 52,52,52,1)' } } /> }
        />
        </SafeAreaView>);
});
const styles = StyleSheet.create({
    

    tag: {
        margin: 5,
        paddingHorizontal: 20,
        paddingVertical: 5,
        fontSize: 18,
        backgroundColor: 'orange',
        fontWeight: 'bold',
        borderRadius: 15,
        borderColor: 'green',
        color: "white",
        textAlign: 'center',
    },
})
 
export default PostList;