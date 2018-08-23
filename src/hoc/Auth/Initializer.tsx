import React from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';

const View = styled(Animated.View)`
  flex: 1;
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f1e2cb;
`;
const Text = styled.Text`
  font-size: 18px;
  color: #043b40;
`;

interface Props {
  initialize: boolean;
  duration?: number;
  style?: {};
  children?: React.ReactChild;
}

interface State {
  hide: boolean;
  fadeAnim: Animated.Value;
}

export default class Initializer extends React.PureComponent<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(1),
      hide: false
    };
  }

  componentDidUpdate(prevProps: Props) {
    if (!prevProps.initialize && this.props.initialize) {
      this.animate();
    }
  }

  animate() {
    Animated.timing(this.state.fadeAnim, {
      toValue: 0,
      duration: this.props.duration || 1000
    }).start(() => {
      this.setState({ hide: true });
    });
  }

  render() {
    if (this.state.hide) return null;
    return (
      <View style={[{ opacity: this.state.fadeAnim }, this.props.style]}>
        {this.props.children || <Text>Loading...</Text>}
      </View>
    );
  }
}
