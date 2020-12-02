<template>
     <div>
        <el-container>
            <el-aside>
                <div>
                <div class='tree-container'>
                    <div style="padding: 20px">
                    <el-card class="box-card">
                        <div slot="header">
                        <el-button type="primary" size="mini" @click="handleCreate" v-show="currentStatus == 1">增加</el-button>
                        <el-button type="primary" size="mini" @click="handleUpdate" v-show="currentStatus == 1">修改</el-button>
                        <el-button type="danger" size="mini" @click="handleDelete" v-show="currentStatus == 1">删除</el-button>
                        
                        <el-button type="primary" size="mini" @click="saveData" v-show="currentStatus == 2">保存</el-button>
                        <el-button type="primary" size="mini" @click="updateData" v-show="currentStatus == 3">保存</el-button>
                        <el-button type="primary" size="mini" @click="cancel" v-show="currentStatus == 2 || currentStatus == 3">取消</el-button>
                        </div>
                        <el-tree
                            :data="dataList"
                            :props="props"
                            :load="loadNode"
                            lazy
                            highlight-current	
                            @node-click='handleNodeClick'
                            :expand-on-click-node="false">
                        </el-tree>

                    </el-card>
                    </div>
                </div>
                </div>

            </el-aside>
            <el-main >
                <el-card style="width: 100%;">
                   <el-form ref="dataForm" :inline="true" :model="temp" :rules="rules" label-width="100px" >
                        <el-form-item label='类别编码' prop="classcode">
                            <!-- <span style="margin-left: 10px">{{ temp.name }}</span> -->
                            <el-input v-model="temp.classcode" style='width: 330px'  :disabled='value'/>
                        </el-form-item>
                         <el-form-item label='类别名称' prop="classname">
                            <el-input v-model="temp.classname" style='width: 330px' :disabled="value"/>
                        </el-form-item></br>
                        <el-form-item label='选项编码' prop="fieldcode">
                            <el-input v-model="temp.fieldcode" style='width: 330px' :disabled="currentStatus == 1"/>
                        </el-form-item>
                        <el-form-item label='选项名称' prop="fieldname">
                            <el-input v-model="temp.fieldname" style='width: 330px' :disabled="currentStatus == 1"/>
                        </el-form-item></br>
                        <!-- <el-form-item label='父选项编码'>
                            <el-input v-model="temp.parentcode" style='width: 330px'/>
                        </el-form-item> -->
                        <!-- <el-form-item label='类别'>
                             <el-select v-model="temp.classtype" class="input-width" :disabled="currentStatus == 1">
                                <el-option key="1" label="目录" value="1"></el-option>
                                <el-option key="2" label="选项" value="2"></el-option>
                            </el-select>
                        </el-form-item> -->
                        <el-form-item label='状态'>
                            <el-radio-group v-model="temp.status" style="width: 330px" :disabled="currentStatus == 1">
                                <el-radio label="1">启用</el-radio>
                                <el-radio label="2">停用</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label='排序号'>
                            <el-input-number v-model="temp.fieldsort" :min="0"  :disabled="currentStatus == 1"/>
                        </el-form-item></br>
                        <el-form-item label='备注'>
                            <el-input v-model="temp.remark" type="textarea" style="width: 800px" :rows="3" :disabled="currentStatus == 1"/>
                        </el-form-item></br>
                        <!-- <div>
                            <el-button type="primary">
                                确认
                            </el-button>
                        </div> -->
                    </el-form>
                </el-card>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import { getBasicData, saveBasicData, deleteData } from '@/api/basicdata/index'
    import qs from 'qs'

    export default {
        data() {
        return {
            leftFormVisible: false,
            value: true,
            temp: {
                fieldsort: 999,
                classtype: '1',
                status: '1',
            },
            currentNode: {
                fieldsort: 999,
                classtype: '1',
                status: '1',
                id: '0'
            },
            currentStatus: 1,
            dataList: [],
            props: {
                label: 'fieldname',
                //children: 'classname'，
                isLeaf: 'hasnochildren'
            },
            count: 1,
            rules: {
                classcode: [
                    { required: true, message: '请输入类别编码', trigger: 'blur' },
                    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                ],
                classname: [
                    { required: true, message: '请输入类别名称', trigger: 'blur' },
                    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                ],
                fieldcode: [
                    { required: true, message: '请输入选项编码', trigger: 'blur' },
                    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                ],
                fieldname: [
                    { required: true, message: '请输入选项名称', trigger: 'blur' },
                    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                ],
            }
        };
        },
        methods: {
            initData(){
                getBasicData().then((response) => {
                    const data = response.data
                    if(data.code == 0) {
                        this.dataList = data.model
                    } else {
                        this.$message.error(data.msg)
                    }
                })
            },
            handleCreate(){
                this.currentStatus = 2
                this.temp = {
                    fieldsort: 999,
                    classtype: '1',
                    status: '1',
                    parentcode : this.currentNode.id,
                    classcode: this.currentNode.classcode,
                    classname: this.currentNode.classname
                }
                if(this.currentNode.id == '0') {
                    this.value = false
                }
            },
            cancel() {
                this.currentStatus = 1
                this.temp = this.currentNode
                this.value = true
            },
            saveData() {
                this.value = true
                this.$refs['dataForm'].validate((valid) => {
                    if(valid) {
                        saveBasicData(qs.stringify(this.temp)).then((response) => {
                            const data = response.data
                            if(data.code == 0) {
                                this.initData()
                                this.currentStatus = 1
                                this.$message.success('新增成功')
                                this.temp = {
                                    fieldsort: 999,
                                    classtype: '1',
                                    status: '1',
                                }
                            } else {
                                this.$message.error(data.msg)
                            }
                        })
                    }
                })
            },
            handleUpdate() {
                if(!this.currentNode.classcode) {
                    this.$message.error('请先选择节点')
                    return
                }
                this.currentStatus = 3
                if(this.currentNode.parentcode == 0) {
                    this.value = false
                }
            },
            updateData() {
                saveBasicData(qs.stringify(this.temp)).then((response) => {
                    const data = response.data
                    if(data.code == 0) {
                        this.currentNode = this.temp
                        this.currentStatus = 1
                        this.$message.success(data.msg)
                    } else {
                        this.$message.error(data.msg)
                    }
                })
            },
            handleDelete() {
                if(!this.currentNode.classcode) {
                    this.$message.error('请先选择节点')
                    return
                }this.$confirm('此操作将删除 ' + this.currentNode.fieldname + ' 及其下节点' + ', 是否继续？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
            }).then((response => {
                 deleteData(qs.stringify({id: this.currentNode.id})).then((response) => {
                    const data = response.data
                    if(data.code == 0) {
                        this.initData()
                        this.$message.success('删除成功')
                        this.temp = {
                            fieldsort: 999,
                            classtype: '1',
                            status: '1',
                        }
                    } else {
                        this.$message.error(data.msg)
                    }
                })
            })) 
               
            },
            handleNodeClick(data) {
                this.currentStatus = 1
                this.currentNode = data
                this.temp = data
            },
            async loadNode(node, resolve) {
                if(node.level === 0) {
                    this.initData()
                }
                var children = [];
                if(node.level !== 0) {
                    await getBasicData(node.data.id).then((response) => {
                        const data = response.data
                        if(data.code == 0) {
                            if(data.model.length > 0) {
                                children = data.model
                            } 
                        } else {
                            this.$message.error(data.msg)
                        }
                    })
                }
                setTimeout(() => {
                    resolve(children);
                }, 150);
            }
            }
    };
</script>