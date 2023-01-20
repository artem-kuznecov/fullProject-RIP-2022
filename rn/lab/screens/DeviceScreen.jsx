import {View, Text, StyleSheet, Image, Button} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { resetDevice, setDevice } from '../store/deviceSlice';
import { axiosInstance } from '../API';

export default function DeviceScreen({ route }) {
    const { id, name, description, ssilka, price } = route.params;
    const dispatch = useDispatch();
    const { device } = useSelector((store) => store.device);
    useEffect(() => {
        async function getOneDevice() {
            await axiosInstance.get(`/good/${id}`).then((response) => dispatch(setDevice(response?.data)));
        }


        getOneDevice();
        return () => {
            dispatch(resetDevice());
        };
    }, [dispatch]);
    console.log('название элементика >', String(device.name))
    return (
        <View style={styles.page}>
            <View style={styles.card}>
                <Image style={styles.image}
                       source={{ uri: `${ssilka}` }}
                />
                <View style={styles.container}>
                    <Text style={styles.brandTitle}>{name}</Text>
                    <View style={styles.row}>
                        <Text style={styles.text}>{description}</Text>
                        <Text style={styles.text}>{price} р.</Text>
                    </View>
                </View>
            </View>
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
    page: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2a2a2a',
    },
});