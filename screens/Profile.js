import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';

export default function Profile({
  navigation,
  userProfile,
  onUpdateProfile,
  onLogout,
}) {
  const [firstName, setFirstName] = useState(userProfile?.firstName || '');
  const [lastName, setLastName] = useState(userProfile?.lastName || '');
  const [email, setEmail] = useState(userProfile?.email || '');
  const [phoneNumber, setPhoneNumber] = useState(userProfile?.phoneNumber || '');
  const [avatar, setAvatar] = useState(userProfile?.avatar || null);

  // Email notifications checkboxes
  const [orderStatuses, setOrderStatuses] = useState(
    userProfile?.orderStatuses ?? true
  );
  const [passwordChanges, setPasswordChanges] = useState(
    userProfile?.passwordChanges ?? true
  );
  const [specialOffers, setSpecialOffers] = useState(
    userProfile?.specialOffers ?? true
  );
  const [newsletter, setNewsletter] = useState(
    userProfile?.newsletter ?? true
  );

  const getInitials = () => {
    const f = firstName?.charAt(0) || '';
    const l = lastName?.charAt(0) || '';
    return (f + l).toUpperCase() || 'LL';
  };

  const handleDiscard = () => {
    setFirstName(userProfile?.firstName || '');
    setLastName(userProfile?.lastName || '');
    setEmail(userProfile?.email || '');
    setPhoneNumber(userProfile?.phoneNumber || '');
    setAvatar(userProfile?.avatar || null);
    setOrderStatuses(userProfile?.orderStatuses ?? true);
    setPasswordChanges(userProfile?.passwordChanges ?? true);
    setSpecialOffers(userProfile?.specialOffers ?? true);
    setNewsletter(userProfile?.newsletter ?? true);
    Alert.alert('Changes Discarded', 'Your edits were reverted to saved values.');
  };

  const handleSave = async () => {
    if (!firstName.trim()) {
      Alert.alert('Validation Error', 'First name is required.');
      return;
    }

    const updated = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      phoneNumber: phoneNumber.trim(),
      avatar,
      orderStatuses,
      passwordChanges,
      specialOffers,
      newsletter,
      isOnboarded: true,
    };

    try {
      await AsyncStorage.setItem('userProfile', JSON.stringify(updated));
      onUpdateProfile(updated);
      Alert.alert('Success', 'Profile saved successfully!');
    } catch (e) {
      console.error('Failed to save profile:', e);
      Alert.alert('Error', 'Failed to save changes.');
    }
  };

  const handleLogoutPress = async () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log Out',
        style: 'destructive',
        onPress: async () => {
          try {
            await AsyncStorage.clear();
            onLogout();
          } catch (e) {
            console.error('Logout error:', e);
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        showBack
        onBackPress={() => navigation.goBack()}
        userProfile={userProfile}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.screenHeading}>Personal information</Text>

        {/* Avatar Section */}
        <Text style={styles.sectionLabel}>Avatar</Text>
        <View style={styles.avatarRow}>
          <View style={styles.avatarCircle}>
            {avatar ? (
              <Image source={{ uri: avatar }} style={styles.avatarImage} />
            ) : (
              <Text style={styles.avatarInitials}>{getInitials()}</Text>
            )}
          </View>
          <Pressable
            style={styles.changeBtn}
            onPress={() =>
              setAvatar(
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
              )
            }
          >
            <Text style={styles.changeBtnText}>Change</Text>
          </Pressable>
          <Pressable
            style={styles.removeBtn}
            onPress={() => setAvatar(null)}
          >
            <Text style={styles.removeBtnText}>Remove</Text>
          </Pressable>
        </View>

        {/* Input Fields */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>First name</Text>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Last name</Text>
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Phone number</Text>
          <TextInput
            style={styles.input}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="(555) 000-0000"
            keyboardType="phone-pad"
          />
        </View>

        {/* Email Notifications */}
        <Text style={styles.subHeading}>Email notifications</Text>

        {[
          { label: 'Order statuses', state: orderStatuses, setter: setOrderStatuses },
          { label: 'Password changes', state: passwordChanges, setter: setPasswordChanges },
          { label: 'Special offers', state: specialOffers, setter: setSpecialOffers },
          { label: 'Newsletter', state: newsletter, setter: setNewsletter },
        ].map((item, index) => (
          <Pressable
            key={index}
            style={styles.checkboxRow}
            onPress={() => item.setter(!item.state)}
          >
            <View style={[styles.checkbox, item.state && styles.checkboxChecked]}>
              {item.state && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.checkboxLabel}>{item.label}</Text>
          </Pressable>
        ))}

        {/* Logout Button */}
        <Pressable style={styles.logoutBtn} onPress={handleLogoutPress}>
          <Text style={styles.logoutBtnText}>Log out</Text>
        </Pressable>

        {/* Save / Discard Actions */}
        <View style={styles.actionRow}>
          <Pressable style={styles.discardBtn} onPress={handleDiscard}>
            <Text style={styles.discardBtnText}>Discard changes</Text>
          </Pressable>
          <Pressable style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveBtnText}>Save changes</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    padding: 18,
    paddingBottom: 40,
  },
  screenHeading: {
    fontSize: 20,
    fontWeight: '800',
    color: '#333333',
    marginBottom: 14,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#777777',
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  avatarCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#F4CE14',
    borderWidth: 2,
    borderColor: '#495E57',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarInitials: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#495E57',
  },
  changeBtn: {
    backgroundColor: '#495E57',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  changeBtnText: {
    color: '#EDEFEE',
    fontWeight: '700',
    fontSize: 13,
  },
  removeBtn: {
    borderWidth: 1,
    borderColor: '#D3D3D3',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  removeBtnText: {
    color: '#555555',
    fontWeight: '700',
    fontSize: 13,
  },
  fieldGroup: {
    marginBottom: 14,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#555555',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: '#333333',
    backgroundColor: '#FFFFFF',
  },
  subHeading: {
    fontSize: 16,
    fontWeight: '800',
    color: '#333333',
    marginTop: 10,
    marginBottom: 10,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#A0A0A0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    backgroundColor: '#FFFFFF',
  },
  checkboxChecked: {
    backgroundColor: '#495E57',
    borderColor: '#495E57',
  },
  checkmark: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#333333',
  },
  logoutBtn: {
    backgroundColor: '#F4CE14',
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#E4BD00',
  },
  logoutBtnText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#333333',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 14,
  },
  discardBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#495E57',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  discardBtnText: {
    color: '#495E57',
    fontWeight: '700',
    fontSize: 14,
  },
  saveBtn: {
    flex: 1,
    backgroundColor: '#495E57',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveBtnText: {
    color: '#EDEFEE',
    fontWeight: '700',
    fontSize: 14,
  },
});
