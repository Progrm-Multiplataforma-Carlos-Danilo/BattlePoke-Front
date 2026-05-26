import { View, Text, Image, useWindowDimensions } from "react-native";
import { styles } from "./style";
import { RegisterForm } from "../../components/RegisterForm";
import { RegisterHero } from "../../components/RegisterHero";

export default function RegisterScreen() {
    const { width } = useWindowDimensions();
    const isMobile = width < 768;
    return (
        <View style={styles.container}>
                   <View style={styles.header}>
                       <Image
                           source={require('../../../../../assets/images/Logo.png')}
                           style={styles.logo}
                       />
                   </View>
                   <View style={styles.mainLayout}>
                       <RegisterForm />
                        {!isMobile && <RegisterHero />}
                   </View>
               </View>
    );
}