//app.styles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    footer: {
        backgroundColor: 'darkgrey',
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0
      },
      footerText: {
        color: '#fff',
        fontSize: 16,
      },
    postContainer: {
        backgroundColor: '#000', // change this to the color you want for the post background
        margin: 10,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center', 
        justifyContent: 'center', 
      },
      postTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#fff', // White text color
      },
      postContent: {
        fontSize: 16,
        marginBottom: 10,
        color: '#fff', // White text color
      },
      postImage: {
        width: '100%', 
        height: 200, // adjust this based on the size you want for the image
        resizeMode: 'contain', // or 'cover'
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
    
    header: {
        height: 200,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
      },
      image: {
        width: "100%",
        height: 150
      },
    }
    
    
);

export default styles;