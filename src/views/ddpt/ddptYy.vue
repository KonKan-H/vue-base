<template>
  <div>
    <el-container>
      <el-aside>
        <div>
          <div class='tree-container'>
            <div style="padding: 20px">
              <el-card class="box-card">
                <div slot="header">
                  <el-button type="primary" size="mini" @click="handleLeftCreate">增加</el-button>
                  <el-button type="primary" size="mini" :disabled="currentNode == ''" @click="handleLeftUpdate">修改</el-button>
                  <el-button type="danger" size="mini" :disabled="currentNode == ''" @click="handleDelete">删除</el-button>
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
        </div>

        <el-dialog append-to-body :close-on-click-modal="false" :title="textMap[dialogStatus]" :visible.sync="leftFormVisible" width="500px">
          <el-form :inline="true" ref="leftForm" :model="leftTemp" :rules="rules" size="small" label-width="80px"> 
           <el-form-item label="组名" prop="zm">
              <el-input v-model="leftTemp.zm" />
            </el-form-item>
            <el-form-item label="编码" prop="bm">
              <el-input v-model="leftTemp.bm" />
            </el-form-item>
            <el-form-item label="排序">
              <el-input-number v-model="leftTemp.px" :min="1" controls-position="right"/>
            </el-form-item>
          </el-form>
           <div slot="footer" class="dialog-footer">
              <el-button @click="leftFormVisible = false">
                取消
              </el-button>
              <el-button type="primary" @click="dialogStatus==='create'?createLeftData():updateLeftData()">
                确认
              </el-button>
            </div>
        </el-dialog>
      </el-aside>
      <el-main>
        <el-card style="background: #ffffff;">
          <!-- <el-header>
            <el-button type="primary" size="mini">增加</el-button>
            <el-button type="primary" size="mini">修改</el-button>
            <el-button type="danger" size="mini">删除</el-button>
          </el-header> -->
          <el-main >
            <el-row>
                <el-col class="right-card">
                <el-card>
                  <div style="display: flex; justify-content: center; align-items: center;" @click="handleRightCreate">
                    <div style="height: 60px; width: 60px; margin: 0px 10px; margin-right: 40px; min-height:60px; min-width:60px">
                  <el-image  
                    :src="require('@/assets/images/plus1.png')"></el-image>
                    <!-- <i class="el-icon-plus"></i> -->
                  </div>
                  <div style="width: 100px;">
                    <span>创建应用</span>
                  </div>
                </div>
                </el-card>
              </el-col>
              <el-col v-for="item in yyList" :key="item.id" class='right-card'> 
                <el-card>
                  <div style="display: flex; justify-content: center; align-items: center;" @click="handleRightUpdate(item)">
                  <div style="height: 60px; width: 60px; margin: 0px 10px; margin-right: 40px; min-height:60px; min-width:60px">
                    <el-image style="border-radius:10px"
                      :src="baseUrl + '/file/getImage?type=1&itemid=' + item.id"></el-image>
                      <!-- <span>{{ item.url }}</span> -->
                  </div>
                  <div style="width: 100px;">
                    <span>{{ item.mc }}</span>
                  </div>
                </div>  
                </el-card>
              </el-col>
            </el-row>
          </el-main>
        </el-card>

        <el-dialog append-to-body :close-on-click-modal="false" title="创建组件内部应用" :visible.sync="rightFormVisible" width="670px" top="70px">
          <el-form :inline="false" ref="rightForm" :model="rightTemp" :rules="rules" size="small" label-width="90px"> 
           <!-- <el-form-item label="类型">
              <el-input v-model="rightTemp.lx" />
              <el-radio-group v-model="rightTemp.lx">
                <el-radio :label="1">HS微应用</el-radio>
                <el-radio :label="2">小程序</el-radio>
                <el-radio :label="3">机器人</el-radio>
              </el-radio-group>
            </el-form-item> -->
           <el-form-item label="应用组">
              <el-select v-model="rightTemp.idDdptYyz" class="input-width" placeholder="请选择"  >
                <el-option
                  v-for="item in list"
                  :key="item.id"
                  :label="item.zm"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
             <el-form-item label="菜单名称" prop="mc">
              <el-input v-model="rightTemp.mc" class="input-width"  />
            </el-form-item>
            <el-form-item label="第三方应用">
              <el-select v-model="rightTemp.clientId" class="input-width" placeholder="请选择"  >
                <el-option
                  v-for="item in dsfyyList"
                  :key="item.clientId"
                  :label="item.name"
                  :value="item.clientId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="编码">
              <el-input v-model="rightTemp.bm" class="input-width"  />
            </el-form-item>
             <el-form-item label="URL">
              <el-input v-model="rightTemp.url" class="input-width"/>
            </el-form-item>
            <el-form-item label="显示代办">
              <el-radio-group v-model="rightTemp.sfxzdb" class="input-width">
                <el-radio :label="0">是</el-radio>
                <el-radio :label="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="代办url">
              <el-input v-model="rightTemp.dburl" :disabled="rightTemp.sfxzdb == '1'" class="input-width"></el-input>
            </el-form-item>
            <el-form-item label="排序">
              <el-input-number v-model="rightTemp.px" :min="1" controls-position="right" style="width: 183px"/>
            </el-form-item>
          </el-form>
          
          <div>
            <div>
              <h5><span style="color: red">*</span>  图片上传</h5>
            </div>
            <el-upload
              class="avatar-uploader"
              :action="baseUrl + '/file/fileUpload'"
              :headers="headers"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :on-error="handleError"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <div style="margin-left: 80px" slot="tip" class="el-upload__tip">只能上传jpg/jpeg/png文件，且不超过100kb</div>
            </el-upload>
          </div>

           <div slot="footer" class="dialog-footer">
              <el-button @click="rightFormVisible = false">
                取消
              </el-button>
              <el-button type="primary" @click="createRightData()">
                确认
              </el-button>
            </div>
        </el-dialog>

        <el-dialog append-to-body :close-on-click-modal="false" title="运维平台" :visible.sync="rightUpdateFormVisible" width="880px" top='35px'>
          <el-form :inline="false" ref="rightUpdateForm" :model="rightTemp" :rules="rules" size="small" label-width="90px"> 
              <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1">凭证与基础信息</el-menu-item>
                <el-menu-item index="2">版本管理与发布</el-menu-item>
              </el-menu>
              <div v-if="activeIndex == 1" style="padding: 10px">
                <!-- <el-form-item label="类型">
                  <el-input v-model="rightTemp.lx" />
                  <el-radio-group v-model="rightTemp.lx">
                    <el-radio :label="1">HS微应用</el-radio>
                    <el-radio :label="2">小程序</el-radio>
                    <el-radio :label="3">机器人</el-radio>
                  </el-radio-group>
              </el-form-item> -->
              <el-form-item label="应用组">
                  <el-select v-model="rightTemp.idDdptYyz" placeholder="请选择" class="input-width" >
                    <el-option
                      v-for="item in list"
                      :key="item.id"
                      :label="item.zm"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="编码">
                  <el-input v-model="rightTemp.bm" class="input-width"/>
                </el-form-item>
                <el-form-item label="菜单名称" prop="mc">
                  <el-input v-model="rightTemp.mc" class="input-width"/>
                </el-form-item>
                <el-form-item label="第三方应用">
                  <el-select v-model="rightTemp.clientId" class="input-width" placeholder="请选择"  >
                    <el-option
                      v-for="item in dsfyyList"
                      :key="item.clientId"
                      :label="item.name"
                      :value="item.clientId">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="URL">
                  <el-input v-model="rightTemp.url" class="input-width"/>
                </el-form-item>
                <el-form-item label="显示代办">
                  <el-radio-group v-model="rightTemp.sfxzdb" class="input-width">
                    <el-radio :label="0">是</el-radio>
                    <el-radio :label="1">否</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="代办url">
                  <el-input v-model="rightTemp.dburl" :disabled="rightTemp.sfxzdb == '1'" class="input-width"></el-input>
                </el-form-item>
                <el-form-item label="排序">
                  <el-input-number v-model="rightTemp.px" :min="1" controls-position="right" style="width: 183px"/>
                </el-form-item>
                <div>
                <div>
                  <h5><span style="color: red">*</span>  图片上传</h5>
                  </div>
                  <el-upload
                    class="avatar-uploader"
                    :action="baseUrl + '/file/fileUpload'"
                    :headers="headers"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :on-error="handleError"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    <div style="margin-left: 80px" slot="tip" class="el-upload__tip">只能上传jpg/jpeg/png文件，且不超过100kb</div>
                  </el-upload>
                </div>
              </div>

              <div v-if="activeIndex == 2">
                <div style="padding: 20px">
                  <h3>应用发布（已发布）</h3>
                  <h4>应用由服务商操作发布，发布后应用会按照上方的可见范围设置出现在工作台上。</h4>
                  <!-- <el-form-item label="可使用范围设置" label-width="150px"> -->
                    <!-- <el-input v-model.number="temp.menutype" /> -->
                    <span >可使用范围设置</span>
                   <el-radio-group v-model="rightTemp.qx" style="margin-left: 50px">
                      <el-radio label="0" style="padding: 10px">全部员工</el-radio>
                      <el-radio label="1" style="padding: 10px">部分员工</el-radio>
                      <el-radio label="2" style="padding: 10px">仅限管理员</el-radio>
                    </el-radio-group>
                  <!-- </el-form-item> -->
                </div>
              </div>
          </el-form>
          <div slot="footer" class="dialog-footer">
              <el-button @click="rightUpdateFormVisible = false">
                取消
              </el-button>
              <el-button type="primary" @click="updateRightData()">
                确认
              </el-button>
              <el-button type="danger" @click="handleDeleteYy()" style="align: left">
                删除
              </el-button>
            </div>
        </el-dialog>

      </el-main>
    </el-container>
  </div>
