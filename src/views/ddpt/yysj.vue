<template>
    <div>
        <el-container>
            <el-aside>
                <div class='tree-container'>
                    <div style="padding: 20px">
                    <el-card class="box-card">
                        <div slot="header">
                        <el-button type="primary" size="mini" @click="handleLeftCreate">增加</el-button>
                        <!-- <el-button type="primary" size="mini" :disabled="currentNode == ''" @click="handleLeftUpdate">修改</el-button> -->
                        <el-button type="danger" size="mini" @click="handleDelete">删除</el-button>
                        </div>
                        <el-tree
                        class="filter-tree"
                        :data="list"
                        :highlight-current='true'
                        :props="defaultProps"
                        @node-click='handleNodeClick'
                        ref="tree">
                        </el-tree>
                    </el-card>
                    </div>
                </div>

                <el-dialog append-to-body :close-on-click-modal="false" :visible.sync="leftFormVisible" width="500px">
                <el-form :inline="true" ref="leftForm" :model="leftTemp" :rules="rules" size="small" label-width="80px"> 
                    <el-form-item label="应用名称" prop="name">
                        <el-input v-model="leftTemp.name" class="input-width"/>
                    </el-form-item>
                    <el-form-item label="应用编码" prop="clientId">
                        <el-input v-model="leftTemp.clientId" class="input-width"></el-input>
                    </el-form-item>
                    <el-form-item label="类型" prop="type">
                        <el-select v-model="leftTemp.type" class="input-width" >
                            <el-option key="1" label="内部" value="1"></el-option>
                            <el-option key="2" label="报表" value="2"></el-option>
                            <el-option key="3" label="第三方应用" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="leftFormVisible = false">
                        取消
                    </el-button>
                    <el-button type="primary" @click="createLeftData()">
                        确认
                    </el-button>
                    </div>
                </el-dialog>
            </el-aside>
            <el-main >
                <el-card style="width: 100%;height: 100%;">
                    <el-form ref="form" :model="currentNode"  label-width="100px" >
                        <el-form-item label='应用名称'>
                            <span style="margin-left: 10px">{{ currentNode.name }}</span>
                        </el-form-item>
                         <el-form-item label='应用编码'>
                            <span style="margin-left: 10px">{{ currentNode.clientId }}</span>
                        </el-form-item>
                         <el-form-item label='应用类型'>
                            <span style="margin-left: 10px">{{ currentNode.type == 1 ? '内部' : currentNode.type == 2 ? '报表' : currentNode.type == 3 ? '第三方应用': ''}}</span>
                        </el-form-item> 
                         <el-form-item label='用户密钥'>
                            <span style="margin-left: 10px">{{ currentNode.clientSecretReal }}</span>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-main>
        </el-container>
    </div>
</template>


<script>
import { deleteDetails, addDetails, getDetails } from '@/api/ddpt/yysj'
import qs from 'qs'

    export default {
        data() {
            return {
                list: [],
                currentNode: {
                    name: '',
                    type: '',
                    clientId: '',
                    clientSecretReal: ''
                },
                 defaultProps: {
                    // children: 'children',
                    label: 'name',
                    value: 'clientId'
                },
                
                leftTemp: {
                    name: '',
                    type: '',
                    clientId: '',
                },
                leftFormVisible: false,
                rules: {
                    name: [
                    { required: true, message: '请输入应用名', trigger: 'blur' },
                    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                    ],
                    clientId: [
                    { required: true, message: '请输入应用编码', trigger: 'blur' },
                    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                    ],
                    type: [
                    { required: true, message: '请选择类型', trigger: 'change' },
                    ],
                },
            }
        },
        created() {
            this.getList()
        },
        methods: {
            getList() {
               getDetails().then((response) => {
                   const data = response.data
                   if(data.code == 0) {
                    this.list = data.model
                   } else {
                       this.$message.error(data.msg)
                   }
               })
            },
            resetLeftTemp() {
                this.leftTemp = {
                    name: '',
                    type: '',   
                    clientId: '',
                }
            },
            handleNodeClick(data) {
                this.currentNode = {
                    name: '',
                    type: '',
                    clientId: '',
                    clientSecretReal: ''
                },
                this.currentNode = data
                // this.getYyList()
            },
            handleLeftCreate() {
                this.resetLeftTemp()
                this.dialogStatus = 'create'
                this.leftFormVisible = true
                this.$nextTick(() => {
                    this.$refs['leftForm'].clearValidate()
                })
            },
            createLeftData() {
                this.$refs['leftForm'].validate((valid) => {
                    if(valid) {
                        addDetails(qs.stringify(this.leftTemp)).then((responsee) => {
                            const data = responsee.data
                            if(data.code == 0) {
                                this.getList()
                                this.leftFormVisible = false
                                this.$notify({
                                    title: 'Success',
                                    message: '更新成功',
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
            // handleLeftUpdate() {
            //     this.leftTemp = this.currentNode
            //     this.dialogStatus = 'update'
            //     this.leftFormVisible = true
            //     this.$nextTick(() => {
            //         this.$refs['leftForm'].clearValidate()
            //     })
            // },
            handleDelete() {
                if(!this.currentNode.clientId) {
                    this.$message.error('请先选择应用节点')
                    return
                }
                 this.$confirm('此操作将删除 ' + this.currentNode.name + ' 应用' + ', 是否继续？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                var req = this.currentNode
                deleteDetails(qs.stringify({clientId: req.clientId})).then((response) => {
                    const data =  response.data
                    if(data.code == 0) {
                        this.getList()
                        this.$notify({
                            title: 'Success',
                            message: '删除成功',
                            type: 'success',
                            duration: 2000
                        })
                        this.currentNode = {
                        }
                    } else {
                        this.$message.error(data.msg)
                    }
                })
                }).catch(() => {
                })
            },
        },
    }
</script>

<style>
    .input-width{
        width: 370px
    }
</style>