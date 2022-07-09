import React from 'react';
import * as Animatable from 'react-native-animatable';
import {useTailwind} from 'tailwind-rn';
import { Layout, Text } from '@ui-kitten/components';
import { Ionicons } from '@expo/vector-icons';

export const HomeFavouriteStallsHeader = () => {

  const tailwind = useTailwind();

  const HeartIcon = (props) => (
    <Animatable.View iterationCount="infinite" direction="alternate-reverse" animation="pulse"  duration={1200} iterationDelay = {200}>  
    <Ionicons
    style={tailwind('p-4')}
    name="heart" 
    size={40} 
    color="red" /> 
    </Animatable.View>  
  );

  return (
   
    <Layout style={tailwind('top-0 flex-row items-center')}>
        {HeartIcon()}
        <Text style={tailwind('text-[#a3080c] text-xl font-bold')}> Your Favourite Stores </Text>
        {HeartIcon()} 
    </Layout>

  );
};
