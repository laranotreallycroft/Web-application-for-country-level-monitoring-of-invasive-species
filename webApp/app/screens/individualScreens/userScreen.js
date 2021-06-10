import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Button, Text, StyleSheet, View } from 'react-native';
import axios from "axios";
export default function userScreen({ navigation }) {
    const [data, setData] = useState("");

    useEffect(() => {
        const endpoint = "http://10.0.2.2:8080/account/getOne";
        const payload = { id: 1 }
        axios.post(endpoint, payload).then(res => {

            setData(res.data);


        }).catch((error) => {
            console.log(error)
            alert("Data get failure");
        });

    }, []);

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Text  >{data.id} </Text>
            <Text  >{data.username} </Text>
            <Text  >{data.recordCount} </Text>
        </View >
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#A8AEC1',
        alignItems: 'stretch',
        justifyContent: 'flex-end',
    }
});

