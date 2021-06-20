import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, FlatList, TextInput } from 'react-native';
import axios from "axios";

export default function countiesScreen({ navigation }) {

    const [data, setData] = useState("");
    const [filteredData, setFilteredData] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {

        axios.get("http://10.0.2.2:8080/county/getAll").then(res => {
            setData(res.data)
            setFilteredData(res.data)
            setSearch("")
        }).catch((error) => {
            alert("Failed to get county data");
        });

    }, []);
    const handleDelete = (id) => {
        const payload = { id: id }
        axios.post("http://10.0.2.2:8080/county/delete", payload).then(res => {
            axios.get("http://10.0.2.2:8080/county/getAll").then(res => {
                setData(res.data)
                setFilteredData(res.data)
                setSearch("")

            }).catch(() => {
                alert("Failed to get county data");
            });
        }).catch(() => {
            alert("Failed to get county data")
        });



    }

    const Item = ({ id, name }) => (
        <View style={styles.row} >
            <Text onPress={() => handleDelete(id)} style={styles.xButton}>x  </Text>
            <Text style={styles.listText}>{name} </Text>
        </View>
    );


    var renderItem = ({ item }) => (
        <Item id={item.id} name={item.name} />
    );


    const handleSearch = text => {
        const formattedQuery = text.toLowerCase();
        const filteredData = data.filter((item) => item.name.toLowerCase().includes(formattedQuery)).map(({ id, name }) => ({ id, name }));
        setFilteredData(filteredData);
        setSearch(text);
    };


    if (data != null)
        return (
            <View style={styles.container}>

                <StatusBar style="auto" />
                <View style={styles.header} >
                    <Text style={styles.headerText} > Counties</Text>
                    <Text onPress={() => navigation.navigate("AddCounty")} style={[styles.headerText, styles.addText]}>+</Text>
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
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
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
    addText: {
        paddingLeft: 20
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
    },
    row: {
        flex: 1,
        flexDirection: "row"
    },
    xButton: {
        fontWeight: "bold",
        marginBottom: 2,
        color: "#3D3735",
    }
});

