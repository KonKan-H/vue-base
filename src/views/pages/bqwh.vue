<template>
	<div class="bqwh-container corresponding-items-container">
		<el-card>
			<h3 id="page-title">标签维护</h3>
			<ul>
				<li>
					<!-- <span class="select-title">年份 </span> -->
					<el-date-picker
						v-model="nf"
						value-format='yyyy'
						size='mini'
						type="year"
						placeholder="选择年"
						style="width:120px;"
						@change="ndchange">
					</el-date-picker>
				</li>
				<li>
					<el-button-group >
						<el-button type="primary" size="mini" @click="save" v-show="showbut2">保存</el-button>
						<el-button type="primary" size="mini" @click="add" v-show="showbut1">新增</el-button>
						<el-button type="primary" size="mini" @click="edit" v-show="showbut1">编辑</el-button>
						<el-button type="primary" size="mini" @click="del" v-show="showbut1">删除</el-button>
						<el-button type="primary" size="mini" @click="cancel" v-show="showbut2">取消</el-button>
					</el-button-group >	
				</li>
			</ul>
			<!-- <el-row class="row" style="margin-top:23px;">
				<el-col :span="3">
					<span class="select-title">年份 </span>
					<el-date-picker v-model="nf" value-format='yyyy' size='mini' type="year" placeholder="选择年" style="width:120px;"
					@change="ndchange">
					</el-date-picker>
				</el-col>
				
				<el-col :span="3" style="margin-left: 15px;">
					<el-button-group >
						<el-button type="primary" size="mini" @click="save" v-show="showbut2">保存</el-button>
						<el-button type="primary" size="mini" @click="add" v-show="showbut1">新增</el-button>
						<el-button type="primary" size="mini" @click="edit" v-show="showbut1">编辑</el-button>
						<el-button type="primary" size="mini" @click="del" v-show="showbut1">删除</el-button>
						<el-button type="primary" size="mini" @click="cancel" v-show="showbut2">取消</el-button>
					</el-button-group >				
				</el-col>
			</el-row> -->
		</el-card>

		<div class="bqwh-content corresponding-items-content">
		<!-- <el-container style="height: 625px;margin-top: 20px; border: 1px solid #eee">
			<el-aside width="350px" right="15px"> -->
			<el-card>
				<el-input placeholder="输入关键字进行过滤" v-model="filterText">
				</el-input>
				<el-tree ref="bqtree" :data="bqsels" :props="defaultProps" node-key="id" class="filter-tree" :default-expand-all="treeexpand"
				 @node-click="nodeclick" :show-checkbox="treecheckbox" @check-change="checkchange" :check-strictly="checkstrictly"
				 :filter-node-method="filterNode">
				</el-tree>
			</el-card>
			<!-- </el-aside>
			<el-main> -->
			<el-card>
				<vxe-form :data="bqdetail" size="medium" :span="12" title-align="left" title-width="150px" 
				ref="bqform" >
					<vxe-form-item title="标签名称">
						<template v-slot>
							<vxe-input v-model="bqdetail.name" placeholder=" "  :disabled="readonly"></vxe-input>
						</template>
					</vxe-form-item>
					<vxe-form-item title="标签编码">
						<template v-slot>
							<vxe-input v-model="bqdetail.code" placeholder=" " :disabled="readonly"></vxe-input>
						</template>
					</vxe-form-item>
					<vxe-form-item title="对应上层标签" >
						<template v-slot>
							<el-cascader v-model="bqdetail.pid" :props="defaultProps" :show-all-levels="showall" :options="bqsels"
							 placeholder="请选择" :disabled="readonly"></el-cascader>
						</template>
					</vxe-form-item>
					<vxe-form-item title="是否启用">
						<template v-slot>
							<el-select v-model="bqdetail.enable" placeholder="请选择" size='mini' class="select" :disabled="readonly">
								<el-option v-for="item in options1" :key="item.value"  :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</template>
					</vxe-form-item>
					<vxe-form-item title="概述" :span="24">
						<template v-slot>
							<vxe-textarea v-model="bqdetail.gs" placeholder=" " :disabled="readonly"></vxe-textarea>
						</template>
					</vxe-form-item>
					<vxe-form-item title="备注" :span="24" >
						<template v-slot>
							<vxe-textarea v-model="bqdetail.bz" placeholder=" " :disabled="readonly"></vxe-textarea>
						</template>
					</vxe-form-item>
					<vxe-form-item title="www " :folding="folding" >
						<template v-slot>
							<vxe-input v-model="bqdetail.id" placeholder=" "></vxe-input>
						</template>
					</vxe-form-item>
				</vxe-form>
			</el-card>
			<!-- </el-main>
		</el-container> -->
		</div>
		<el-dialog title="提示" :visible.sync="deldialog" width="25%">
			<span>{{delmessage}}</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialog1can">取 消</el-button>
				<el-button type="primary" @click="dialog1yes">确 定</el-button>
			</span>
		</el-dialog>
	</div>

