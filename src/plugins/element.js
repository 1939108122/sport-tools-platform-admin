import Vue from 'vue'
import { Button } from 'element-ui'
import { Form,FormItem} from 'element-ui'
import { Input} from 'element-ui'
import { Container,Header,Aside,Main} from 'element-ui'
import { Menu,Submenu,MenuItemGroup,MenuItem} from 'element-ui'
import { Breadcrumb,BreadcrumbItem} from 'element-ui'
import { Card} from 'element-ui'
import { Row,Col} from 'element-ui'
import { Table,TableColumn} from 'element-ui'
import { Switch} from 'element-ui'
import { Pagination} from 'element-ui'
import { Dialog} from 'element-ui'
import { Tag,Cascader} from 'element-ui'
import { Alert,Steps,Step} from 'element-ui'
// 导入弹框信息组件
import {Message,MessageBox} from 'element-ui'
import {Tabs,TabPane} from 'element-ui'

import {Radio,RadioGroup} from 'element-ui'
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Tag)
Vue.use(Cascader)
Vue.use(Alert)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Radio)
Vue.use(RadioGroup)


//挂载弹框信息组件
Vue.prototype.$message=Message
Vue.prototype.$confirm=MessageBox