<template>
    <el-container >
        <el-aside width="17%">
            <div>
                <div class='tree-container'>
                  <div style="padding: 20px">
                    <el-card class="box-card">
                      <div slot="header">
                        <el-input 
                          placeholder="输入关键字进行过滤"
                          v-model="filterText">
                        </el-input>
                      </div>
                      <el-tree
                        class="filter-tree"
                        :data="deptTree"
                        :props="defaultProps"
                        :filter-node-method="filterNode"
                        @node-click='handleNodeClick'
                        ref="tree">
                      </el-tree>
                    </el-card>
                    
                  </div>
                </div>
               
            </div>
        </el-aside>
        <el-main>
            <!-- 右页面表单 -->
            <el-card>
               <el-header>
                  <div style="height: 100%; " align='left'>
                    <el-input v-model="listQuery.username" placeholder="用户名" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    <!-- <el-select v-model="listQuery.ele2" placeholder="Imp" clearable style="width: 90px" class="filter-item">
                        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
                    </el-select> -->
                    <!-- <el-select v-model="listQuery.type" placeholder="Type" clearable class="filter-item" style="width: 130px">
                        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />
                    </el-select> -->
                    <el-select v-model="listQuery.status" style="width: 140px" class="filter-item" >
                        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
                    </el-select>
                    <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter" size="small">
                        查找
                    </el-button>
                    <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" size="small" @click="resetButton">
                        重置
                    </el-button>
                    <el-button :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload" size="small">
                        导出
                    </el-button>
                    <!-- <el-checkbox v-model="showReviewer" class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">
                        reviewer
                    </el-checkbox> -->
                </div>
               </el-header>
                <el-main>
                  <div align='left' style="height: 100%; line-height: 0px; padding:5px">
                   <el-button :disabled="!checkPermission(['管理员', 'user:add'])" type="primary" @click="handleCreate" size="small">增加</el-button>
                   <!-- <el-button type="primary" :disabled="this.multipleSelection.length == 0">修改</el-button> -->
                   <el-button v-if="checkPermission(['管理员', 'user:delete'])" type="primary" :disabled="this.multipleSelection.length == 0" @click="handleDeleteArr" size="small">删除</el-button>
                   <el-button type="primary" size="small">钉钉id </el-button>
                  </div>
                  <el-table
                    :key="tableKey"
                    v-loading="listLoading"
                    :data="list"
                    border
                    fit
                    highlight-current-row
                    @selection-change="handleSelectionChange"
                  >
                 <!-- 构建表 映射属性 -->
                 <el-table-column fixed type="selection" width="50px" align="center" > </el-table-column>
                  <el-table-column fixed label="姓名" width="110px" align="center">
                    <template slot-scope="{row}">
                      <span>{{ row.username }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="昵称" width="110px" align="center">
                    <template slot-scope="{row}">
                      <span>{{ row.loginname }}</span>
                    </template>
                  </el-table-column>
                  <!-- <el-table-column label="性别" width="80px" align="center">
                    <template slot-scope="{row}">
                      <span>{{ row.gender }}</span>
                    </template>
                  </el-table-column> -->
                  <el-table-column label="手机" width="110px" align="center">
                    <template slot-scope="{row}">
                      <span>{{ row.telphonenum }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="邮箱" width="180px" align="center">
                    <template slot-scope="{row}">
                      <span>{{ row.email }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="单位" width="120px" align="center">
                    <template slot-scope="{row}">
                      <span>{{ row.enterfullname }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="岗位" width="120px" align="center">
                    <template slot-scope="{row}">
                      <span>{{ row.rolenames }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="创建日期" width="170px" align="center">
                    <template slot-scope="{row}">
                      <span>{{ row.createtime }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column v-if="checkPermission(['管理员', 'user:update'])" label="状态" class-name="status-col" width="120px" align="center"> 
                    <template slot-scope="{row}">
                      <el-tooltip :content="'当前：' + (row.status === '0' ? '激活':'锁定') + '状态'" placement="top">
                        <el-switch
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
                  <el-table-column label="操作" align="center" width="230px" class-name="small-padding fixed-width">
                    <template slot-scope="{row,$index}">
                      <el-button type="primary"  :disabled="!checkPermission(['管理员', 'user:update'])" size="mini" @click="handleUpdate(row)">
                        编辑
                      </el-button>
                      <el-button v-if="row.status!='deleted'" :disabled="!checkPermission(['管理员', 'user:delete'])" size="mini" type="danger" @click="handleDelete(row,$index)">
                        删除
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <pagination v-show="total>0" :total="total" :page.sync="listQuery.current" :limit.sync="listQuery.size" @pagination="getList" />

                <el-dialog append-to-body :close-on-click-modal="false" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="570px">
                  <el-form :inline="true" ref="dataForm" :model="temp" :rules="rules" size="small" label-width="66px"> 
                   <el-form-item label="用户名" prop="username">
                    <el-input v-model="temp.username" />
                  </el-form-item>
                  <el-form-item label="电话" prop="telphonenum">
                    <el-input v-model="temp.telphonenum" />
                  </el-form-item>
                  <el-form-item label="昵称" prop="loginname">
                    <el-input v-model="temp.loginname" />
                  </el-form-item>
                  <el-form-item label="邮箱" prop="email">
                    <el-input v-model="temp.email" />
                  </el-form-item>
                  
                  <el-form-item label="单位" prop="dept">
                    <el-cascader class="pt-cas" v-model="temp.entercodes" style="width: 183px;" :props="defaultProps" :options="deptTree" @change="handleChange" clearable></el-cascader>
                  </el-form-item>
                  
                  <!-- <el-form-item style="margin-bottom: 0;" label="岗位" prop="roles">
                    <el-select v-model="temp.jobs" multiple placeholder="请选择" style="width: 437px">
                      <el-option
                        v-for="item in jobs"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item> -->

                  <!-- <el-form-item label="性别">
                    <el-radio-group v-model="temp.gender" style="width: 178px">
                      <el-radio label="男">男</el-radio>
                      <el-radio label="女">女</el-radio>
                    </el-radio-group>
                  </el-form-item> -->

                  <el-form-item label="状态">
                    <el-radio-group v-model="temp.status" style="width: 178px">
                      <el-radio label="0">激活</el-radio>
                      <el-radio label="1">锁定</el-radio>
                    </el-radio-group>
                  </el-form-item>

                 <el-form-item style="margin-bottom: 0;" label="岗位" prop="roles">
                    <el-select v-model="temp.roleIds" multiple placeholder="请选择" style="width: 437px"  @remove-tag="deleteTag" @change="changeRole">
                      <el-option
                        v-for="item in roles"
                        :key="item.roleid"
                        :label="item.rolename"
                        :value="item.roleid"
                        :disabled="item.status == 1">
                      </el-option>
                    </el-select>
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

                <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
                  <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
                    <el-table-column prop="key" label="Channel" />
                    <el-table-column prop="pv" label="Pv" />
                  </el-table>
                  <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="dialogPvVisible = false">取消</el-button>
                  </span>
                </el-dialog>
                </el-main>

            </el-card>
        </el-main>
    </el-container>
</template>

<script>
import Pagination from '@/components/Pagination' 
import waves from '@/directive/waves' 
import { formatTime,parseTime } from '@/utils/index'
import { isvalidPhone } from '@/utils/validate'
import { fetchList, getDeptTree, createUser, deleteUser, disabled, enable, role, updateUser } from '@/api/system/user'
import qs from 'qs'
import checkPermission from "@/utils/permission";


let userRoles = []
let userJobs = []
const defaultForm = { 
userid: null, username: null, loginname: null, gender: '男', rolenames:'', roleIds: [], email: null, status: '1', enabled: 'false', entercodes: [], role: '', roles: [], jobs: [], dept: [], telphonenum: null
}
export default {
      components: { Pagination },
      directives: { waves },
    data() {
      // 自定义验证
      const validPhone = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入电话号码'))
        } else if (!isvalidPhone(value)) {
          callback(new Error('请输入正确的11位手机号码'))
        } else {
          callback()
        }
      }
      return {
        deptName: '', depts: [], deptDatas: [], jobs: [], level: 3, roles: [],
        // defaultProps: { children: 'children', label: 'name', isLeaf: 'leaf' },
        //   enabledTypeOptions: [
        //     { key: 'true', display_name: '激活' },
        //     { key: 'false', display_name: '锁定' }
        // ],    
        listQuery: {
            current: 1,
            size: 10,
            username: undefined,
            status: undefined,
            type: undefined,
            enterprisecode: undefined
        },
        filterText: '',
        listLoading: true,
        deptTree: [],
        defaultProps: {
          children: 'children',
          label: 'enterfullname',
          value: 'entercode'
        },
        entercodes: [202008121352, 202008121356],
        dialogFormVisible: false,
        leftFormVisible: false,
        formLabelWidth: '120px',
        currentNode: Object,
        importanceOptions: [1, 2, 3],
        sortOptions: [{ label: '激活', key: '0' }, { label: '锁定', key: '1' }],
        statusOptions: ['published', 'draft', 'deleted'],
        showReviewer: false,
        temp: {
          userid: null, username: null, loginname: null, gender: '男', rolenames:'', roleIds: [], email: null, status: '1', enabled: 'false', entercodes: [], role: '', roles: [], jobs: [], dept: [], telphonenum: null
        },
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: '编辑',
          create: '新增'
        },
        dialogPvVisible: false,
        pvData: [],
        list: [],
        total: 0,
        tableKey: 0,
        rules: {
         username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        loginname: [
          { required: true, message: '请输入用户昵称', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        telphonenum: [
           { required: true, message: '请输入用户电话', trigger: 'blur' },
          { min: 7, max: 11, message: '长度在 7 到 11 个字符', trigger: 'blur' }
        ],
        // dept : [
        //    { required: true, message: '请输入用户部门', trigger: 'blur' },
        //   { min: 0, max: 20, message: '请选择部门', trigger: 'blur' }
        // ]
        },
        downloadLoading: false,
        multipleSelection: []
      };
    },
     watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    
    created() {
      this.getList()
      this.getDeptTree()
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
    getDeptTree() {
      getDeptTree().then(response => {
        const data = response.data
        if(data.code === 0) {
            this.deptTree = this.getTreeData(data.model)
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    handleChange(value) {
        // console.log(value);
    },
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
    resetButton() {
      this.listQuery = {
          current: 1,
            size: 10,
            username: undefined,
            status: undefined,
            // type: undefined,
            enterprisecode: undefined
      }
      this.handleFilter()
    },
    //   初始化表格
    getList() {
      this.listLoading = true
      fetchList(qs.stringify(this.listQuery)).then(response => {
        const data = response.data
        if(data.code == 0) {
          
          this.total = data.model.total
          this.list = data.model.records
          this.listLoading = false
        } else {
          this.$message.error(data.msg)
        }
        // this.list = response.data.items
        // this.total = response.data.total
        // Just to simulate the time of the request
       
      })
       setTimeout(() => {
          this.listLoading = false
        }, 1.0 * 1000)
    },
    // 首页
    handleFilter() {
      this.listQuery.current = 1
      this.getList()
    },
    //选择的数据 
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    deleteTag(value) {
      userRoles.forEach(function(data, index) {
        if (data.id === value) {
          userRoles.splice(index, value)
        }
      })
    },
    changeRole(value) {
      userRoles = []
      value.forEach(function(data, index) {
        const role = { id: data }
        userRoles.push(role)
      })
    },
    checkPermission,
    changeEnabled(data, val) {
      this.$confirm('此操作将 "' + (val === '0' ? "激活" : "锁定") + '" ' + data.username + ', 是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
         type: 'warning'
      }).then(() => {
        if(val === '1') {
          disabled(qs.stringify({userId: data.userid})).then((response) => {
            const data = response.data
            if(data.code === 0) {
              this.$message.success(data.msg)
            } else {
              this.$message.error(data.msg)
            }
          })
        } else if(val === '0') {
          enable(qs.stringify({userId: data.userid})).then((response) => {
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
    resetTemp() {
      this.temp = {userid: null, username: null, loginname: null, gender: '男', rolenames:'', roleIds: [], email: null, status: '1', enabled: 'false', entercodes: [], role: '', roles: [], jobs: [], dept: [], telphonenum: null}
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
          req.roleIds = this.temp.roleIds.toString()
          req.entercodes = this.temp.entercodes.toString()
          createUser(qs.stringify(req)).then((response) => {
            const data = response.data
            if(data.code === 0) {
              //  this.list.unshift(this.temp)
              this.getList()
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
      this.temp.username = row.username
      this.temp.loginname = row.loginname
      this.temp.userid = row.userid
      this.temp.telphonenum = row.telphonenum
      this.temp.email = row.email
      this.temp.entercodes = row.entercodes
      this.temp.status = row.status
      this.temp.roleIds = row.roleIds
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
          req.roleIds = this.temp.roleIds.toString()
          req.entercodes = this.temp.entercodes.toString()
          updateUser(qs.stringify(req)).then((response) => {
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
        arr.push(this.multipleSelection[t].userid)
      }
      this.doDeleteReq(arr)
    },
    handleDelete(row, index) {
      let arr = []
      arr.push(row.userid)
      this.doDeleteReq(arr)
      // this.list.splice(index, 1)
    },
    doDeleteReq(arr) {
      deleteUser(qs.stringify({userIds: arr.toString()})).then((response) => {
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
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => { 
        const tHeader = ['姓名', '昵称', '手机', '邮箱', '部门', '创建日期', '状态']
        const filterVal = ['username', 'loginname', 'telphonenum', 'email', 'enterfullname', 'createtime', 'status']
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
        // if (j === 'createTime') {
        //   return parseTime(v[j])
        // } else {
        //   return v[j]
        // }
        return v[j]
      }))
    },
       handleNodeClick(data) {
         this.currentNode = data
         this.listQuery.enterprisecode = data.entercode
        this.handleFilter()
       },
      filterNode(value, data) {
        if (!value) return true;
        return data.enterfullname.indexOf(value) !== -1;
      },
      
    //  handleAddData() {
    //     if(!this.diaform.level1) {
    //       this.$message.error('请选择一级目录');
    //       return;
    //     } else {
    //       for(var i = 0; i < this.data.length; i++) {
    //         if(this.data[i].label === this.diaform.level1) {
    //           this.data[i].children.push({'label': this.diaform.level2, 'id': 11})
    //           break;
    //         }
    //       }
    //     }
    //     this.$message.success('添加成功')
    //     this.dialogFormVisible=false;
    //  },
    
    }
  };
</script>

<style lange="scss" scoped>
  /* .el-container{
      height:100%;
      padding:0;
      margin:0;
      width:100%;
} */
.tree-container{
  padding: 0;
  margin: 0;
  min-height: 700px;
}

  .el-header {
    /* background-color: #B3C0D1; */
    color: #333;
    text-align: center;
    line-height: 0px;
  }
  
  .el-aside {
    /* background-color: #D3DCE6; */
    color: #333;
    text-align: center;
    line-height: 0
  }
  .tree-container > div {
    padding: 0 !important;
    padding-right: 20px !important;
  }

  .el-cascader-panel {
   /* min-height: 300px; */
  width: 100%;
   overflow: none;
}
.el-cascader-panel .el-cascader-menu{
  width: 100%;
}
  .el-main {
    /* background-color: #E9EEF3; */
    color: #333;
    text-align: center;
    line-height: 0px;
    padding: 0;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .pt-cas .el-scrollbar__wrap{
    height: 100%;
    width: 100%
  }

</style>