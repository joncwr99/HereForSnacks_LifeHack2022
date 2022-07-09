import React from 'react';
import {useTailwind} from 'tailwind-rn';
import { Layout, Text, Button, Card, Modal } from '@ui-kitten/components';
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const homePageInformation = () => {

    const tailwind = useTailwind();
    const [visible, setVisible] = React.useState(false);

    const InformationIcon = (props) => (
      <MaterialCommunityIcons
          style={tailwind("pb-1")}
          name="information-outline"
          size={25}
          color="white"
      />
    );

    return  (     
        <Layout style={tailwind("border-0 top-8 h-12 items-center justify-center")}> 
                <Button
                    onPress={() => setVisible(true)}
                    style={tailwind("bg-[#a3080c] border-[#a3080c] border-0 top-0 right-4 w-5/6 h-16 px-4 py-4 text-sm absolute self-center text-justify items-center justify-center")}
                    accessoryRight={InformationIcon}>
                    Want to volunteer? Find out more by clicking the icon here
                </Button>

              <Modal visible={visible} style={tailwind('w-full')}>
                <Card disabled={true} style={tailwind('w-4/5 bg-blue-200 border-0 px-4 py-4 self-center rounded-lg text-justify')}>
                  <Text style={tailwind('font-bold text-justify')}> Looking to volunteer to give back to the community? {'\n'} </Text>
                  <Text style={tailwind('self-center font-semibold text-sm font-bold')}> Here's how you can make a difference {'\n'} </Text>
                  <Text> 1. 🚗 Be our drivers: Own a car  and willing to help us deliver food? Register today to be one of our ad-hoc drivers. To register, please contact us at FoodSavers123@gmail.com. {'\n'} </Text>
                  <Text> 2. 👀 Look out for discounts: Be on the look out for the regular food discounts. Help consume to reduce food wastage! {'\n'} </Text>
                  <Text> 3. 📣 Spread the word: Know friends who are interested in taking part in preventing food wastage in Singapore? Share this application with them. {'\n'} </Text>
                  <Text style={tailwind('font-bold self-center')}> DID YOU KNOW </Text>
                  <Text style={tailwind('text-justify self-center')}> In 2019, Singapore generated around 744 million kg of food waste. This is a serious issue which must be addressed. Not only is it a waste of valuable resources, it could also serve better purposes rather than just being thrown as waste.{'\n'} </Text> 
                  <Text style={tailwind('font-bold self-center')}> Let's do our part in reducing food waste! {'\n'}</Text> 
                  <Button onPress={() => setVisible(false)} style={tailwind('bg-[#a3080c] border-0 self-center w-24 rounded-lg')}>
                    Back
                  </Button>
                </Card>
              </Modal>
        </Layout>
)
}