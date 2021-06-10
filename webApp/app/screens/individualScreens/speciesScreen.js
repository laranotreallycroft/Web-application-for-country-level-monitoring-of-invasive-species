import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Button, Text, StyleSheet, View, Image, ScrollView, TextInput } from 'react-native';
import axios from "axios";
export default function speciesScreen({ route, navigation }) {
    const { speciesName } = route.params;
    const [data, setData] = useState("");

    useEffect(() => {
        const endpoint = "http://10.0.2.2:8080/species/getOne";
        const payload = { name: speciesName }
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
            <ScrollView style={styles.scroll}>
                <View style={styles.textContainer}>
                    <Text style={styles.textTitle}>Species : </Text>
                    <Text style={styles.text}>{data.name}</Text>
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.textTitle}>Species group: </Text>
                    <Text style={styles.text}>{data.speciesGroup} </Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.textTitle}>Description: </Text>
                    <Text style={styles.text}>{data.description}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.textTitle}>Sighting count: </Text>
                    <Text style={styles.text}>{data.recordCount} </Text>
                </View>
                <Image style={styles.image} source={{ uri: `data:image/jpg;base64,${data.photograph}` }} />
            </ScrollView></View >
    );
}
const styles = StyleSheet.create({
    container: {

        flex: 1,
        alignItems: 'stretch',
        backgroundColor: '#e9edc9'
    },


    textContainer: {
        top: 60,
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#ccd5ae",
        borderColor: "#ccd5ae",
        margin: 10,
        padding: 0,
        borderWidth: 20,
        borderRadius: 20,
        alignItems: "center"
    },
    text: {
        paddingRight: 100,
        fontSize: 16,
    },
    textTitle: {
        fontSize: 20,
        fontWeight: "bold",
        fontStyle: "italic",
        marginRight: 10
    },
    image: {
        marginTop: 90,
        marginBottom: 20,
        width: 400,
        height: 300,
        resizeMode: 'contain'
    }
});

