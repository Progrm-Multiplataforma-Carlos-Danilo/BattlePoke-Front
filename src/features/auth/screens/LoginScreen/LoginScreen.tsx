import { View, Text, Image, useWindowDimensions } from "react-native";
import { LoginForm } from "../../components/LoginForm";
import { LoginHero } from "../../components/LoginHero";
import { styles } from "./style";
import Loading from "@/components/layout/Loading";
import { useState } from "react";

export function LoginScreen() {
    const { width } = useWindowDimensions();
    const isMobile = width < 768;
    const [isLoading, setIsLoading] = useState(true);

   
    
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