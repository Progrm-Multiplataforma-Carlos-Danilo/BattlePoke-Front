import { View, Text, ImageBackground } from "react-native";
import { styles } from "./style";

export function LoginHero(){
    return (

  <View style={styles.leftSide}>
          <ImageBackground 
            source={require('../../../../../assets/images/login.png')} 
            style={styles.backgroundImage}
            imageStyle={styles.backgroundImageStyle}
            resizeMode="cover"
          >
            <View style={styles.leftContent}>
              <View style={styles.nowFeaturingBadge}>
                <Text style={styles.nowFeaturingText}>DESPERTE AGORA!</Text>
              </View>
              
              <Text style={styles.heroTitleWhite}>Liberte seu</Text>
              <Text style={styles.heroTitleCyan}>Mestre Pokémon</Text>

              <Text style={styles.heroParagraph}>
                O campo de batalha competitivo definitivo espera por você. Conecte-se com seu treinador{'\n'}
                perfil para acessar rankings mundiais, eventos lendários e{'\n'}
                combate PvP.
              </Text>

              <View style={styles.eliteLeagueContainer}>
                <View style={styles.cyanLine} />
                <Text style={styles.eliteLeagueText}>APENAS TREINADORES AUTORIZADOS</Text>
              </View>
            </View>
          </ImageBackground>
        </View>

    )
}