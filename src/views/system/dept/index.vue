<template>
    <el-container>
        <el-container>
            <el-container >
                <el-card style="margin: 15px; min-height: 850px;  text-align:center">
                    <el-header>
                        <div style="height: 100%; line-height: 0px; padding:5px" align='left'>
                        <el-input v-model="listQuery.enterfullname" placeholder="模糊查找岗位名" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
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
                            <el-button :disabled="!checkPermission(['管理员', 'dept:add'])" type="primary" @click="handleCreate" size="small">增加</el-button>
                            <!-- <el-button type="primary" :disabled="this.multipleSelection.length == 0">修改</el-button> -->
                            <el-button v-if="checkPermission(['管理员', 'dept:delete'])" type="primary" :disabled="this.multipleSelection.length == 0" @click="handleDeleteArr" size="small">删除</el-button>
                            <!-- <el-button type="primary">默认按钮</el-button> -->
                        </div>
                        
                        <!-- </el-table> -->
                        <el-table
                            :data="deptList"
                            style="width: 100%;margin-bottom: 20px;"
                            row-key="entercode"
                            border
                            v-loading="listLoading"
                            fit
                            highlight-current-row
                            @selection-change="handleSelectionChange"
                            :tree-props="{children: 'children', }">
                            <el-table-column fixed type="selection" width="50px" align="center" > </el-table-column>
                             <el-table-column fixed label="单位名称" width="130px" align="center">
                                <template slot-scope="{row}">
                                <span>{{ row.enterfullname }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="单位简称" width="130px" align="center">
                                <template slot-scope="{row}">
                                <span>{{ row.shortname }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="单位编码" width="130px" align="center">
                                <template slot-scope="{row}">
                                <span>{{ row.entercode }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="单位类型" width="130px" align="center">
                                <template slot-scope="{row}">
                                <span>{{ row.entertype }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="负责人" width="130px" align="center">
                                <template slot-scope="{row}">
                                <span>{{ row.leader }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="联系电话" width="130px" align="center">
                                <template slot-scope="{row}">
                                <span>{{ row.phone }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="邮箱" width="130px" align="center">
                                <template slot-scope="{row}">
                                <span>{{ row.email }}</span>
                                </template>
                            </el-table-column>
                            <!-- <el-table-column label="单位状态" width="90px" align="center">
                                <template slot-scope="{row}">
                                <span>{{ row.enable == 0 ? '正常':'停用' }}</span>
                                </template>
                            </el-table-column> -->
                             <el-table-column label="单位状态" class-name="status-col" width="120px" align="center"> 
                                <template slot-scope="{row}">
                                <el-tooltip :content="'当前：' + (row.enable === '0' ? '激活':'锁定') + '状态'" placement="top">
                                    <el-switch
                                    v-model="row.enable"
                                    :disabled="!checkPermission(['管理员', 'dept:update'])" 
                                    active-color="#13ce66"
                                    inactive-color="#ff4949"
                                    active-value="0"
                                    inactive-value="1"
                                    @change="changeEnabled(row, row.enable)">
                                    </el-switch>
                                </el-tooltip>
                                </template>
                            </el-table-column>
                            <!-- <el-table-column label="创建者" width="130px" align="center">
                                <template slot-scope="{row}">
                                <span>{{ row.createby }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="创建时间" width="130px" align="center">
                                <template slot-scope="{row}">
                                <span>{{ row.createtime }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="更新者" width="130px" align="center">
                                <template slot-scope="{row}">
                                <span>{{ row.updateby }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="更新时间" width="130px" align="center">
                                <template slot-scope="{row}">
                                <span>{{ row.updatetime }}</span>
                                </template>
                            </el-table-column> -->
                            <el-table-column label="操作" align="center" width="270px" class-name="small-padding fixed-width">
                            <template slot-scope="{row,$index}">
                            <el-button :disabled="!checkPermission(['管理员', 'dept:update'])" type="primary" size="mini" @click="handleUpdate(row)">
                                编辑
                            </el-button>
                            <el-button  :disabled="!checkPermission(['管理员', 'dept:delete'])" v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
                                删除
                            </el-button>
                            </template>
                        </el-table-column>
                        </el-table>
                        <!-- <pagination v-show="total>0" :total="total" :page.sync="listQuery.current" :limit.sync="listQuery.size" @pagination="getMenuList" /> -->
               
                <el-dialog append-to-body :close-on-click-modal="false" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="650px">
                    <el-form :inline="true" ref="dataForm" :model="temp" :rules="rules" size="small" label-width="80px">
                        <el-form-item label="单位名称" prop="enterfullname">
                        <el-input v-model="temp.enterfullname" />
                        </el-form-item>
                        <el-form-item label="单位简称">
                            <el-input v-model="temp.shortname" />
                        </el-form-item>
                        <el-form-item label="单位编码" prop="entercode">
                            <el-input v-model="temp.entercode" />
                        </el-form-item>
                        <el-form-item label="单位类型">
                            <el-input v-model="temp.entertype" />
                        </el-form-item>
                        <el-form-item label="父部门" label-width="80px">
                            <!-- <el-input v-model="temp.parentid" /> -->
                            <el-cascader v-model="temp.parentid" :options="deptList" style="width: 183px" placeholder="一级部门"
                            :props="{ checkStrictly: true, 
                                children: 'children',
                                label: 'enterfullname',
                                value: 'enterid' }" clearable>
                            </el-cascader>
                        </el-form-item>
                       
                      
                        <el-form-item label="负责人">
                            <el-input v-model="temp.leader" />
                        </el-form-item>
                        <el-form-item label="联系电话">
                            <el-input v-model="temp.phone" />
                        </el-form-item>
                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model="temp.email" />
                        </el-form-item>
                         <el-form-item label="显示顺序">
                            <!-- <el-input v-model="temp.ordernum" /> -->
                            <el-input-number style="width:183px" v-model="temp.ordernum" controls-position="right" ></el-input-number>
                        </el-form-item>
                        
                        <el-form-item label="单位状态">
                            <!-- <el-input v-model="temp.enable" /> -->
                             <el-radio-group v-model="temp.enable" style="width: 178px">
                                <el-radio label="0">正常</el-radio>
                                <el-radio label="1">停用</el-radio>
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
                </el-main>
            </el-card>
            </el-container>
                <!-- <el-aside width="20%">
                    <div class='tree-container'>
                        <div style="padding: 20px">
                        <el-card class="box-card">
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
                            :props="defaultProps"
                            :filter-node-method="filterNode"
                            @node-click='handleNodeClick'
                            ref="tree">
                        </el-tree>
                        </el-card>
                  </div>
                </div>
                </el-aside> -->
            </el-container>
    </el-container>
</template>
<script>
import { getDeptTree } from "@/api/system/user";
import { getMenuList } from "@/api/system/menu";
import { addEnter, updateEnter, deleteEnter, disabledEnter, enableEnter } from "@/api/system/enter";
import qs from 'qs';
import checkPermission from "@/utils/permission";

    export default {
        data() {
            return {
                deptList: [],
                menuList: [],
                filterText: '',
                showButton: false,
                menuLoading: false,
                dialogFormVisible: false,
                dialogStatus: '',
                textMap: {
                    update: '编辑',
                    create: '新增'
                },
                multipleSelection: [],
                listLoading: false,
                listQuery: {
                    current: 1,
                    size: 10,
                    enterfullname: undefined,
                },
                temp: {
                    enterid: '',
                    entercode: '',
                    enterfullname: '',
                    shortname: '',
                    parentid: '',
                    entertype: '',
                    ordernum: '999',
                    leader: '',
                    phone: '',
                    email: '',
                    enable: '0',
                    createby: '',
                    createtime: '',
                    updateby: '',
                    updatetime: ''
                },
                downloadLoading: false,
                currentNode: Object,
                 defaultProps: {
                    children: 'children',
                    label: 'menuname',
                    value: 'manuid'
                },
                rules: {
                     enterfullname: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                    ],
                    entercode: [
                        { required: true, message: '请输入单位编码', trigger: 'blur' },
                        { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                    ],
                    //  email: [
                    //     { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    //     { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
                    // ],
                }
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
                this.getDeptList()
                //this.getMenuList()
            },
            getDeptList() {
                this.listLoading = true
                getDeptTree(this.listQuery).then((response) => {
                    const data = response.data
                    if(data.code == 0) {
                        
                        this.deptList = this.getTreeData(data.model)
                        this.listLoading = false
                    } else {
                        this.$message.error(data.msg)
                    }
                })
                 setTimeout(() => {
                    this.listLoading = false
                }, 1.0 * 1000)
            },
            checkPermission,
            getTreeData(data){
            // 循环遍历json数据
            for(var i=0;i<data.length;i++){
                if(data[i].enable == 1) {
                    data[i].disabled = true
                }
                if(data[i].children.length<1){
                    // children若为空数组，则将children设为undefined
                    data[i].children=undefined;
                }else {
                    // children若不为空数组，则继续 递归调用 本方法
                    this.getTreeData(data[i].children);
                }
            }
            return data;
            },
            getMenuList() {
                getMenuList().then((response) => {
                    const data = response.data
                    if(data.code == 0) {
                        this.menuList = data.model
                    } else {
                        this.$message.error(data.msg)
                    }
                })
            },
             changeEnabled(data, val) {
                this.$confirm('此操作将 "' + (val === '0' ? "激活" : "锁定") + '" ' + data.enterfullname + ', 是否继续？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    if(val === '1') {
                        disabledEnter(qs.stringify({enterId: data.enterid})).then((response) => {
                            const data = response.data
                            if(data.code === 0) {
                                this.$message.success(data.msg)
                            } else {
                                this.$message.error(data.msg)
                            }
                        })
                    } else if(val === '0') {
                        enableEnter(qs.stringify({enterId: data.enterid})).then((response) => {
                            const data = response.data
                            if(data.code === 0) {
                                this.$message.success(data.msg)
                            } else {
                                this.$message.error(data.msg)
                            }
                        })
                    }
                }).catch(() => {
                    data.enable = (val === '1' ? '0':'1')
                })
                },
            handleCreate() {
                this.resetTemp()
                this.dialogFormVisible = true
                this.dialogStatus = 'create'
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate()
                })
            },
            handleUpdate(row) {
                this.resetTemp()
                this.temp.enterid = row.enterid
                this.temp.entercode = row.entercode
                this.temp.enterfullname = row.enterfullname
                this.temp.shortname = row.shortname
                this.temp.parentid = row.parentid
                this.temp.entertype = row.entertype
                this.temp.ordernum = row.ordernum
                this.temp.leader = row.leader
                this.temp.phone = row.phone
                this.temp.enable = row.enable
                this.temp.email = row.email
                this.dialogFormVisible = true
                this.dialogStatus = 'update'
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate()
                })
            },
             createData() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        const req = this.temp
                        if(req.parentid && req.parentid.length>0) {
                            console.log(req.parentid[req.parentid.length - 1])
                            req.parentid = req.parentid[req.parentid.length - 1]
                        }
                        addEnter(req).then((response) => {
                            const data = response.data
                            if(data.code === 0) {
                                //  this.list.unshift(this.temp)
                                this.getDeptList()
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
            updateData() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        const req = this.temp
                        // req.parentid = Number(this.temp.parentid.toString())
                        updateEnter(req).then((response) => {
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
                    arr.push(this.multipleSelection[t].enterid)
                }
                this.doDeleteReq(arr)
            },
            handleDelete(row, index) {
                let arr = []
                arr.push(row.enterid)
                this.doDeleteReq(arr)
                // this.list.splice(index, 1)
            },
            doDeleteReq(arr) {
                deleteEnter(qs.stringify({enterIds: arr.toString()})).then((response) => {
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
           
             //选择的数据 
            handleSelectionChange(val) {
                this.multipleSelection = val
            },
             handleNodeClick(data) {
                this.currentNode = data
                // this.listQuery.enterprisecode = data.entercode
                // this.handleFilter()
            },
            resetTemp() {
                this.temp = {
                    enterid: '',
                    entercode: '',
                    enterfullname: '',
                    shortname: '',
                    parentid: '',
                    entertype: '',
                    ordernum: '999',
                    leader: '',
                    phone: '',
                    email: '',
                    enable: '0',
                    createby: '',
                    createtime: '',
                    updateby: '',
                    updatetime: ''
                }
            },
             resetButton() {
                this.listQuery = {
                    current: 1,
                    size: 10,
                    enterfullname: undefined,
                }
                this.handleFilter()
            },
             filterNode(value, data) {
                if (!value) return true;
                return data.enterfullname.indexOf(value) !== -1;
            },
            handleDownload() {

            },
            
        }
    }
</script>
