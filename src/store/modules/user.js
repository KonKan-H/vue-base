import {getToken, removeToken, setToken} from '@/utils/auth'
import store from '../../store'
import router from '../../router'
import { getInfo, login } from '@/api/user'
import { get } from 'js-cookie'
import { createRouter } from '@/router/index'

const user = {
  state: {
    nickname: "",
    userId: "",
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    role: '',
    menus: [],
    permissions: [],
  },
  mutations: {
    SET_USER: (state, userInfo) => {
      state.nickname = userInfo.username;
      state.userId = userInfo.userid;
      state.role = userInfo.roleName;
      // state.role = ['']
      // state.menus = userInfo.menuList;
      // state.permissions = userInfo.permissionList;
      // state.permission_routers = userInfo.routeList;
    },
    RESET_USER: (state) => {
      state.nickname = "";
      state.userId = "";
      state.role = '';
      state.menus = [];
      state.permissions = [];
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
  },
  actions: {
    // 登录
    Login({commit, state}, loginForm) {
      return new Promise((resolve, reject) => {
        login({mobile: loginForm.mobile, password: loginForm.password}).then(res => {
          const data = res.data
          if(data.code === 0) {
            commit('SET_TOKEN', data.model.token)
            //储存用户信息
            //cookie中保存前端登录状态
            //cookie保存登录状态,仅靠vuex保存的话,页面刷新就会丢失登录状态
            setToken(data.model.token);
          } 
          resolve(data);
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取用户信息
    GetInfo({commit, state}) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {        
          const data = response.data
          if (data.code !== 0) {
            removeToken()
            reject('验证失败，请重新登录！')
          }
          //取得按钮权限
          var userRole = data.model.userInfoVO.roleName.split('_')
          var newRouter = createRouter(data.model.menuVOList)
          if(newRouter.per) {
            for(var i = 0; i < newRouter.per.length; i++) {
              userRole.push(newRouter.per[i])
            }
          }
          data.model.userInfoVO.roleName = userRole
          //储存用户信息
          commit('SET_USER', data.model.userInfoVO);
          //根据后台返回的路由添加layout
          store.dispatch('InitRoutes', newRouter.router).then(() => {
            router.addRoutes(store.getters.addRouters)
          })
          //生成路由
          // let userPermission = data.userPermission ;
          // store.dispatch('GenerateRoutes', userPermission).then(() => {
          //   //生成该用户的新路由json操作完毕之后,调用vue-router的动态新增路由方法,将新路由添加
          //   router.addRoutes(store.getters.addRouters)
          // })
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    LogOut({commit}) {
      commit('RESET_USER')
      removeToken()
      // return new Promise((resolve) => {
      //   api({
      //     url: "v1/logout",
      //     method: "post"
      //   }).then(data => {
      //     commit('RESET_USER')
      //     removeToken()
      //     resolve(data);
      //   }).catch(() => {
      //     commit('RESET_USER')
      //     removeToken()
      //   })
      // })
    },
    // 前端 登出
    FedLogOut({commit}) {
      return new Promise(resolve => {
        commit('RESET_USER')
        removeToken()
        resolve()
      })
    }
  }
}
export default user
