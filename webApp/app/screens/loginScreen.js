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
            <View style={styles.buttonRow}>
                <Button
                    style={styles.button}
                    title="login"
                    color='#929E69'
                    onPress={handleLogin}
                />
                <Button
                    title="create an account"
                    color='#76796c'
                    onPress={() => navigation.navigate('CreateAccount')}
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