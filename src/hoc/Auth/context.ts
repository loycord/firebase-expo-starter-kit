import React from 'react';

export interface State {
  initialize: boolean;
  isLoggedIn: boolean;
  signIn: () => void;
  signOut: () => void;
  signInAnonymously?: () => void;
  signInWithEmailAndPassword?: (email: string, password: string) => void;
  signInWithPhoneNumber?: (phoneNumber: string) => void;
  createUserWithEmailAndPassword?: (email: string, password: string) => void;
}

export const initialState: State = {
  initialize: false,
  isLoggedIn: false,
  signIn: () => {},
  signOut: () => {}
};

export default React.createContext(initialState);
