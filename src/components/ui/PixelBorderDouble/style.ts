import { StyleSheet } from "react-native";
import { colors } from "@/constants/colors";

export const styles = StyleSheet.create({
  pixelOuter: {
    borderWidth: 2,
    borderColor: colors.border,
    padding: 2,
    backgroundColor: "transparent",
  },
  pixelInner: {
    borderWidth: 2,
    borderColor: colors.border,
  },
});
