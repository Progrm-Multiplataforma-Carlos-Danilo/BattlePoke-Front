
import { View, Text, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import styles from './style'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '@/constants/colors';
import Toast from 'react-native-toast-message';

interface ToastConfigProps {
  text1?: string;
  text2?: string;
  props: any;
  animationType?: string;
}

const toastConfig = {
  success: ({ text1, text2 }: ToastConfigProps) => (
    <View style={styles.sucessheaderContainerToast}>
      <View style={styles.sucessheaderIndicatorToast} />
      <View style={styles.sucessheaderContentToast}>
        <View style={styles.sucesstitleRowToast}>
          <Text style={styles.sucessheaderTitleToast}>{text1}</Text>
        </View>
        <Text style={styles.sucessheaderSubtitleToast}>
          {text2}
        </Text>
      </View>
      <TouchableOpacity onPress={() => Toast.hide()}>
        <MaterialCommunityIcons name="close-circle" size={24} color={colors.types.grass} />
      </TouchableOpacity>

    </View>
  ),

  error: ({ text1, text2 }: ToastConfigProps) => (
    <View style={styles.headerContainerToast}>
      <View style={styles.headerIndicatorToast} />
      <View style={styles.headerContentToast}>
        <View style={styles.titleRowToast}>

          <Text style={styles.headerTitleToast}>{text1}</Text>
        </View>
        <Text style={styles.headerSubtitleToast}>
          {text2}
        </Text>
      </View>
      <TouchableOpacity onPress={() => Toast.hide()}>
        <MaterialCommunityIcons name="close-circle" size={24} color={colors.primary} />
      </TouchableOpacity>

    </View>

  ),

  edicaoToast: ({ text1, text2 }: ToastConfigProps) => (
    <View style={styles.edicaoToast}>
      <View style={styles.edicaoIndicatorToast} />
      <View style={styles.edicaoContentToast}>
        <View style={styles.edicaotitleRowToast}>

          <Text style={styles.edicaoTitleToast}>{text1}</Text>
        </View>
        <Text style={styles.edicaoSubtitleToast}>
          {text2}
        </Text>
      </View>
      <TouchableOpacity onPress={() => Toast.hide()}>
        <MaterialCommunityIcons name="close-circle" size={24} color={colors.types.electric} />
      </TouchableOpacity>

    </View>

  ),

  Login: ({ text1, text2, props, animationType = 'fadeIn' }: ToastConfigProps) => (
    <Animatable.View animation={animationType} duration={500} style={styles.toastContainer}>
      <View style={styles.errorToastLogin}>
        <Text style={{ fontSize: 24 }}>{props.icon}</Text>
        <Text style={styles.errorTextLogin}>{text1}</Text>
        <Text style={styles.errorSubTextLogin}>{text2}</Text>
      </View>
    </Animatable.View>
  ),

  ResetSenha: ({ text1, text2, props, animationType = 'fadeIn' }: ToastConfigProps) => (
    <Animatable.View animation={animationType} duration={500} style={styles.toastContainer}>
      <View style={styles.EnvioToastSenha}>
        <Text style={{ fontSize: 24 }}>{props.icon}</Text>
        <Text style={styles.EnvioTextSenha}>{text1}</Text>
        <Text style={styles.EnvioSubTextSenha}>{text2}</Text>
      </View>
    </Animatable.View>
  ),


  cadastro: ({ text1, text2, props, animationType = 'fadeIn' }: ToastConfigProps) => (
    <Animatable.View animation={animationType} duration={500} style={styles.toastContainer}>
      <View style={styles.DocToast}>
        <Text style={{ fontSize: 24 }}>{props.icon}</Text>
        <Text style={styles.DocText}>{text1}</Text>
        <Text style={styles.DocSubText}>{text2}</Text>
      </View>
    </Animatable.View>
  ),
};


export default toastConfig;
