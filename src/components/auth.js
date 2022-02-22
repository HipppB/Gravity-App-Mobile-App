class Auth {
  constructor() {
    this.authenticated = false;
    this.token = null;
    this.state = null;
  }

  login(props) {}

  logout(cb) {}

  isAuthentificated() {
    return this.authenticated;
  }
}

export default new Auth();
