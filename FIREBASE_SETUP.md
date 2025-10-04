# Mission 77 Nepal - Environment Setup

## Firebase Configuration

To use Firebase for data storage, you need to create a `.env.local` file in the root directory with your Firebase configuration.

### Steps to set up Firebase:

1. **Create a Firebase project:**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Create a project" or "Add project"
   - Follow the setup wizard

2. **Enable Firestore Database:**
   - In your Firebase project, go to "Firestore Database"
   - Click "Create database"
   - Choose "Start in test mode" (for development)
   - Select a location for your database

3. **Get your Firebase config:**
   - Go to Project Settings (gear icon)
   - Scroll down to "Your apps" section
   - Click "Add app" and select Web app
   - Copy the config object

4. **Create `.env.local` file:**
   Create a file named `.env.local` in the root directory with the following content:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-actual-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

Replace the placeholder values with your actual Firebase configuration values.

### Security Rules for Firestore

For development, you can use these permissive rules. For production, make them more restrictive:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### Collections Structure

The app will create the following collections:
- `itineraries` - Stores travel itineraries
- `districts` - Stores district status and progress

### Running the Application

After setting up the environment variables:

```bash
npm run dev
```

The application will automatically initialize the districts data in Firestore on first run.
