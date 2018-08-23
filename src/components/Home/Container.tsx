import React from 'react';
import Presenter from './Presenter';

export default class extends React.Component {
  render() {
    return <Presenter {...this.props} {...this.state} />
  }
}