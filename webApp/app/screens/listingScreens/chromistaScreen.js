import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, FlatList, TextInput } from 'react-native';
import axios from "axios";

export default function chromistaScreen({ navigation }) {

    const [data, setData] = useState("");
    const [filteredData, setFilteredData] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        const group_object = {
            speciesGroup: "Chromista"
        };
        axios.post("http://10.0.2.2:8080/speciesGroup/getSpecies", group_object).then(res => {
            setData(res.data)
            setFilteredData(null)
            setSearch("")

        }).catch((error) => {
            alert("Data get failure");
        });

    }, []);

    const Item = ({ id, name }) => (
        <View  >
            <Text onPress={() => navigation.navigate("Species", { speciesId: id })} style={styles.listText}>{name}</Text>
        </View>
    );

    var renderItem = ({ item }) => (
        <Item id={item.id} name={item.name} />
    );

    const handleSearch = text => {
        if (text == "") {
            setFilteredData(null);
            setSearch(text);
        } else {
            const formattedQuery = text.toLowerCase();
            const filteredData = data.filter((item) => item.name.toLowerCase().includes(formattedQuery)).map(({ id, name }) => ({ id, name }));
            setFilteredData(filteredData);
            setSearch(text);
        }
    };


    if (data != null)
        return (
            <View style={styles.container}>

                <StatusBar style="auto" />
                <View style={styles.header} >
                    <Text style={styles.headerText} >Algae (Chromista) </Text>
                </View>
                <View
                    style={styles.SearchBar}
                >
                    <TextInput
                        autoCapitalize="none"
                        autoCorrect={false}
                        clearButtonMode="always"
                        value={search}
                        onChangeText={searchText => handleSearch(searchText)}
                        placeholder="Search"
                        style={styles.textInput}
                    />
                </View>
                <FlatList
                    data={filteredData}
                    renderItem={renderItem}
                    keyExtractor={item => "" + item.id}
                    style={styles.list}
                />
            </View >
        );
    else return <View style={styles.container}><Text>Loading...</Text></View>;
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: '#e9edc9'
    },
    header: {
        alignItems: "center",
        top: 30,
        borderColor: "#ccd5ae",
        backgroundColor: "#ccd5ae",
        margin: 0,
        padding: 0,
        borderWidth: 10,
        borderRadius: 10
    }
    , headerText: {

        fontSize: 25,
        fontStyle: "italic",
        color: "#5D534F",
        fontWeight: "bold"
    },
    list: {
        marginTop: 50,
        marginBottom: 5,
        backgroundColor: "#ccd5ae",
        borderColor: "#ccd5ae",
        borderWidth: 20,
        borderRadius: 20
    }, listText: {
        color: "#71625C",
        fontWeight: "bold",
        marginBottom: 2
    },
    SearchBar: {
        backgroundColor: '#fff',
        top: 40,
        padding: 10,
        borderRadius: 20
    },
    textInput: {
        backgroundColor: '#fff',
        paddingHorizontal: 20
    }
});

