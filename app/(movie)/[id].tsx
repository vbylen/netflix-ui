import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';

export default function MovieScreen() {
    const { id } = useLocalSearchParams();

    return (
        <View style={{ flex: 1, backgroundColor: '#000' }}>
            <Text style={{ color: '#fff' }}>Movie ID: {id}</Text>
        </View>
    );
} 