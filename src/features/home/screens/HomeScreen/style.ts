import { colors } from "@/constants/colors";
import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: 12,
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        gap: 12,
        paddingLeft:5,
        paddingRight:4
    },
    listContainer: {
        flex: 3, 
    },
    sidebarContainer: {
        flex: 1,
        minWidth: 300,
        maxWidth: 400,
    },
 
})