</template>

<script>
	import api from "@/api/test";
	import {
		filterTree
	} from "@/assets/js/treeformat.js";
	export default {
		data() {
			return {				
				deldialog:false,
				delmessage:'',
				showbut2:false,
				showbut1:true,
				readonly:false,
				folding: true,
				clearable: true,
				showall: false,
				nf: '',
				enable: null,
				options1: [{
						value: 1,
						label: '启用'
					},
					{
						value: 2,
						label: '未启用'
					}
				],
				defaultProps: {
					value: 'id',
					label: 'name',
					children: 'children',
					checkStrictly: true
				},
				filterText: '',
				bqsels: [],
				treecheckbox: true,
				checkstrictly: true,
				treeexpand: true,
				bqdetail: {
					id:null,
					name: '',
					code: '',
					nbbm:'',
					pid: null,
					enable: null,
					gs: '',
					bz: '',
				},

			}
		},
		minxins: [filterTree],
		watch: {
			filterText(val) {
				this.$refs.bqtree.filter(val);
			}
		},
		methods: {
			dialog1can(){
				this.deldialog=false;
			},
			dialog1yes(){
				let treedata=this.$refs.bqtree.getCheckedNodes();
				var param={
					id:treedata[0].id,
					year:treedata[0].year,
				};
				api.delbqbyid(param).then(response => {
					if(response.data.success){
						this.$message("删除成功")
						for (let key in this.bqdetail) {
							this.bqdetail[key] = "";
						}
						let year=parseInt(this.nf)
						api.getbqtree(year).then(response => {
							this.bqsels = filterTree(response.data, "id", "pid");
						});
						this.deldialog=false;
					};
				});
			},
			add(){
				this.showbut2=true
				this.showbut1=false
				this.readonly=false
				for (let key in this.bqdetail) {
					this.bqdetail[key] = "";
				}
				this.$refs.bqtree.setCheckedNodes([]);
			},
			del(){
				let treedata=this.$refs.bqtree.getCheckedNodes();
				if(treedata.length==0){
					this.$message('请先选择一条标签数据')
				}
				this.deldialog=true;
				this.delmessage="确定删除这条数据？"				
			},
			save() {
				console.log(this.bqdetail.pid)
				let nbbm=this.bqdetail.pid.join('.');
				console.log(nbbm)
			
				let pid = this.bqdetail.pid.pop();
				let levelnum=this.bqdetail.pid.length;
				this.bqdetail.pid=pid;
				this.bqdetail.year=this.nf;
				this.bqdetail.levelnum=levelnum;
				this.bqdetail.isleaf=1;
				this.bqdetail.nbbm=nbbm;
				api.updatebqxx(JSON.stringify(this.bqdetail)).then(response => {
					if(response.data.success){
						this.$message("保存成功")
						let year=parseInt(this.nf)
						api.getbqtree(year).then(response => {
							this.bqsels = filterTree(response.data, "id", "pid");
						});
						this.showbut2=false
						this.showbut1=true
					}
				});
				
			},
			edit(){
				this.showbut2=true
				this.showbut1=false
				this.readonly=false
			},
			cancel(){
				let treedata=this.$refs.bqtree.getCheckedNodes();
				this.showbut2=false
				this.showbut1=true
				if(treedata.length==0){
					this.readonly=false
				}else{
					this.readonly=true
				}
				
			},
			ndchange(value) {
				api.getbqtree(value).then(response => {
					this.bqsels = filterTree(response.data, "id", "pid");
				});
			},
			filterNode(value, data) {
				if (!value) return true;
				return data.name.indexOf(value) !== -1;
			},
			nodeclick(node) {
				this.$refs.bqtree.setCheckedNodes([node]);
				var param = {
					year: parseInt(this.nf),
					bqid: node.id,
				}
				api.getbqxx(param).then(response => {
					this.bqdetail = response.data;
					this.readonly=true
				});
			},
			checkchange(data, checked, node) {
				if (checked) {
					this.$refs.bqtree.setCheckedNodes([data])
				}
			},
		},
		created() {
			var myDate = new Date();
			var tYear = myDate.getFullYear();
			this.nf = tYear.toString();
			api.getbqtree(tYear).then(response => {
				this.bqsels = filterTree(response.data, "id", "pid");
			});
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../styles/correspondingItems.scss';
</style>
