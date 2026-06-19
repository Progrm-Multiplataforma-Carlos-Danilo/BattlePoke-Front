import { colors } from '@/constants/colors';
import { fonts } from '@/constants/fonts';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({



  sucessheaderContainerToast: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceHighlight,
    borderBottomWidth: 1,
    borderColor: colors.border,
    paddingVertical: 16,
    paddingHorizontal: 20,
    width: '40%',
    start: '30%'
  },
  sucessheaderIndicatorToast: {
    width: 7,
    backgroundColor: colors.types.grass,
    marginRight: 16,
    transform: [{ skewX: '-10deg' }],
  },
  sucessheaderContentToast: {
    flex: 1,
    gap: 4,
  },
  sucesstitleRowToast: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sucessheaderTitleToast: {
    fontFamily: fonts.headline,
    fontSize: 24,
    color: colors.types.grass,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontStyle: 'italic',
  },
  sucessheaderSubtitleToast: {
    fontFamily: fonts.body,
    fontSize: 16,
    color: colors.text.secondary,
  },



  headerContainerToast: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceHighlight,
    borderBottomWidth: 1,
    borderColor: colors.border,
    paddingVertical: 16,
    paddingHorizontal: 20,
    width: '40%',
    start: '30%'
  },
  headerIndicatorToast: {
    width: 7,
    backgroundColor: colors.primary,
    marginRight: 16,
    transform: [{ skewX: '-10deg' }],
  },
  headerContentToast: {
    flex: 1,
    gap: 4,
  },
  titleRowToast: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitleToast: {
    fontFamily: fonts.headline,
    fontSize: 24,
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontStyle: 'italic',
  },
  headerSubtitleToast: {
    fontFamily: fonts.body,
    fontSize: 16,
    color: colors.text.secondary,
  },


  errorToastLogin: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '70%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
    borderWidth: 5, // Defina a espessura da borda
    borderColor: '#ffe6e6',
  },
  errorTextLogin: {
    fontSize: 18,
    color: '#cc0000',
    fontWeight: '600',
    marginLeft: 12,
  },
  errorSubTextLogin: {
    fontSize: 14,
    color: '#cc0000',
    marginLeft: 12,
    marginTop: 4,
  },


  EnvioToastSenha: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '70%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
    borderWidth: 5, // Defina a espessura da borda
    borderColor: '#c6ffea',
  },
  EnvioTextSenha: {
    fontSize: 18,
    color: '#C1FF00',
    fontWeight: '600',
    marginLeft: 12,
  },
  EnvioSubTextSenha: {
    fontSize: 14,
    color: '#000',
    marginLeft: 12,
    marginTop: 4,
  },

  toastContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 16,
  },

  DocToast: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '70%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
    borderWidth: 5,
    borderColor: '#e0f0ff',
  },
  DocText: {
    fontSize: 18,
    color: '#003580',
    fontWeight: '600',
    marginLeft: 12,
  },
  DocSubText: {
    fontSize: 14,
    color: '#003580',
    marginLeft: 12,
    marginTop: 4,
  },

  edicaoToast: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceHighlight,
    borderBottomWidth: 1,
    borderColor: colors.border,
    paddingVertical: 16,
    paddingHorizontal: 20,
    width: '40%',
    start: '30%'
  },
  edicaoIndicatorToast: {
    width: 7,
    backgroundColor: colors.types.electric,
    marginRight: 16,
    transform: [{ skewX: '-10deg' }],
  },
  edicaoContentToast: {
    flex: 1,
    gap: 4,
  },
  edicaotitleRowToast: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  edicaoTitleToast: {
    fontFamily: fonts.headline,
    fontSize: 24,
    color: colors.types.electric,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontStyle: 'italic',
  },
  edicaoSubtitleToast: {
    fontFamily: fonts.body,
    fontSize: 16,
    color: colors.text.secondary,
  },



});
