import React from 'react';
import { BackHandler, Alert } from 'react-native';
// hoc
import withAuth, { Provider as AuthProvider } from './hoc/Auth';
import withLoading, { Provider as LoadingProvider } from './hoc/Loading';
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
