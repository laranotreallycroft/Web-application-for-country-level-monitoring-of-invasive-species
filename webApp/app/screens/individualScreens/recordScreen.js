import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Image, ScrollView } from 'react-native';
import axios from "axios";
import MapView, { Marker } from 'react-native-maps';

export default function RecordScreen({ route, navigation }) {

    const { recordId } = route.params;
    const [data, setData] = useState("");

    useEffect(() => {
        const payload = { id: recordId }
        axios.post("http://10.0.2.2:8080/record/getOne", payload).then(res => {
            setData(res.data);
        }).catch((error) => {
            alert("Failed to get record data");
        });
    }, []);

    if (data != null)
        return (
            <View style={styles.container}>
                <StatusBar style="auto" />
                <ScrollView style={styles.scroll}>

                    <View style={styles.textContainer}>
                        <Text style={styles.textTitle}>Species: </Text>
                        <Text style={styles.text}>{data.species}</Text>
                    </View>

                    <View style={styles.textContainer}>
                        <Text style={styles.textTitle}>Species group: </Text>
                        <Text style={styles.text}>{data.speciesGroup}</Text>
                    </View>

                    {data.description != null &&
                        <View style={styles.textContainer}>
                            <Text style={styles.textTitle}>Description: </Text>
                            <Text style={styles.text}>{data.description}</Text>
                        </View>
                    }

                    <View style={styles.textContainer}>
                        <Text style={styles.textTitle}>Location: </Text>
                        <Text style={styles.text}>{data.location}</Text>
                    </View>

                    {data.locationDescription != null &&
                        <View style={styles.textContainer}>
                            <Text style={styles.textTitle}>Location description: </Text>
                            <Text style={styles.text}>{data.locationDescription}</Text>
                        </View>
                    }

                    {data.coordinateX != null &&
                        <MapView style={styles.map} initialRegion={{
                            latitude: 45.1,
                            longitude: 16.5,
                            latitudeDelta: 2,
                            longitudeDelta: 2,
                        }}>
                            <Marker coordinate={{
                                latitude: data.coordinateX,
                                longitude: data.coordinateY
                            }} />
                        </MapView>
                    }

                    {data.photograph != null &&
                        <Image style={styles.image} source={{ uri: `data:image/jpg;base64,${data.photograph}` }} />
                    }
                </ScrollView></View >
        );
    else return <View style={styles.container}><Text>Loading...</Text></View>;
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e9edc9'
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
    }, map: {
        height: 200
    }
});

