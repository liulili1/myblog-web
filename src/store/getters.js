const getters = {
  roles: state => state.user.roles,
  token: state => state.user.token,
  permisson_routes: state => state.permission.permisson_routes,
  viewFlag: state => state.home.viewFlag,
  userIp: state => state.user.userIp
}
export default getters