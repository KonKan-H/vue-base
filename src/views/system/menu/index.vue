<template>
    <el-main>
            <!-- 右页面表单 -->
            <el-card style="min-height: 850px;">
               <el-header>
                  <div style="height: 100%; " align='left'>
                    <el-input v-model="listQuery.menuname" placeholder="模糊查找菜单名" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    <!-- <el-select v-model="listQuery.ele2" placeholder="Imp" clearable style="width: 90px" class="filter-item">
                        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
                    </el-select> -->
                    <!-- <el-select v-model="listQuery.type" placeholder="Type" clearable class="filter-item" style="width: 130px">
                        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />
                    </el-select> -->
                    <!-- <el-select v-model="listQuery.status" style="width: 140px" class="filter-item" @change="handleFilter">
                        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
                    </el-select> -->
                    <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter" size="small">
                        查找
                    </el-button>
                   <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" size="small" @click="resetButton">
                        重置
                    </el-button>
                    <!-- <el-button :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload" size="small">
                        导出
                    </el-button> -->
                    <!-- <el-checkbox v-model="showReviewer" class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">
                        reviewer
                    </el-checkbox> -->
                </div>
               </el-header>
                <el-main>
                  <div align='left' style="height: 100%; line-height: 0px; padding:5px">
                   <el-button :disabled="!checkPermission(['管理员', 'menu:add'])" type="primary" @click="handleCreate" size="small">增加</el-button>
                   <!-- <el-button type="primary" :disabled="this.multipleSelection.length == 0">修改</el-button> -->
                   <el-button v-if="checkPermission(['管理员', 'menu:delete'])" type="primary" :disabled="this.multipleSelection.length == 0" @click="handleDeleteArr" size="small">删除</el-button>
                   <!-- <el-button type="primary">默认按钮</el-button> -->
                  </div>
                 
                <!-- </el-table> -->
                <el-table
                    :data="list"
                    row-key="menuid"
                    v-loading="listLoading"
                    border
                    fit
                    highlight-current-row
                    @selection-change="handleSelectionChange"
                    :tree-props="{children: 'children', }">
                <el-table-column fixed type="selection" width="50px" align="center" > </el-table-column>
                <el-table-column fixed label="菜单名" width="150px" align="center">
                    <template slot-scope="{row}">
                      <span>{{ row.menuname }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="组件路径" width="160px" align="center">
                    <template slot-scope="{row}">
                      <span>{{ row.component }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="路由路径" width="150px" align="center">
                    <template slot-scope="{row}">
                      <span>{{ row.menuurl }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="菜单图标" width="90px" align="center">
                    <template slot-scope="{row}">
                      <span>{{ row.menuicon }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="组件类型" width="90px" align="center">
                    <template slot-scope="{row}">
                      <span>{{ row.menutype }}</span>
                    </template>
                </el-table-column>
                 <el-table-column label="外链" width="90px" align="center">
                    <template slot-scope="{row}">
                      <span>{{ row.isframe == 0 ? '是':'否' }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="菜单停用状态" width="90px" align="center">
                    <template slot-scope="{row}">
                      <span>{{ row.enable == 0 ? '正常' : '停用' }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="菜单显示状态" width="90px" align="center">
                    <template slot-scope="{row}">
                      <span>{{ row.visible == 0 ? '显示':'隐藏' }}</span>
                    </template>
                </el-table-column>
                 <el-table-column label="显示顺序" width="90px" align="center">
                    <template slot-scope="{row}">
                      <span>{{ row.ordernum }}</span>
                    </template>
                </el-table-column>
                 <el-table-column label="权限标识" width="110px" align="center">
                    <template slot-scope="{row}">
                      <span>{{ row.perms }}</span>
                    </template>
                </el-table-column>
                 <!-- <el-table-column label="创建者" width="90px" align="center">
                    <template slot-scope="{row}">
                      <span>{{ row.createby }}</span>
                    </template>
                </el-table-column>
                 <el-table-column label="更新者" width="90px" align="center">
                    <template slot-scope="{row}">
                      <span>{{ row.updateby }}</span>
                    </template>
                </el-table-column> -->
                <!-- <el-table-column label="菜单状态" class-name="status-col" width="120px" align="center"> 
                    <template slot-scope="{row}">
                      <el-tooltip :content="'当前：' + (row.status === '0' ? '激活':'锁定') + '状态'" placement="top">
                        <el-switch
                          v-model="row.enable"
                          active-color="#13ce66"
                          inactive-color="#ff4949"
                          active-value="0"
                          inactive-value="1"
                          @change="changeEnabled(row, row.enable)">
                        </el-switch>
                      </el-tooltip>
                    </template>
                </el-table-column> -->
                 <!-- <el-table-column label="创建日期" width="170px" align="center">
                    <template slot-scope="{row}">
                      <span>{{ row.createTime }}</span>
                    </template>
                </el-table-column>
                 <el-table-column label="更新日期" width="170px" align="center">
                    <template slot-scope="{row}">
                      <span>{{ row.updateTime }}</span>
                    </template>
                </el-table-column> -->
                <el-table-column label="备注" width="180px" align="center">
                    <template slot-scope="{row}">
                      <span>{{ row.remark }}</span>
                    </template>
                </el-table-column>
                 <el-table-column label="操作" align="center" width="270px" class-name="small-padding fixed-width">
                    <template slot-scope="{row,$index}">
                      <el-button :disabled="!checkPermission(['管理员', 'menu:update'])" type="primary" size="mini" @click="handleUpdate(row)">
                        编辑
                      </el-button>
                      <el-button :disabled="!checkPermission(['管理员', 'menu:delete'])" v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
                        删除
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <!-- <pagination v-show="total>0" :total="total" :page.sync="listQuery.current" :limit.sync="listQuery.size" @pagination="getMenuList" /> -->

                <el-dialog append-to-body :close-on-click-modal="false" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="700px">
                  <el-form :inline="true" ref="dataForm" :model="temp" :rules="rules" size="small" label-width="100px"> 
                   <el-form-item label="菜单名" prop="menuname">
                    <el-input v-model="temp.menuname" />
                  </el-form-item>
                   <el-form-item label="菜单图标">
                    <el-input v-model="temp.menuicon" />
                  </el-form-item>
                   <!-- <el-form-item  label="菜单图标" prop="icon">
                    <el-popover
                        placement="bottom-start"
                        width="450"
                        trigger="click"
                        @show="$refs['iconSelect'].reset()"
                    >
                        <IconSelect ref="iconSelect" @selected="selected" />
                        <el-input slot="reference" v-model="temp.menuicon" style="width: 450px;" placeholder="点击选择图标" readonly>
                        <svg-icon v-if="form.menuicon" slot="prefix" :icon-class="form.menuicon" class="el-input__icon" style="height: 32px;width: 16px;" />
                        <i v-else slot="prefix" class="el-icon-search el-input__icon" />
                        </el-input>
                    </el-popover>
                    </el-form-item> -->
                  <el-form-item label="路由地址">
                    <el-input v-model="temp.menuurl" />
                  </el-form-item>
                   
                  <el-form-item label="菜单停用状态">
                    <el-radio-group v-model="temp.enable">
                      <el-radio label="0">正常</el-radio>
                      <el-radio label="1">停用</el-radio>
                    </el-radio-group>
                  </el-form-item>
                 
                   <el-form-item label="组件路径" >
                    <el-input v-model="temp.component" />
                  </el-form-item>
                 <el-form-item label="菜单显示状态" label-width="30">
                     <!-- <el-input v-model="temp.visible"/> -->
                   <el-radio-group v-model="temp.visible">
                      <el-radio label="0">显示</el-radio>
                      <el-radio label="1">隐藏</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="权限标识">
                    <el-input v-model="temp.perms" />
                    <!-- <el-select v-model="temp.perms" placeholder="请选择">
                        <el-option
                        v-for="item in roles"
                        :key="item.roleid"
                        :label="item.rolename"
                        :value="item.roleid">
                        </el-option>
                    </el-select> -->
                  </el-form-item>
                   
                  <el-form-item label="是否外链">
                      <!-- <el-input v-model="temp.isframe"/> -->
                    <el-radio-group v-model="temp.isframe">
                      <el-radio label="0">是</el-radio>
                      <el-radio label="1">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  
                  <el-form-item label="父菜单" >
                    <!-- <el-input v-model="temp.parentid" /> -->
                    <!-- <el-cascader v-model="temp.parentid"  :props='defaultProps' :options="list" size="mini" clearable></el-cascader> -->
                    <el-cascader style="width: 185px" v-model="temp.parentid" :options="list"  placeholder="顶类菜单"
                    :props="{ checkStrictly: true, 
                         children: 'children',
                        label: 'menuname',
                        value: 'menuid' }" clearable></el-cascader>
                  </el-form-item>   
                 
                  <el-form-item label="显示顺序">
                    <!-- <el-input v-model="temp.ordernum" /> -->
                    <el-input-number v-model="temp.ordernum" controls-position="right" :min="1" ></el-input-number>
                  </el-form-item>
                 <el-form-item label="菜单类型">
                    <!-- <el-input v-model.number="temp.menutype" /> -->
                   <el-radio-group v-model="temp.menutype">
                      <el-radio label="M">M目录</el-radio>
                      <el-radio label="C">C菜单</el-radio>
                      <el-radio label="F">F按钮</el-radio>
                      <el-radio label="I">I接口</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">
                      取消
                    </el-button>
                    <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
                      确认
                    </el-button>
                  </div>
                </el-dialog>

                <!-- <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
                  <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
                    <el-table-column prop="key" label="Channel" />
                    <el-table-column prop="pv" label="Pv" />
                  </el-table>
                  <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="dialogPvVisible = false">取消</el-button>
                  </span>
                </el-dialog> -->
                </el-main>

            </el-card>
        </el-main>
</template>

<script>
import Pagination from '@/components/Pagination' 
import waves from '@/directive/waves' 
import { role } from "@/api/system/user";
import { getMenuList, addMenu, updateMenu, deleteMenu } from '@/api/system/menu'
import qs from 'qs'
import checkPermission from "@/utils/permission";

const defaultForm = {
    menuid: '',
    menuname: '',
    menuurl: '',
    menutype: 'M',
    parentid: '',
    menuicon: '',
    enable: '0',
    component: '',
    isframe: '1',
    ordernum: '999',
    visible: '0',
    perms: '',
    createby: '',
    createtime: '',
    updateby: '',
    remark: ''
}
export default {
    // components: { Pagination },
    directives: { waves },
    data() {
        return {
            roles: [],
            listQuery: {
                current: 1,
                size: 10,
                menuname: undefined,
                
            },
            downloadLoading: false,
            sortOptions: [{ label: '激活', key: '1' }, { label: '锁定', key: '0' }],
            listLoading: false,
            list: [],
            tableKey: 0,
            total: 0,
            textMap: {
                update: '编辑',
                create: '新增'
            },
            dialogStatus: '',
            dialogFormVisible: false,
            temp: [],
            multipleSelection: [],
            rules: {
                menuname: [
                    { required: true, message: '请输入菜单名', trigger: 'blur' },
                    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                ],
                component: [
                    { required: true, message: '请输入组件路径', trigger: 'blur' },
                    { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
                ],
                menuurl: [
                    { required: true, message: '请输入菜单类型', trigger: 'blur' },
                    { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
                ],
               
            },
            defaultProps: {
                children: 'children',
                label: 'menuname',
                value: 'menuid'
            },
            temp: {
                menuid: '',
                menuname: '',
                menuurl: '',
                menutype: 'M',
                parentid: '',
                menuicon: '',
                enable: '0',
                component: '',
                isframe: '1',
                ordernum: '999',
                visible: '0',
                perms: '',
                createby: '',
                createtime: '',
                updateby: '',
                remark: ''
            }
        }
    },
    created() {
        this.getMenuList()
        this.getRoleList()
    },
    methods: {
         getRoleList() {
            role().then((response) => {
                const data = response.data
                if(data.code === 0) {
                    this.roles = data.model.records
                } else {
                    this.$message.error(data.msg)
                }
            })
            },
        // 首页
        handleFilter() {
            this.listQuery.current = 1
            this.getMenuList()
        },
        getMenuList() {
          this.listLoading = true
            getMenuList(qs.stringify(this.listQuery)).then((response) => {
                const data = response.data
                if(data.code == 0) {
                    this.list = this.getTreeData(data.model)
                    this.listLoading = false
                } else{
                    this.$message.error(data.msg)
                }
            })
            setTimeout(() => {
                this.listLoading = false
            }, 1.5 * 1000)
        },
        getTreeData(data){
            // 循环遍历json数据
            for(var i=0;i<data.length;i++){
                if(data[i].children.length<1){
                    if(data[i].enable == 1) {
                      data[i].disabled = true
                    }
                    // children若为空数组，则将children设为undefined
                    data[i].children=undefined;
                }else {
                    // children若不为空数组，则继续 递归调用 本方法
                    this.getTreeData(data[i].children);
                }
            }
            return data;
        },
        resetTemp() {
            this.temp = {
                menuid: '',
                menuname: '',
                menuurl: '',
                menutype: 'M',
                parentid: '',
                menuicon: '',
                enable: '0',
                component: '',
                isframe: '1',
                ordernum: '999',
                visible: '0',
                perms: '',
                createby: '',
                createtime: '',
                updateby: '',
                remark: ''
            }
        },
        handleCreate() {
            this.resetTemp()
            this.dialogFormVisible = true
            this.dialogStatus = 'create'
            this.$nextTick(() => {
                this.$refs['dataForm'].clearValidate()
            })
        },
        createData() {
            this.$refs['dataForm'].validate((valid) => {
                if (valid) {
                    const req = this.temp
                    req.parentid = req.parentid.toString()
                    addMenu(qs.stringify(req)).then((response) => {
                    const data = response.data
                    if(data.code === 0) {
                    //  this.list.unshift(this.temp)
                    this.getMenuList()
                    this.dialogFormVisible = false
                    this.$notify({
                        title: 'Success',
                        message: '新增成功',
                        type: 'success',
                        duration: 2000
                    })
                    } else {
                        this.$message.error(data.msg)
                    }
                })
                }
            })
        },
        handleUpdate(row) {
            this.resetTemp()
            // this.temp = Object.assign({}, row) // copy obj
            this.temp.menuid = row.menuid
            this.temp.menuurl = row.menuurl
            this.temp.menuname = row.menuname
            this.temp.menutype = row.menutype
            this.temp.menuid = row.menuid
            this.temp.parentid = row.parentid
            this.temp.menuicon = row.menuicon
            this.temp.enable = row.enable
            this.temp.component = row.component
            this.temp.isframe = row.isframe
            this.temp.ordernum = row.ordernum
            this.temp.visible = row.visible
            this.temp.perms = row.perms
            this.dialogStatus = 'update'
            this.dialogFormVisible = true
            this.$nextTick(() => {
                this.$refs['dataForm'].clearValidate()
            })
        },
        updateData() {
            this.$refs['dataForm'].validate((valid) => {
                if (valid) {
                const req = this.temp
                req.parentid = req.parentid.toString()
                updateMenu(qs.stringify(req)).then((response) => {
                    const data = response.data
                    if(data.code === 0) {
                        this.dialogFormVisible = false
                        this.$notify({
                            title: 'Success',
                            message: '更新成功',
                            type: 'success',
                            duration: 2000
                        })
                        this.handleFilter()
                    } else {
                        this.$message.error(data.msg)
                    }
                }) 
                }
            })
        },
         //选择的数据 
        handleSelectionChange(val) {
            this.multipleSelection = val
        },
        //  changeEnabled(data, val) {
        // this.$confirm('此操作将 "' + (val === '0' ? "激活" : "锁定") + '" ' + data.username + ', 是否继续？', '提示', {
        //     confirmButtonText: '确定',
        //     cancelButtonText: '取消',
        //     type: 'warning'
        // }).then(() => {
           
        // }).catch(() => {
        //     data.status = (val === '1' ? '0':'1')
        // })
        // },
        handleDeleteArr() {
            let arr = []
            for(var t in this.multipleSelection) {
                arr.push(this.multipleSelection[t].menuid)
            }
            this.doDeleteReq(arr)
        },
        handleDelete(row, index) {
            let arr = []
            arr.push(row.menuid)
            this.doDeleteReq(arr)
            // this.list.splice(index, 1)
        },
        doDeleteReq(arr) {
            this.$confirm('若选中父节点,将删除其下所有子节点,是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消', 
                type: 'warning'
            }).then(() => {
                deleteMenu(qs.stringify({menuIds: arr.toString()})).then((response) => {
                    const data = response.data
                    if(data.code === 0) {
                    this.multipleSelection = []
                    this.handleFilter()
                    this.$notify({
                        title: 'Success',
                        message: '删除成功',
                        type: 'success',
                        duration: 2000
                    })
                    } else {
                    this.$message.error(data.msg)
                    }
                })
            }).catch(() => {
                return;
            })
            
            // deleteUser(qs.stringify({userIds: arr.toString()})).then((response) => {
            //     const data = response.data
            //     if(data.code === 0) {
            //     this.multipleSelection = []
            //     this.handleFilter()
            //     this.$notify({
            //         title: 'Success',    
            //         message: '删除成功',
            //         type: 'success',
            //         duration: 2000
            //     })
            //     } else {
            //     this.$message.error(data.msg)
            //     }
            // })
        },
        resetButton() {
            this.listQuery = {
                current: 1,
                size: 10,
                menuname: undefined,
            }
            this.handleFilter()
        },
        checkPermission,
        handleDownload() {
          this.downloadLoading = true
          import('@/vendor/Export2Excel').then(excel => {
            const tHeader = ['菜单名', '组件路径', '路由路径', '菜单图标', '组件类型', '外链', '菜单停用状态', '菜单显示状态', '显示顺序', '权限标识', '备注']
            const filterVal = ['menuname', 'component', 'menuurl', 'menuicon', 'menutype', 'isframe', 'enable', 'visible', 'ordernum', 'perms', 'remark']
            const data = this.formatJson(filterVal)
            excel.export_json_to_excel({
              header: tHeader,
              data,
              filename: 'table-list'
            })
            this.downloadLoading = false
          })
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        return v[j]
      }))
    },

    }
}
</script>