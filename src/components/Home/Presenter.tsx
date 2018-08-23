import React from 'react';
import styled from 'styled-components/native';

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fdfdfd;
`;
const Text = styled.Text`
  font-size: 25px;
  font-weight: 700;
`;

export default class extends React.PureComponent {
  render() {
    return (
      <View>
        <Text>Home Presenter</Text>
      </View>
    );
  }
}
