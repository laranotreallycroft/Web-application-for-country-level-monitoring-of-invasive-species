import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from "axios";
import * as ImagePicker from 'expo-image-picker';

export default function createSpeciesScreen({ navigation }) {

    const [speciesName, setSpeciesName] = useState("");
    const [speciesGroup, setSpeciesGroup] = useState("");
    const [description, setDescription] = useState("");
    const [galleryPermission, setGalleryPermission] = useState(null);
    const [photograph, setPhotograph] = useState("");

    const [speciesGroupData, setSpeciesGroupData] = useState([]);


    useEffect(() => {
        const endpoint = "http://10.0.2.2:8080/speciesGroup/getAll";
        axios.get(endpoint).then(res => {
            setSpeciesGroupData(res.data)

        }).catch((error) => {
            alert("Data get failure");
        });

    }, []);

    const permisionFunction = async () => {
        // here is how you can get the camera permission
        const imagePermission = await ImagePicker.getMediaLibraryPermissionsAsync();
        console.log(imagePermission.status);

        setGalleryPermission(imagePermission.status === 'granted');

        if (imagePermission.status !== 'granted') {
            alert('Permission for media access needed.');
            ImagePicker.requestMediaLibraryPermissionsAsync(false)
        }
    };




    const chooseFile = async () => {
        permisionFunction()
        if (!galleryPermission) return;
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            allowsMultipleSelection: false,
            base64: true,
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setPhotograph(result.base64);
        }

    };



    const handleCreateSpecies = () => {
        if (speciesName == "") {
            alert("Species name cannot be empty!")
            return
        }
        if (description == "") {
            alert("Species description cannot be empty!")
            return
        }

        if (photograph == "") {
            alert("Species photograph cannot be empty!")
            return
        }

        const endpoint = "http://10.0.2.2:8080/species/create";

        const species_object = {
            speciesName: speciesName,
            speciesGroup: speciesGroup,
            description: description,
            photograph: photograph
        };


        axios.post(endpoint, species_object).then(res => {
            alert("Species create success");
            navigation.goBack()
        }).catch((error) => {
            console.log(error)
            alert("Species create failure! Species with this name already exists!");
        });



    }
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />

            <Text style={styles.pickerTitle}>Species group</Text>
            <View
                style={styles.input}>
                <Picker

                    prompt="Species group"
                    selectedValue={speciesGroup}
                    style={styles.picker}
                    onValueChange={(itemValue, itemIndex) => setSpeciesGroup(itemValue)}
                >
                    {
                        speciesGroupData.map((prop, key) => {
                            return <Picker.Item label={prop.name} value={prop.name} key={prop.id} />;
                        })
                    }
                </Picker>
            </View>
            <TextInput
                style={styles.input}
                placeholder="Species name"
                onChangeText={setSpeciesName}
            />

            <TextInput
                style={styles.input}
                placeholder="Description"
                onChangeText={setDescription}
            />
            <TouchableOpacity
                activeOpacity={0.5}
                style={styles.chooseImage}
                onPress={() => chooseFile()}>
                <Text style={styles.textStyle}>Choose Image</Text>
            </TouchableOpacity>
            <View style={styles.buttonRow}>
                <Button
                    style={styles.button}
                    title="Add new species"
                    color='#929E69'
                    onPress={handleCreateSpecies}
                />
            </View >
        </View >
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e9edc9',
        justifyContent: 'center'
    },
    chooseImage: {
        alignSelf: 'center',
        alignContent: "center",
        alignItems: "center",
        backgroundColor: "#ccd5ae",
        backgroundColor: "#ccd5ae",
        borderColor: "#ccd5ae",
        margin: 2,
        borderWidth: 10,
        borderRadius: 20,
    },
    textStyle: {
        fontSize: 15
    },
    buttonRow: {
        marginHorizontal: 70,
        marginBottom: 20,
        marginTop: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-around'

    },
    input: {
        justifyContent: 'flex-end',
        height: 40,
        borderWidth: 1,
        backgroundColor: "#ccd5ae",
        borderColor: "#ccd5ae",
        margin: 8,
        padding: 10,
        borderWidth: 15,
        borderRadius: 20,
        fontSize: 15
    },
    picker: {
        left: - 20,
        top: 23,
        height: 50,
        width: 360

    },
    pickerTitle: {
        left: 15,
        fontSize: 15,
        fontWeight: "bold",
        color: "#717B50"
    }
});
