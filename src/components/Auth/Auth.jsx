import firebase from 'firebase';
import _ from 'lodash';
import React from 'react';
import { Button, Message } from 'semantic-ui-react';
import base from '../../services/base';
import SignOutButton from './components/SignOutButton';
import SignIn from './SignIn';

const AUTH_ERROR_CODE_MAP = {
  ACCOUNT_EXISTS: 'auth/account-exists-with-different-credential',
}

class Auth extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      uid: '',
      authEmail: '',
      newCredential: {},
      showLinkAccountsQuestionMessage: false,
      showLinkAccountsSuccessMessage: false,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (!_.isEmpty(user)) {
        this.handleAuthSuccess({ user });
      }
    })
  }

  handleAuthSuccess = async (authData) => {
    const uid = _.get(authData, 'user.uid');


    let userData;

    try {
      userData = await base.fetch(uid, {});
    } catch (error) {
      // TODO: Show some error to the user
      return console.error('error fetching user data', error);
    }

    if (_.isEmpty(userData)) {
      const initData = {
        name: _.get(authData, 'user.displayName'),
        contacts: {
          contactEmail: {
            type: 'email',
            value: _.get(authData, 'user.email')
          }
        }
      };

      try {
        await base.post(uid, {
          data: initData,
        });
      } catch (error) {
        // TODO: Show some error to the user
        return console.error('error initializing user', error);
      }
    }

    this.setState({ uid });
    this.props.onSignIn(uid);
  }

  handleAuthError = async (error) => {
    if (_.get(error, 'code') === AUTH_ERROR_CODE_MAP.ACCOUNT_EXISTS) {
      this.setState({
        newCredential: error.credential,
        authEmail: error.email,
      });

      this.handleOpenLinkAccountsQuestionMessage();
    }
  }

  handleLinkAccounts = async () => {
    if (_.isEmpty(this.state.newCredential)) {
      // TODO: Show some error to the user
      return console.log('handleLinkAccounts: new credential not set')
    }

    let providers;

    try {
      providers = await firebase.auth().fetchProvidersForEmail(this.state.authEmail) // returns ["provider.com"]
    } catch (error) {
      // TODO: Show some error to the user
      return console.error('error fetching providers', error);
    }
    const providerName = providers[0].split('.')[0]; // grab first provider and get provider name
    const providerNameCapitalized = `${providerName[0].toUpperCase()}${providerName.slice(1)}`; // capitalize provider name
    const provider = new firebase.auth[`${providerNameCapitalized}AuthProvider`]();
    provider.setCustomParameters({ login_hint: this.state.authEmail });

    let providerData;

    try {
      providerData = await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      // TODO: Show some error to the user
      return console.error('error signing in with default provider', error);
    }

    let user;

    try {
      user = await firebase.auth().signInWithCredential(providerData.credential);
    } catch (error) {
      // TODO: Show some error to the user
      return console.error('error fetching user from credentials', error);
    }

    try {
      await user.linkWithCredential(this.state.newCredential);
    } catch (error) {
      // TODO: Show some error to the user
      return console.error('error linking accounts', error);
    }

    this.setState({
      newCredential: {},
      authEmail: '',
    });

    this.handleCloseLinkAccountsQuestionMessage();
    this.handleOpenLinkAccountsSuccessMessage();
  }

  authenticate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebase.auth()
      .signInWithPopup(authProvider)
      .then(this.handleAuthSuccess)
      .catch(this.handleAuthError);
  }

  handleSignOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      // TODO: Show some error to the user
      return console.error('error signing out', error);
    }
    this.setState({ uid: null });
    this.props.onSignOut();
  };

  handleOpenLinkAccountsQuestionMessage = () => {
    this.setState({
      showLinkAccountsQuestionMessage: true,
    })
  }

  handleCloseLinkAccountsQuestionMessage = () => {
    this.setState({
      showLinkAccountsQuestionMessage: false,
    })
  }

  handleOpenLinkAccountsSuccessMessage = () => {
    this.setState({
      showLinkAccountsSuccessMessage: true,
    });

    setTimeout(() => {
      this.setState({ showLinkAccountsSuccessMessage: false })
    }, 5000);
  }

  renderLinkAccountsQuestionMessage = () => (
    <Message warning>
      <Message.Header>Account Already Exists</Message.Header>
      <p>An account already exists with the same email address but different sign-in provider. Would you like to link these two accounts?</p>
      <Button positive onClick={this.handleLinkAccounts}>Yes</Button>
      <Button onClick={() => this.setState({ showLinkAccountsQuestionMessage: false })}>No</Button>
    </Message>
  )

  renderLinkAccountsSuccessMessage = () => (
    <Message success>
      <Message.Header>Accounts Linked!</Message.Header>
      <p>Please Sign in again to continue.</p>
    </Message>
  )

  render() {
    return (
      <div>
        {_.isEmpty(this.state.uid) && <SignIn authenticate={this.authenticate} />}
        {!_.isEmpty(this.state.uid) && <SignOutButton onClick={this.handleSignOut} />}
        {this.state.showLinkAccountsQuestionMessage && this.renderLinkAccountsQuestionMessage()}
        {this.state.showLinkAccountsSuccessMessage && this.renderLinkAccountsSuccessMessage()}
      </div>
    )
  }

}

export default Auth;