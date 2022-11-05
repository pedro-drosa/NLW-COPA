import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { VStack, Heading, useToast } from "native-base";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { api } from "../services/api";

export function Find() {
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");
  const toast = useToast();
  const { navigate } = useNavigation();

  async function handleJoinPool() {
    try {
      setIsLoading(true);
      if (!code.trim()) {
        toast.show({
          title: "Informe o código do bolão",
          placement: "top",
          bgColor: "red.500",
        });
      }
      await api.post("/pools/join", { code });
      toast.show({
        title: "Você entrou em um bolão com sucesso",
        placement: "top",
        bgColor: "green.500",
      });
      navigate("pools");
    } catch (error) {
      setIsLoading(false);
      if (error.response?.data?.message === "Pool not found") {
        toast.show({
          title: "Bolão não encotrado!",
          placement: "top",
          bgColor: "red.500",
        });
        return;
      }
      if (
        error.response?.data?.message === "You are already a join this pool"
      ) {
        toast.show({
          title: "Você já está nesse bolão!",
          placement: "top",
          bgColor: "red.500",
        });
        return;
      }
    } finally {
      setIsLoading(false);
      setCode("");
    }
  }
  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Buscar por código" showBackButton />
      <VStack mt={8} mx={5} alignItems="center">
        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          mb={8}
          textAlign="center"
        >
          Encontre um bolão através de {"\n"}
          seu código único
        </Heading>
        <Input
          mb={2}
          placeholder="Qual o código do bolão?"
          autoCapitalize="characters"
          onChangeText={setCode}
          value={code}
        />
        <Button
          title="BUSCAR BOLÃO"
          onPress={handleJoinPool}
          isLoading={isLoading}
        />
      </VStack>
    </VStack>
  );
}
