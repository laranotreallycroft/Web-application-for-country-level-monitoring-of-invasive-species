import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import axios from "axios";

export default function createAccountScreen({ route, navigation }) {

    const { admin } = route.params;

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

        var endpoint;
        if (admin == false) endpoint = "http://10.0.2.2:8080/account/create";
        else endpoint = "http://10.0.2.2:8080/account/createAdmin";

        const user_object = {
            username: username,
            password: password
        };


        axios.post(endpoint, user_object).then(res => {
            alert("Registration success");
            if (admin == false)
                navigation.navigate('Login')
            else navigation.navigate("Accounts")

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
            <View style={styles.buttonRow}>
                <Button
                    style={styles.button}
                    title="complete registration"
                    color='#929E69'
                    onPress={handleRegistration}
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
