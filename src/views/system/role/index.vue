<template>
    <el-container>
        <el-container>
            <el-container>
                <el-card style="margin: 15px">
                    <el-header>
                        <div style="height: 100%; line-height: 0px; padding:5px" align='left'>
                        <el-input v-model="listQuery.rolename" placeholder="模糊查找岗位名" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
                        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter" size="small">
                            查找
                        </el-button>
                        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" size="small" @click="resetButton">
                            重置
                        </el-button>
                        <!-- <el-button :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload" size="small">
                            导出
                        </el-button> -->
                       
                        </div>
                    </el-header>
                    <el-main style="width: 100%">
                        <div align='left' style="height: 100%; line-height: 0px; padding:5px">
                            <el-button type="primary" :disabled="!checkPermission(['管理员', 'role:add'])" @click="handleCreate" size="small">增加</el-button>
                            <!-- <el-button type="primary" :disabled="this.multipleSelection.length == 0">修改</el-button> -->
                            <el-button v-if="checkPermission(['管理员', 'user:delete'])" type="primary" :disabled="this.multipleSelection.length == 0" @click="handleDeleteArr" size="small">删除</el-button>
                            <!-- <el-button type="primary">默认按钮</el-button> -->
                        </div>
                        
                        <!-- </el-table> -->
                        <el-table
                            :data="roleList"
                            style="width: 100%;margin-bottom: 20px;"
                            row-key="roleid"
                            border
                            v-loading="listLoading"
                            fit
                            highlight-current-row
                            @selection-change="handleSelectionChange"
                            @row-click="setMenu"
                            :tree-props="{children: 'children', }">
                            <el-table-column fixed type="selection" width="50px" align="center" > </el-table-column>
                             <el-table-column fixed label="名称" width="130px" align="center">
                                <template slot-scope="{row}">
                                <span>{{ row.rolename }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="角色权限字符串" width="130px" align="center">
                                <template slot-scope="{row}">
                                <span>{{ row.rolekey }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="显示顺序" width="130px" align="center">
                                <template slot-scope="{row}">
                                <span>{{ row.ordernum }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="数据范围" width="130px" align="center">
                                <template slot-scope="{row}">
                                <span>{{ row.datascope == 1 ? '全部数据权限' : row.datascope == 2 ? '自定数据权限' : row.datascope == 3 ? '本单位数据权限' : '本单位及以下数据权限' }}</span>
                                </template>
                            </el-table-column>
                            <!-- <el-table-column label="角色状态" width="90px" align="center">
                                <template slot-scope="{row}">
                                <span>{{ row.status ? '正常':'停用' }}</span>
                                </template>
                            </el-table-column> -->
                            <el-table-column label="状态" class-name="status-col" width="120px" align="center"> 
                                <template slot-scope="{row}">
                                <el-tooltip :content="'当前：' + (row.status === '0' ? '激活':'锁定') + '状态'" placement="top">
                                    <el-switch
                                    :disabled="!checkPermission(['管理员', 'role:update'])"
                                    v-model="row.status"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949"
                                    active-value="0"
                                    inactive-value="1"
                                    @change="changeEnabled(row, row.status)">
                                    </el-switch>
                                </el-tooltip>
                                </template>
                            </el-table-column>
                            <el-table-column label="备注" min-width="230px" align="center">
                                <template slot-scope="{row}">
                                <span>{{ row.remark }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" align="center" width="270px" class-name="small-padding fixed-width">
                            <template slot-scope="{row,$index}">
                            <el-button type="primary" :disabled="!checkPermission(['管理员', 'role:update'])" size="mini" @click="handleUpdate(row)">
                                编辑
                            </el-button>
                            <el-button :disabled="!checkPermission(['管理员', 'role:delete'])" v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
                                删除
                            </el-button>
                            </template>
                        </el-table-column>
                        </el-table>
                        <pagination v-show="total>0" :total="total" :page.sync="listQuery.current" :limit.sync="listQuery.size" @pagination="getMenuList" />
                        
                        
                <el-dialog append-to-body :close-on-click-modal="false" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="560px">
                  <el-form :inline="true" ref="dataForm" :model="temp" :rules="rules" size="small" label-width="80px"> 
                   <el-form-item label="名称" prop="rolename">
                    <el-input v-model="temp.rolename" />
                  </el-form-item>
                  <el-form-item label="角色权限">
                    <el-input v-model="temp.rolekey" />
                  </el-form-item>
                 
                  <el-form-item label="数据范围">
                    <!-- <el-input v-model="temp.datascope" /> -->
                     <el-select v-model="temp.datascope" style="width: 183px" class="filter-item" clearable>
                        <!-- <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" /> -->
                        <el-option key="1" label="全部数据权限" value="1"></el-option>
                        <el-option key="2" label="自定数据权限" value="2"></el-option>
                        <el-option key="3" label="本单位数据权限" value="3"></el-option>
                        <el-option key="4" label="本单位及以下数据权限" value="4"></el-option>
                    </el-select>
                  </el-form-item>
                 <el-form-item label="显示顺序">
                    <!-- <el-input v-model="temp.ordernum" /> -->
                    <el-input-number v-model="temp.ordernum" controls-position="right" :min="1" style="width: 183px"></el-input-number>
                  </el-form-item>
                  <el-form-item label="状态">
                      <!-- <el-input v-model="temps.status" /> -->
                    <el-radio-group v-model="temp.status" style="width: 178px">
                      <el-radio label="0">正常</el-radio>
                      <el-radio label="1">停用</el-radio>
                    </el-radio-group>
                  </el-form-item>

                  <el-form-item label="备注" prop="email">
                    <el-input  type="textarea" style="width: 380px" :rows="2" v-model="temp.remark" />
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
                </el-main>
            </el-card>
            </el-container>
                <el-aside width="25%" v-if="checkPermission(['管理员', 'menu:set'])">
                    <div class='tree-container'>
                        <div style="padding: 18px">
                        <el-card class="box-card" style="min-height: 800px">
                        <div slot="header" class="clearfix">
                            <el-tooltip class="item" effect="dark" content="选择指定角色分配菜单" placement="top">
                            <span class="role-span">菜单分配</span>
                            </el-tooltip>
                            <el-button
                            :disabled="!showButton"
                            :loading="menuLoading"
                            icon="el-icon-check"
                            size="mini"
                            style="float: right; padding: 6px 9px"
                            type="primary"
                            @click="saveMenu"
                            >保存</el-button>
                        </div>
                        <el-tree
                            class="filter-tree"
                            :data="menuList"
                            show-checkbox
                            highlight-current	
                            :props="defaultProps"
                            :default-checked-keys="menuids"
                            :filter-node-method="filterNode"
                            :check-strictly="true"
                            node-key="menuid"
                            @check='menuChange'
                            ref="multipleTable">
                        </el-tree>
                         <!-- @node-click='handleNodeClick' -->
                        </el-card>
                  </div>
                </div>
                </el-aside>
            </el-container>
    </el-container>
</template>
<script>
import Pagination from '@/components/Pagination' 
import { getDeptTree, role } from "@/api/system/user";
import { addRole, updateRole, deleteRole, disabledRole, enableRole, setMenuList } from "@/api/system/role";
import { getMenuList } from "@/api/system/menu";
import qs from "qs";
import checkPermission from "@/utils/permission";

const defaultForm = { roleid: '', rolename: '', rolekey: '', ordernum: '999',  datascope: '', status: '0', remark: ''}
    export default {
        components: { Pagination },
        data() {
            return {
                roleList: [],
                deptList: [],
                menuList: [],
                menuids: [],
                dialogStatus: '',
                currentRoleId: '',
                total: 0,
                filterText: '',
                showButton: false,
                menuLoading: false,
                dialogFormVisible: false,
                ordernum: '',
                multipleSelection: [],
                listQuery: {
                    current: 1,
                    size: 10,
                    rolename: undefined,
                },
                textMap: {
                    update: '编辑',
                    create: '新增'
                },  
                temp: { roleid: '', rolename: '', rolekey: '', ordernum: '999',  datascope: '', status: '0', remark: ''},
                downloadLoading: false,
                listLoading: false,
                currentNode: Object,
                 defaultProps: {
                    children: 'children',
                    label: 'menuname',
                    value: 'manuid'
                },
                 rules: {
                    rolename: [
                        { required: true, message: '请输入名称', trigger: 'blur' },
                        { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                    ],
                },
            }
        },
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val);
            }
        },
        
        created() {
            this.handleFilter()
        },
        methods: {
             // 首页
            handleFilter() {
                this.listQuery.current = 1
                this.getRoleList()
                this.getMenuList()
            },
            getRoleList() {
                this.listLoading = true
                role(qs.stringify(this.listQuery)).then((response) => {
                    const data = response.data
                    if(data.code == 0) {
                        
                        this.total = data.model.total
                        this.roleList = data.model.records
                        this.listLoading = false
                    } else {
                        this.$message.error(data.msg)
                    }
                    
                    })
                setTimeout(() => {
                    this.listLoading = false
                }, 1.0 * 1000)
            },
            getMenuList() {
                getMenuList().then((response) => {
                    const data = response.data
                    if(data.code == 0) {
                        this.menuList = this.getTreeData(data.model)
                    } else {
                        this.$message.error(data.msg)
                    }
                })
            },
            getTreeData(data){
                // 循环遍历json数据
                for(var i=0;i<data.length;i++){
                    if(data[i].children.length<1){
                        if(data[i].enable == 1) {
                            data[i].disabled = true
                        }
                    }else {
                        // children若不为空数组，则继续 递归调用 本方法
                        this.getTreeData(data[i].children);
                    }
                }
                return data;
            },
            resetTemp() {
                this.temp =  { roleid: '', rolename: '', rolekey: '', ordernum: '999',  datascope: '', status: '0', remark: ''}
            },
            handleCreate() {
                this.resetTemp()
                this.dialogStatus = 'create'
                this.dialogFormVisible = true
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate()
                })
            },
            createData() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        const req = this.temp
                        addRole(qs.stringify(req)).then((response) => {
                            const data = response.data
                            if(data.code === 0) {
                                //  this.list.unshift(this.temp)
                                this.getRoleList()
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
                this.temp.roleid = row.roleid
                this.temp.rolename = row.rolename
                this.temp.rolekey = row.rolekey
                this.temp.ordernum = row.ordernum
                this.temp.datascope = row.datascope
                this.temp.status = row.status
                this.temp.remark = row.remark
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
                updateRole(qs.stringify(req)).then((response) => {
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
            handleDeleteArr() {
                let arr = []
                for(var t in this.multipleSelection) {
                    arr.push(this.multipleSelection[t].roleid)
                }
                this.doDeleteReq(arr)
            },
            handleDelete(row, index) {
                let arr = []
                arr.push(row.roleid)
                this.doDeleteReq(arr)
                // this.list.splice(index, 1)
            },
            doDeleteReq(arr) {
                deleteRole(qs.stringify({roleIds: arr.toString()})).then((response) => {
                    const data = response.data
                    if(data.code === 0) {
                        this.$notify({
                            title: 'Success',
                            message: '删除成功',
                            type: 'success',
                            duration: 2000
                        })
                        this.multipleSelection = []
                        this.handleFilter()
                } else {
                    this.$message.error(data.msg)
                }
                })
            },
            checkPermission,
            saveMenu() {
                const data = {
                    roleId: this.currentRoleId,
                    menuIds: this.menuids.join(',')
                }
                this.menuLoading = true
                setMenuList(qs.stringify(data)).then((response) => {
                    const data = response.data
                    if(data.code == 0) {
                        this.$message.success(data.msg)
                    } else {
                        this.$message.error(data.msg)
                    }
                     this.menuLoading = false
                     this.handleFilter()
                })
            },
            setMenu(row) {
                this.showButton = true
                this.$refs.multipleTable.setCheckedKeys([])
                this.currentRoleId = row.roleid
                this.menuids = []
                if(row.nodes) {
                    for(var i = 0; i<row.nodes.length; i++) {
                        this.menuids.push(row.nodes[i].menuid)
                    }
                }
            },
             menuChange(data) {
                // 判断是否在 menuids 中，如果存在则删除，否则添加
                const index = this.menuids.indexOf(data.menuid)
                if (index !== -1) {
                    this.menuids.splice(index, 1)
                } else {
                    this.menuids.push(data.menuid)
                }
            },
            // getMenuIds(data) {
            //     // 循环遍历json数据
            //     for(var i=0;i<data.length;i++){
            //         if(data[i].children.length<1){
            //             this.menuids.push(data[i].menuid)
            //         }else {
            //             // children若不为空数组，则继续 递归调用 本方法
            //             this.menuids.push(data[i].menuid)
            //             this.getMenuIds(data[i].children);
            //         }
            //     }
            //     return data;
            // },
             //选择的数据 
            handleSelectionChange(val) {
                this.multipleSelection = val
            },
             resetButton() {
                this.listQuery = {
                    current: 1,
                    size: 10,
                    rolename: undefined,
                }
                this.handleFilter()
            },
             filterNode(value, data) {
                if (!value) return true;
                return data.rolename.indexOf(value) !== -1;
            },
            changeEnabled(data, val) {
                this.$confirm('此操作将 "' + (val === '0' ? "激活" : "锁定") + '" ' + data.rolename + ', 是否继续？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    if(val === '1') {
                    disabledRole(qs.stringify({roleId: data.roleid})).then((response) => {
                        const data = response.data
                        if(data.code === 0) {
                            this.$message.success(data.msg)
                        } else {
                            this.$message.error(data.msg)
                        }
                    })
                    } else if(val === '0') {
                    enableRole(qs.stringify({roleId: data.roleid})).then((response) => {
                        const data = response.data
                        if(data.code === 0) {
                        this.$message.success(data.msg)
                        } else {
                        this.$message.error(data.msg)
                        }
                    })
                    }
                }).catch(() => {
                    data.status = (val === '1' ? '0':'1')
                })
                },
            handleDownload() {

            },
            
        }
    }
</script>
