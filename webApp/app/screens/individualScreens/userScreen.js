import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, ScrollView, FlatList } from 'react-native';
import axios from "axios";
export default function userScreen({ route, navigation }) {

    const id = 1
    //const { id }route.params

    const [data, setData] = useState("");

    useEffect(() => {
        const payload = { id: id }
        axios.post("http://10.0.2.2:8080/account/getOne", payload).then(res => {

            setData(res.data);

        }).catch(() => {
            alert("Failed to get leaderboard species data");
        });

    }, []);

    const Item = ({ species, location, id }) => (
        <View style={styles.flex}>
            <Text onPress={() =>
                navigation.navigate("RecordScreen", { recordId: id })} style={styles.listText}
            > {species}</Text>
            <Text> {location}</Text>
        </View >
    );


    var renderItem = ({ item }) => (
        <Item species={item.species} location={item.location} id={item.id} />
    );
    if (data != null)
        return (
            <View style={styles.container}>
                <StatusBar style="auto" />
                <ScrollView style={styles.scroll}>
                    <View style={styles.textContainer}>
                        <Text style={styles.textTitle}>Username : </Text>
                        <Text style={styles.text}>{data.username}</Text>
                    </View>

                    <View style={styles.textContainer}>
                        <Text style={styles.textTitle}>Sighting count: </Text>
                        <Text style={styles.text}>{data.recordCount} </Text>
                    </View>
                    <View style={styles.list}>
                        <Text style={styles.textTitle}>Your sightings: </Text>
                        <View>
                            <View style={styles.flex}>
                                <Text style={styles.textTitle2}> Species</Text>
                                <Text style={styles.textTitle2}> Location</Text>
                            </View>
                            <FlatList
                                data={data.records}
                                renderItem={renderItem}
                                keyExtractor={item => item.id}

                            />
                        </View>
                    </View>



                </ScrollView>
            </View >
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
    flex: {
        marginBottom: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
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
    textTitle2: {
        fontSize: 15,
        fontWeight: "bold",
        fontStyle: "italic",
        marginTop: 10
    },
    list: {
        display: "flex",
        backgroundColor: "#ccd5ae",
        borderColor: "#ccd5ae",
        margin: 10,
        padding: 0,
        borderWidth: 20,
        borderRadius: 20
    },
    flatList: {

    }

});
