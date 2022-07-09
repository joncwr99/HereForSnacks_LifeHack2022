import React from 'react';
import * as Animatable from 'react-native-animatable';
import {useTailwind} from 'tailwind-rn';
import { Layout, Card, Text, Avatar } from '@ui-kitten/components';
import {TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';


export const HomePageUserBanner = (username, points) => {

    const tailwind = useTailwind();

    return  (  
        <Card style={tailwind('w-4/5 bg-[#a3080c] rounded-2xl left-4 top-4')}> 
            <TouchableOpacity> 
                <Layout style={tailwind('flex flex-row items-center bg-[#a3080c] border-0')}>
                    <Avatar shape='round' size='giant' source={require('../../../assets/avatar.png')}/>
                    <Layout style={tailwind('flex flex-col left-8 bg-[#a3080c]')}> 
                        <Text style={tailwind('text-white font-bold bottom-2')}>
                            {username}
                        </Text>
                        <Layout style={{height: 2, backgroundColor: 'white'}}/>
                        <Layout style={tailwind('flex-row left-8 bg-[#a3080c] top-2 left-0 items-center')}> 
                            <Animatable.View iterationCount="infinite" direction="alternate-reverse" animation="flipInY"  duration={1500} iterationDelay = {200}>  
                                <FontAwesome5
                                name="coins" 
                                size={15} 
                                color="gold" /> 
                            </Animatable.View>  
                            <Animatable.Text iterationCount="infinite" direction="alternate" animation="pulse" duration={2000} style={tailwind('text-white font-bold left-2')}> 
                                You saved ${points} this month
                            </Animatable.Text>
                        </Layout>
                    </Layout>
                </Layout>
            </TouchableOpacity>
        </Card>
    )
}