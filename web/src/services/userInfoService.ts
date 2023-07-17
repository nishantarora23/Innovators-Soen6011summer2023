interface UserInfo {
  [x: string]: string;
}

export function setUserInfo(userInfo: UserInfo) {
  for (const key in userInfo) {
    localStorage.setItem(key, userInfo[key]);
  }
}

export function setUserName(userName: string) {
  localStorage.setItem('username', userName);
}

export function getFullName() {
  return localStorage.getItem('fullName');
}

export function getUserName() {
  return localStorage.getItem('username');
}

export function getEmail() {
  return localStorage.getItem('email');
}

export function setUserRole(userRole: string) {
  localStorage.setItem('userRole', userRole);
}

export function getUserRole() {
  return localStorage.getItem('userRole');
}

export function setIsLoggedIn(isLoggedIn: boolean) {
  localStorage.setItem('isLoggedIn', isLoggedIn.toString());
}

export function getIsLoggedIn() {
  return localStorage.getItem('isLoggedIn') === 'true';
}