import React, { Component, ComponentType } from "react";
import { ScrollView } from "react-native";
import List from "./Components/.newFolder/CustomComponents/CustomCardList";
import Navbar from "./Components/.newFolder/CustomComponents/CustomNavbar";
import Btn from "./Components/.newFolder/CustomComponents/CustomButton";
import WatchedCard from "./Components/ImageCard";
import { ImageRepo } from "./dao/repository";
import Image from "./modules/Gallery-image";
import AddImagesForm from "./Components/AddImagesForm";
import ImageCard from "./Components/ImageCard";
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import ShowFav from "./Components/showFav";

enum Views {
  HomePage,
  AddImages,
  FavoritesImages,
}

interface AppState{
  
  views: Views;
  isScrolled: boolean;
  images: Image[];
  edited: Image | undefined;
}

class App extends Component<{},AppState> {

  state: Readonly<AppState> ={
  
    views: Views.HomePage,
    isScrolled: false,
    images: [],
    edited: undefined,
  }
 

  async componentDidMount() {
    const allImages = await ImageRepo.findAll();
    this.setState({images: allImages});
  }

  handleCreateImage = async (image: Image) =>{

    if(this.state.edited){
      this.handleUpdate(image)
    }else{
      const newImage = await ImageRepo.create(image);
      this.setState({images: this.state.images.concat(newImage)});
    }
  }

  handleDeleteImage = async (image: Image) =>{
      await ImageRepo.delete(image.id!);
      this.setState(({images}) => ({images: images.filter((img) => image.id!== img.id)}));
  }

  handleEdit = (edited: Image) => {
    this.setState({edited: edited, views: Views.AddImages});
  }

  handleUpdate = async ( image: Image) => {
    const updated = await ImageRepo.update(image);
    this.setState(({images}) => ({images: images.map((img) => img.id === updated.id? updated: img), edited: undefined}));
  }

  handleFav = (fav: Image) => {
    fav.isFav = !fav.isFav;
    this.handleUpdate(fav);
  }

  handleScroll = (event: { nativeEvent: { contentOffset: { y: number; }; }; }) => {   
    if(event.nativeEvent.contentOffset.y >= 200){
      this.setState({isScrolled: true});
    }
    if(event.nativeEvent.contentOffset.y <= 50){
      this.setState({isScrolled: false});
    } 
}
 
  handleSwitchView(){
   
    switch(this.state.views){
      case Views.HomePage:
        return <List<Image> onDelete={this.handleDeleteImage} onEdit={this.handleEdit} options={{ onFav: this.handleFav }} items={this.state.images} Card={ImageCard as unknown as ComponentType<Image>}  />
      case Views.FavoritesImages:
        return <ShowFav onDelete={this.handleDeleteImage} onEdit={this.handleEdit} options={{ onFav: this.handleFav }} images={this.state.images} />
      case Views.AddImages:
        return <AddImagesForm edited={this.state.edited} onCreate={this.handleCreateImage}/>
      
    }
  }
  
  render(): React.ReactNode {
    return (
      <PaperProvider theme={{...DefaultTheme, fonts:{
        medium: {
          padding: 0
        }
      }}}>
      <Navbar title="Gallery" stickyNav={this.state.isScrolled}>
          <Btn value="Images" event={() => this.setState({views: Views.HomePage})} bgColor='gray'/>
          <Btn value="Favorites images" event={() => this.setState({views: Views.FavoritesImages})} bgColor='gray'/>
          <Btn value="Add image" event={() => this.setState({views: Views.AddImages})} bgColor='gray'/>
      </Navbar>
      <ScrollView onScroll={this.handleScroll}>
        {this.handleSwitchView()}
      </ScrollView>
      </PaperProvider>
    );
  }
}

export default App;