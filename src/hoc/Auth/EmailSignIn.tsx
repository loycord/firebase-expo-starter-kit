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

class EmailSignIn extends React.PureComponent<Props, State> {
  goBack: () => void;
  push: (name: string) => void;
  signInWithEmailAndPassword: () => void;
  constructor(props: any) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };

    this.goBack = () => this.props.navigation.goBack();
    this.push = (name: string) => this.props.navigation.navigate(name);

    this.onChangeText = this.onChangeText.bind(this);
    this.signInWithEmailAndPassword = () => {
      const { email, password } = this.state;
      const { signInWithEmailAndPassword } = this.props.screenProps;
      if (signInWithEmailAndPassword) {
        signInWithEmailAndPassword(email, password);
      }
    };
  }

  onChangeText(name: 'email' | 'password', text: string) {
    this.setState({ [name]: text });
  }

  render() {
    return (
      <View behavior="padding" enabled>
        <Back onPress={this.goBack}>
          <BackText>Back</BackText>
        </Back>
        <Head>
          <Heading>SignIn</Heading>
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
          autoCapitalize="none"
          secureTextEntry
        />
        <Button title="Email Login" onPress={() => this.signInWithEmailAndPassword()} />
        <Button title="Email SignUp" onPress={() => this.push('EmailSignUp')} />
      </View>
    );
  }
}

export default EmailSignIn;
