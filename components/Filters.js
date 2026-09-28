import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';

const CATEGORIES = [
  { id: 'starters', name: 'Starters' },
  { id: 'mains', name: 'Mains' },
  { id: 'desserts', name: 'Desserts' },
  { id: 'drinks', name: 'Drinks' },
];

export default function Filters({ selectedCategories, onToggleCategory }) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>ORDER FOR DELIVERY!</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategories.includes(cat.id);
          return (
            <Pressable
              key={cat.id}
              style={[
                styles.categoryButton,
                isSelected && styles.categoryButtonActive,
              ]}
              onPress={() => onToggleCategory(cat.id)}
            >
              <Text
                style={[
                  styles.categoryText,
                  isSelected && styles.categoryTextActive,
                ]}
              >
                {cat.name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E6',
  },
  heading: {
    fontSize: 14,
    fontWeight: '800',
    color: '#333333',
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  categoryButton: {
    backgroundColor: '#EDEFEE',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 10,
  },
  categoryButtonActive: {
    backgroundColor: '#495E57',
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#495E57',
  },
  categoryTextActive: {
    color: '#EDEFEE',
  },
});
