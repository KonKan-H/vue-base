import Vue from 'vue'
import Router from 'vue-router'
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading
/* layout */
// import Layout from '../layout/Layout'
import Layout from '../layout/Layout_1'

const _import = require('./_import_' + process.env.NODE_ENV)
Vue.use(Router)
export const constantRouterMap = [
  // {path: '/login', component: _import('login/index'), hidden: true},
  {path: '/login', component: _import('login/index_1'), hidden: true},
  {path: '/404', component: _import('404'), hidden: true},
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '首页',
    hidden: true,
    children: [{
      path: 'dashboard', component: _import('dashboard/index')
      // path: 'dashboard', component: _import('memorabilia/index')
      // path: 'dashboard', component: _import('summary/index')
    }, {
      path: '/pages/ysxmwh',
      name: 'ysxmwh',
      component: _import('pages/ysxmwh'),
    }, {
      path: '/pages/dnysxmwh',
      name: 'dnysxmwh',
      component: _import('pages/dnysxmwh'),
    }, {
      path: '/pages/kndysxmwh',
      name: 'kndysxmwh',
      component: _import('pages/kndysxmwh'),
    }, {
      path: '/pages/bqtoxm',
      name: 'bqtoxm',
      component: _import('pages/bqtoxm'),
    }, {
      path: '/pages/xmtobq',
      name: 'xmtobq',
      component: _import('pages/xmtobq'),
    }, {
      path: '/pages/xmtozb',
      name: 'xmtozb',
      component: _import('pages/xmtozb'),
    }, {
      path: '/pages/zbtoxm',
      name: 'zbtoxm',
      component: _import('pages/zbtoxm'),
    }, {
      path: '/pages/bqwh',
      name: 'bqwh',
      component: _import('pages/bqwh'),
    },]
  },
]
export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap,
  base :"/"
})

export const asyncRouterMap = [
  {path: '*', redirect: '/404', hidden: true}
]

let butPermission = []
export function createRouter(routerList) {

  let newRouterList = [];
  butPermission = [];
  if(routerList != null) {
    var json = eval(routerList)
    //二级目录
    // for(var i = 0; i < json.length; i++) {
    //   json[i].component = Layout;
    //   if(json[i].children != null) {
    //    for(var j = 0; j < json[i].children.length; j++) {
    //     var path = json[i].children[j].comp;
    //     if(path.charAt(0) === '/') {
    //       path = path.substr(1)
    //     }
    //     if(path) {
    //       json[i].children[j].component = _import(path)
    //       //获取按钮权限
    //       if(json[i].children[j].meta.btnPermissions) {
    //         butPermission.push(json[i].children[j].meta.btnPermissions)
    //       }
    //     } 
    //    }
    //   }
    // }
    // newRouterList = json
    for(var i = 0; i<routerList.length; i++) {
      routerList[i].component = Layout
      routerList[i].children = setMenu(routerList[i].children)
    }
    // newRouterList = setMenu(routerList);
  }
  const data = {
    per : butPermission[0],
    router : routerList
  }
  return data;
}

//递归构建路由 多级目录
export function setMenu(routerList) {
  for(var i = 0; i < routerList.length; i++) {
    //判断不是导航
    var path = routerList[i].comp
    if(path.charAt(0) === '/') {
      path = path.substr(1)
    }
    if(path) {
      routerList[i].component = _import(path)
       //获取按钮权限
       if(routerList[i].meta.btnPermissions) {
        butPermission.push(routerList[i].meta.btnPermissions)
      }
    } 
    if(routerList[i].children > 0) {
      setMenu(routerList[i].children)
    }
  } 
  return routerList
}
