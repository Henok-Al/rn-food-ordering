import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCart, CartItem } from '../../context/CartContext';
import { COLORS, FONTS, SPACING, SHADOWS } from '../../constants/theme';
import { Swipeable } from 'react-native-gesture-handler';

export default function CartScreen() {
  const { items, updateQuantity, removeItem, totalAmount } = useCart();
  const router = useRouter();

  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity - 1)} style={styles.qtyButton}>
            <Ionicons name="remove" size={18} color={COLORS.textLight} />
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity + 1)} style={styles.qtyButton}>
            <Ionicons name="add" size={18} color={COLORS.textLight} />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.removeButton}>
        <Ionicons name="trash-outline" size={20} color={COLORS.error} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Cart</Text>
      </View>

      {items.length === 0 ? (
        <View style={styles.center}>
          <Ionicons name="cart-outline" size={100} color={COLORS.gray} />
          <Text style={styles.emptyText}>No items yet</Text>
          <Text style={styles.subText}>Hit the orange button down below to Create an order</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
          />
          <View style={styles.footer}>
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalAmount}>${totalAmount.toFixed(2)}</Text>
            </View>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={() => router.push('/checkout')}
            >
              <Text style={styles.checkoutText}>Complete order</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 20,
  },
  header: {
    paddingHorizontal: SPACING.l,
    marginBottom: SPACING.l,
    alignItems: 'center',
  },
  title: {
    fontSize: FONTS.size.large,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: FONTS.size.xlarge,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: COLORS.textPrimary,
  },
  subText: {
    fontSize: FONTS.size.medium,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  list: {
    paddingHorizontal: SPACING.l,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 20,
    padding: SPACING.m,
    marginBottom: SPACING.m,
    flexDirection: 'row',
    alignItems: 'center',
    ...SHADOWS.light,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: SPACING.m,
  },
  cardContent: {
    flex: 1,
  },
  name: {
    fontSize: FONTS.size.medium,
    fontWeight: 'bold',
    marginBottom: 5,
    color: COLORS.textPrimary,
  },
  price: {
    fontSize: FONTS.size.medium,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  qtyButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {
    marginHorizontal: 10,
    fontWeight: 'bold',
    fontSize: FONTS.size.medium,
  },
  removeButton: {
    padding: 5,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.background,
    padding: SPACING.l,
    paddingBottom: 40,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: FONTS.size.large,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  totalAmount: {
    fontSize: FONTS.size.xlarge,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  checkoutButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    paddingVertical: 18,
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  checkoutText: {
    color: COLORS.textLight,
    fontSize: FONTS.size.large,
    fontWeight: 'bold',
  },
});
