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

    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        paddingTop: 30,

        backgroundColor: 'transparent',
        justifyContent: 'space-between',
    },


    artworkContainer: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 12,
        backgroundColor: 'transparent', // Required for Android shadows
        marginBottom: 34,
    },
    artwork: {
        width: width - 52,
        height: width - 52,
        borderRadius: 8,
    },
    controls: {
        width: '100%',
        backgroundColor: 'transparent',
        flex: 1,
        justifyContent: 'space-between',
    },
    titleContainer: {
        // marginBottom: -30,
        backgroundColor: 'transparent',
        width: '100%',
        marginTop: 12
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    titleMain: {
        flex: 1,
    },
    titleIcons: {
        flexDirection: 'row',
        gap: 15,
    },
    title: {
        fontSize: 21,
        // marginBottom: 8,
        marginBottom: -4,
        color: '#fff',
    },
    artist: {
        fontSize: 19,
        opacity: 0.7,
        color: '#fff',
    },
    progressBar: {
        height: 6,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 5,
        marginBottom: 10,
        marginTop: 30,
    },
    progress: {
        width: '30%',
        height: '100%',
        backgroundColor: '#ffffff6a',
        borderRadius: 5,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
    },
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        backgroundColor: 'transparent',
    },
    timeText: {
        fontSize: 12,
        opacity: 0.6,
        color: '#fff',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 50,
        backgroundColor: 'transparent',
        marginTop: 10,
    },
    button: {
        padding: 10,
    },
    playButton: {
        transform: [{ scale: 1.2 }],
    },
    volumeControl: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingHorizontal: 10,

    },
    volumeBar: {
        flex: 1,
        height: 6,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 20,
    },
    volumeProgress: {
        width: '70%',
        height: '100%',
        backgroundColor: '#fff',
        borderRadius: 10,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
    },
    iconButton: {
        width: 32,
        height: 32,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    extraControls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 26,
        backgroundColor: 'transparent',

    },
    extraControlButton: {
        alignItems: 'center',
        // justifyContent: 'center',
        opacity: 0.8,
        height: 60,
    },
    extraControlText: {
        color: '#fff',
        fontSize: 13,
        marginTop: 6,
        opacity: 0.7,
        fontWeight: '600',
    },
    extraControlIcons: {
        flexDirection: 'row',

    },
    scrollView: {
        flex: 1,
        width: '100%',
    },
    lyricsContainer: {
        paddingHorizontal: 20,
        paddingVertical: 30,
        width: '100%',
        alignItems: 'center',
    },
    lyricsText: {
        color: '#fff',
        fontSize: 16,
        lineHeight: 24,
        textAlign: 'center',
        opacity: 0.8,
        marginVertical: 2,
    },
    lyricsSpacing: {
        marginVertical: 10,
    },
    dragHandleContainer: {
        paddingBottom: 14,
    },
});
