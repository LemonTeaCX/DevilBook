webpackJsonp([1],{Hw0h:function(e,t){},MAdp:function(e,t){},NHnr:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r("7+uW"),n={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},staticRenderFns:[]};var s=r("VU/8")({name:"App"},n,!1,function(e){r("beYi")},null,null).exports,o=r("/ocq"),i=r("Dd8w"),l=r.n(i),c=r("NYxO"),u=r("yt7g"),m=u.a.setCookie,d={name:"Index",data:function(){return{}},mounted:function(){this.$store.dispatch("getMenu")},computed:l()({},Object(c.b)(["userInfo"])),methods:{selectMenu:function(e){this.$router.push(e.path)},userCommand:function(e){switch(e){case"loginOut":this.loginOut()}},loginOut:function(){window.localStorage.setItem("userInfo",""),m("token",""),this.$router.push("/login")}}},p={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"main"},[r("div",{staticClass:"main-left"},[r("div",{staticClass:"logo"},[e._v("logo")]),e._v(" "),r("div",{staticClass:"menu"},[r("el-menu",{attrs:{"background-color":"#202427","text-color":"#fff","active-text-color":"#ffd04b"}},e._l(e.$store.state.menu,function(t,a){return r("el-submenu",{key:t.id,attrs:{index:t.id+""}},[r("template",{slot:"title"},[r("i",{class:t.icon}),e._v(" "),r("span",[e._v(e._s(t.menu))])]),e._v(" "),e._l(t.nodes,function(t,a){return r("el-menu-item-group",{key:t.id},[r("el-menu-item",{attrs:{index:t.id+""},on:{click:function(r){return e.selectMenu(t)}}},[e._v(e._s(t.menu))])],1)})],2)}),1)],1)]),e._v(" "),r("div",{staticClass:"main-right"},[r("div",{staticClass:"main-nav"},[r("div",{staticClass:"menu-nav"},[e._v("\n        首頁\n      ")]),e._v(" "),r("div",{staticClass:"nav-space"}),e._v(" "),r("div",{staticClass:"user-wrap"},[r("el-dropdown",{on:{command:e.userCommand}},[r("span",{staticClass:"el-dropdown-link"},[e._v("\n            "+e._s(e.userInfo.username)),r("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),e._v(" "),r("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[r("el-dropdown-item",[r("i",{staticClass:"el-icon-edit-outline"}),e._v(" 修改密码")]),e._v(" "),r("el-dropdown-item",{attrs:{divided:"",command:"loginOut"}},[r("i",{staticClass:"el-icon-back"}),e._v(" 退出登录")])],1)],1)],1),e._v(" "),e._m(0)]),e._v(" "),r("div",{staticClass:"main-page"},[r("router-view")],1)])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"message"},[t("i",{staticClass:"el-icon-bell"})])}]};var g=r("VU/8")(d,p,!1,function(e){r("MAdp")},null,null).exports,f=r("//Fk"),v=r.n(f),h=r("Xxa5"),b=r.n(h),_=r("mvHQ"),w=r.n(_),k=r("exGp"),x=r.n(k),F=r("woOf"),y=r.n(F),C=r("mtWM"),$=r.n(C),z=r("mw3O"),L=r.n(z),q=r("Zrlr"),I=r.n(q),S=r("wxAW"),E=r.n(S),O=r("zL8q"),N=r.n(O),M=function(){function e(t){I()(this,e),this.config=y()({text:"加载中",background:"rgba(0, 0, 0, 0.8)"},t),this.loadingInstance=null}return E()(e,[{key:"startLoading",value:function(){this.loadingInstance=O.Loading.service(this.config)}},{key:"endLoading",value:function(){this.loadingInstance&&this.loadingInstance.close()}}]),e}(),V=u.a.getCookie,P=new M;function j(e){return new v.a(function(t,r){var a=y()({method:"get",headers:{"Content-Type":"application/x-www-form-urlencoded","Auth-Token":V("token")}},e);a.data=L.a.stringify(a.data),$()(a).then(function(e){t(e)}).catch(function(e){r(e)})})}$.a.defaults.timeout=3e4,$.a.defaults.baseURL="http://localhost:3000",$.a.defaults.withCredentials=!0,$.a.interceptors.request.use(function(e){return e.loading&&P.startLoading(),e},function(e){return v.a.reject(err)}),$.a.interceptors.response.use(function(e){return P.endLoading(),e.data},function(e){return P.endLoading(),e.response&&401===e.response.status&&Object(O.Message)({message:"登录过期，请重新登录",type:"error",onClose:function(){ee.replace({path:"/login",query:{redirect:ee.currentRoute.path}})}}),v.a.reject(e)});var A=function(e){return j({url:"/api/getAccountList",method:"post",data:e})},R=u.a.setCookie,U={name:"Login",data:function(){return{loginBtnLoading:!1,loginForm:{user:"",password:""},rules:{user:[{required:!0,message:"请输入用户名或手机",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"}]}}},methods:{login:function(){var e=this;return x()(b.a.mark(function t(){var r,a,n;return b.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return r=e,t.next=3,e.validForm();case 3:if(t.sent){t.next=6;break}return t.abrupt("return");case 6:return e.loginBtnLoading=!0,t.next=9,j({url:"/api/login",method:"post",data:r.loginForm});case 9:a=t.sent,(n=a.result)||(e.loginBtnLoading=!1),r.$message({message:a.msg,type:n?"success":"error",onClose:function(e){n&&(r.$router.push("/"),R("token",a.token),window.localStorage.setItem("userInfo",w()(a.data)||""))}});case 13:case"end":return t.stop()}},t,e)}))()},validForm:function(){var e=this;return new v.a(function(t,r){e.$refs.loginForm.validate(function(e){return t(e)})})},register:function(){this.$router.push("/register")}}},H={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"login"},[r("el-row",{staticClass:"login-nav"}),e._v(" "),r("el-row",[r("el-col",{staticClass:"login-main",attrs:{offset:6,span:12}},[r("el-row",[r("el-col",{attrs:{span:14}},[r("div",{staticClass:"login-desc"},[e._v("this is 描述")])]),e._v(" "),r("el-col",{attrs:{span:10}},[r("el-form",{ref:"loginForm",staticClass:"login-box",attrs:{model:e.loginForm,rules:e.rules}},[r("el-form-item",{attrs:{prop:"user"}},[r("div",[e._v("Username")]),e._v(" "),r("el-input",{attrs:{placeholder:"请输入用户名或手机"},model:{value:e.loginForm.user,callback:function(t){e.$set(e.loginForm,"user",t)},expression:"loginForm.user"}})],1),e._v(" "),r("el-form-item",{attrs:{prop:"password"}},[r("div",[e._v("Password")]),e._v(" "),r("el-input",{attrs:{placeholder:"请输入密码"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.login(t)}},model:{value:e.loginForm.password,callback:function(t){e.$set(e.loginForm,"password",t)},expression:"loginForm.password"}})],1),e._v(" "),r("el-row",{staticClass:"login-else"},[r("el-col",{attrs:{span:12}},[r("el-button",{attrs:{type:"text"}},[e._v("忘记密码")])],1),e._v(" "),r("el-col",{staticClass:"tar",attrs:{span:12}},[r("el-button",{attrs:{type:"text"},on:{click:e.register}},[e._v("注册")])],1)],1),e._v(" "),r("el-button",{staticClass:"login-btn",attrs:{type:"success",disabled:e.loginBtnLoading,loading:e.loginBtnLoading},on:{click:e.login}},[e._v("登录")])],1)],1)],1)],1)],1)],1)},staticRenderFns:[]};var T=r("VU/8")(U,H,!1,function(e){r("TzY4")},null,null).exports,D=function(e,t,r){if(!t)return r(new Error("手机号为空"));if(!/^1[3|4|5|7|8][0-9]\d{8}$/.test(t))return r(new Error("请输入正确的手机号2"));r()},B={name:"register",data:function(){var e=this;return{formName:"formEle",registerForm:{username:"",password:"",checkPassword:"",phone:"",email:"",sex:"1",remark:""},rules:{username:[{required:!0,message:"请输入账号名称",trigger:"blur"},{min:3,max:10,message:"长度在 3 到 10 个字符",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"},{validator:function(t,r,a){if(""===r)return a(new Error("请输入密码"));""!==e.registerForm.checkPassword&&e.$refs[e.formName].validateField("checkPass"),a()},trigger:"blur"}],checkPassword:[{required:!0,message:"请再次输入密码",trigger:"blur"},{validator:function(t,r,a){return""===r?a(new Error("请再次输入密码")):r!==e.registerForm.password?a(new Error("两次输入密码不一致!")):void a()},trigger:"blur"}],phone:[{required:!0,message:"请输入手机号码",trigger:"blur"},{validator:D,message:"请输入正确的手机号码1",trigger:"blur"}],email:[{required:!1,message:"请输入邮箱",trigger:"blur"},{type:"email",message:"请输入正确的邮箱地址",trigger:"blur"}],sex:[{required:!0,message:"请选择性别",trigger:"change"}],remark:[{required:!1,message:"请填写备注信息",trigger:"blur"}]}}},methods:{submitForm:function(){var e=this;return x()(b.a.mark(function t(){var r,a,n;return b.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return r=e,t.next=3,r.validForm();case 3:if(t.sent){t.next=6;break}return t.abrupt("return");case 6:return t.next=8,j({url:"/api/register",method:"post",data:r.registerForm});case 8:a=t.sent,n=a.result,r.$message({message:a.msg,type:n?"success":"error",onClose:function(e){n&&r.$router.push("/login")}});case 11:case"end":return t.stop()}},t,e)}))()},resetForm:function(){this.$refs[this.formName].resetFields()},validForm:function(){var e=this;return new v.a(function(t,r){e.$refs[e.formName].validate(function(e){return t(e)})})}}},J={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"register"},[r("el-row",{staticClass:"register-nav"}),e._v(" "),r("el-row",[r("el-col",{staticClass:"register-main",attrs:{offset:6,span:12}},[r("h1",[e._v("join us")]),e._v(" "),r("el-row",[r("el-form",{ref:e.formName,attrs:{model:e.registerForm,rules:e.rules,"label-width":"100px"}},[r("el-form-item",{attrs:{label:"用户名",prop:"username"}},[r("el-col",{attrs:{span:6}},[r("el-input",{attrs:{clearable:""},model:{value:e.registerForm.username,callback:function(t){e.$set(e.registerForm,"username",t)},expression:"registerForm.username"}})],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"密码",prop:"password"}},[r("el-col",{attrs:{span:6}},[r("el-input",{attrs:{type:"password",clearable:""},model:{value:e.registerForm.password,callback:function(t){e.$set(e.registerForm,"password",t)},expression:"registerForm.password"}})],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"确认密码",prop:"checkPassword"}},[r("el-col",{attrs:{span:6}},[r("el-input",{attrs:{type:"password",clearable:""},model:{value:e.registerForm.checkPassword,callback:function(t){e.$set(e.registerForm,"checkPassword",t)},expression:"registerForm.checkPassword"}})],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"手机号",prop:"phone"}},[r("el-col",{attrs:{span:6}},[r("el-input",{attrs:{clearable:""},model:{value:e.registerForm.phone,callback:function(t){e.$set(e.registerForm,"phone",t)},expression:"registerForm.phone"}})],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"邮箱",prop:"email"}},[r("el-col",{attrs:{span:6}},[r("el-input",{attrs:{clearable:""},model:{value:e.registerForm.email,callback:function(t){e.$set(e.registerForm,"email",t)},expression:"registerForm.email"}})],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"性别",prop:"sex"}},[r("el-radio-group",{model:{value:e.registerForm.sex,callback:function(t){e.$set(e.registerForm,"sex",t)},expression:"registerForm.sex"}},[r("el-radio",{attrs:{label:"1"}},[e._v("男")]),e._v(" "),r("el-radio",{attrs:{label:"2"}},[e._v("女")])],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"备注",prop:"remark"}},[r("el-col",{attrs:{span:12}},[r("el-input",{attrs:{type:"textarea"},model:{value:e.registerForm.remark,callback:function(t){e.$set(e.registerForm,"remark",t)},expression:"registerForm.remark"}})],1)],1),e._v(" "),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:e.submitForm}},[e._v("注册")]),e._v(" "),r("el-button",{on:{click:e.resetForm}},[e._v("重置")])],1)],1)],1)],1)],1)],1)},staticRenderFns:[]};var Y=r("VU/8")(B,J,!1,function(e){r("Hw0h")},null,null).exports,G={name:"account",data:function(){return{searchVal:"",pageIndex:1,pageSize:5,pageSizes:[5,10,20,50,100],tableData:[],total:0}},mounted:function(){this.searchList()},computed:{tableHeight:function(){return 300}},methods:{searchList:function(e){var t=this;return x()(b.a.mark(function r(){var a;return b.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return e=y()({searchVal:t.searchVal,pageIndex:t.pageIndex,pageSize:t.pageSize},e),r.next=3,A(e);case 3:a=r.sent,t.tableData=a.data.list,t.total=a.data.total;case 6:case"end":return r.stop()}},r,t)}))()},handleSizeChange:function(e){this.pageSize=e,this.searchList()},handleCurrentChange:function(e){this.pageIndex=e,this.searchList()},handleEdit:function(e,t){console.log(e,t)},handleDelete:function(e,t){console.log(e,t)}}},W={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"erp-table account"},[r("el-row",{staticClass:"form-box"},[r("el-col",{attrs:{span:12}},[r("el-row",{attrs:{gutter:12}},[r("el-col",{attrs:{span:8}},[r("el-input",{attrs:{placeholder:"请输入搜索内容","prefix-icon":"el-icon-search",size:"small",clearable:""},model:{value:e.searchVal,callback:function(t){e.searchVal=t},expression:"searchVal"}})],1),e._v(" "),r("el-col",{attrs:{span:4}},[r("el-button",{attrs:{size:"small",type:"primary",plain:"",icon:"el-icon-search"},on:{click:function(t){return e.searchList()}}},[e._v("搜索")])],1)],1)],1),e._v(" "),r("el-col",{attrs:{span:12}},[r("el-row",{attrs:{type:"flex",justify:"end"}},[r("el-button",{attrs:{size:"small",type:"primary"}},[e._v("添加")]),e._v(" "),r("el-button",{attrs:{size:"small",type:"danger"}},[e._v("删除")])],1)],1)],1),e._v(" "),r("el-row",{staticClass:"tip-box"},[r("el-alert",{attrs:{title:"这里是温馨提示信息",type:"warning","show-icon":"",closable:!1}})],1),e._v(" "),r("el-row",{staticClass:"table-box"},[r("el-table",{attrs:{data:e.tableData,height:e.tableHeight,border:"","highlight-current-row":""}},[r("el-table-column",{attrs:{type:"selection",width:"55"}}),e._v(" "),r("el-table-column",{attrs:{prop:"name",label:"姓名"}}),e._v(" "),r("el-table-column",{attrs:{prop:"email",label:"邮箱"}}),e._v(" "),r("el-table-column",{attrs:{prop:"status",label:"是否激活"}}),e._v(" "),r("el-table-column",{attrs:{prop:"auth",label:"权限"}}),e._v(" "),r("el-table-column",{attrs:{prop:"role",label:"角色"}}),e._v(" "),r("el-table-column",{attrs:{prop:"remark",label:"备注","show-overflow-tooltip":""}}),e._v(" "),r("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{attrs:{size:"mini"},on:{click:function(r){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),r("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(r){return e.handleDelete(t.$index,t.row)}}},[e._v("删除")])]}}])})],1),e._v(" "),r("el-pagination",{attrs:{"current-page":e.pageIndex,"page-size":e.pageSize,"page-sizes":e.pageSizes,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)},staticRenderFns:[]};var Q=r("VU/8")(G,W,!1,function(e){r("nGS0")},null,null).exports,X={name:"user",data:function(){return{formName:"formEle",editForm:{name:"",email:"",status:!1,auth:[],role:"",remark:""},rules:{name:[{required:!0,message:"请输入账号名称",trigger:"blur"},{min:3,max:10,message:"长度在 3 到 10 个字符",trigger:"blur"}],email:[{required:!0,message:"请输入邮箱",trigger:"blur"},{type:"email",message:"请输入正确的邮箱地址",trigger:"blur"}],auth:[{type:"array",required:!0,message:"请至少选择一个用户权限",trigger:"change"}],role:[{required:!0,message:"请选择用户角色",trigger:"change"}],remark:[{required:!1,message:"请填写备注信息",trigger:"blur"}]}}},methods:{submitForm:function(){var e=this;this.$refs[this.formName].validate(function(t){if(!t)return console.log("error submit!!"),!1;console.log(e.editForm)})},resetForm:function(){this.$refs[this.formName].resetFields()}}},Z={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"edit-wrap"},[r("div",{staticClass:"edit-box"},[r("div",{staticClass:"header"},[e._v("添加用户账号")]),e._v(" "),r("div",{staticClass:"contant"},[r("el-form",{ref:e.formName,attrs:{model:e.editForm,rules:e.rules,size:"small","label-width":"100px"}},[r("el-form-item",{attrs:{label:"姓名",prop:"name"}},[r("el-col",{attrs:{span:6}},[r("el-input",{attrs:{clearable:""},model:{value:e.editForm.name,callback:function(t){e.$set(e.editForm,"name",t)},expression:"editForm.name"}})],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"邮箱",prop:"email"}},[r("el-col",{attrs:{span:6}},[r("el-input",{attrs:{clearable:""},model:{value:e.editForm.email,callback:function(t){e.$set(e.editForm,"email",t)},expression:"editForm.email"}})],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"账号状态",prop:"status"}},[r("el-switch",{model:{value:e.editForm.status,callback:function(t){e.$set(e.editForm,"status",t)},expression:"editForm.status"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"用户权限",prop:"auth"}},[r("el-checkbox-group",{model:{value:e.editForm.auth,callback:function(t){e.$set(e.editForm,"auth",t)},expression:"editForm.auth"}},[r("el-checkbox",{attrs:{label:"1"}},[e._v("餐厅线上活动")]),e._v(" "),r("el-checkbox",{attrs:{label:"2"}},[e._v("地推活动")]),e._v(" "),r("el-checkbox",{attrs:{label:"3"}},[e._v("线下主题活动")]),e._v(" "),r("el-checkbox",{attrs:{label:"4"}},[e._v("单纯品牌曝光")])],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"用户角色",prop:"role"}},[r("el-radio-group",{model:{value:e.editForm.role,callback:function(t){e.$set(e.editForm,"role",t)},expression:"editForm.role"}},[r("el-radio",{attrs:{label:"1"}},[e._v("线上品牌商赞助")]),e._v(" "),r("el-radio",{attrs:{label:"2"}},[e._v("线下场地免费")])],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"备注",prop:"remark"}},[r("el-col",{attrs:{span:12}},[r("el-input",{attrs:{type:"textarea"},model:{value:e.editForm.remark,callback:function(t){e.$set(e.editForm,"remark",t)},expression:"editForm.remark"}})],1)],1),e._v(" "),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:e.submitForm}},[e._v("立即添加")]),e._v(" "),r("el-button",{on:{click:e.resetForm}},[e._v("重置")])],1)],1)],1)])])},staticRenderFns:[]};var K=r("VU/8")(X,Z,!1,function(e){r("ra9/")},null,null).exports;a.default.use(o.a);var ee=new o.a({routes:[{path:"/",component:g,children:[{path:"/system/account",component:Q},{path:"/system/auth",component:K}]},{path:"/login",component:T},{path:"/register",component:Y}]}),te=r("bOdI"),re=r.n(te)()({},"get_menu",function(e,t){var r=t.menu;e.menu=r}),ae={getMenu:function(e){var t=this,r=e.commit;return x()(b.a.mark(function e(){var a;return b.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,j({url:"/api/getMenu",method:"post",loading:!0});case 2:a=e.sent,r("get_menu",{menu:a.data});case 4:case"end":return e.stop()}},e,t)}))()}},ne={userInfo:function(e,t){return JSON.parse(window.localStorage.getItem("userInfo"))||{}}};a.default.use(c.a);var se=new c.a.Store({state:{menu:[]},mutations:re,actions:ae,getters:ne});r("tvR6");r("qs/E"),a.default.config.productionTip=!1,a.default.use(N.a),new a.default({el:"#app",router:ee,store:se,components:{App:s},template:"<App/>"})},TzY4:function(e,t){},beYi:function(e,t){},nGS0:function(e,t){},"qs/E":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r("woOf"),n=r.n(a),s=r("zNUS"),o=r.n(s),i=r("yt7g");o.a.setup({timeout:1e3});var l=i.a.copyJson,c={data:{},msg:"",result:"success"},u=function(e){for(var t=arguments.length,r=Array(t>1?t-1:0),a=1;a<t;a++)r[a-1]=arguments[a];return n.a.apply(Object,[l(c),e].concat(r))};o.a.mock("http://localhost:3000/api/getMenu","post",u({data:[{id:1,menu:"系统",icon:"el-icon-location",nodes:[{id:4,parent_id:1,menu:"账号管理",path:"/system/account"},{id:5,parent_id:1,menu:"权限管理",path:"/system/auth"}]},{id:2,menu:"菜单2",icon:"el-icon-menu"},{id:3,menu:"菜单3",icon:"el-icon-document"}]})),o.a.mock("http://localhost:3000/api/getAccountList","post",u({data:{"list|3-20":[{"id|+1":1,name:"@cname",email:"@email","status|1":!1,auth:["权限1","权限2","权限3"],"role|1":["超级管理员","普通用户"],remark:"@sentence"}],"total|20-100":1}}))},"ra9/":function(e,t){},tvR6:function(e,t){},yt7g:function(e,t,r){"use strict";var a=r("mvHQ"),n=r.n(a);t.a={copyJson:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return JSON.parse(n()(e))},getCookie:function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=document.cookie.split(";"),r=t.length-1;r>=0;r--){var a=t[r].trim();if(0===a.indexOf(e))return a.substring(e.length+1,a.length)}return""},setCookie:function(e,t,r){var a=new Date;a.setTime(a.getTime()+24*r*60*60*1e3);var n="expires="+a.toGMTString();document.cookie=e+"="+t+"; "+n}}}},["NHnr"]);
//# sourceMappingURL=app.ee4614ac049da0e36bfe.js.map