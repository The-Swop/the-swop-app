//app.styles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        height: '100%',
        margin: 0,
        backgroundColor: '#000',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    stats: {
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    header6: {
        fontSize: 26,
        color: '#12fff9',
        marginBottom: 20,
        marginTop: 0,
        fontFamily: 'Montserrat',
        fontWeight: '900'
    },
    paragraph: {
        fontSize: 23,
        textAlign: 'center',
        margin: 5,
        fontFamily: 'Roboto'
    },
    credits: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 60,
        width: '100%'
    },
    creditsImage: {
        width: 150,
        margin: 5
    },
});

export default styles;