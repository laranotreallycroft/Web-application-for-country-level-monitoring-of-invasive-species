import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from "axios";
import _, { map } from 'underscore';
export default function createLocationScreen(props) {

    const [locationName, setLocationName] = useState("");
    const [county, setcounty] = useState("");

    const [countyData, setCountyData] = useState([]);


    useEffect(() => {
        const endpoint = "http://10.0.2.2:8080/location/getAll";
        axios.get(endpoint).then(res => {
            var i = res.data
            var j = _.keys(_.countBy(i, function (i) { return i.county; }))
            j.sort()
            setCountyData(j)


        }).catch((error) => {
            console.log(error)
            alert("Data get failure");
        });

    }, []);






    const handleCreateLocation = () => {
        if (locationName == "") {
            alert("Location name cannot be empty!")
            return
        }
        if (county == "") {
            alert("County cannot be empty!")
            return
        }

        const endpoint = "http://10.0.2.2:8080/location/create";

        const location_object = {
            locationName: locationName,
            county: county
        };


        axios.post(endpoint, location_object).then(res => {
            alert("Location create success");

        }).catch((error) => {
            console.log(error)
            alert("Location create failure! Location with this name already exists!");
        });



    }
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />

            <TextInput
                style={styles.input}
                placeholder="Location name"
                onChangeText={setLocationName}
            />
            <Picker
                prompt="County"
                selectedValue={countyData}
                style={{ height: 50 }}
                onValueChange={(itemValue, itemIndex) => setcounty(itemValue)}
            >
                {
                    countyData.map((prop, key) => {
                        return <Picker.Item label={prop} value={prop} key={prop} />;
                    })
                }
            </Picker>

            <Button
                style={styles.button}
                title="Add new location"
                color='#EA7D55'
                onPress={handleCreateLocation}
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
    button: {
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,

    }
});
