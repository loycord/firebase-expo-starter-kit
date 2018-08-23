import React from 'react';
import { ActivityIndicator, Animated } from 'react-native';
import styled from 'styled-components/native';
import { State as LoadingState } from './context';

const View = styled(Animated.View)`
  position: absolute;
  flex: 1;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.85);
  justify-content: center;
  align-items: center;
`;

interface Props {
  loading: LoadingState;
  style?: {};
}

interface State {
  hide: boolean;
  anim: Animated.Value;
}

class LoadingScreen extends React.PureComponent<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      hide: true,
      anim: new Animated.Value(0)
    };
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    console.log(props, state);
    if (props.loading.state === 'pending' && state.hide) {
      return { hide: false };
    }
    return null;
  }

  animate() {
    const { state } = this.props.loading;
    const loading: boolean = state === 'pending';
    Animated.timing(this.state.anim, {
      toValue: loading ? 1 : 0,
      duration: 1500
    }).start(() => {
      if (!loading) {
        this.setState({ hide: true });
      }
    });
  }

  render() {
    if (this.state.hide) return null;
    this.animate();
    return (
      <View style={[{ opacity: this.state.anim }, this.props.style]}>
        <ActivityIndicator size="large" color="#043B40" />
      </View>
    );
  }
}

export default LoadingScreen;
