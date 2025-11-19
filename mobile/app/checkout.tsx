import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';
import { API_BASE_URL } from '../constants/api';
import { COLORS, FONTS, SPACING, SHADOWS } from '../constants/theme';

const TIP_OPTIONS = [0, 2, 5, 10];

export default function CheckoutScreen() {
    const { items, totalAmount, clearCart } = useCart();
    const router = useRouter();
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [tip, setTip] = useState(0);
    const [loading, setLoading] = useState(false);

    const finalTotal = totalAmount + tip;

    const handlePlaceOrder = async () => {
        if (!address || !phone) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        setLoading(true);

        try {
            const orderData = {
                items: items.map(item => ({
                    id: item.id,
                    quantity: item.quantity
                })),
                deliveryAddress: address,
                contactPhone: phone,
                totalAmount: finalTotal,
                tipAmount: tip
            };

            const response = await fetch(`${API_BASE_URL}/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            if (response.ok) {
                clearCart();
                Alert.alert('Success', 'Order placed successfully!', [
                    { text: 'OK', onPress: () => router.replace('/') }
                ]);
            } else {
                const errorData = await response.json();
                Alert.alert('Error', errorData.message || 'Failed to place order');
            }
        } catch (error) {
            console.error('Error placing order:', error);
            Alert.alert('Error', 'Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color={COLORS.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.title}>Checkout</Text>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.content}>
                    <Text style={styles.sectionTitle}>Delivery Details</Text>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Address</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter delivery address"
                            value={address}
                            onChangeText={setAddress}
                            multiline
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Phone Number</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter phone number"
                            value={phone}
                            onChangeText={setPhone}
                            keyboardType="phone-pad"
                        />
                    </View>

                    <Text style={styles.sectionTitle}>Add a Tip</Text>
                    <View style={styles.tipContainer}>
                        {TIP_OPTIONS.map((option) => (
                            <TouchableOpacity
                                key={option}
                                style={[styles.tipOption, tip === option && styles.selectedTipOption]}
                                onPress={() => setTip(option)}
                            >
                                <Text style={[styles.tipText, tip === option && styles.selectedTipText]}>
                                    ${option}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View style={styles.summaryContainer}>
                        <Text style={styles.sectionTitle}>Order Summary</Text>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Subtotal</Text>
                            <Text style={styles.summaryValue}>${totalAmount.toFixed(2)}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Delivery Fee</Text>
                            <Text style={styles.summaryValue}>$0.00</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Tip</Text>
                            <Text style={styles.summaryValue}>${tip.toFixed(2)}</Text>
                        </View>
                        <View style={[styles.summaryRow, styles.totalRow]}>
                            <Text style={styles.totalLabel}>Total</Text>
                            <Text style={styles.totalValue}>${finalTotal.toFixed(2)}</Text>
                        </View>
                    </View>
                </ScrollView>

                <View style={styles.footer}>
                    <TouchableOpacity
                        style={[styles.placeOrderButton, loading && styles.disabledButton]}
                        onPress={handlePlaceOrder}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#FFF" />
                        ) : (
                            <Text style={styles.placeOrderText}>Place Order</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
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
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SPACING.l,
        marginBottom: SPACING.l,
    },
    backButton: {
        marginRight: 20,
    },
    title: {
        fontSize: FONTS.size.large,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
    },
    content: {
        paddingHorizontal: SPACING.l,
        paddingBottom: 50,
    },
    sectionTitle: {
        fontSize: FONTS.size.large,
        fontWeight: 'bold',
        marginBottom: SPACING.m,
        marginTop: SPACING.s,
        color: COLORS.textPrimary,
    },
    inputContainer: {
        marginBottom: SPACING.l,
    },
    label: {
        fontSize: FONTS.size.medium,
        color: COLORS.textSecondary,
        marginBottom: 5,
        fontWeight: '600',
    },
    input: {
        backgroundColor: COLORS.cardBackground,
        borderRadius: 15,
        padding: 15,
        fontSize: FONTS.size.medium,
        ...SHADOWS.light,
    },
    tipContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SPACING.l,
    },
    tipOption: {
        backgroundColor: COLORS.cardBackground,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        ...SHADOWS.light,
    },
    selectedTipOption: {
        backgroundColor: COLORS.primary,
    },
    tipText: {
        fontSize: FONTS.size.medium,
        color: COLORS.textPrimary,
        fontWeight: 'bold',
    },
    selectedTipText: {
        color: COLORS.textLight,
    },
    summaryContainer: {
        backgroundColor: COLORS.cardBackground,
        borderRadius: 20,
        padding: SPACING.l,
        marginTop: 10,
        ...SHADOWS.light,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    summaryLabel: {
        fontSize: FONTS.size.medium,
        color: COLORS.textSecondary,
    },
    summaryValue: {
        fontSize: FONTS.size.medium,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
    },
    totalRow: {
        marginTop: 10,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: COLORS.gray,
    },
    totalLabel: {
        fontSize: FONTS.size.large,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
    },
    totalValue: {
        fontSize: FONTS.size.large,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    footer: {
        padding: SPACING.l,
        paddingBottom: 40,
    },
    placeOrderButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 30,
        paddingVertical: 18,
        alignItems: 'center',
        ...SHADOWS.medium,
    },
    disabledButton: {
        backgroundColor: COLORS.secondary,
    },
    placeOrderText: {
        color: COLORS.textLight,
        fontSize: FONTS.size.large,
        fontWeight: 'bold',
    },
});
