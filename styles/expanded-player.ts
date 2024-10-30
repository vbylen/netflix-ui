import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const expandedPlayerStyles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        height: '100%',
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },

    scrollView: {
        flex: 1,
        width: '100%',
    },
});
