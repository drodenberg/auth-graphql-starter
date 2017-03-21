//this is lower case because it is a HOC and they are only functions and functions do not get upper case
import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import CurrentUserQuery from '../queries/CurrentUser'
import { hashHistory } from 'react-router'

export default (WrappedComponent) => {
  class RequireAuth extends Component {
    componentWillUpdate(nextProps) {
      if(!nextProps.data.loading && !nextProps.data.currentUser) {
        hashHistory.push('/login')
      }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  return graphql(CurrentUserQuery)(RequireAuth)
}
