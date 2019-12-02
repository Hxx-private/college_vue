import {getRequest} from './api'
import {Message} from 'element-ui'

export const isNotNullORBlank = (...args) => {
  for (var i = 0; i < args.length; i++) {
    var argument = args[i];
    if (argument == null || argument == '' || argument == undefined) {
      Message.warning({message: '数据不能为空!'})
      return false;
    }
  }
  return true;
}
export const initMenu = (router, store) => {
  if (store.state.routes.length > 0) {
    return;
  }
  getRequest("/config/sysmenu").then(resp => {
    if (resp && resp.status == 200) {
      var fmtRoutes = formatRoutes(resp.data);
      router.addRoutes(fmtRoutes);
      store.commit('initMenu', fmtRoutes);
      store.dispatch('connect');
    }
  })
}
export const formatRoutes = (routes) => {
  let fmRoutes = [];
  routes.forEach(router => {
    let {
      path,
      component,
      name,
      meta,
      iconCls,
      children
    } = router;
    if (children && children instanceof Array) {
      children = formatRoutes(children);
    }
    let fmRouter = {
      path: path,
      component(resolve) {
        if (component.startsWith("Home")) {
          require(['../components/' + component + '.vue'], resolve)
        } else if (component.startsWith("Sys")) {
          require(['../components/system/' + component + '.vue'], resolve)
        } else if (component.startsWith("User")) {
          require(['../components/user/' + component + '.vue'], resolve)
        }else if (component.startsWith("DormList")) {
          require(['../components/dorm/' + component + '.vue'], resolve)
        }else if (component.startsWith("SanitaryList")) {
          require(['../components/dorm/' + component + '.vue'], resolve)
        }else if (component.startsWith("SanitaryCheck")) {
          require(['../components/dorm/' + component + '.vue'], resolve)
        }else if (component.startsWith("ApplyRepair")) {
          require(['../components/repair/' + component + '.vue'], resolve)
        }else if (component.startsWith("DisRepair")) {
          require(['../components/repair/' + component + '.vue'], resolve)
        }else if (component.startsWith("RepairRecord")) {
          require(['../components/repair/' + component + '.vue'], resolve)
        }else if (component.startsWith("AddLost")) {
          require(['../components/lost/' + component + '.vue'], resolve)
        }else if (component.startsWith("LostCenter")) {
          require(['../components/lost/' + component + '.vue'], resolve)
        }else if (component.startsWith("HosRecord")) {
          require(['../components/security/' + component + '.vue'], resolve)
        }else if (component.startsWith("AddSecurity")) {
          require(['../components/security/' + component + '.vue'], resolve)
        }else if (component.startsWith("ViewCheck")) {
          require(['../components/security/' + component + '.vue'], resolve)
        }else if (component.startsWith("Pending")) {
          require(['../components/security/' + component + '.vue'], resolve)
        }else if (component.startsWith("SolVed")) {
          require(['../components/security/' + component + '.vue'], resolve)
        }else if (component.startsWith("CheckRecord")) {
          require(['../components/security/' + component + '.vue'], resolve)
        }
      },
      name: name,
      iconCls: iconCls,
      meta: meta,
      children: children
    };
    fmRoutes.push(fmRouter);
  })
  return fmRoutes;
}
