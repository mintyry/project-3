import decode from 'jwt-decode';

class AuthService {
  getProfile() {
    // returns decoded user content from token
    return decode(this.getToken());
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid (not expired)
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

//   passes token into function
  isTokenExpired(token) {
    try {
        // decodes token to get expiration time (because initially, it holds payload, secret, expiration)
      const decoded = decode(token);
    //  /1000 returns time in seconds as opposed to milliseconds. decoded.exp is in seconds, so if it compares against milliseconds, 
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken);

    window.location.assign('/');
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    // this will reload the page and reset the state of the application
    window.location.assign('/');
  }
}

export default new AuthService();
