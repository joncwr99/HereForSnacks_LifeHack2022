import React from 'react';
import {useTailwind} from 'tailwind-rn';
import { Image } from 'react-native';
import { Layout, Text, ViewPager } from '@ui-kitten/components';
import { HomeFavouriteStallsHeader } from './homePageFavouriteStalls'
import { favouriteShopData } from '../../utilities/homePageUtilities/favouriteShopsData';

export const HomeFavouriteComponent = () => {

  const tailwind = useTailwind();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const favouriteShop = favouriteShopData;
  
  const displayStore = (storeName, storePic) => {
    return( 
        <Layout style={tailwind('items-center justify-center bg-transparent')} >
            <Image style = {{    
            width: 90,
            height: 90,
            resizeMode: 'contain'} } source={storePic}
            />
            <Text> {storeName} </Text>
        </Layout>)
  }

  return (
   
    <Layout>
        {HomeFavouriteStallsHeader()}
        <Layout  style={tailwind('top-2')}> 
            <ViewPager
            style={tailwind('')}
            selectedIndex={selectedIndex}
            onSelect={index => setSelectedIndex(index)}>
              {displayStore(favouriteShop[0].title, favouriteShop[0].link)}
              {displayStore(favouriteShop[1].title, favouriteShop[1].link)}
              {displayStore(favouriteShop[2].title, favouriteShop[2].link)}
            </ViewPager>
      </Layout>
    </Layout>

  );
};

