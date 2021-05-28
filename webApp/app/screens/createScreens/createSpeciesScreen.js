import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from "axios";
import * as ImagePicker from 'expo-image-picker';
export default function createSpeciesScreen(props) {

    const [speciesName, setSpeciesName] = useState("");
    const [speciesGroup, setSpeciesGroup] = useState("");
    const [description, setDescription] = useState("");
    const [galleryPermission, setGalleryPermission] = useState(null);
    const [photograph, setPhotograph] = useState("");

    const [speciesGroupData, setSpeciesGroupData] = useState([]);


    useEffect(() => {
        const endpoint = "http://10.0.2.2:8080/speciesGroup/getAll";
        axios.get(endpoint).then(res => {
            console.log(res.data)
            setSpeciesGroupData(res.data)

        }).catch((error) => {
            console.log(error)
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

        }).catch((error) => {
            console.log(error)
            alert("Species create failure! Species with this name already exists!");
        });



    }
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />

            <TextInput
                style={styles.input}
                placeholder="Species name"
                onChangeText={setSpeciesName}
            />
            <Picker
                prompt="Species group"
                selectedValue={speciesGroup}
                style={{ height: 50 }}
                onValueChange={(itemValue, itemIndex) => setSpeciesGroup(itemValue)}
            >
                {
                    speciesGroupData.map((prop, key) => {
                        return <Picker.Item label={prop.name} value={prop.name} key={prop.id} />;
                    })
                }
            </Picker>
            <TextInput
                style={styles.input}
                placeholder="Description"
                onChangeText={setDescription}
            />
            <TouchableOpacity
                activeOpacity={0.5}
                style={styles.buttonStyle}
                onPress={() => chooseFile()}>
                <Text style={styles.textStyle}>Choose Image</Text>
            </TouchableOpacity>
            <Button
                style={styles.button}
                title="Add new species"
                color='#EA7D55'
                onPress={handleCreateSpecies}
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
