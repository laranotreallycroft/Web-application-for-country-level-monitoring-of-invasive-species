import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import axios from "axios";
export default function createAccountScreen({ navigation }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const handleRegistration = () => {
        if (username == "") {
            alert("Username cannot be empty!")
            return
        }
        if (password == "") {
            alert("Password cannot be empty!")
            return
        }
        if (password != password2) {
            alert("Passwords do not match!")
            return
        }

        const endpoint = "http://10.0.2.2:8080/account/create";

        const user_object = {
            username: username,
            password: password
        };


        axios.post(endpoint, user_object).then(res => {
            alert("Registration success");
            /*   localStorage.setItem("role", res.data.authorities[0].authority)
              localStorage.setItem("username", res.data.username);
               this.setState({
                   islogged: true
               });
            
                if (res.data.authorities[0].authority == "ROLE_UDOMITELJ")
               this.props.history.push("/home-page");*/

            navigation.navigate('Home')

        }).catch((error) => {
            console.log(error)
            alert("Registration failure! Account with this username already exists!");
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
            <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder="Repeat password"
                onChangeText={setPassword2}
            />
            <Button
                style={styles.button}
                title="complete registration"
                color='#EA7D55'
                onPress={handleRegistration}
            />

        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#A8AEC1',
        alignItems: 'stretch',
        justifyContent: 'flex-end',
    },
    button: {
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,

    }
});
