import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useCart } from "../../hooks/useCart";
import { useRouter } from "expo-router";
import axios from "axios";
import { API_BASE_URL } from "../../constants/api";

export default function CartScreen() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const router = useRouter();
  const total = cart.reduce((sum, c) => sum + c.item.price * c.quantity, 0);

  const placeOrder = async () => {
    if (cart.length === 0) {
      Alert.alert("Cart is empty", "Please add items to your cart before placing an order.");
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/order/`, {
        items: cart.map((c) => ({ id: c.item._id, quantity: c.quantity })),
      });
      clearCart();
      Alert.alert("Success", "Order placed successfully!");
      router.push(`/order/${res.data._id}`);
    } catch (err) {
      console.error(err.response?.data || err.message);
      Alert.alert("Error", "Failed to place order.");
    }
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Text style={styles.itemName}>{item.item.name}</Text>
      <Text style={styles.itemPrice}>${item.item.price.toFixed(2)}</Text>

      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.qtyButton}
          onPress={() =>
            updateQuantity(item.item._id, Math.max(1, item.quantity - 1))
          }
        >
          <Text style={styles.qtyButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{item.quantity}</Text>
        <TouchableOpacity
          style={styles.qtyButton}
          onPress={() => updateQuantity(item.item._id, item.quantity + 1)}
        >
          <Text style={styles.qtyButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.totalPrice}>
        Total: ${(item.item.price * item.quantity).toFixed(2)}
      </Text>

      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeFromCart(item.item._id)}
      >
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {cart.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty.</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(c) => c.item._id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
          />
          <View style={styles.footer}>
            <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>
            <TouchableOpacity style={styles.orderButton} onPress={placeOrder}>
              <Text style={styles.orderButtonText}>Place Order</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", padding: 16 },
  listContainer: { paddingBottom: 100 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  itemName: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
  itemPrice: { fontSize: 14, color: "#555", marginBottom: 8 },
  quantityContainer: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  qtyButton: {
    backgroundColor: "#ddd",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
  },
  qtyButtonText: { fontSize: 18, fontWeight: "bold" },
  quantity: { marginHorizontal: 12, fontSize: 16 },
  totalPrice: { fontSize: 14, fontWeight: "600", marginBottom: 8 },
  removeButton: {
    backgroundColor: "#ff5555",
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: "center",
  },
  removeButtonText: { color: "#fff", fontWeight: "bold" },
  footer: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  totalText: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  orderButton: {
    backgroundColor: "#28a745",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  orderButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  emptyText: { fontSize: 18, textAlign: "center", marginTop: 50, color: "#888" },
});
