import store from '../store'

//判断权限
export function hasPermission(permission) {
  let myPermissions = store.getters.permissions;
  return myPermissions.indexOf(permission) > -1;
}
