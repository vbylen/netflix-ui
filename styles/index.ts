import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    header: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        // alignItems: 'center',
        paddingHorizontal: 16,
        // marginBottom: 16,
    },
    headerTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    searchButton: {
        padding: 8,
    },
    categoryTabs: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        marginBottom: 24,
        // marginTop: 12,
        gap: 12,
    },
    categoryTab: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 20,
    },
    categoryTabText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
    },
    categoryTabTextWithIcon: {
        color: '#fff',
        fontSize: 14,
        flexDirection: 'row',
        alignItems: 'center',
    },
    featuredContent: {
        width: '100%',
        height: 480,
        marginBottom: 24,
        position: 'relative',
        paddingHorizontal: 20,
    },
    featuredImageContainer: {
        width: '100%',
        height: '100%',
        position: 'relative',
        borderWidth: 0.5,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 8,
        overflow: 'hidden',
    },
    featuredImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    featuredGradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '40%',
    },
    featuredOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 16,
        right: 16,
        paddingBottom: 16,
    },
    featuredCategories: {
        marginBottom: 16,
    },
    categoriesText: {
        color: '#fff',
        fontSize: 14,
        opacity: 0.9,
        textAlign: 'center',
    },
    featuredButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 16,
        marginHorizontal: 16,
    },
    playButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 24,
        paddingVertical: 8,
        borderRadius: 4,
        gap: 8,
        flex: 1,
    },
    playButtonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: '600',
    },
    myListButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(51, 51, 51, 0.9)',
        paddingHorizontal: 24,
        paddingVertical: 8,
        borderRadius: 4,
        gap: 8,
        flex: 1,
    },
    myListButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    sectionTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 16,
        marginBottom: 16,
    },
    contentList: {
        paddingHorizontal: 16,
    },
    contentItem: {
        width: 120,
        marginRight: 12,
        position: 'relative',
    },
    thumbnail: {
        width: '100%',
        aspectRatio: 2 / 3,
        borderRadius: 6,
    },
    movieRow: {
        marginBottom: 24,
    },
}
);