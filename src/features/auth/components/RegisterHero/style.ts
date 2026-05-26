import { Platform, StyleSheet } from "react-native";
import { Colors } from "@/constants/colors";


export const styles = StyleSheet.create({
   rightSide: {
    flex: 1,
    backgroundColor: '#0D1117',
    position: 'relative',
    overflow: 'hidden',
  },
      backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
      },
      backgroundImageStyle: {
        opacity: 0.8,
      },
      leftContent: {
        padding: 40,
        justifyContent: 'center',
        flex: 1,
        backgroundColor: 'rgba(10, 14, 20, 0.4)',
      },
      nowFeaturingBadge: {
        backgroundColor: '#7AD1FF',
        paddingHorizontal: 16,
        paddingVertical: 6,
        alignSelf: 'flex-start',
        marginBottom: 20,
        borderRadius: 2,
        transform: [{ skewX: '-10deg' }],
      },
      nowFeaturingText: {
        color: '#0A0E14',
        fontSize: 12,
        fontWeight: '900',
        letterSpacing: 2,
        transform: [{ skewX: '10deg' }],
      },
      heroTitleWhite: {
        color: '#FFFFFF',
        fontSize: 56,
        fontWeight: '900',
        fontStyle: 'italic',
        lineHeight: 60,
        letterSpacing: -1,
      },
      heroTitleCyan: {
        color: '#00D2FF',
        fontSize: 56,
        fontWeight: '900',
        fontStyle: 'italic',
        lineHeight: 60,
        letterSpacing: -1,
        marginBottom: 20,
        textShadowColor: '#00D2FF',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 15,
      },
      heroParagraph: {
        color: '#CBD5E1',
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 30,
        maxWidth: '80%',
      },
      eliteLeagueContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
      },
      cyanLine: {
        width: 30,
        height: 3,
        backgroundColor: '#00D2FF',
      },
      eliteLeagueText: {
        color: '#00D2FF',
        fontSize: 10,
        fontWeight: 'bold',
        letterSpacing: 2,
      }
    })