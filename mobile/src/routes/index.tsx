import { NavigationContainer } from "@react-navigation/native";
import { AppRoutes } from "./app.routes";
import { Signin } from "../screens/Signin";
import { useAuth } from "../hooks/useAuth";

export function Routes() {
  const { user } = useAuth();
  return (
    <NavigationContainer>
      {user.name ? <AppRoutes /> : <Signin />}
    </NavigationContainer>
  );
}
