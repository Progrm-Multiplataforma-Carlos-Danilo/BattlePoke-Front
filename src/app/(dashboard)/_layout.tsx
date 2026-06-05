import { View, Platform, StyleSheet, ActivityIndicator } from "react-native";
import { Slot, Redirect } from "expo-router";
import { Header } from "@/components/layout/Sidebar";
import { colors } from "@/constants/colors";
import { useAuth } from "@/contexts/AuthContext";

export default function DashboardLayout() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={colors.types.dark} />
      </View>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/Login" />;
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Slot />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: Platform.OS === "web" ? "row" : "column",
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
});
