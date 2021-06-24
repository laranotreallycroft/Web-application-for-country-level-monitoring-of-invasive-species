import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Image, ScrollView } from 'react-native';
import axios from "axios";

export default function speciesScreen({ route, navigation }) {

    const { speciesId } = route.params;
    const [data, setData] = useState("");

    useEffect(() => {
        const endpoint = "http://10.0.2.2:8080/species/getOne";
        const payload = { id: speciesId }
        axios.post(endpoint, payload).then(res => {
            setData(res.data);
        }).catch((error) => {
            alert("Failed to get this species data");
        });

    }, []);
    if (data != null)
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
    else return <View style={styles.container}><Text>Loading...</Text></View>;

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: '#e9edc9',
        justifyContent: 'flex-end'
    },
    scroll: {
        top: 60,
    },
    textContainer: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#ccd5ae",
        borderColor: "#ccd5ae",
        margin: 10,
        padding: 0,
        borderWidth: 20,
        borderRadius: 20,
        flexWrap: 'wrap'
    },
    text: {
        fontSize: 16,
        alignSelf: "center"
    },
    textTitle: {
        alignSelf: "flex-start",
        fontSize: 20,
        fontWeight: "bold",
        fontStyle: "italic",
        marginRight: 10
    },
    image: {
        margin: 12,
        marginBottom: 70,
        width: 370,
        height: 370,
    }
});

