import { colors } from "@/constants/colors";
import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: 12,
    },
    header: {
        alignItems:'flex-end',
        marginBottom: 12,
        marginRight:20,
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        gap: 12,
        paddingLeft:5,
        paddingRight:4
    },
    text:{
        fontSize: 18,
        color: colors.text.primary,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    username:{
        fontSize: 18,
        color: colors.primary,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    listContainer: {
        flex: 3, 
    },
    sidebarContainer: {
        flex: 1,
        minWidth: 300,
        maxWidth: 400,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    emptyTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.text.primary,
        marginBottom: 8,
    },
    emptySubtitle: {
        fontSize: 16,
        color: colors.text.secondary,
        marginBottom: 32,
        textAlign: 'center',
    },
    captureButton: {
        backgroundColor: colors.primary,
        paddingHorizontal: 32,
        paddingVertical: 16,
        borderRadius: 12,
        elevation: 4,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    captureButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    scroll:{
   flexGrow:1
    },
})