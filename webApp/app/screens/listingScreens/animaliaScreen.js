import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Button, Text, StyleSheet, View, FlatList, TextInput } from 'react-native';
import axios from "axios";
import _, { map } from 'underscore';

export default function animaliaScreen({ navigation }) {
    const [data, setData] = useState("");
    const [filteredData, setFilteredData] = useState("");
    const [search, setSearch] = useState("");
    useEffect(() => {
        const group_object = {
            speciesGroup: "Animalia"
        };
        const endpoint = "http://10.0.2.2:8080/speciesGroup/getSpecies";
        axios.post(endpoint, group_object).then(res => {
            setData(res.data)
            setFilteredData(res.data)

        }).catch((error) => {
            console.log(error)
            alert("Data get failure");
        });

    }, []);

    const Item = ({ name, count }) => (
        <View  >
            <Text onPress={() => navigation.navigate("Species", { speciesName: name })} style={styles.listText}>{count}  {name}</Text>
        </View>
    );


    var renderItem = ({ item }) => (
        <Item name={item.name} count={item.count} />
    );


    const handleSearch = text => {
        const formattedQuery = text.toLowerCase();
        const filteredData = data.filter((item) => item.name.toLowerCase().includes(formattedQuery)).map(({ id, name }) => ({ id, name }));
        setFilteredData(filteredData);
        setSearch(text);
    };



    return (
        <View style={styles.container}>

            <StatusBar style="auto" />
            <View style={styles.header} >
                <Text style={styles.headerText} >Životinje (Animalia) </Text>
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
                keyExtractor={item => item.name}
                style={styles.list}
            />
        </View >
    );
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

