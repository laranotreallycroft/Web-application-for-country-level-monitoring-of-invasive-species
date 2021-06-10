import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Button, Text, StyleSheet, View, Image, ScrollView, TextInput } from 'react-native';
import axios from "axios";
export default function speciesScreen({ navigation }) {
    const [data, setData] = useState("");

    useEffect(() => {
        const endpoint = "http://10.0.2.2:8080/species/getOne";
        const payload = { id: 3598 }
        axios.post(endpoint, payload).then(res => {

            setData(res.data);
            console.log(data.photograph);
        }).catch((error) => {
            console.log(error)
            alert("Data get failure");
        });

    }, []);

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Text  >{data.id} </Text>
            <Text  >{data.name} </Text>
            <Text  >{data.description} </Text>
            <Text  >{data.recordCount} </Text>
            <Image style={{ width: 200, height: 200, resizeMode: 'contain' }} source={{ uri: `data:image/jpg;base64,${data.photograph}` }} />
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

