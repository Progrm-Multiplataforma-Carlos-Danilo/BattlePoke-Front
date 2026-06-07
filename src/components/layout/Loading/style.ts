import { StyleSheet } from "react-native";
import { colors } from "../../../constants/colors";

export const styles =  StyleSheet.create({
 container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
     backgroundColor: colors.background,
 },
 image:{
    width: 150,
    height: 150
 },
 barLoading:{
    width: 450,
    height: 20,
    backgroundColor: colors.types.grass,
    borderRadius: 10,
    overflow: 'hidden',
 },
 barLoadingBackground: {
  position: 'absolute',
  left: 0,
  top: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.2)', // um pouco transparente para dar contraste
  borderRadius: 10,
  width: '100%'
},
 barLoadingFill:{
    width: 0,
    height: 20,
    backgroundColor: colors.text.primary,
    borderRadius: 10
 }

})