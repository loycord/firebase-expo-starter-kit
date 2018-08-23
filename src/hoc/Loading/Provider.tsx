import React from 'react';
import Context, { initialState } from './context';
// types
import { State, LoadingState } from './context';

interface Props {
  children: React.ReactChild;
}

class Provider extends React.Component<Props, State> {
  start: () => void;
  end: (state?: LoadingState) => void;
  constructor(props: any) {
    super(props);
    this.start = () => this.setState({ state: 'pending' });
    this.end = (state: LoadingState = 'settled') => this.setState({ state });
    this.state = {
      ...initialState,
      start: this.start,
      end: this.end
    };
  }
  public render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Provider;
