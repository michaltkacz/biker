import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyASclbvuJjuN5f1tSCixm9swsIvTeH9ZQk',
  authDomain: 'biker-784a8.firebaseapp.com',
  projectId: 'biker-784a8',
  storageBucket: 'biker-784a8.appspot.com',
  messagingSenderId: '993843027751',
  appId: '1:993843027751:web:dc5f8671671126b4501302',
};

// Initialize
const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);

export default firebaseApp;
