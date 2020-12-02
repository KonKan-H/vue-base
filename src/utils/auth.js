import Cookies from 'js-cookie'

const LoginKey = 'token'

export function getToken() {
  return Cookies.get(LoginKey);
}

export function setToken(token) {
  return Cookies.set(LoginKey, token)
}

export function removeToken() {
  return Cookies.remove(LoginKey)
}


// export function getToken() {
//   return localStorage.getItem(LoginKey);
// }

// export function setToken(token) {
//   return localStorage.setItem(LoginKey, token)
// }

// export function removeToken() {
//   return localStorage.removeItem(LoginKey)
// }
