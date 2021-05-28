import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, Text, StyleSheet, View } from 'react-native';
function homeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Button
                title="Login"
                onPress={() => navigation.navigate('Login')}
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
    }
});

export default homeScreen;