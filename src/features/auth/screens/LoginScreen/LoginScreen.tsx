import { View, Text, Image, useWindowDimensions } from "react-native";
import { LoginForm } from "../../components/LoginForm";
import { LoginHero } from "../../components/LoginHero";
import { styles } from "./style";

export function LoginScreen() {
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
                {!isMobile && <LoginHero />}
                <LoginForm />
            </View>
        </View>
    );
}