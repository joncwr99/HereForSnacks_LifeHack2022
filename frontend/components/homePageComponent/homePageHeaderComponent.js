import React from 'react';
import {useTailwind} from 'tailwind-rn';
import { Layout, Text } from '@ui-kitten/components';

export const HomePageHeader = (username) => {

    const tailwind = useTailwind();

    return  (    
        <Layout style={tailwind('flex flex-row top-4 h-20 items-center justify-center')}> 
            <Text style={tailwind('font-bold text-[#a3080c] text-3xl')}> Welcome {username} </Text>
        </Layout>
        )
}
