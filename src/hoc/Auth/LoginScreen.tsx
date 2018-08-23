import React from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';
import { State as ContextState } from './context';

interface ViewProps {
  justifyContent?: string;
}
const View = styled.View`
  flex: 1;
  justify-content: ${({ justifyContent }: ViewProps) => justifyContent || 'space-evenly'};
  align-items: center;
  background-color: #a1beb4;
`;
const LogoText = styled.Text`
  font-size: 55px;
  font-weight: 900;
`;
const Button = styled.TouchableOpacity`
  padding: 15px 20px;
  min-width: 80%;
  justify-content: center;
  align-items: center;
  background-color: #20a69a;
  margin: 8px;
`;
const TextButton = styled.TouchableOpacity`
  margin: 10px;
`;
const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
`;

interface Props {
  navigation: any;
  screenProps:
    | {
        auth: ContextState;
      }
    | any;
}

interface State {
  startAnim: boolean;
  anim: Animated.Value;
}

class LoginScreen extends React.PureComponent<Props, State> {
  push: (name: string) => void;
  constructor(props: any) {
    super(props);
    this.state = {
      startAnim: false,
      anim: new Animated.Value(0)
    };
    this.push = (name: string) => this.props.navigation.navigate(name);
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    if (
      (props.screenProps.auth.initialize && !state.startAnim) ||
      (props.screenProps.auth.initialize &&
        !props.screenProps.isLoggedIn &&
        !state.startAnim)
    ) {
      return { startAnim: true };
    }
    return null;
  }

  animate() {
    Animated.timing(this.state.anim, { toValue: 3000, duration: 3000 }).start();
  }

  render() {
    console.log(this.props, this.state);
    if (this.state.startAnim) {
      this.animate();
    }
    return (
      <View>
        <View justifyContent="center">
          <Animated.View style={this.fadeIn(100, 5)}>
            <LogoText>Logo</LogoText>
          </Animated.View>
        </View>
        <View justifyContent="center">
          <Animated.View style={this.fadeIn(100, 5)}>
            <Button onPress={() => {}}>
              <ButtonText>Phone Login</ButtonText>
            </Button>
          </Animated.View>
          <Animated.View style={this.fadeIn(300, 10)}>
            <Button onPress={() => {}}>
              <ButtonText>Facebook Login</ButtonText>
            </Button>
          </Animated.View>
          <Animated.View style={this.fadeIn(500, 15)}>
            <Button onPress={() => {}}>
              <ButtonText>Google Login</ButtonText>
            </Button>
          </Animated.View>
          <Animated.View style={this.fadeIn(700, 20)}>
            <Button onPress={() => this.push('EmailSignIn')}>
              <ButtonText>Email Login</ButtonText>
            </Button>
          </Animated.View>
          <Animated.View style={this.fadeIn(1200, 20)}>
            <TextButton onPress={this.props.screenProps.signInAnonymously}>
              <ButtonText>Skip Login</ButtonText>
            </TextButton>
          </Animated.View>
        </View>
      </View>
    );
  }

  fadeIn(delay: number, from: number = 0) {
    const { anim } = this.state;
    return {
      opacity: anim.interpolate({
        inputRange: [delay, Math.min(delay + 500, 3000)],
        outputRange: [0, 1],
        extrapolate: 'clamp'
      }),
      transform: [
        {
          translateY: anim.interpolate({
            inputRange: [delay, Math.min(delay + 500, 3000)],
            outputRange: [from, 0],
            extrapolate: 'clamp'
          })
        }
      ]
    };
  }
}

export default LoginScreen;
