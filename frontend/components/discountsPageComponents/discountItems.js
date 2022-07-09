import React from 'react';
import { useTailwind } from 'tailwind-rn';
import { Image, FlatList, View } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { Divider } from 'react-native-paper';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

export const DisplayRewardVouchers = (data) => {

  const tailwind = useTailwind();

  return (       
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(vouchers) => {
            return (
              <Layout style={tailwind('')}>
                <View style={tailwind('flex flex-row justify-between p-4 items-center')}>
                  <Layout style={tailwind('flex flex-col ')}> 
                    <Text style={tailwind('font-bold text-2xl text-[#a3080c]')}>{vouchers.item.title}</Text>
                    <Layout style={tailwind('left-2')}>
                      <Layout style={tailwind('flex-row')}>
                        <FontAwesome 
                          style={tailwind("pb-1 top-1")}
                          name="money"
                          size={15}
                        /> 
                        <Text> </Text>
                        <Text style={tailwind('line-through text-center')}>${vouchers.item.originalprice}</Text>
                        <Text> </Text>
                        <Text style={tailwind('text-center')}>${vouchers.item.discountedprice}</Text>
                      </Layout>
                      
                      <Text style={tailwind('right-1')}> {
                        <MaterialCommunityIcons 
                          style={tailwind("pb-1")}
                          name='piggy-bank-outline'
                          size={15}
                          />} ${vouchers.item.save}</Text>

                      <Text style={tailwind('right-1')}> {
                        <MaterialCommunityIcons 
                          style={tailwind("pb-1")}
                          name='clock-time-ten-outline'
                          size={15}
                          />} {vouchers.item.collectdate}</Text>

                      <Text style={tailwind('')}>{
                        <MaterialCommunityIcons 
                          style={tailwind("pb-1")}
                          name='zip-box-outline'
                          size={15}
                          />} {vouchers.item.stock}</Text>

                      <Text style={tailwind('right-1')}> {
                          <MaterialIcons 
                            style={tailwind("pb-1")}
                            name="location-pin"
                            size={15}
                          />} {vouchers.item.location}</Text>
                    </Layout>
                  </Layout> 
                  <Image style = {{    
                      width: 100,
                      height: 100,
                      resizeMode: 'contain'} } source={vouchers.item.link}/>
                </View>
                <Divider/>
              </Layout>
            );
        }}
      />
  );
};
