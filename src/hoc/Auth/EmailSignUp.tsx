import React from 'react';
import styled from 'styled-components/native';
import { State as ContextState } from './context';

const View = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #a1beb4;
`;
const TextInput = styled.TextInput`
  width: 80%;
  margin-top: 5px;
  margin-bottom: 5px;
  border: 1px solid;
  font-size: 16px;
  padding: 15px;
`;
const Button = styled.Button``;
const Back = styled.TouchableOpacity`
  margin-left: 30px;
  margin-bottom: 20px;
  align-self: flex-start;
`;
const BackText = styled.Text`
  font-size: 30px;
`;
const Head = styled.View``;
const Heading = styled.Text`
  font-size: 35px;
  font-weight: 800;
  margin: 15px;
`;

interface Props {
  navigation: any;
  screenProps: ContextState;
}

interface State {
  [key: string]: string;
  email: string;
  password: string;
}

class EmailSignUp extends React.PureComponent<Props, State> {
  goBack: () => void;
  createUserWithEmailAndPassword: () => void;
  constructor(props: any) {
    super(props);
    this.state = {
      email: '',
      password: '',
      checkPassword: ''
    };

    this.goBack = () => this.props.navigation.goBack();

    this.onChangeText = this.onChangeText.bind(this);
    this.createUserWithEmailAndPassword = () => {
      const { email, password } = this.state;
      const { createUserWithEmailAndPassword } = this.props.screenProps;
      if (createUserWithEmailAndPassword) {
        createUserWithEmailAndPassword(email, password);
      }
    };
  }

  onChangeText(name: 'email' | 'password' | 'checkPassword', text: string) {
    this.setState({ [name]: text });
  }

  render() {
    return (
      <View behavior="padding" enabled>
        <Back onPress={this.goBack}>
          <BackText>Back</BackText>
        </Back>
        <Head>
          <Heading>SignUp</Heading>
        </Head>
        <TextInput
          value={this.state.email}
          onChangeText={text => this.onChangeText('email', text)}
          placeholder="email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          value={this.state.password}
          onChangeText={text => this.onChangeText('password', text)}
          placeholder="password"
          secureTextEntry
          autoCapitalize="none"
        />
        <TextInput
          value={this.state.checkPassword}
          onChangeText={text => this.onChangeText('checkPassword', text)}
          placeholder="one more password"
          secureTextEntry
          autoCapitalize="none"
        />
        <Button
          title="SignUp"
          onPress={() => this.createUserWithEmailAndPassword()}
        />
      </View>
    );
  }
}

export default EmailSignUp;
