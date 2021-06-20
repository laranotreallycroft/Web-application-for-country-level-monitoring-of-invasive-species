import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, FlatList } from 'react-native';
import axios from "axios";
function homeScreen({ navigation }) {

    const [users, setUsers] = useState("");
    const [animalia, setAnimalia] = useState("");
    const [plantae, setPlantae] = useState("");
    const [chromista, setChromista] = useState("");

    useEffect(() => {
        axios.get("http://10.0.2.2:8080/account/getTop3").then(res => {

            setUsers(res.data);

            axios.get("http://10.0.2.2:8080/species/getTop50").then(res => {

                setPlantae(res.data[0]);
                setAnimalia(res.data[1]);
                setChromista(res.data[2]);
            }).catch(() => {
                alert("Failed to get leaderboard species data");
            });

        }).catch(() => {
            alert("Failed to get leaderboard account data");
        });
    }, []);



    const Item = ({ id, name, count }) => (
        <View style={styles.listRow}>
            <Text style={styles.listText} >{count}  </Text>
            <Text style={styles.listText} onPress={() => navigation.navigate("Species", { speciesId: id })}>{name}</Text>
        </View>
    );

    var renderItem = ({ item }) => (
        <Item id={item.id} name={item.name} count={item.count} />
    );

    if (chromista[0] != null)
        return (
            <View style={styles.container}>
                <StatusBar style="auto" />

                <View style={[styles.circle, styles.firstPlace]} >
                    <Text style={styles.medalText}>{users[0].username}</Text>
                    <Text style={styles.medalText}>{users[0].recordCount}</Text>
                </View>
                <View style={[styles.circle, styles.secondPlace]} >
                    <Text style={styles.medalText}>{users[1].username}</Text>
                    <Text style={styles.medalText}>{users[1].recordCount}</Text>
                </View>
                <View style={[styles.circle, styles.thirdPlace]}>
                    <Text style={styles.medalText}>{users[2].username}</Text>
                    <Text style={styles.medalText}>{users[2].recordCount}</Text>
                </View>


                <FlatList
                    data={plantae}
                    renderItem={renderItem}
                    keyExtractor={item => "" + item.id}
                    style={[styles.plantaeList, styles.lists]}
                />
                <FlatList
                    data={animalia}
                    renderItem={renderItem}
                    keyExtractor={item => "" + item.id}
                    style={[styles.animaliaList, styles.lists]}
                />
                <FlatList
                    data={chromista}
                    renderItem={renderItem}
                    keyExtractor={item => "" + item.id}
                    style={[styles.chromistaList, styles.lists]}
                />

            </View >
        );
    else return <View style={styles.container}><Text>Loading...</Text></View>;
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'flex-end',
        backgroundColor: '#e9edc9'
    }, circle: {
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        alignItems: 'center',
        justifyContent: 'center'
    }, firstPlace: {
        position: "absolute",
        top: 35,
        left: 150,
        backgroundColor: '#FFEA5F',
    }, secondPlace: {
        position: "absolute",
        top: 110,
        left: 50,
        backgroundColor: '#DED6CC',
    }, thirdPlace: {
        position: "absolute",
        top: 110,
        left: 250,
        backgroundColor: '#F8C17E',
    },
    lists: {
        position: "absolute",
        backgroundColor: "#ccd5ae",
        borderColor: "#ccd5ae",
        margin: 0,
        padding: 0,
        borderWidth: 20,
        borderRadius: 20
    },
    plantaeList: {
        top: 250,
        left: 20,
        height: 450,
        width: 170
    }, animaliaList: {
        top: 250,
        right: 20,
        height: 330,
        width: 170
    }, chromistaList: {
        top: 590,
        right: 20,
        height: 110,
        width: 170
    },
    listText: {
        color: "#71625C",
        fontWeight: "bold"
    },
    medalText: {
        fontWeight: "bold",
        fontSize: 15
    },
    listRow: {
        flexDirection: "row",
        marginRight: 14
    }
});

export default homeScreen;