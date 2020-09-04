import Vue from 'vue'
import App from './App.vue'
import router from './router'

import './assets/css/reset.css'
import './assets/css/common.css'

// import Dialog from './components/dialog'
import Loading from './components/loading'
import toast from './components/toast'

import './utils/plugin'
import './utils/FastClick'
import utils from './utils/utils'
import VueScroller from 'vue-scroller'
import { get, post } from './utils/ajax'

import {
  Button,
  Image as VanImage,
  Cell,
  CellGroup,
  Field,
  RadioGroup,
  Radio,
  Form,
  Checkbox,
  CheckboxGroup,
  Notify,
  Dialog,
  List,
  Search,
  Area,
  AddressEdit,
  Popup,
  NumberKeyboard,
  Toast
} from 'vant'

Vue.use(Button)
  .use(VanImage)
  .use(Cell)
  .use(CellGroup)
  .use(Field)
  .use(RadioGroup)
  .use(Radio)
  .use(Form)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Notify)
  .use(Dialog)
  .use(List)
  .use(Search)
  .use(Area)
  .use(AddressEdit)
  .use(Popup)
  .use(NumberKeyboard)

Vue.use(Toast)

Vue.use(utils)
/* Vue.use(vConsole) // 是否开启vconsole */

Vue.use(VueScroller)
Vue.use(utils)

// Vue.prototype.$dialog = Dialog
Vue.prototype.$loading = Loading
Vue.prototype.$toast = toast
Vue.prototype.$http = { get, post }

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  const userInfo = sessionStorage.getItem('userInfo') || null
  if (!userInfo && to.meta.auth) {
    next('/login')
  } else {
    next()
  }
})

export default new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
