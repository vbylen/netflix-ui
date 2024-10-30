import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

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
    videoContainer: {
        width: '100%',
        height: width * 0.6, // 16:9 aspect ratio
        position: 'relative',
    },
    video: {
        width: '100%',
        height: '100%',
    },
    videoOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 60,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 16,
    },
    muteOverlay: {
        position: 'absolute',
        bottom: 16,
        right: 16,
    },
    closeButton: {
        padding: 8,
    },
    soundButton: {
        padding: 8,
    },
    contentContainer: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    metaInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        gap: 8,
    },
    year: {
        fontSize: 14,
        color: '#999',
    },
    duration: {
        fontSize: 14,
        color: '#999',
    },
    rating: {
        fontSize: 14,
        color: '#999',
        backgroundColor: '#333',
        paddingHorizontal: 4,
        paddingVertical: 2,
        borderRadius: 4,
    },
    quality: {
        fontSize: 14,
        color: '#999',
        backgroundColor: '#333',
        paddingHorizontal: 4,
        paddingVertical: 2,
        borderRadius: 4,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 16,
    },
    playButton: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 4,
        gap: 8,
    },
    playButtonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
    downloadButton: {
        flex: 1,
        backgroundColor: '#333',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 4,
        gap: 8,
    },
    downloadButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 16,
        color: '#fff',
    },
    castInfo: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    castLabel: {
        color: '#999',
    },
    castText: {
        flex: 1,
        color: '#fff',
    },
    directorInfo: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    directorLabel: {
        color: '#999',
    },
    directorText: {
        flex: 1,
        color: '#fff',
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 16,
        borderTopWidth: 1,
        borderTopColor: '#333',
    },
    actionButton: {
        alignItems: 'center',
        gap: 8,
    },
    actionButtonText: {
        fontSize: 12,
        color: '#fff',
    },
    moreLikeThis: {
        padding: 16,
    },
    moreLikeThisTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    movieGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    moviePoster: {
        width: '31%',
        aspectRatio: 2 / 3,
        borderRadius: 4,
    },
});
