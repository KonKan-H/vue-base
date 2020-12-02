<template>
    <div>
        <!-- 右侧编辑框 -->
        <div class="ef-node-form">
            <div class="ef-node-form-header">
                编辑
            </div>
            <div class="ef-node-form-body">
                <el-form :model="node" ref="dataForm" label-width="80px" v-show="type === 'node'">
                    <!-- <el-form-item label="类型1">
                        <el-input v-model="node.type" :disabled="true"></el-input>
                    </el-form-item> -->
                    <el-form-item label="类型">
                        <!-- <el-input v-model="node.type"/> -->
                        <el-select v-model="node.type" placeholder="请选择"  clearable>
                            <el-option key="1" value="1" label="岗位"></el-option>
                            <el-option key="2" value="2" label="人员"></el-option>
                            <el-option key="3" value="3" label="单位"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item v-if="node.tp" :label="node.tp == 1 ? '岗位' : node.tp == 2 ? '人员' : '单位'">
                        <el-select v-if="node.tp == 1" v-model="node.tp" placeholder="岗位"  clearable>
                            
                        </el-select>
                        <el-select v-if="node.tp == 2" v-model="node.tp" placeholder="人员"  clearable>
                            
                        </el-select>
                        <el-select v-if="node.tp == 3" v-model="node.tp" placeholder="单位"  clearable>
                            
                        </el-select>
                    </el-form-item>
                    <el-form-item label="名称">
                        <el-input v-model="node.name"></el-input>
                    </el-form-item>
                    <el-form-item label="left坐标">
                        <el-input v-model="node.left" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="top坐标">
                        <el-input v-model="node.top" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="ico图标">
                        <el-input v-model="node.ico"></el-input>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-select v-model="node.state"  placeholder="请选择">
                            <el-option
                                v-for="item in stateList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button icon="el-icon-close" @click="node = {}">重置</el-button>
                        <el-button type="primary" icon="el-icon-check" @click="save">保存</el-button>
                    </el-form-item>
                </el-form>

                <el-form :model="line" ref="dataForm" label-width="80px" v-show="type === 'line'">
                    <el-form-item label="条件">
                        <el-input v-model="line.label"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button icon="el-icon-close" @click="line = {}">重置</el-button>
                        <el-button type="primary" icon="el-icon-check"  @click="saveLine">保存</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <!--            <div class="el-node-form-tag"></div>-->
        </div>
    </div>

</template>

<script>
    import { cloneDeep } from 'lodash'
    import { saveNode, saveLine } from '@/api/flow/flow'
    import qs from 'qs'

    export default {
        data() {
            return {
                visible: true,
                // node 或 line
                type: 'node',
                node: {},
                line: {},
                data: {},
                stateList: [{
                    value: '1',
                    label: '成功'
                }, {
                    value: '2',
                    label: '提交'
                }, {
                    value: '9',
                    label: '办结'
                }, {
                    value: '99',
                    label: '作废'
                }]
            }
        },
        methods: {
            /**
             * 表单修改，这里可以根据传入的ID进行业务信息获取
             * @param data
             * @param id
             */
            nodeInit(data, id) {
                this.type = 'node'
                this.data = data
                data.nodeList.filter((node) => {
                    if (node.id === id) {
                        this.node = cloneDeep(node)
                    }
                })
            },
            lineInit(line) {
                this.type = 'line'
                this.line = line
            },
            // 修改连线
            saveLine() {
                this.$emit('setLineLabel', this.line.from, this.line.to, this.line.label)
                var req = {}
                req.fromnodeid = this.line.from
                req.tonodeid = this.line.to
                req.name = this.line.label
                saveLine(qs.stringify({lineString:JSON.stringify(req)})).then((response) => {
                    const data = response.data
                    if(data.code == 0) {
                        this.$notify({
                            title: 'Success',
                            message: '保存成功',
                            type: 'success',
                            duration: 2000
                        })
                    } else {
                        this.$message.error(data.msg)
                    }
                })
            },
            save() {
                if(!this.node.id) {
                    this.$message.error('节点未选中')
                    return 
                }
                this.data.nodeList.filter((node) => {
                    if (node.id === this.node.id) {
                        node.nodename = this.node.name
                        node.type = this.node.type
                        node.leftR = Number(this.node.left.replace('px', ''))
                        node.topR = Number(this.node.top.replace('px', ''))
                        node.ico = this.node.ico
                        node.state = this.node.state
                        this.$emit('repaintEverything')
                        saveNode(qs.stringify({nodeString: JSON.stringify(node)})).then((response) => {
                            const data = response.data
                            if(data.code == 0) {
                                this.$notify({
                                    title: 'Success',
                                    message: '保存成功',
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
           
        }
    }
</script>

<style>
    .el-node-form-tag {
        position: absolute;
        top: 50%;
        margin-left: -15px;
        height: 40px;
        width: 15px;
        background-color: #fbfbfb;
        border: 1px solid rgb(220, 227, 232);
        border-right: none;
        z-index: 0;
    }
</style>
