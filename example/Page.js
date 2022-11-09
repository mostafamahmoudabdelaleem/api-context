import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { APIContext } from 'react-native-api-context';

export default function Page() {
    const { Post } = React.useContext(APIContext)
    const [data, setData] = React.useState('')

    React.useEffect(() => {
        Post({
            path: 'posts'
        })
            .then(resp => {
                console.log('resp ===>', resp)
                // setData(resp)
            })
            .catch(err => {
                console.log('error ===>', err)
            })
            
    }, []);

    return (
        <View style={styles.container}>
            <Text>Response: {data}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});