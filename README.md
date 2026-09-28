# Little Lemon Food Ordering App (React Native Expo)

A clean mobile food ordering app for **Little Lemon Mediterranean Restaurant**, built with **React Native**, **Expo**, and pure **JavaScript** (no TypeScript) using **React Navigation** and **AsyncStorage**.

## Architecture & Requirements Met

1. **Onboarding Screen**:
   - Little Lemon branding with header and hero welcome banner.
   - First Name & Email input fields with real-time format validation.
   - Next button enabled only after valid required inputs are entered.
   - Local state persistence using `@react-native-async-storage/async-storage`.
   - On first launch, user is guided through onboarding before gaining access to the rest of the app.

2. **Home Screen**:
   - Header with Little Lemon logo/name and profile icon with avatar / user initials.
   - Hero section with:
     - "Little Lemon" title & "Chicago" subtitle.
     - Mediterranean restaurant description.
     - Restaurant hero dish image.
     - Interactive search bar.
   - Menu breakdown with selectable categories:
     - Starters
     - Mains
     - Desserts
     - Drinks
   - Food menu FlatList:
     - Item Name
     - Description
     - Price ($)
     - Thumbnail image

3. **Search & Category Filtering**:
   - Real-time search by food name or description.
   - Category filtering toggles combined with search query.

4. **Profile Screen**:
   - Direct access via the profile icon on the Home screen.
   - Personal information fields:
     - First name
     - Last name
     - Email
     - Phone number (with phone mask formatting)
   - Change avatar & Remove avatar (resets to initials).
   - Email notification preferences:
     - Order statuses
     - Password changes
     - Special offers
     - Newsletter
   - Discard changes (reverts uncommitted inputs).
   - Save changes (persists to AsyncStorage).
   - Log out (clears AsyncStorage and returns user to Onboarding screen).

5. **Data Persistence & Route Guarding**:
   - Persists state across app reboots via `AsyncStorage`.
   - Protects Home and Profile screens from unauthenticated/unonboarded access.

## How to Run in VS Code

1. Open this `expo-project` folder in **VS Code**.
2. Open the built-in terminal (\`Ctrl + \`\` or \`Cmd + \`\`).
3. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
4. Run the Expo development server:
   \`\`\`bash
   npx expo start
   \`\`\`
5. Press \`a\` for Android Emulator, \`i\` for iOS Simulator, or scan the QR code with the **Expo Go** mobile app.
