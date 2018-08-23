import React from 'react';
import Context from './context';
import Provider from './Provider';
import LoadingScreen from './LoadingScreen';

function withLoading(Component: React.ComponentClass<any>) {
  return class extends React.Component {
    public render() {
      return (
        <Context.Consumer>
          {loading => (
            <React.Fragment>
              <Component {...this.props} loading={loading} />
              <LoadingScreen {...this.props} loading={loading} />
            </React.Fragment>
          )}
        </Context.Consumer>
      );
    }
  };
}

export default withLoading;
