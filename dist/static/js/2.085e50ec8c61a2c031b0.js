webpackJsonp([2],{"9bBU":function(e,t,n){n("mClu");var a=n("FeBl").Object;e.exports=function(e,t,n){return a.defineProperty(e,t,n)}},C4MV:function(e,t,n){e.exports={default:n("9bBU"),__esModule:!0}},Fdun:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("bOdI"),r=n.n(a),i=(n("1onU"),n("cAgV")),l=n("jNdV"),s=n("0TK5"),o=n("mw3O"),u=n.n(o),c=n("FAPO"),m={directives:{waves:i.a},data:function(){return r()({roles:[],listQuery:{current:1,size:10,menuname:void 0},downloadLoading:!1,sortOptions:[{label:"激活",key:"1"},{label:"锁定",key:"0"}],listLoading:!1,list:[],tableKey:0,total:0,textMap:{update:"编辑",create:"新增"},dialogStatus:"",dialogFormVisible:!1,temp:[],multipleSelection:[],rules:{menuname:[{required:!0,message:"请输入菜单名",trigger:"blur"},{min:2,max:20,message:"长度在 2 到 20 个字符",trigger:"blur"}],component:[{required:!0,message:"请输入组件路径",trigger:"blur"},{min:2,max:30,message:"长度在 2 到 30 个字符",trigger:"blur"}],menuurl:[{required:!0,message:"请输入菜单类型",trigger:"blur"},{min:2,max:30,message:"长度在 2 到 30 个字符",trigger:"blur"}]},defaultProps:{children:"children",label:"menuname",value:"menuid"}},"temp",{menuid:"",menuname:"",menuurl:"",menutype:"M",parentid:"",menuicon:"",enable:"0",component:"",isframe:"1",ordernum:"999",visible:"0",perms:"",createby:"",createtime:"",updateby:"",remark:""})},created:function(){this.getMenuList(),this.getRoleList()},methods:{getRoleList:function(){var e=this;Object(l.g)().then(function(t){var n=t.data;0===n.code?e.roles=n.model.records:e.$message.error(n.msg)})},handleFilter:function(){this.listQuery.current=1,this.getMenuList()},getMenuList:function(){var e=this;this.listLoading=!0,Object(s.c)(u.a.stringify(this.listQuery)).then(function(t){var n=t.data;0==n.code?(e.list=e.getTreeData(n.model),e.listLoading=!1):e.$message.error(n.msg)}),setTimeout(function(){e.listLoading=!1},1500)},getTreeData:function(e){for(var t=0;t<e.length;t++)e[t].children.length<1?(1==e[t].enable&&(e[t].disabled=!0),e[t].children=void 0):this.getTreeData(e[t].children);return e},resetTemp:function(){this.temp={menuid:"",menuname:"",menuurl:"",menutype:"M",parentid:"",menuicon:"",enable:"0",component:"",isframe:"1",ordernum:"999",visible:"0",perms:"",createby:"",createtime:"",updateby:"",remark:""}},handleCreate:function(){var e=this;this.resetTemp(),this.dialogFormVisible=!0,this.dialogStatus="create",this.$nextTick(function(){e.$refs.dataForm.clearValidate()})},createData:function(){var e=this;this.$refs.dataForm.validate(function(t){if(t){var n=e.temp;n.parentid=n.parentid.toString(),Object(s.a)(u.a.stringify(n)).then(function(t){var n=t.data;0===n.code?(e.getMenuList(),e.dialogFormVisible=!1,e.$notify({title:"Success",message:"新增成功",type:"success",duration:2e3})):e.$message.error(n.msg)})}})},handleUpdate:function(e){var t=this;this.resetTemp(),this.temp.menuid=e.menuid,this.temp.menuurl=e.menuurl,this.temp.menuname=e.menuname,this.temp.menutype=e.menutype,this.temp.menuid=e.menuid,this.temp.parentid=e.parentid,this.temp.menuicon=e.menuicon,this.temp.enable=e.enable,this.temp.component=e.component,this.temp.isframe=e.isframe,this.temp.ordernum=e.ordernum,this.temp.visible=e.visible,this.temp.perms=e.perms,this.dialogStatus="update",this.dialogFormVisible=!0,this.$nextTick(function(){t.$refs.dataForm.clearValidate()})},updateData:function(){var e=this;this.$refs.dataForm.validate(function(t){if(t){var n=e.temp;n.parentid=n.parentid.toString(),Object(s.d)(u.a.stringify(n)).then(function(t){var n=t.data;0===n.code?(e.dialogFormVisible=!1,e.$notify({title:"Success",message:"更新成功",type:"success",duration:2e3}),e.handleFilter()):e.$message.error(n.msg)})}})},handleSelectionChange:function(e){this.multipleSelection=e},handleDeleteArr:function(){var e=[];for(var t in this.multipleSelection)e.push(this.multipleSelection[t].menuid);this.doDeleteReq(e)},handleDelete:function(e,t){var n=[];n.push(e.menuid),this.doDeleteReq(n)},doDeleteReq:function(e){var t=this;this.$confirm("若选中父节点,将删除其下所有子节点,是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(s.b)(u.a.stringify({menuIds:e.toString()})).then(function(e){var n=e.data;0===n.code?(t.multipleSelection=[],t.handleFilter(),t.$notify({title:"Success",message:"删除成功",type:"success",duration:2e3})):t.$message.error(n.msg)})}).catch(function(){})},resetButton:function(){this.listQuery={current:1,size:10,menuname:void 0},this.handleFilter()},checkPermission:c.a,handleDownload:function(){var e=this;this.downloadLoading=!0,n.e(20).then(n.bind(null,"zWO4")).then(function(t){var n=e.formatJson(["menuname","component","menuurl","menuicon","menutype","isframe","enable","visible","ordernum","perms","remark"]);t.export_json_to_excel({header:["菜单名","组件路径","路由路径","菜单图标","组件类型","外链","菜单停用状态","菜单显示状态","显示顺序","权限标识","备注"],data:n,filename:"table-list"}),e.downloadLoading=!1})},formatJson:function(e){return this.list.map(function(t){return e.map(function(e){return t[e]})})}}},d={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-main",[n("el-card",{staticStyle:{"min-height":"850px"}},[n("el-header",[n("div",{staticStyle:{height:"100%"},attrs:{align:"left"}},[n("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"模糊查找菜单名"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleFilter(t)}},model:{value:e.listQuery.menuname,callback:function(t){e.$set(e.listQuery,"menuname",t)},expression:"listQuery.menuname"}}),e._v(" "),n("el-button",{staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search",size:"small"},on:{click:e.handleFilter}},[e._v("\n                    查找\n                ")]),e._v(" "),n("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-edit",size:"small"},on:{click:e.resetButton}},[e._v("\n                    重置\n                ")])],1)]),e._v(" "),n("el-main",[n("div",{staticStyle:{height:"100%","line-height":"0px",padding:"5px"},attrs:{align:"left"}},[n("el-button",{attrs:{disabled:!e.checkPermission(["管理员","menu:add"]),type:"primary",size:"small"},on:{click:e.handleCreate}},[e._v("增加")]),e._v(" "),e.checkPermission(["管理员","menu:delete"])?n("el-button",{attrs:{type:"primary",disabled:0==this.multipleSelection.length,size:"small"},on:{click:e.handleDeleteArr}},[e._v("删除")]):e._e()],1),e._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],attrs:{data:e.list,"row-key":"menuid",border:"",fit:"","highlight-current-row":"","tree-props":{children:"children"}},on:{"selection-change":e.handleSelectionChange}},[n("el-table-column",{attrs:{fixed:"",type:"selection",width:"50px",align:"center"}}),e._v(" "),n("el-table-column",{attrs:{fixed:"",label:"菜单名",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[n("span",[e._v(e._s(a.menuname))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"组件路径",width:"160px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[n("span",[e._v(e._s(a.component))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"路由路径",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[n("span",[e._v(e._s(a.menuurl))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"菜单图标",width:"90px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[n("span",[e._v(e._s(a.menuicon))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"组件类型",width:"90px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[n("span",[e._v(e._s(a.menutype))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"外链",width:"90px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[n("span",[e._v(e._s(0==a.isframe?"是":"否"))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"菜单停用状态",width:"90px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[n("span",[e._v(e._s(0==a.enable?"正常":"停用"))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"菜单显示状态",width:"90px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[n("span",[e._v(e._s(0==a.visible?"显示":"隐藏"))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"显示顺序",width:"90px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[n("span",[e._v(e._s(a.ordernum))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"权限标识",width:"110px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[n("span",[e._v(e._s(a.perms))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"备注",width:"180px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[n("span",[e._v(e._s(a.remark))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"操作",align:"center",width:"270px","class-name":"small-padding fixed-width"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row,r=t.$index;return[n("el-button",{attrs:{disabled:!e.checkPermission(["管理员","menu:update"]),type:"primary",size:"mini"},on:{click:function(t){return e.handleUpdate(a)}}},[e._v("\n                    编辑\n                  ")]),e._v(" "),"deleted"!=a.status?n("el-button",{attrs:{disabled:!e.checkPermission(["管理员","menu:delete"]),size:"mini",type:"danger"},on:{click:function(t){return e.handleDelete(a,r)}}},[e._v("\n                    删除\n                  ")]):e._e()]}}])})],1),e._v(" "),n("el-dialog",{attrs:{"append-to-body":"","close-on-click-modal":!1,title:e.textMap[e.dialogStatus],visible:e.dialogFormVisible,width:"700px"},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[n("el-form",{ref:"dataForm",attrs:{inline:!0,model:e.temp,rules:e.rules,size:"small","label-width":"100px"}},[n("el-form-item",{attrs:{label:"菜单名",prop:"menuname"}},[n("el-input",{model:{value:e.temp.menuname,callback:function(t){e.$set(e.temp,"menuname",t)},expression:"temp.menuname"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"菜单图标"}},[n("el-input",{model:{value:e.temp.menuicon,callback:function(t){e.$set(e.temp,"menuicon",t)},expression:"temp.menuicon"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"路由地址"}},[n("el-input",{model:{value:e.temp.menuurl,callback:function(t){e.$set(e.temp,"menuurl",t)},expression:"temp.menuurl"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"菜单停用状态"}},[n("el-radio-group",{model:{value:e.temp.enable,callback:function(t){e.$set(e.temp,"enable",t)},expression:"temp.enable"}},[n("el-radio",{attrs:{label:"0"}},[e._v("正常")]),e._v(" "),n("el-radio",{attrs:{label:"1"}},[e._v("停用")])],1)],1),e._v(" "),n("el-form-item",{attrs:{label:"组件路径"}},[n("el-input",{model:{value:e.temp.component,callback:function(t){e.$set(e.temp,"component",t)},expression:"temp.component"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"菜单显示状态","label-width":"30"}},[n("el-radio-group",{model:{value:e.temp.visible,callback:function(t){e.$set(e.temp,"visible",t)},expression:"temp.visible"}},[n("el-radio",{attrs:{label:"0"}},[e._v("显示")]),e._v(" "),n("el-radio",{attrs:{label:"1"}},[e._v("隐藏")])],1)],1),e._v(" "),n("el-form-item",{attrs:{label:"权限标识"}},[n("el-input",{model:{value:e.temp.perms,callback:function(t){e.$set(e.temp,"perms",t)},expression:"temp.perms"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"是否外链"}},[n("el-radio-group",{model:{value:e.temp.isframe,callback:function(t){e.$set(e.temp,"isframe",t)},expression:"temp.isframe"}},[n("el-radio",{attrs:{label:"0"}},[e._v("是")]),e._v(" "),n("el-radio",{attrs:{label:"1"}},[e._v("否")])],1)],1),e._v(" "),n("el-form-item",{attrs:{label:"父菜单"}},[n("el-cascader",{staticStyle:{width:"185px"},attrs:{options:e.list,placeholder:"顶类菜单",props:{checkStrictly:!0,children:"children",label:"menuname",value:"menuid"},clearable:""},model:{value:e.temp.parentid,callback:function(t){e.$set(e.temp,"parentid",t)},expression:"temp.parentid"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"显示顺序"}},[n("el-input-number",{attrs:{"controls-position":"right",min:1},model:{value:e.temp.ordernum,callback:function(t){e.$set(e.temp,"ordernum",t)},expression:"temp.ordernum"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"菜单类型"}},[n("el-radio-group",{model:{value:e.temp.menutype,callback:function(t){e.$set(e.temp,"menutype",t)},expression:"temp.menutype"}},[n("el-radio",{attrs:{label:"M"}},[e._v("M目录")]),e._v(" "),n("el-radio",{attrs:{label:"C"}},[e._v("C菜单")]),e._v(" "),n("el-radio",{attrs:{label:"F"}},[e._v("F按钮")]),e._v(" "),n("el-radio",{attrs:{label:"I"}},[e._v("I接口")])],1)],1)],1),e._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("\n                  取消\n                ")]),e._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:function(t){"create"===e.dialogStatus?e.createData():e.updateData()}}},[e._v("\n                  确认\n                ")])],1)],1)],1)],1)],1)},staticRenderFns:[]},p=n("VU/8")(m,d,!1,null,null,null);t.default=p.exports},M4bu:function(e,t,n){(e.exports=n("FZ+f")(!0)).push([e.i,".waves-ripple {\r\n    position: absolute;\r\n    border-radius: 100%;\r\n    background-color: rgba(0, 0, 0, 0.15);\r\n    background-clip: padding-box;\r\n    pointer-events: none;\r\n    -webkit-user-select: none;\r\n    -moz-user-select: none;\r\n    -ms-user-select: none;\r\n    user-select: none;\r\n    -webkit-transform: scale(0);\r\n    transform: scale(0);\r\n    opacity: 1;\r\n}\r\n\r\n.waves-ripple.z-active {\r\n    opacity: 0;\r\n    -webkit-transform: scale(2);\r\n    transform: scale(2);\r\n    -webkit-transition: opacity 1.2s ease-out, -webkit-transform 0.6s ease-out;\r\n    transition: opacity 1.2s ease-out, -webkit-transform 0.6s ease-out;\r\n    transition: opacity 1.2s ease-out, transform 0.6s ease-out;\r\n    transition: opacity 1.2s ease-out, transform 0.6s ease-out, -webkit-transform 0.6s ease-out;\r\n}","",{version:3,sources:["C:/Users/Lenovo/Desktop/vue/src/directive/waves/C:/Users/Lenovo/Desktop/vue/waves.css"],names:[],mappings:"AAAA;IACI,mBAAmB;IACnB,oBAAoB;IACpB,sCAAsC;IACtC,6BAA6B;IAC7B,qBAAqB;IACrB,0BAA0B;IAC1B,uBAAuB;IACvB,sBAAsB;IACtB,kBAAkB;IAClB,4BAA4B;IAE5B,oBAAoB;IACpB,WAAW;CACd;;AAED;IACI,WAAW;IACX,4BAA4B;IAE5B,oBAAoB;IACpB,2EAA2E;IAC3E,mEAAmE;IACnE,2DAA2D;IAC3D,4FAA4F;CAC/F",file:"waves.css",sourcesContent:[".waves-ripple {\r\n    position: absolute;\r\n    border-radius: 100%;\r\n    background-color: rgba(0, 0, 0, 0.15);\r\n    background-clip: padding-box;\r\n    pointer-events: none;\r\n    -webkit-user-select: none;\r\n    -moz-user-select: none;\r\n    -ms-user-select: none;\r\n    user-select: none;\r\n    -webkit-transform: scale(0);\r\n    -ms-transform: scale(0);\r\n    transform: scale(0);\r\n    opacity: 1;\r\n}\r\n\r\n.waves-ripple.z-active {\r\n    opacity: 0;\r\n    -webkit-transform: scale(2);\r\n    -ms-transform: scale(2);\r\n    transform: scale(2);\r\n    -webkit-transition: opacity 1.2s ease-out, -webkit-transform 0.6s ease-out;\r\n    transition: opacity 1.2s ease-out, -webkit-transform 0.6s ease-out;\r\n    transition: opacity 1.2s ease-out, transform 0.6s ease-out;\r\n    transition: opacity 1.2s ease-out, transform 0.6s ease-out, -webkit-transform 0.6s ease-out;\r\n}"],sourceRoot:""}])},bOdI:function(e,t,n){"use strict";t.__esModule=!0;var a,r=n("C4MV"),i=(a=r)&&a.__esModule?a:{default:a};t.default=function(e,t,n){return t in e?(0,i.default)(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}},cAgV:function(e,t,n){"use strict";var a=n("woOf"),r=n.n(a),i=(n("ctMr"),"@@wavesContext");function l(e,t){function n(n){var a=r()({},t.value),i=r()({ele:e,type:"hit",color:"rgba(0, 0, 0, 0.15)"},a),l=i.ele;if(l){l.style.position="relative",l.style.overflow="hidden";var s=l.getBoundingClientRect(),o=l.querySelector(".waves-ripple");switch(o?o.className="waves-ripple":((o=document.createElement("span")).className="waves-ripple",o.style.height=o.style.width=Math.max(s.width,s.height)+"px",l.appendChild(o)),i.type){case"center":o.style.top=s.height/2-o.offsetHeight/2+"px",o.style.left=s.width/2-o.offsetWidth/2+"px";break;default:o.style.top=(n.pageY-s.top-o.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",o.style.left=(n.pageX-s.left-o.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return o.style.backgroundColor=i.color,o.className="waves-ripple z-active",!1}}return e[i]?e[i].removeHandle=n:e[i]={removeHandle:n},n}var s={bind:function(e,t){e.addEventListener("click",l(e,t),!1)},update:function(e,t){e.removeEventListener("click",e[i].removeHandle,!1),e.addEventListener("click",l(e,t),!1)},unbind:function(e){e.removeEventListener("click",e[i].removeHandle,!1),e[i]=null,delete e[i]}},o=function(e){e.directive("waves",s)};window.Vue&&(window.waves=s,Vue.use(o)),s.install=o;t.a=s},ctMr:function(e,t,n){var a=n("M4bu");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);n("rjj0")("a7c9def6",a,!0)},mClu:function(e,t,n){var a=n("kM2E");a(a.S+a.F*!n("+E39"),"Object",{defineProperty:n("evD5").f})}});