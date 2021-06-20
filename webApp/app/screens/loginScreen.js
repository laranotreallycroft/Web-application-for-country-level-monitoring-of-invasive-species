import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

function loginScreen({ navigation }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(
        () =>
            navigation.addListener('beforeRemove', (e) => {

                // Prevent default behavior of leaving the screen
                e.preventDefault();

            }),
        []
    );

    const storeId = async (value) => {
        try {
            await AsyncStorage.setItem('@Id', "" + value)
        } catch (e) {
            console.log(e)
        }
    }

    const handleLogin = () => {

        const endpoint = "http://10.0.2.2:8080/login";

        const user_object = {
            username: username,
            password: password
        };


        axios.post(endpoint, user_object).then(res => {
            storeId(res.data.id);
            alert("Authentication success");
            if (res.data.role === true)
                navigation.navigate('Admin')
            else
                navigation.navigate('User', {
                    id: res.data.id, admin: false
                })

        }).catch((error) => {
            console.log(error)
            alert("Authentication failure, wrong username or password");
        });



    }
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />

            <TextInput
                style={styles.input}
                placeholder="Username"
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder="Password"
                onChangeText={setPassword}
            />
            <View style={styles.buttonRow}>
                <Button
                    title="login"
                    color='#929E69'
                    onPress={handleLogin}
                />
                <Button
                    title="create an account"
                    color='#76796c'
                    onPress={() => navigation.navigate('CreateAccount', { admin: false })}
                />
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e9edc9',
        justifyContent: 'flex-end'
    },
    buttonRow: {
        marginHorizontal: 70,
        marginBottom: 20,
        marginTop: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-around'

    },
    input: {
        justifyContent: 'flex-end',
        height: 40,
        borderWidth: 1,
        backgroundColor: "#ccd5ae",
        borderColor: "#ccd5ae",
        margin: 8,
        padding: 10,
        borderWidth: 15,
        borderRadius: 20,
        fontSize: 15

    }
});




export default loginScreen;