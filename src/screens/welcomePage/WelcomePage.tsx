import React from 'react';
import { Text, ImageBackground, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';

const WelcomePage = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    return (
        <ImageBackground
            source={require('../../assets/images/welcomebg.png')}
            style={styles.bg}
            resizeMode="cover"
        >
            <View style={styles.centerBox}>
                <Text style={styles.title}>Medicine App</Text>
                <Text style={styles.subtitle}>
                    Dijital ilaç asistanınız ile tedavinizi daha düzenli ve güvenli yönetin.
                </Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    centerBox: {
        width: '100%',
        alignItems: 'center',
        marginTop: '130%',
    },
    title: {
        fontSize: 38,
        fontWeight: 'bold',
        color: '#fff',
        textShadowColor: 'rgba(0,0,0,0.25)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 8,
        marginBottom: 12,
        letterSpacing: 1,
    },
    subtitle: {
        fontSize: 18,
        color: 'rgba(255,255,255,0.85)',
        fontWeight: 'bold',
        textAlign: 'center',
        textShadowColor: 'rgba(0,0,0,0.15)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 4,
        marginBottom: 18,
        letterSpacing: 0.2,
        width: '90%',
    },
    button: {
        backgroundColor: '#fff',
        paddingVertical: 14,
        paddingHorizontal: 48,
        borderRadius: 30,
        marginTop: 8,
        shadowColor: '#13aff9',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 2,
    },
    buttonText: {
        color: '#13aff9',
        fontSize: 21,
        fontWeight: 'bold',
        letterSpacing: 1,
        textAlign: 'center',
    },
});

export default WelcomePage;