import React from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';

export default function Header({
  showBack = false,
  onBackPress,
  showProfileIcon = true,
  userProfile,
  onProfilePress,
}) {
  const getInitials = () => {
    if (!userProfile) return 'LL';
    const f = userProfile.firstName?.charAt(0) || '';
    const l = userProfile.lastName?.charAt(0) || '';
    return (f + l).toUpperCase() || 'LL';
  };

  return (
    <View style={styles.header}>
      {/* Left Back Arrow or Spacer */}
      <View style={styles.leftSlot}>
        {showBack && (
          <Pressable style={styles.backButton} onPress={onBackPress}>
            <Text style={styles.backButtonText}>←</Text>
          </Pressable>
        )}
      </View>

      {/* Center Little Lemon Wordmark */}
      <View style={styles.centerSlot}>
        <Text style={styles.brandTitle}>LITTLE LEMON</Text>
      </View>

      {/* Right Profile Icon or Spacer */}
      <View style={styles.rightSlot}>
        {showProfileIcon && (
          <Pressable style={styles.avatarButton} onPress={onProfilePress}>
            {userProfile?.avatar ? (
              <Image
                source={{ uri: userProfile.avatar }}
                style={styles.avatarImage}
              />
            ) : (
              <Text style={styles.initialsText}>{getInitials()}</Text>
            )}
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E6',
  },
  leftSlot: {
    width: 40,
    alignItems: 'flex-start',
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#495E57',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  centerSlot: {
    flex: 1,
    alignItems: 'center',
  },
  brandTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#495E57',
    letterSpacing: 1,
  },
  rightSlot: {
    width: 40,
    alignItems: 'flex-end',
  },
  avatarButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F4CE14',
    borderWidth: 1.5,
    borderColor: '#495E57',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  initialsText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#495E57',
  },
});
