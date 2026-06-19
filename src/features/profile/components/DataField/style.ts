import { StyleSheet } from "react-native";
import {colors} from '@/constants/colors'
import {fonts} from '@/constants/fonts'
export const styles = StyleSheet.create({
    fieldLabel: {
        fontFamily: fonts.bodyBold,
        fontSize: 10,
        letterSpacing: 1,
        color: colors.text.secondary,
      },
      fieldValue: { 
        fontFamily: fonts.bodyBold, 
        fontSize: 16, 
        color: colors.text.primary 
    },
})