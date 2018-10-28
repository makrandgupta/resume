import firebase from 'firebase';
import _ from 'lodash';
import React from 'react';
import { Button, Container, Divider, Message } from 'semantic-ui-react';
import SignOutButton from './components/Buttons/SignOutButton';
import Contact from './components/Contact/Contact';
import Education from './components/Education/Education';
import Experience from './components/Experience/Experience';
import Name from './components/Name/Name';
import SignIn from './components/SignIn';
import Skill from './components/Skill/Skill';
import { AuthProvider } from './services/AuthContext';
import base, { firebaseApp } from './services/base';

const AUTH_ERROR_CODE_MAP = {
  ACCOUNT_EXISTS: 'auth/account-exists-with-different-credential',
}

class App extends React.Component {
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


  authHandler = async (authData) => {
    const uid = _.get(authData, 'user.uid');

    const userData = await base.fetch(uid, {});

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

      await base.post(uid, {
        data: initData,
      });
    }

    this.setState({ uid });
  }

  authErrorHandler = async (error) => {
    if (_.get(error, 'code') === AUTH_ERROR_CODE_MAP.ACCOUNT_EXISTS) {
      this.setState({
        newCredential: error.credential,
        authEmail: error.email,
      });

      this.handleOpenLinkAccountsQuestionMessage();
    }
  }

  linkAccounts = async () => {
    const providers = await firebase.auth().fetchProvidersForEmail(this.state.authEmail) // returns ["provider.com"]
    const providerName = providers[0].split('.')[0]; // grab first provider and get provider name
    const providerNameCapitalized = `${providerName[0].toUpperCase()}${providerName.slice(1)}`; // capitalize provider name
    const provider = new firebase.auth[`${providerNameCapitalized}AuthProvider`]();
    provider.setCustomParameters({ login_hint: this.state.authEmail });
    const providerData = await firebaseApp.auth().signInWithPopup(provider)

    const user = await firebase.auth().signInWithCredential(providerData.credential)

    await user.linkWithCredential(this.state.newCredential)

    this.setState({
      newCredential: {},
      authEmail: '',
    });

    this.handleCloseLinkAccountsQuestionMessage();
    this.handleOpenLinkAccountsSuccessMessage();
  }

  authenticate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp.auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler)
      .catch(this.authErrorHandler);
  }

  signOut = async () => {
    await firebaseApp.auth().signOut();
    this.setState({ uid: null });
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
    }, 10000);
  }

  renderLinkAccountsQuestionMessage = () => (
    <Message warning>
      <Message.Header>Account Already Exists</Message.Header>
      <p>An account already exists with the same email address but different sign-in provider. Would you like to link these two accounts?</p>
      <Button positive onClick={this.linkAccounts}>Yes</Button>
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
      <Container style={{ marginTop: '3em', marginBottom: '3em' }} text>
        {_.isEmpty(this.state.uid) && <SignIn authenticate={this.authenticate} />}
        {this.state.showLinkAccountsQuestionMessage && this.renderLinkAccountsQuestionMessage()}
        {this.state.showLinkAccountsSuccessMessage && this.renderLinkAccountsSuccessMessage()}
        {!_.isEmpty(this.state.uid) && (
          <AuthProvider value={{ uid: this.state.uid }}>
            <SignOutButton onClick={this.signOut} />
            <Name />
            <Contact />
            <Divider hidden />
            <Experience />
            <Divider hidden />
            <Skill />
            <Divider hidden />
            <Education />
          </AuthProvider>
        )}
      </Container>
    );
  }
}

export default App;
