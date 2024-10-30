import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const newStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    header: {
        // position: 'absolute',
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: '#000',
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        height: 52,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },
    scrollContent: {
        flexGrow: 1,
    },
    categoryTabs: {
        flexDirection: 'row',
        paddingHorizontal: 12,
        paddingVertical: 8,
        gap: 8,
    },
    categoryTab: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: 'transparent',
    },
    activeTab: {
        backgroundColor: '#fff',
    },
    tabIcon: {
        width: 16,
        height: 16,
        marginRight: 6,
    },
    categoryTabText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    activeTabText: {
        color: '#000',
    },
    comingSoonList: {
        paddingTop: 8,
    },
    comingSoonItem: {
        marginBottom: 32,
        flexDirection: 'row',
    },
    dateContainer: {
        width: 60,
        paddingLeft: 16,
    },
    contentContainer: {
        flex: 1,
        paddingRight: 16,
    },
    dateMonth: {
        color: '#ffffffcc',
        fontSize: 13,
        // fontWeight: 'bold',
    },
    dateDay: {
        color: '#fff',
        fontSize: 25,
        fontWeight: '800',
        lineHeight: 28,
        marginTop: 4,
    },
    previewCard: {
        width: '100%',
        aspectRatio: 16 / 9,
        marginBottom: 12,
        borderRadius: 8,
        overflow: 'hidden',
    },
    previewImage: {
        width: '100%',
        height: '100%',
    },
    dateText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
    activeTabContainer: {
        paddingTop: 30,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 10,
        marginBottom: 6,
    },
    activeTabTitle: {
        color: '#fff',
        fontSize: 19,
        fontWeight: 'bold',
    },
    activeTabIcon: {
        width: 24,
        height: 24,
        marginRight: 6,
    },
    featuredLogo: {
        width: 150,
        height: 30,
    },
    featuredContainer: {
        paddingTop: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    netflixTag: {
        color: '#E50914',
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    eventDate: {
        color: '#fff',
        fontSize: 15,
        marginBottom: 8,
    },
    description: {
        color: '#999',
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 16,
    },
    tags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 4,
    },
    tag: {
        color: '#999',
        fontSize: 12,
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 48,
        marginTop: 16,
    },
    actionButton: {
        alignItems: 'center',
    },
    actionButtonText: {
        color: '#fff',
        marginTop: 4,
        fontSize: 12,
    }
});