import React, { useEffect, useState } from 'react';
import * as Animatable from 'react-native-animatable';
import {useTailwind} from 'tailwind-rn';
import { Layout, Text, Button } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/core'
import { HomePageHeader } from '../components/homePageComponent/homePageHeaderComponent';
import { HomePageUserBanner } from '../components/homePageComponent/homePageUserBanner';
import {HomeFavouriteComponent} from '../components/homePageComponent/homePageFavouriteComponent';
import { FontAwesome5 } from "@expo/vector-icons";
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, increment, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { TextInput } from 'react-native';
import { homePageInformation } from '../components/homePageComponent/homePageInformation';

export default HomePage = () => {

    let [username, setUsername] = useState("");

    const tailwind = useTailwind();
    
    const navigation = useNavigation();
    
    useEffect(() => {
        loadUsername();
    })

    // load username and store as state
    const loadUsername = async () => {
        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        setUsername(docSnap.data().username);
    }

    // add favourite stores
    const addFavouriteStore = async (storeName) => {
        const docRef = doc(db, "userDetails", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            await updateDoc(docRef, {
                favouriteStores: arrayUnion(storeName)
            });
        } else {
            setDoc(doc(db, "userDetails", auth.currentUser.uid), {
                favouriteStores: [storeName],
                savings: 0
            });
        }

    }

    // increment savings
    const incrementSavings = async (incrementVal) => {
        const docRef = doc(db, "userDetails", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            await updateDoc(docRef, {
                savings: increment(incrementVal)
            });
        } else {
            setDoc(doc(db, "userDetails", auth.currentUser.uid), {
                favouriteStores: [],
                savings: incrementVal
            });
        }

    }

    // load favourite shops and savings
    const loadUserDetails = async () => {
        const docRef = doc(db, "userDetails", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setFavStores(docSnap.data().favouriteStores);
            setSavings(docSnap.data().savings);
        }
    }

    const handleLogout = () => {
        signOut(auth).then(() => {
            navigation.navigate("Login");
        })
    }

    const LogoutIcon = (props) => (
        <FontAwesome5
          style={tailwind("pb-1")}
          name="power-off"
          size={15}
          color="black"
        />
      );

    return  (     
        <Layout style={tailwind('flex-grow top-2')}> 
            {HomePageHeader(username)}

            <Button
            style={tailwind("bg-red-400 top-8 right-4 w-12 h-12 border-0 absolute")}
            accessoryLeft={LogoutIcon}
            onPress={() => handleLogout()}>
            </Button>

            <Animatable.View animation="bounceIn" duration={2000}>  

            {HomePageUserBanner(username, 420)}

            </Animatable.View>
            
            {homePageInformation()}

            <Layout style={tailwind('top-20 self-center h-2/6 border-black border-2 rounded-md')}> 
                {HomeFavouriteComponent()}
            </Layout>
        </Layout>
)
}