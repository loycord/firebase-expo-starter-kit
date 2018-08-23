import React from 'react';

export type LoadingState = 'pending' | 'fulfilled' | 'rejected' | 'settled';

export interface State {
  state: LoadingState;
  start: () => void;
  end: (state?: LoadingState) => void;
}

export const initialState: State = {
  state: 'settled',
  start: () => {},
  end: () => {}
};

export default React.createContext(initialState);
