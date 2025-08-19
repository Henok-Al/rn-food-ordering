import { View, Text, FlatList, Button } from "react-native";
// import { useCart } from "../hooks/useCart";
import axios from "axios";
import { API_BASE_URL } from "../constants/api";
import { useRouter } from "expo-router";
import { useCart } from "../hooks/useCart";

export default function CartScreen() {
  const { cart, clearCart } = useCart();
  const router = useRouter();

  const total = cart.reduce((sum, c) => sum + c.item.price * c.quantity, 0);

  const placeOrder = async () => {
    try {
      const res = await axios.post(`${API_BASE_URL}/order/`, {
        items: cart.map((c) => ({ id: c.item._id, quantity: c.quantity })),
      });
      clearCart();
      router.push(`/order/${res.data._id}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View className="flex-1 p-4">
      <FlatList
        data={cart}
        keyExtractor={(c) => c.item._id}
        renderItem={({ item }) => (
          <View className="mb-3">
            <Text className="font-bold">{item.item.name}</Text>
            <Text>Qty: {item.quantity}</Text>
            <Text>${(item.item.price * item.quantity).toFixed(2)}</Text>
          </View>
        )}
      />
      <Text className="text-lg font-bold">Total: ${total.toFixed(2)}</Text>
      <Button title="Place Order" onPress={placeOrder} />
    </View>
  );
}
