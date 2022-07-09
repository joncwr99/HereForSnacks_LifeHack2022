import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import {useTailwind} from 'tailwind-rn';
import { Layout, Text } from '@ui-kitten/components';
import { auth, db } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';

export default RegisterPage = ({ navigation }) => {
    const tailwind = useTailwind();

    let [username, setUsername] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [confirmPassword, setConfirmPassword] = useState("");
    let [errorMessage, setErrorMessage] = useState("");

    let validateAndSet = (value, valueToCompare, setValue) => {
        if (value !== valueToCompare) {
            setErrorMessage("Passwords do not match.");
        } else {
            setErrorMessage("");
        }
        
        setValue(value);
    }
    
    // Adds username to DB
    let addUser = async (username) => {
        setDoc(doc(db, "users", auth.currentUser.uid), {
            username: username
        });
    }

    const handleRegister = () => {
        if (password === confirmPassword) {
            createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                addUser(username);
                navigation.navigate("BottomNavigationBar", {user: result.user}) 
                setErrorMessage("");
                setUsername("");
                setEmail("");
                setPassword("");

            })
            .catch(error => {
                setErrorMessage(error.message);
            });
        }
    }

    return  (     
        <Layout style={tailwind('flex-grow items-center justify-center')}>  
            <Text style={tailwind('text-[#a3080c] text-xl font-bold')}> Register for an Account </Text>     
            <View style={tailwind('w-4/5 mt-4')}>
                <TextInput 
                    style={tailwind('bg-white px-2 py-2 rounded-md mt-1')} 
                    placeholder='Username' 
                    autoCorrect={false}
                    autoCapitalize='none'
                    value={username}
                    onChangeText={text => setUsername(text)}
                />
                <TextInput 
                    style={tailwind('bg-white px-2 py-2 rounded-md mt-1')} 
                    placeholder='Email' 
                    autoCorrect={false}
                    autoCapitalize='none'
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <TextInput 
                    style={tailwind('bg-white px-2 py-2 rounded-md mt-1')} 
                    placeholder='Password' 
                    value={password}
                    onChangeText={text => validateAndSet(text, confirmPassword, setPassword)}
                    secureTextEntry 
                />
                <TextInput 
                    style={tailwind('bg-white px-2 py-2 rounded-md mt-1')} 
                    placeholder='Confirm Password' 
                    value={confirmPassword}
                    onChangeText={text => validateAndSet(text, password, setConfirmPassword)}
                    secureTextEntry 
                />
                <Text style={tailwind('mt-2 text-xs')}>{errorMessage}</Text>
                <TouchableOpacity style={tailwind('mt-5 bg-rose-500 w-full p-3 rounded-md')} onPress={handleRegister}>
                    <Text style={tailwind('text-center text-white font-medium')}>Register</Text>
                </TouchableOpacity>
                <View style={tailwind('mt-5')}>
                    <Text>Already have an account?</Text>
                    <TouchableOpacity>
                        <Text style={tailwind('text-sky-500')} onPress={() => navigation.navigate('Login')}>Log In.</Text>
                    </TouchableOpacity>
                </View>
            </View> 
        </Layout>
)
}