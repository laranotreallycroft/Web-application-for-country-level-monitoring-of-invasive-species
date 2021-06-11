import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import MapView, { Marker } from 'react-native-maps';
import axios from "axios";
import _, { map } from 'underscore';
import * as ImagePicker from 'expo-image-picker';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';
export default function createSightingRecordScreen(props) {

    const [description, setDescription] = useState("");
    const [photograph, setPhotograph] = useState("");
    const [galleryPermission, setGalleryPermission] = useState(null);
    const [locationDescription, setlocationDescription] = useState("");

    const [species, setSpecies] = useState([]);
    const [speciesGroupData, setSpeciesGroupData] = useState([]);
    const [speciesData, setSpeciesData] = useState([]);

    const [location, setLocation] = useState([]);
    const [locationData, setLocationData] = useState([]);
    const [countyData, setCountyData] = useState([]);

    const [marker, setMarker] = useState();

    useEffect(() => {
        const endpoint = "http://10.0.2.2:8080/speciesGroup/getAll";
        axios.get(endpoint).then(res => {
            setSpeciesGroupData(res.data)

        }).catch((error) => {
            console.log(error)
            alert("Data get failure");
        });
        var endpoint2 = "http://10.0.2.2:8080/county/getAll";
        axios.get(endpoint2).then(res => {
            res.data.sort((a, b) => (a.name > b.name) ? 1 : -1)
            setCountyData(res.data)


        }).catch((error) => {
            console.log(error)
            alert("Data get failure");
        });



    }, []);


    const handleSelectSpeciesGroup = (speciesGroup) => {
        const group_object = {
            speciesGroup: speciesGroup
        };
        const endpoint = "http://10.0.2.2:8080/speciesGroup/getSpecies";
        axios.post(endpoint, group_object).then(res => {
            setSpeciesData(res.data)

        }).catch((error) => {
            console.log(error)
            alert("Data get failure");
        });



    }

    const handleSelectCounty = (county) => {
        const group_object = {
            county: county
        };
        const endpoint = "http://10.0.2.2:8080/county/getLocations";
        axios.post(endpoint, group_object).then(res => {
            setLocationData(res.data)

        }).catch((error) => {
            console.log(error)
            alert("Data get failure");
        });



    }

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






    const handleCreateSightingRecord = () => {

        if (species == "") {
            alert("Species cannot be empty!")
            return
        }
        if (location == "") {
            alert("Location cannot be empty!")
            return
        }
        const endpoint = "http://10.0.2.2:8080/record/create";


        if (marker == null)

            var species_object = {
                description: description,
                locationDescription: locationDescription,
                photograph: photograph,
                species: species,
                location: location,
                coordinatesLat: null,
                coordinatesLon: null
            };

        else var species_object = {
            description: description,
            locationDescription: locationDescription,
            photograph: photograph,
            species: species,
            location: location,
            coordinatesLat: marker.latitude,
            coordinatesLon: marker.longitude
        };




        axios.post(endpoint, species_object).then(res => {
            alert("Sighting record create success!");

        }).catch((error) => {
            console.log(error)
            alert("Sighting record create failure!");
        });



    }
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />

            <TextInput
                style={styles.input}
                placeholder="Description"
                onChangeText={setDescription}
            />
            <TextInput
                style={styles.input}
                placeholder="Location description"
                onChangeText={setlocationDescription}
            />
            <TouchableOpacity
                activeOpacity={0.5}
                style={styles.chooseImage}
                onPress={() => chooseFile()}>
                <Text style={styles.textStyle}>Choose Image</Text>
            </TouchableOpacity>

            <Picker
                prompt="Species group"
                style={{ height: 50 }}
                onValueChange={(itemValue, itemIndex) => handleSelectSpeciesGroup(itemValue)}
            >
                {
                    speciesGroupData.map((prop, key) => {
                        return <Picker.Item label={prop.name} value={prop.name} key={prop.id} />;
                    })
                }
            </Picker>
            <Picker
                prompt="Species"
                selectedValue={species}
                style={{ height: 50 }}
                onValueChange={(itemValue, itemIndex) => setSpecies(itemValue)}
            >
                {
                    speciesData.map((prop, key) => {
                        return <Picker.Item label={prop.name} value={prop.name} key={prop.id} />;
                    })
                }
            </Picker>
            <Picker
                prompt="County"
                style={{ height: 50 }}
                onValueChange={(itemValue, itemIndex) => handleSelectCounty(itemValue)}
            >
                {
                    countyData.map((prop, key) => {
                        return <Picker.Item label={prop.name} value={prop.name} key={prop.id} />;
                    })
                }
            </Picker>

            <Picker
                prompt="Location"
                selectedValue={location}
                style={{ height: 50 }}
                onValueChange={(itemValue, itemIndex) => setLocation(itemValue)}
            >
                {
                    locationData.map((prop, key) => {
                        return <Picker.Item label={prop.name} value={prop.name} key={prop.id} />;
                    })
                }
            </Picker>

            <MapView style={styles.map} initialRegion={{
                latitude: 45.1,
                longitude: 16.5,
                latitudeDelta: 2,
                longitudeDelta: 2,
            }}
                onPress={(e) => setMarker(e.nativeEvent.coordinate)}>
                {marker != null && <Marker coordinate={marker} />}


            </MapView>
            <Button
                style={styles.button}
                title="Add new sighting record"
                color='#929E69'
                onPress={handleCreateSightingRecord}
            />

        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e9edc9',
        justifyContent: 'flex-end'
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
        height: 50,
    },
    map: {
        height: 200
    }, chooseImage: {
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
});
