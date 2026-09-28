import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function FoodItem({ item }) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
        <Text style={styles.price}>${Number(item.price).toFixed(2)}</Text>
      </View>
      <Image source={{ uri: item.image }} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    backgroundColor: '#FFFFFF',
  },
  textContainer: {
    flex: 1,
    paddingRight: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: '#666666',
    lineHeight: 18,
    marginBottom: 6,
  },
  price: {
    fontSize: 14,
    fontWeight: '800',
    color: '#495E57',
  },
  image: {
    width: 76,
    height: 76,
    borderRadius: 8,
    backgroundColor: '#EEEEEE',
  },
});
