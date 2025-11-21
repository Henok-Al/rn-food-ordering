import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export type HoursBadgeProps = {
  isOpen: boolean;
  label: string;
};

const HoursBadge: React.FC<HoursBadgeProps> = ({ isOpen, label }) => (
  <View style={[styles.container, isOpen ? styles.open : styles.closed]}>
    <View style={[styles.statusDot, isOpen ? styles.dotOpen : styles.dotClosed]} />
    <Text style={[styles.text, isOpen ? styles.textOpen : styles.textClosed]}>
      {isOpen ? 'Open' : 'Closed'} · {label}
    </Text>
  </View>
);

export default HoursBadge;

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  open: {
    backgroundColor: 'rgba(84, 214, 44, 0.15)',
  },
  closed: {
    backgroundColor: 'rgba(244, 67, 54, 0.15)',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotOpen: {
    backgroundColor: '#54d62c',
  },
  dotClosed: {
    backgroundColor: '#f44336',
  },
  text: {
    fontSize: 13,
    fontWeight: '600',
  },
  textOpen: {
    color: '#bff5b1',
  },
  textClosed: {
    color: '#f5b1b1',
  },
});
