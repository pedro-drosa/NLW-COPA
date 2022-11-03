import { NativeBaseProvider, StatusBar } from "native-base";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { AuthContextProvider } from "./src/contexts/AuthContext";
import { Signin } from "./src/screens/Signin";
import { Loading } from "./src/components/Loading";
import { THEME } from "./src/styles/theme";

export default function App() {
  const [fontLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <AuthContextProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        {fontLoaded ? <Signin /> : <Loading />}
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}
