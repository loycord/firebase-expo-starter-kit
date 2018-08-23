import React from 'react';
import Context from './context';
import Provider from './Provider';
import FirebaseLogin from './root';

function withAuth(Component: React.ComponentClass<any>) {
  return class extends React.Component {
    public render() {
      return (
        <Context.Consumer>
          {auth =>
            auth.isLoggedIn ? (
              <Component {...this.props} auth={auth} />
            ) : (
              <FirebaseLogin screenProps={{ ...this.props, auth }} />
            )
          }
        </Context.Consumer>
      );
    }
  };
}

export default withAuth;
