import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, ScrollView, FlatList, Button } from 'react-native';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';

export default function userScreen({ props, route, navigation }) {

    const { id, admin } = route.params;

    const [data, setData] = useState("");

    const getRequest = () => axios.post("http://10.0.2.2:8080/account/getOne", { id: id }).then(res => {
        if (data != res.data) {
            setData(res.data);
        }
    }).catch(() => {
        alert("Failed to get account");
    });



    useFocusEffect(
        //alert here
        React.useCallback(() => {
            getRequest()
        }, [data])
    );



    var removeId = async () => {
        try {
            await AsyncStorage.removeItem('@Id')
        } catch (e) {
            // remove error
        }

    }


    var handleLogout = () => {
        removeId()
        navigation.navigate("Login")
    }


    const Item = ({ species, location, id }) => (
        <View style={styles.flex}>
            {admin == false ?
                <Text onPress={() =>
                    navigation.navigate("RecordScreen", { recordId: id })} style={styles.listText}
                > {species}</Text>
                : <Text> {species}</Text>}
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
                    <View style={[styles.list, styles.sightings]}>
                        <Text style={styles.textTitle}>Your sightings: </Text>

                        <View style={styles.flex}>
                            <Text style={styles.textTitle2}> Species</Text>
                            <Text style={styles.textTitle2}> Location</Text>
                        </View>
                        <FlatList
                            data={data.records}
                            renderItem={renderItem}
                            keyExtractor={item => "" + item.id}

                        />

                    </View>
                    {admin == false &&
                        <View style={styles.buttonRow}>
                            <Button
                                title="logout"
                                color='#929E69'
                                onPress={handleLogout}
                            />
                        </View>
                    }
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
    }, buttonRow: {
        marginHorizontal: 70,
        marginBottom: 20,
        marginTop: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-around'

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
    sightings: {
        maxHeight: 450
    }

});
