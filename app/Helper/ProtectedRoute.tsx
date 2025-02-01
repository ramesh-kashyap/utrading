import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useAuth } from "./AuthContext";
import { useNavigation } from "@react-navigation/native";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  const navigation = useNavigation();
  console.log("check:",isAuthenticated);
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigation.navigate("Login" as never);
    }
  }, [isAuthenticated, loading, navigation]);

  
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  if (!isAuthenticated) {
    return null; // Prevent rendering before navigation happens
  }

  return <>{children}</>;
};

export default ProtectedRoute;
