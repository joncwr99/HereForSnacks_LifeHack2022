import React from 'react';
import {useTailwind} from 'tailwind-rn';

import { Layout, Text, Autocomplete } from '@ui-kitten/components';
import { DisplayRewardVouchers } from '../components/discountsPageComponents/discountItems';
import { discountedItems } from '../utilities/rewardsUtilities/discountData';

const originalItems = discountedItems;

export default DonatePage = () => {
    const tailwind = useTailwind();
    const filter = (item, query) => item.store.toLowerCase().includes(query.toLowerCase());

    const items = originalItems;

    const [value, setValue] = React.useState(null);
    const [data, setData] = React.useState(items);
  
    const onChangeText = (query) => {
        setValue(query);
        setData(originalItems.filter(item => filter(item, query)));
    };

    return  (     
        <Layout style={tailwind('flex-grow')}> 
            <Layout style={tailwind('flex-row bg-white justify-center h-24')}>
                <Text style={tailwind('flex text-center text-[#a3080c] font-bold text-2xl top-10')}> Discounts </Text> 
            </Layout>
            <Layout style = {tailwind('h-14 bg-[#a3080c]')}>
                <Autocomplete
                    style={tailwind('rounded-md w-5/6 left-8 top-2')}
                    placeholder='Search for store'
                    onChangeText={onChangeText}>
                </Autocomplete>
            </Layout>
            <Layout style={tailwind('flex-1 w-full self-center')}> 
                {DisplayRewardVouchers(data)}
            </Layout>
        </Layout>
    )
}