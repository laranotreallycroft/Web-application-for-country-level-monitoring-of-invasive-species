import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, FlatList, TextInput } from 'react-native';
import axios from "axios";

export default function accountsScreen({ navigation }) {
    const [data, setData] = useState("");
    const [filteredData, setFilteredData] = useState("");
    const [search, setSearch] = useState("");
    useEffect(() => {

        const endpoint = "http://10.0.2.2:8080/account/getAll";
        axios.get(endpoint).then(res => {
            setData(res.data)
            setFilteredData(res.data)

        }).catch((error) => {
            console.log(error)
            alert("Data get failure");
        });

    }, []);
    const handleDelete = (id) => {
        var endpoint = "http://10.0.2.2:8080/account/delete";
        const payload = { id: id }
        axios.post(endpoint, payload).then(res => {
            var endpoint2 = "http://10.0.2.2:8080/account/getAll";
            axios.get(endpoint2).then(res => {
                setData(res.data)
                setFilteredData(res.data)

            }).catch((error) => {
                console.log(error)
                alert("Data get failure");
            });
        }).catch((error) => {
            alert(error)
            console.log(error)
        });



    }

    const Item = ({ username, id }) => (
        <View style={styles.row} >
            <Text onPress={() => handleDelete(id)} style={styles.xButton}>x  </Text>
            <Text onPress={() => navigation.navigate("userScreen", { id: id })} style={styles.listText}>{username} </Text>
        </View>
    );


    var renderItem = ({ item }) => (
        <Item username={item.username} id={item.id} />
    );


    const handleSearch = text => {
        const formattedQuery = text.toLowerCase();
        const filteredData = data.filter((item) => item.username.toLowerCase().includes(formattedQuery)).map(({ id, username }) => ({ id, username }));
        setFilteredData(filteredData);
        setSearch(text);
    };



    return (
        <View style={styles.container}>

            <StatusBar style="auto" />
            <View style={styles.header} >
                <Text style={styles.headerText} > Accounts </Text>
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
                keyExtractor={item => item.username}
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

