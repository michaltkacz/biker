import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import Pages from '../global/pages';

import {
  EmailAuthProvider,
  GoogleAuthProvider,
  FacebookAuthProvider,
  UserCredential,
} from 'firebase/auth';

import { auth, database } from './firebase';
import { User } from '../database/schema';
import { ref, set } from 'firebase/database';

// Initialize FirebaseUI
const firebaseUI = new firebaseui.auth.AuthUI(auth);

// FirebaseUI default configuration
export const firebaseUiDefaultConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInSuccessUrl: `/${Pages.Tracker}`,
  signInOptions: [
    EmailAuthProvider.PROVIDER_ID,
    GoogleAuthProvider.PROVIDER_ID,
    FacebookAuthProvider.PROVIDER_ID,
  ],
  tosUrl: 'https://en.wikipedia.org/wiki/Terms_of_service',
  privacyPolicyUrl: 'https://en.wikipedia.org/wiki/Privacy_policy',
  callbacks: {
    signInSuccessWithAuthResult: (authResult) => {
      if (authResult.additionalUserInfo.isNewUser) {
        const user: User = {
          userId: authResult.user.uid,
          profile: null,
          statistics: null,
          activities: null,
        };
        set(ref(database, 'users/' + user.userId), user);
        // dbCreateNewUserEntry(user);
      }
      return true;
    },
  },
};

// Widget element ID
export const elementID: string = 'firebaseui-auth-container';

// Function to start the FirebaseUI service
export const startFirebaseUI = (
  firebaseUiCustomConfig?: firebaseui.auth.Config
) => {
  firebaseUI.start('#' + elementID, {
    ...firebaseUiDefaultConfig,
    ...firebaseUiCustomConfig,
  });
};
