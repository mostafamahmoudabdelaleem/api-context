import * as React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { APIContext } from 'react-native-api-context';

export default function Page() {
    const { Get } = React.useContext(APIContext)
    const [data, setData] = React.useState('')

    React.useEffect(() => {
        Get({
            path: 'posts'
        })
            .then(resp => {
                setData(resp)
            })
            .catch(err => {
                console.log('[APIContext error]:', err)
            })

    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={({ item, index }) => {
                    return (
                        <View key={index} style={styles.card}>
                            <Text style={{ color: '#343434' }}>
                                {`${item.title}`.length > 30 ? `${`${item.title}`.substring(0, 30)} ...` : `${item.title}`}
                            </Text>

                            <Text style={{ color: '#999', fontSize: 10 }}>
                                {`${item.body}`.length > 150 ? `${`${item.body}`.substring(0, 150)} ...` : `${item.body}`}
                            </Text>
                        </View>
                    )
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f1f3'
    },
    card: {
        margin: 8,
        padding: 16,
        backgroundColor: '#fff',
        color: '#343434',
        borderRadius: 8
    }
});