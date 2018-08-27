import React from 'react';
import { BackHandler, Alert } from 'react-native';
// hoc
import withAuth, { Provider as AuthProvider } from 'react-native-firebase-auth-hoc';
import withLoading, { Provider as LoadingProvider } from 'react-native-loading-hoc';
import withStyles from './styles';
// components
import Navigator from './navigator';

const NavigatorWithHOC = withAuth(withLoading(Navigator));

class Root extends React.Component {
  constructor(props: any) {
    super(props);

    BackHandler.addEventListener('hardwareBackPress', () => {
      Alert.alert('Exit', 'Are you sure you want to exit CFN?', [
        { text: 'No', onPress: () => {} },
        {
          text: 'Yes',
          onPress: () => {
            BackHandler.exitApp();
          }
        }
      ]);
      return true;
    });
  }

  render() {
    return (
      <LoadingProvider>
        <AuthProvider>
          <NavigatorWithHOC />
        </AuthProvider>
      </LoadingProvider>
    );
  }
}

export default withStyles(Root);
