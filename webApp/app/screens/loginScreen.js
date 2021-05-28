import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import axios from "axios";
function loginScreen({ navigation }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {

        const endpoint = "http://10.0.2.2:8080/login";

        const user_object = {
            username: username,
            password: password
        };


        axios.post(endpoint, user_object).then(res => {
            /*localStorage.setItem("role", res.data.authorities[0].authority)
            localStorage.setItem("username", res.data.username);
            this.setState({
            islogged: true
             });*/
            console.log(res)
            alert("Authentication success");
            if (username == "admin")
                navigation.navigate('Admin')
            else navigation.navigate('Home')
            // if (res.data.authorities[0].authority == "ROLE_UDOMITELJ")
            // this.props.history.push("/home-page");

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
            <Button
                style={styles.button}
                title="login"
                color='#B5D2CB'
                onPress={handleLogin}
            />
            <Button
                style={styles.button}
                title="create an account"
                color='#EA7D55'
                onPress={() => navigation.navigate('CreateAccount')}
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




export default loginScreen;