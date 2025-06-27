import { StyleSheet } from 'react-native';

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

export default styles;
