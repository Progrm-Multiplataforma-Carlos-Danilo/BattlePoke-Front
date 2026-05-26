import { View, Text, ImageBackground } from "react-native";
import { styles } from "./style";

export function RegisterHero() {
  return (

    <View style={styles.rightSide}>
      <ImageBackground
        source={require('../../../../../assets/images/register.png')}
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
            Comece agora sua jornada para se tornar um mestre Pokémon, {'\n'}
            e enfrente os melhores treinadores do mundo!
          </Text>
        </View>
      </ImageBackground>
    </View>

  )
}