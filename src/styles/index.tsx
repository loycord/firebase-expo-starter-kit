import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './themes';

export default (Component: React.ComponentClass<any>) => {
  return class extends React.Component {
    render() {
      return (
        <ThemeProvider theme={theme}>
          <Component {...this.props} />
        </ThemeProvider>
      );
    }
  };
};
