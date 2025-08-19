import { View, FlatList, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { API_BASE_URL } from "../../constants/api";
// import { useFetch } from "../../hooks/useFetch";
import MenuCard from "../../components/MenuCard";
import { useFetch } from "../../hooks/useFetch";

export default function MenuScreen() {
  const router = useRouter();
  const { data: menu, loading } = useFetch<any[]>(`${API_BASE_URL}/menu/`);

  if (loading) return <ActivityIndicator className="flex-1" />;

  return (
    <View className="flex-1 p-4 bg-gray-100">
      <FlatList
        data={menu}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <MenuCard item={item} onPress={() => router.push(`/menu/${item._id}`)} />
        )}
      />
    </View>
  );
}
