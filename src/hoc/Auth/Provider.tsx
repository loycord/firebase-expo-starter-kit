import React from 'react';
import firebase from 'firebase';
import Context, { initialState, State } from './context';
import Initializer from './Initializer';

interface Props {
  children: React.ReactChild;
}

class Provider extends React.Component<Props, State> {
  signIn: () => void;
  signOut: () => void;
  constructor(props: any) {
    super(props);
    this.signIn = () => this.setState({ isLoggedIn: true });
    this.signOut = async () => {
      await firebase.auth().signOut();
      this.setState({ isLoggedIn: false });
    };
    this.state = {
      ...initialState,
      signIn: this.signIn,
      signOut: this.signOut,
      signInAnonymously: this.signInAnonymously.bind(this),
      signInWithEmailAndPassword: this.signInWithEmailAndPassword.bind(this),
      // signInWithPhoneNumber: this.signInWithPhoneNumber.bind(this),
      createUserWithEmailAndPassword: this.createUserWithEmailAndPassword.bind(this)
    };

    this.init = this.init.bind(this);
  }

  componentDidMount() {
    this.init();
  }

  async init() {
    const result = await Promise.all([this.wait(1000), this.onAuthStateChanged()]);
    const user = result[1];

    if (user) {
      this.setState({ initialize: true, isLoggedIn: true });
    } else {
      this.setState({ initialize: true });
    }
  }

  wait(ms: number) {
    return new Promise(r => setTimeout(() => r(), ms));
  }

  onAuthStateChanged() {
    return new Promise(r => {
      firebase.auth().onAuthStateChanged((user: any) => r(user));
    });
  }

  handleSignError(err: Error) {
    console.warn(err);
  }

  async signInAnonymously() {
    try {
      await firebase.auth().signInAnonymouslyAndRetrieveData();
      this.signIn();
    } catch (err) {
      this.handleSignError(err);
    }
  }

  async signInWithEmailAndPassword(email: string, password: string) {
    try {
      await firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password);
      this.signIn();
    } catch (err) {
      this.handleSignError(err);
    }
  }

  async createUserWithEmailAndPassword(email: string, password: string) {
    try {
      await firebase
        .auth()
        .createUserAndRetrieveDataWithEmailAndPassword(email, password);
      this.signIn();
    } catch (err) {
      this.handleSignError(err);
    }
  }

  // async signInWithPhoneNumber(phoneNumber: string) {
  //   try {
  //     await firebase.auth().signInWithPhoneNumber(phoneNumber);
  //     this.signIn();
  //   } catch (err) {
  //     this.handleSignError(err);
  //   }
  // }

  public render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
        <Initializer initialize={this.state.initialize} />
      </Context.Provider>
    );
  }
}

export default Provider;
