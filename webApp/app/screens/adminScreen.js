import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, Button, FlatList, Text } from 'react-native';
import axios from "axios";



export default function adminScreen({ navigation }) {



    const [data, setData] = useState("");
    const [dataset, setDataset] = useState("");

    const getAccountData = () => {

        const endpoint = "http://10.0.2.2:8080/account/getAll";



        axios.get(endpoint).then(res => {
            console.log(res.data)
            setData(res.data)
            setDataset("Account")


        }).catch((error) => {
            alert(error)
            console.log(error)
            alert("Data get failure");
        });

    }



    const getSpeciesData = () => {

        const endpoint = "http://10.0.2.2:8080/species/getAll";


        axios.get(endpoint).then(res => {
            res.data.sort((a, b) => (a.name > b.name) ? 1 : -1)
            console.log(res.data)
            setData(res.data)
            setDataset("Species")

        }).catch((error) => {
            alert(error)
            console.log(error)
            alert("Data get failure");
        });
    }
    const getSpeciesGroupData = () => {

        const endpoint = "http://10.0.2.2:8080/speciesGroup/getAll";


        axios.get(endpoint).then(res => {
            res.data.sort((a, b) => (a.name > b.name) ? 1 : -1)
            console.log(res.data)
            setData(res.data)
            setDataset("Species Group")

        }).catch((error) => {
            alert(error)
            console.log(error)
            alert("Data get failure");
        });
    }

    const getCountyData = () => {

        const endpoint = "http://10.0.2.2:8080/county/getAll";



        axios.get(endpoint).then(res => {

            res.data.sort((a, b) => (a.name > b.name) ? 1 : -1)
            console.log(res.data)
            setData(res.data)
            setDataset("County")


        }).catch((error) => {
            alert(error)
            console.log(error)
            alert("Data get failure");
        });
    }

    const getLocationData = () => {

        const endpoint = "http://10.0.2.2:8080/location/getAll";



        axios.get(endpoint).then(res => {

            res.data.sort((a, b) => (a.name > b.name) ? 1 : -1)
            console.log(res.data)
            setData(res.data)
            setDataset("Location")


        }).catch((error) => {
            alert(error)
            console.log(error)
            alert("Data get failure");
        });
    }

    const getRecordData = () => {
        const endpoint = "http://10.0.2.2:8080/record/getAll";

        axios.get(endpoint).then(res => {
            console.log(res.data)
            setData(res.data)
            setDataset("Sighting Record")

        }).catch((error) => {
            alert(error)
            console.log(error)
            alert("Data get failure");
        });

    }

    const handleDelete = (id) => {
        var endpoint = ""
        switch (dataset) {
            case ("Account"):
                endpoint = "http://10.0.2.2:8080/account/delete";
                break;
            default:
            case ("Species"):
                endpoint = "http://10.0.2.2:8080/species/delete";
                break;
            case ("Species Group"):
                endpoint = "http://10.0.2.2:8080/speciesGroup/delete";
                break;
            case ("County"):
                endpoint = "http://10.0.2.2:8080/county/delete";
                break;
            case ("Location"):
                endpoint = "http://10.0.2.2:8080/location/delete";
                break;
            case ("Sighting Record"):
                endpoint = "http://10.0.2.2:8080/record/delete";
                break;
        }
        //if doesnt work make "id"
        const payload = { id: id }

        axios.post(endpoint, payload).then(res => {

            switch (dataset) {
                case ("Account"):
                    getAccountData()
                    break;
                default:
                case ("Species"):
                    getSpeciesData()
                    break;
                case ("Species Group"):
                    getSpeciesGroupData()
                    break;
                case ("County"):
                    getCountyData()
                    break;
                case ("Location"):
                    getLocationData()
                    break;
                case ("Sighting Record"):
                    getRecordData()
                    break;
            }


        }).catch((error) => {
            //  alert(error)
            console.log(error)
            //  alert("Data get failure");
        });



    }

    const Item = ({ title, id }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
            <Button
                onPress={() => handleDelete(id)}
                title={"Delete this " + dataset}
                color="#841584"
            />
        </View>
    );

    var renderItem = ({ item }) => (
        <Item title={item.name} id={item.id} />
    );
    switch (dataset) {
        case ("Account"):
            renderItem = ({ item }) => (
                <Item title={item.username} id={item.id} />
            );
            break;
        case ("Sighting Record"): renderItem = ({ item }) => (
            <Item title={item.id} id={item.id} />
        );

    }


    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                ListHeaderComponent={() => {
                    return (
                        <View style={styles.item}>
                            <Button
                                title={"Add new " + dataset}
                                color='#EA7D55'
                                //.replace for removing spaces in "Species Group"
                                onPress={() => navigation.navigate('Create' + dataset.replace(/\s/g, ''))}
                            />
                        </View>)
                }}
            />

            <Button
                title="get Account data"
                color='#EA7D55'
                onPress={getAccountData}
            />
            <Button
                title="get Species data"
                color='#EA7D55'
                onPress={getSpeciesData}
            />
            <Button
                title="get Species Group data"
                color='#EA7D55'
                onPress={getSpeciesGroupData}
            />
            <Button
                title="get County data"
                color='#EA7D55'
                onPress={getCountyData}
            />
            <Button
                title="get Location data"
                color='#EA7D55'
                onPress={getLocationData}
            />

            <Button
                title="get Sighting Record data"
                color='#EA7D55'
                onPress={getRecordData}
            />
        </View >
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#A8AEC1',
        alignItems: 'stretch',
        justifyContent: 'flex-end',
    },
    item: {
        padding: 5,
        marginVertical: 4,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 16,
    }
});