import { useLocalSearchParams } from "expo-router";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { useFetch } from "../../hooks/useFetch";
import { API_BASE_URL } from "../../constants/api";

export default function OrderDetail() {
  const { id } = useLocalSearchParams();
  const { data: order, loading } = useFetch<any>(`${API_BASE_URL}/order/${id}`);

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Order #{order._id}</Text>

      <FlatList
        data={order.items}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <View style={styles.itemLeft}>
              <Text style={styles.itemName}>{item.menuItem.name}</Text>
              <Text style={styles.itemQty}>x {item.quantity}</Text>
            </View>
            <Text style={styles.itemPrice}>${(item.menuItem.price * item.quantity).toFixed(2)}</Text>
          </View>
        )}
      />

      <View style={styles.summary}>
        <Text style={styles.total}>Total: ${order.totalPrice}</Text>
        <Text style={styles.status}>Status: {order.status}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f7f7f7",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  itemCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "500",
    flexShrink: 1,
  },
  itemQty: {
    fontSize: 16,
    marginLeft: 12,
    color: "#555",
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 12,
  },
  summary: {
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  status: {
    fontSize: 16,
    color: "#555",
  },
});
