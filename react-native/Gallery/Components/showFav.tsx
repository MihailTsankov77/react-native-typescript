import React, { Component, ComponentType } from 'react';
import { Dimensions, FlatList, Image, View } from 'react-native';
import ImageModel from '../modules/Gallery-image';
import List from './.newFolder/CustomComponents/CustomCardList';
import Draggable from './.newFolder/CustomComponents/CustomElements/Draggable';
import { CustomStyle } from './.newFolder/CustomComponents/shared/shared-styles';
import ImageCard from './ImageCard';

interface showFavProps {
    images: ImageModel[];
    onDelete: (item: ImageModel) =>void;
    onEdit: (item: ImageModel) =>void;
    options: {
        onFav: (item: ImageModel) => void;
    };
}

export default class ShowFav extends Component<showFavProps,{}> {
  render() {
    const {onDelete, onEdit ,options, images} = this.props
    return (
        <>  
        
             <FlatList data={images.filter(img => !img.isFav)}
             renderItem={({item: image}) => 
             <Draggable

             dropArea={{position: {height: 250, width: Dimensions.get('window').width, px:0, py:0}}}
         
             onFinish={() => options.onFav(image)}
             
             itemView={ <Image source={{uri: image.url}} style={{width: 100, height: 100}}/>}/>}
             horizontal
             />
            <List<ImageModel> onDelete={onDelete} onEdit={onEdit} options={options} items={images.filter(img => img.isFav)} Card={ImageCard as unknown as ComponentType<ImageModel>}  />
        </>
      )
  }
}
