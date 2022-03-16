
import { ActionBar, ActionBarIcon, ActionBarButton, Divider, Popup, Overlay, Loading, Dialog, ContactCard, Form, AddressEdit, AddressList, Field, CellGroup, Cell, SwipeCell, Icon, Stepper, Card, Checkbox, CheckboxGroup, Button, Swipe, SwipeItem, PullRefresh, List, Tab, Tabs, SubmitBar, Toast, Skeleton } from 'vant'

const components = [ActionBar, ActionBarIcon, ActionBarButton, Divider, Popup, Overlay, Loading, Dialog, ContactCard, Form, AddressEdit, AddressList, Field, CellGroup, Cell, SwipeCell, Icon, Stepper, Card, Checkbox, CheckboxGroup, Button, Swipe, SwipeItem, PullRefresh, List, Tab, Tabs, SubmitBar, Toast, Skeleton]

/**
 * 初始化app对象
 * @param {*} app app对象
 */
export default function registerApp(app) {
  app.use(registerVantComponent);
  app.use(registerProperties);
}

/**
 * 全局注册vant组件
 * @param {*} app app对象
 */
function registerVantComponent(app) {
  for(const component of components) {
    app.component(component.name, component)
  }
}

/**
 * 全局注册属性
 * @param {*} app app对象
 */
function registerProperties(app) {
  // 全局过滤器
  app.config.globalProperties.$filters = {
    prefix(url) {
      if (url && url.startsWith("http")) {
        return url;
      } else {
        url = `http://backend-api-01.newbee.ltd${url}`;
        return url;
      }
    },
  };
}
