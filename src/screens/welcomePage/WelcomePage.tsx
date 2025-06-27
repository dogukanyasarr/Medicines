import React from 'react';
import { Text, ImageBackground, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';
import styles from './style';

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
                    <Text style={styles.buttonText}>Haydi Başlayalım!</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

export default WelcomePage;