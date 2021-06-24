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

            axios.get("http://10.0.2.2:8080/species/getTop5").then(res => {

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

                <View style={styles.header} >
                    <Text style={styles.headerText} > Leaderboard </Text>
                </View>
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

                <View style={styles.textContainer}>
                    <Text style={styles.textTitle}>Plants</Text>
                </View>
                <FlatList
                    data={plantae}
                    renderItem={renderItem}
                    keyExtractor={item => "" + item.id}
                    style={styles.lists}
                />

                <View style={styles.textContainer}>
                    <Text style={styles.textTitle}>Animals</Text>
                </View>
                <FlatList
                    data={animalia}
                    renderItem={renderItem}
                    keyExtractor={item => "" + item.id}
                    style={styles.lists}
                />

                <View style={styles.textContainer}>
                    <Text style={styles.textTitle}>Algae</Text>
                </View>
                <FlatList
                    data={chromista}
                    renderItem={renderItem}
                    keyExtractor={item => "" + item.id}
                    style={styles.lists}
                />

            </View >
        );
    else return <View style={styles.container}><Text>Loading...</Text></View>;
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        backgroundColor: '#e9edc9'
    }, circle: {
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        alignItems: 'center',
        justifyContent: 'center'
    }, firstPlace: {
        position: "relative",
        top: 10,
        left: 150,
        backgroundColor: '#FFEA5F',
    }, secondPlace: {
        position: "relative",
        top: -20,
        left: 50,
        backgroundColor: '#DED6CC',
    }, thirdPlace: {
        position: "relative",
        top: -120,
        left: 250,
        backgroundColor: '#F8C17E',
    },
    lists: {
        top: -100,
        backgroundColor: "#ccd5ae",
        borderColor: "#ccd5ae",
        margin: 10,
        borderWidth: 10,
        borderRadius: 20,
        minHeight: 100
    },
    listText: {
        color: "#71625C",
        fontWeight: "bold",
        fontSize: 17,
        bottom: 6,
        margin: 2
    },
    medalText: {
        fontWeight: "bold",
        fontSize: 15
    },
    listRow: {
        flexDirection: "row",
        marginRight: 14,
        marginBottom: 5
    }, header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        top: 30,
        borderColor: "#ccd5ae",
        backgroundColor: "#ccd5ae",
        margin: 0,
        padding: 0,
        borderWidth: 10,
        borderRadius: 10,
        marginBottom: 30
    }
    , headerText: {
        fontSize: 25,
        fontStyle: "italic",
        color: "#5D534F",
        fontWeight: "bold"
    },
    textContainer: {
        top: -100,
        display: "flex",
        flexDirection: "row",
        alignSelf: "center"
    },
    textTitle: {
        fontSize: 20,
        color: "#5D534F",
        fontWeight: "bold",
        fontStyle: "italic"
    },
});

export default homeScreen;