import React, { Component } from 'react'
import AuthFrom from './AuthForm'
import LoginMutation from '../mutations/Login'
import { graphql } from 'react-apollo'
import CurrentUserQuery from '../queries/CurrentUser'
import { hashHistory } from 'react-router'

class LoginForm extends Component {
  constructor(props) {
    super(props)

    this.state = { errors: [] }
  }

  componentWillUpdate(nextProps) {
    //this.props the old, current set of props
    //nextProps the next set of props whtat will be in place when the component rerenders
    if (!this.props.data.currentUser && nextProps.data.currentUser) {
      // redirect to dashboard
      hashHistory.push('/dashboard')
    }
  }

  onSubmit({ email, password }) {
    this.props.mutate({
      variables: { email, password },
      refetchQueries: [{ query: CurrentUserQuery }]
    }).catch(res => {
      const errors = res.graphQLErrors.map(error => error.message)
      this.setState({ errors })
    })
  }

  render() {
    return (
      <div>
        <h5>Login</h5>
        <AuthFrom errors={this.state.errors} onSubmit={this.onSubmit.bind(this)} />
      </div>
    )
  }
}

export default graphql(CurrentUserQuery)(
  graphql(LoginMutation)(LoginForm)
)
