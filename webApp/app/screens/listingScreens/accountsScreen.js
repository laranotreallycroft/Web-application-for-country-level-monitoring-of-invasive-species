import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, FlatList, TextInput, TouchableOpacity } from 'react-native';
import axios from "axios";
import Dialog, { DialogContent, DialogTitle, DialogFooter, DialogButton } from 'react-native-popup-dialog';

export default function accountsScreen({ navigation }) {

    const [data, setData] = useState("");
    const [filteredData, setFilteredData] = useState("");
    const [search, setSearch] = useState("");
    const [itemToBeDeleted, setItemToBeDeleted] = useState(null);

    useEffect(() => {

        axios.get("http://10.0.2.2:8080/account/getAll").then(res => {
            setData(res.data)
            setFilteredData(null)
            setSearch("")

        }).catch((error) => {
            alert("Failed to get accounts data");
        });

    }, []);

    const handleDelete = () => {
        const payload = { id: itemToBeDeleted }
        setItemToBeDeleted(null);

        axios.post("http://10.0.2.2:8080/account/delete", payload).then(res => {

            axios.get("http://10.0.2.2:8080/account/getAll").then(res => {
                setData(res.data)
                setFilteredData(null)
                setSearch("")
            }).catch(() => {
                alert("Failed to get accounts data");
            });
        }).catch(() => {
            alert("Failed to get accounts data");
        });



    }

    const Item = ({ id, username }) => (
        <TouchableOpacity
            style={styles.row}
            onPress={() => navigation.navigate("userScreen", { id: id, admin: true })}
            onLongPress={() => setItemToBeDeleted(id)}>
            <Text style={styles.listText}>{username} </Text>
        </TouchableOpacity>
    );


    var renderItem = ({ item }) => (
        <Item id={item.id} username={item.username} />
    );


    const handleSearch = text => {
        if (text == "") {
            setFilteredData(null);
            setSearch(text);
        }
        else {
            const formattedQuery = text.toLowerCase();
            const filteredData = data.filter((item) => item.username.toLowerCase().includes(formattedQuery)).map(({ id, username }) => ({ id, username }));
            setFilteredData(filteredData);
            setSearch(text);
        }
    };


    if (data != null)
        return (
            <View style={styles.container}>

                <Dialog
                    visible={itemToBeDeleted != null}
                    dialogTitle={
                        <DialogTitle
                            title="Deleting account"
                            hasTitleBar={false}
                            align="left"
                        />
                    }
                    footer={
                        <DialogFooter>
                            <DialogButton
                                text="CANCEL"
                                bordered
                                onPress={() => {
                                    setItemToBeDeleted(null);
                                }}
                                key="button-1"
                            />
                            <DialogButton
                                text="OK"
                                bordered
                                onPress={() => {
                                    handleDelete();

                                }}
                                key="button-2"
                            />
                        </DialogFooter>
                    }>
                    <DialogContent>
                        <Text  > Are you sure you want to delete this account? </Text>
                    </DialogContent>
                </Dialog>


                <StatusBar style="auto" />

                <View style={styles.header} >
                    <Text style={styles.headerText} > Accounts </Text>
                    <Text onPress={() => navigation.navigate("createAdminAccountScreen", { admin: true })} style={[styles.headerText, styles.addText]}>+</Text>
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

