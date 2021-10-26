import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import Pages from '../global/pages';

import {
  EmailAuthProvider,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from 'firebase/auth';
import { auth } from './firebase';

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
