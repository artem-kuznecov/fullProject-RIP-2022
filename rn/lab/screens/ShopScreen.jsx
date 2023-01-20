// import { View } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import React, { useEffect } from 'react';
// import { axiosInstance } from '../API';
// import { setDevices } from '../store/deviceSlice';
// import DeviceCard from '../components/DeviceCard';
//
// export default function ShopScreen({ navigation }) {
//     const dispatch = useDispatch();
//     const { devices } = useSelector((store) => store.device);
//
//     useEffect(() => {
//         async function getAllDevices() {
//             await axiosInstance.get('/goodslist').then((response) => dispatch(setDevices(response?.data)));
//         }
//         getAllDevices();
//     }, [dispatch]);
//
//     return <View>{!!devices && devices.map((device) => <DeviceCard key={device.id} {...device} />)}</View>;
// }

import { ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { axiosInstance } from '../API';
import { setDevices } from '../store/deviceSlice';
import DeviceCard from '../components/DeviceCard';

export default function ShopScreen({ navigation }) {
    const dispatch = useDispatch();
    const { devices } = useSelector((store) => store.device);


    useEffect(() => {
        async function getAllDevices() {
            await axiosInstance.get('/goodslist').then((response) => dispatch(setDevices(response?.data)));
        }
        getAllDevices();
    }, [dispatch]);

    return (
        <ScrollView>
            <View style={styles.page}>
                {!!devices &&
                    devices.map((device) => {
                        console.log('device.image >', device.image)
                        const test = `../public/img/${device.image}.png`
                        console.log('test >', test)
                        return (
                            <DeviceCard key={device.id} {...device} fotka={device.image} navigation={navigation}/>
                        )
                    })}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    page: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2a2a2a',
    },
});