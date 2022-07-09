import React, { useState } from 'react';
import {useTailwind} from 'tailwind-rn';
import { Layout, Text, Button } from '@ui-kitten/components';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { View, TextInput, TouchableOpacity } from 'react-native';

export default LoginPage = ({ navigation }) => {

    if (auth.currentUser) {
        console.log(auth.currentUser);
        navigation.navigate("BottomNavigationBar");
    } else {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                navigation.navigate("BottomNavigationBar");
            }
        });
    }


    const tailwind = useTailwind();
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [errorMessage, setErrorMessage] = useState("");

    let checkEmptyAndSet = (valOne, valTwo, setValueOne, setValueTwo) => {
        if (valOne === "" || valTwo === "") {
            setErrorMessage("Email and password cannot be empty.");
        } else {
            setErrorMessage("");
        }

        setValueOne(valOne);
        setValueTwo(valTwo);

    }
    
    const handleLogin = () => {
        if (email !== "" && password !== "") {
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                navigation.navigate("BottomNavigationBar", { user: userCredential.user });
                setEmail("");
                setPassword("");
                setErrorMessage("");
            })
            .catch((error) => {
                console.log(error);
                setErrorMessage(error.message);
            });
        } else {
            setErrorMessage("Email and password cannot be empty.")
        }
    }
    
    const handleSignUp = () => {
        navigation.navigate("Register")
    }
    
    return (
        <Layout style={tailwind('flex-grow items-center justify-center bg-[#a3080c]')}> 
            <View style={tailwind('w-4/5')}>
                <Text style={tailwind('text-slate-200 text-2xl font-bold')}>Get Great Deals While Reducing Food Waste.</Text>
                <TextInput 
                    style={tailwind('bg-white px-2 py-2 rounded-md mt-6')} 
                    autoCorrect={false}
                    autoCapitalize='none'
                    placeholder='Email' 
                    value={email}
                    onChangeText={text => checkEmptyAndSet(text, password, setEmail, setPassword)}
                />
                <TextInput 
                    style={tailwind('bg-white px-2 py-2 rounded-md mt-2')} 
                    placeholder='Password' 
                    value={password}
                    onChangeText={text => checkEmptyAndSet(email, text, setEmail, setPassword)}
                    secureTextEntry 
                />
                <View>
                    <Text style={tailwind('mt-2 text-xs')}>{errorMessage}</Text>
                    <TouchableOpacity style={tailwind('bg-sky-500 mt-5 w-full p-3 rounded-md')} onPress={handleLogin}>
                        <Text style={tailwind('text-center text-slate-100 font-medium')}>Login</Text>
                    </TouchableOpacity>
                    <View>
                        <Text style={tailwind('mt-5 text-white')}>Don't have an account?</Text>
                        <TouchableOpacity>
                            <Text style={tailwind('underline text-sky-300')} onPress={() => navigation.navigate('Register')}>Register here.</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Layout>
    );
  }
