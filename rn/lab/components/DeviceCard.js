import { View, Text, StyleSheet, Image, Button } from 'react-native';
import React from 'react';
// import microscope from '../public/img/microscope-img-PhotoRoom.png'
// import aspirator from '../public/img/aspirator-PhotoRoom.png'
// import distil from '../public/img/distil-PhotoRoom.png'
// import shaker from '../public/img/shaker-PhotoRoom.png'
// import boiler from '../public/img/boiler-PhotoRoom.png'

export default function DeviceCard({ fotka, navigation, ...props}) {
    const handlePress = () => {
        navigation.navigate('Device', { id: props.id , name: props.name, price: props.price, description: props.description, ssilka: props.ssilka});
    };


    // const tt = new Image(fotka)
    //
    // let res = microscope;
    // console.log('res >', res)
    // if (props.image === 'microscope-img')
    //     res = microscope
    // if (props.image === 'aspirator')
    //     res = aspirator
    // if (props.image === 'distil')
    //     res = distil
    // if (props.image === 'shakerboiler')
    //     res = boiler
    // if (props.image === 'boiler')
    //     res = boiler


    return (
        <View style={styles.card}>
            <Image style={styles.image}
                   source={{ uri: `${props.ssilka}` }}
            />
            <View style={styles.container}>
                <Text style={styles.brandTitle}>{props.name}</Text>
                <View style={styles.row}>
                    <Text style={styles.text}>{props.description}</Text>
                    <Text style={styles.text}>{props.price} р.</Text>
                </View>
            </View>
            <Button title='Подробнее' onPress={handlePress} />
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        width: 320,
        backgroundColor: '#303030',
        borderRadius: 12,
        padding: 24,
        gap: 12,
        margin: 8,
    },
    image: {height: 160, width: 160},
    container: { display: 'flex', width: '100%', margin: 8 },
    row: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between' },
    brandTitle: { color: '#4287f5', fontSize: 16 },
    text: { color: '#f0f0f0', fontSize: 16 },
});