</template>

<script>
import { getDdptYyzAll, deleteDdptYyz, updateDdptYyz, createDdptYyz } from '@/api/ddpt/yyz'
import { updateDdptYy, saveDdptYy, deleteDdptYy, getDdptYyAll } from '@/api/ddpt/yyMenu'
import {getToken} from '@/utils/auth' 
import { setSerImgId, updateImage } from '@/api/file/file'
import { getDetails } from '@/api/ddpt/yysj'
import qs from 'qs'

export default {
  data() {
    return {
      list: [],
      yyList: [],
      multipleSelection: [],
      dsfyyList: [],
      currentNode: '',
      leftFormVisible: false,
      rightFormVisible:false,
      rightUpdateFormVisible: false,
      leftTemp: {
        id: '',
        bm: '',
        zm: '',
        px: 999
      },
      rightTemp: {
        id: '',
        idDdptYyz: '',
        bm: '',
        mc: '',
        px: '999',
        lx: 1,
        url: '',
        sfxzdb: 1,
        dburl: '',
        imgId: '',
        clientId: ''
      },
      baseUrl: process.env.BASE_API,
      imageUrl: '',
      imageId: '',
      dialogStatus: '',
      activeIndex: '1',
      textMap: {
          update: '编辑',
          create: '新增'
      },  
      defaultProps: {
          children: 'children',
          label: 'zm',
          value: 'id'
      },
      headers: {},
      rules: {
        zm: [
          { required: true, message: '请输入组名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        mc: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        bm: [
          { required: true, message: '请输入编码', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        
      }
    }
  },
  created() {
    this.getList()
    this.getDsfyyList()
    this.headers = { Authorization: 'Bearer' +  getToken() }
    // console.log(window.location.origin)
    // console.log(this.baseUrl)
    //this.getYyList()
  },
  methods: {
    getDsfyyList() {
        getDetails().then((response) => {
            const data = response.data
            if(data.code == 0) {
            this.dsfyyList = data.model
            } else {
                this.$message.error(data.msg)
            }
        })
    },
    getList() {
      getDdptYyzAll().then((response) => {
        const data = response.data
        if(data.code == 0) {
          this.list = data.model
        } else {  
          this.$message.error(data.msg)
        }
      })
    },
    getYyList() {
      var req = this.currentNode
      this.yyList = []
      getDdptYyAll(req.id).then((response) => {
        const data = response.data
        if(data.code == 0) {
          this.yyList = data.model
          
        } else {
          this.$message.error(msg.msg)
        }
      })
    },
    handleNodeClick(data) {
      this.currentNode = data
      this.getYyList()
    },
    handleSelectionChange(val) {
        this.multipleSelection = val
    },
    resetLeftTemp() {
      this.leftTemp = {
        id: '',
        bm: '',
        mc: '',
        px: 999
      },
      this.imageUrl = ''
      this.imageId = ''
    },
    resetRightTemp() {
      this.rightTemp = {
        id: '',
        idDdptYyz: '',
        bm: '',
        mc: '',
        px: '999',
        lx: 1,
        url: '',
        sfxzdb: 1,
        dburl: '',
        clientId: ''
      },
      this.imageUrl = ''
      this.imageId = ''
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
          createDdptYyz(qs.stringify(this.leftTemp)).then((response) => {
            const data = response.data
            if(data.code == 0) {
              this.leftFormVisible = false
              this.getList()
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
    handleLeftUpdate() {
      this.leftTemp = this.currentNode
      this.dialogStatus = 'update'
      this.leftFormVisible = true
      this.$nextTick(() => {
          this.$refs['leftForm'].clearValidate()
      })
    },
    updateLeftData() {
      updateDdptYyz(qs.stringify(this.leftTemp)).then((response) => {
        const data = response.data
        if(data.code == 0) {
          this.leftFormVisible = false
          this.getList()
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
    },
    handleDelete() {
      this.$confirm('此操作将删除 ' + this.currentNode.zm + ' 及其下所有应用' + ', 是否继续？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
          var req = this.currentNode
           deleteDdptYyz(qs.stringify({id : req.id})).then((response) => {
              const data =  response.data
              if(data.code == 0) {
                this.getList()
                this.$notify({
                    title: 'Success',
                    message: '删除成功',
                    type: 'success',
                    duration: 2000
                })
                this.currentNode = ''
              } else {
                this.$message.error(data.msg)
              }
           })
        }).catch(() => {
        })
    },
    handleDeleteYy() {
        this.$confirm('此操作将删除 ' + this.rightTemp.mc + ' 应用' + ', 是否继续？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
          var req = this.rightTemp
           deleteDdptYy(qs.stringify({id : req.id})).then((response) => {
              const data =  response.data
              if(data.code == 0) {
                this.getList()
                this.$notify({
                    title: 'Success',
                    message: '删除成功',
                    type: 'success',
                    duration: 2000
                })
                this.resetRightTemp()
                this.getYyList()
                this.rightUpdateFormVisible = false
              } else {
                this.$message.error(data.msg)
              }
           })
        }).catch(() => {
        })
    },
    handleRightCreate() {
      this.resetRightTemp()
      if(this.currentNode) {
        this.rightTemp.idDdptYyz = this.currentNode.id
      }
      this.rightFormVisible = true
      this.$nextTick(() => {
          this.$refs['rightForm'].clearValidate()
      })
    },
    handleRightUpdate(data) {
      this.resetRightTemp()
      this.rightTemp = data
      this.rightUpdateFormVisible = true
      this.imageUrl = this.baseUrl + '/file/getImage?type=1&itemid=' + this.rightTemp.id
      this.$nextTick(() => {
          this.$refs['rightUpdateForm'].clearValidate()
      })
    },
    createRightData() {
     this.$refs['rightForm'].validate((valid) => {
       if(valid) {
         if(!this.rightTemp.idDdptYyz) {
           this.$message.error('请先选择应用组')
           return
         }
         if(!this.rightTemp.clientId) {
           this.$message.error('请先选择第三方应用')
           return
         }
          if(!this.imageId) {
              this.$message.error('请先上传图片')
              return 
          }
          saveDdptYy(qs.stringify(this.rightTemp)).then((response) => {
            const data = response.data
            if(data.code == 0) {
              this.rightFormVisible = false
              this.setItemImagId(data.model)
              this.getYyList()
            } else {
              this.$message.error(data.msg)
            }
          })
       }
     })
    },
    setItemImagId(itemId) {
       //绑定文件关联业务主表id以及类型
      const req = {
        guid: this.imageId,
        itemid: itemId,
        type: 1
      }
      setSerImgId(qs.stringify(req)).then((response) => {
        const data = response.data
        if(data.code == 0) {
          this.$notify({
          title: 'Success',
          message: '图片绑定成功',
          type: 'success',
          duration: 2000
        })
        } else {
          this.$message.error(data.msg)
        }
      })
        this.$notify({
          title: 'Success',
          message: '新增成功',
          type: 'success',
          duration: 2000
        })
    },
    updateRightData() {
      this.$refs['rightUpdateForm'].validate((valid) => {
       if(valid) {
         updateDdptYy(qs.stringify(this.rightTemp)).then((response) => {
          const data = response.data
          if(data.code == 0) {
            this.rightUpdateFormVisible = false
            if(this.imageId) {
              var req = {
                guid: this.imageId,
                itemid: this.rightTemp.id,
                type: 1
              }
              console.log(req)
              updateImage(qs.stringify(req)).then((response) => {
                const data = response.data
                if(data.code == 0) {
                  this.imageId = data.model
                } else {
                  this.$message.error(data.msg)
                }
              })
            }
            this.$notify({
                title: 'Success',
                message: '更新成功',
                type: 'success',
                duration: 2000
            })
            this.getYyList()
          } else {
            this.$message.error(data.msg)
          }
        })
        this.rightUpdateFormVisible = false
        }
      })
    },
    handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.imageId = res.model
        if(res.code === 0) {
          this.$message.success('图片上传成功')
        } else 
          this.$message.error(res.msg)
      },
    beforeAvatarUpload(file) {
        const isJPG = ['image/png', 'image/jpg', 'image/jpeg'].indexOf(file.type) > -1;
        const isLt2M = file.size / 1024 < 100;
        if (!isJPG) {
          this.$message.error('上传图片只能是 PNG/JPG/JPEG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 100KB!');
        }
        return isJPG && isLt2M;
    },
    handleError(err, file) {
      this.$message.error(err)
    },
    handleSelect(key, keyPath) {
        this.activeIndex = key
    }
  }
}
</script>

<style>
  .right-card{
    width: 230px; border-radius: 5px; background: #F2F6FC; margin: 0px 25px 25px 0px;
  }
  .avatar-uploader .el-upload {
    margin-left: 80px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 140px;
    height: 140x;
    line-height: 140px;
    text-align: center;
  }
  .avatar {
    width: 140px;
    height: 140px;
    display: block;
  }

  .input-width{
    width: 370px
  }
</style>