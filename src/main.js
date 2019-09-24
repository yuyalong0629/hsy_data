import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './core/use'
import './utils/filter'

import {
  Avatar,
  Button,
  BackTop,
  Badge,
  Col,
  Card,
  Comment,
  Divider,
  Dropdown,
  DatePicker,
  Form,
  Input,
  Icon,
  List,
  Layout,
  LocaleProvider,
  Menu,
  Modal,
  message,
  notification,
  Popover,
  Pagination,
  Row,
  Radio,
  Select,
  Skeleton,
  Spin,
  Table,
  Tabs,
  Tag,
  Tooltip,
  TimePicker
} from 'ant-design-vue'

Vue.config.productionTip = false

Vue.use(Avatar)
Vue.use(BackTop)
Vue.use(Badge)
Vue.use(Button)
Vue.use(Col)
Vue.use(Card)
Vue.use(Comment)
Vue.use(Divider)
Vue.use(Dropdown)
Vue.use(Dropdown)
Vue.use(DatePicker)
Vue.use(Form)
Vue.use(Icon)
Vue.use(List)
Vue.use(Layout)
Vue.use(LocaleProvider)
Vue.use(Input)
Vue.use(Menu)
Vue.use(Modal)
Vue.use(Popover)
Vue.use(Pagination)
Vue.use(Row)
Vue.use(Radio)
Vue.use(Spin)
Vue.use(Table)
Vue.use(Tabs)
Vue.use(Select)
Vue.use(Skeleton)
Vue.use(Tag)
Vue.use(Tooltip)
Vue.use(TimePicker)

Vue.prototype.$message = message
Vue.prototype.$confirm = Modal.confirm
Vue.prototype.$notification = notification

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
