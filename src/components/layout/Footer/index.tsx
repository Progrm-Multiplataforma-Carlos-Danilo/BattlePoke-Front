import { View, Text } from "react-native";
import { styles } from "./style";

export function Footer() {
    return (
        <View style={styles.footer}>
                    <Text style={styles.footerLogo}>KINETIC STADIUM</Text>
                    <Text style={styles.footerRights}>© 2026. Todos os direitos reservados</Text>
                    <View style={styles.footerLinks}>
                        <Text style={styles.footerLink}>Politica de Privacidade</Text>
                        <Text style={styles.footerLink}>Termos de Serviço</Text>
                        <Text style={styles.footerLink}>Status do Sistema</Text>
                        <Text style={styles.footerLink}>Suporte</Text>
                    </View>
                </View>
    );
}