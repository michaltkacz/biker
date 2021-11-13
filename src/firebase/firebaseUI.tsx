import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import { EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth';

import Pages from '../global/pages';

import { auth } from './firebase';

const firebaseUI = new firebaseui.auth.AuthUI(auth);

export const firebaseUiDefaultConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInSuccessUrl: `/${Pages.Profile}`,
  signInOptions: [
    EmailAuthProvider.PROVIDER_ID,
    GoogleAuthProvider.PROVIDER_ID,
  ],
  tosUrl: 'https://en.wikipedia.org/wiki/Terms_of_service',
  privacyPolicyUrl: 'https://en.wikipedia.org/wiki/Privacy_policy',
};

export const elementID: string = 'firebaseui-auth-container';

export const startFirebaseUI = () => {
  firebaseUI.start('#' + elementID, firebaseUiDefaultConfig);
};
