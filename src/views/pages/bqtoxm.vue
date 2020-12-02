<template>
	<div class="corresponding-items-container">
		<el-card>
			<h3 id="page-title">标签对应项目</h3>
			<ul>
				<li>
					<!-- <span class="select-title">项目年度 </span> -->
					<el-date-picker
						v-model="selection1"
						value-format='yyyy'
						size='mini'
						type="year"
						placeholder="选择年"
						style="width: 120px;"
						@change="ndchange">
					</el-date-picker>
				</li>
				<li>
					<!-- <span class="select-title">标签类型 </span> -->
					<el-select v-model="bqlx" placeholder="标签类型" size='mini' style="width: 120px;" @change="lxchange">
						<el-option v-for="item in bqlxses" :key="item.id" :label="item.label" :value="item.id">
						</el-option>
					</el-select>
				</li>
				<li>
					<el-button type="primary" size="mini" @click="savebqtoxm">保存</el-button>
				</li>
			</ul>
		</el-card>
		
		
		<div class="corresponding-items-content">
		<!-- <el-container style="margin-top: 20px;">				
			<el-aside width="300px"> -->
				<el-card>
					<h3>标签</h3>
					<el-tree
						ref="bqtree"
						:data="options"
						:show-checkbox="treecheckbox"
						:props="defaultProps"
						node-key="id"
						:default-expand-all="treeexpand"
						@node-click="nodeclick"
						@check-change="checkchange"
						:check-strictly="true">
					</el-tree>
				</el-card>
			<!-- </el-aside> -->
			
			<!-- <el-main> -->
				<el-card>
					<h3>预算项目</h3>
				<el-row class="row">
					<el-col :span="4">
						<!-- <span class="select-title">预算单位 </span> -->
						<el-cascader
							v-model="ysdwselect"
							:props="defaultProps"
							:options="ysdwselects"
							size="mini"
							placeholder="预算单位"
							style="width: 120px;"
						 	:show-all-levels="showall"
							:clearable="clearable">
						</el-cascader>
					</el-col>
					<el-col :span="4">
						<!-- <span class="select-title">项目名称 </span> -->
						<el-input
							v-model="xmmcinput"
							placeholder="项目名称"
							style="width: 120px;"
							size="mini"
							:clearable="clearable">
						</el-input>
					</el-col>
				
					<el-col :span="5">
						<!-- <span class="select-title">项目跨年度属性 </span> -->
						<el-select v-model="ndsxselect" placeholder="项目跨年度属性" size='mini' style="width: 120px;" :clearable="clearable">
							<el-option v-for="item in ndsxselects" :key="item.id" :label="item.label" :value="item.id">
							</el-option>
						</el-select>
					</el-col>
					<el-col :span="8">
						<el-button-group >
							<el-button type="primary" size='mini' @click="add">新增项目</el-button>
							<el-button type="primary" size='mini' @click="del">删除项目</el-button>
							<el-button type="primary" size='mini' @click="search">筛选</el-button>
						</el-button-group >							
					</el-col>
				</el-row>

				<div class="row" id="table">
					<vxe-table
						border
						highlight-hover-row
						width="100%"
						ref="xtable"
						highlight-current-row
						:radio-config="{trigger: 'row'}"
						:data="tableData"
						max-height="350">
						<vxe-table-column type="radio" title="" width="80"></vxe-table-column>
						<vxe-table-column type="seq" width="60"></vxe-table-column>
						<vxe-table-column field="id" title=" " :visible="false"></vxe-table-column>
						<vxe-table-column field="zrdw" title="预算单位"></vxe-table-column>
						<vxe-table-column field="xmmc" title="项目名称"></vxe-table-column>
						<vxe-table-column field="xmzje" title="项目总金额" :formatter="amountformatter"></vxe-table-column>
						<vxe-table-column field="kndsx" title="项目跨年度属性"></vxe-table-column>
						<vxe-table-column field="xmlb" title="项目类别"></vxe-table-column>
						<vxe-table-column field="zrcs" title="财政局责任处室"></vxe-table-column>
					</vxe-table>
				</div>
				</el-card>
			<!-- </el-main>
		</el-container> -->
		</div>

		
			<el-dialog title=" " :visible.sync="dialogVisible" width="80%" :before-close="handleClose">
				<ul class="filter-criteria">
					<li>
						<el-cascader
							v-model="ysdwselect"
							:props="defaultProps"
							size='mini' 
							:show-all-levels="showall"
							:options="ysdwselects"
							placeholder="预算单位"
							style="width: 120px;"
							:clearable="clearable">
						</el-cascader>
					</li>
					<li>
						<el-select
							v-model="zrcsselect"
							placeholder="责任处室"
							size='mini'
							style="width: 120px;"
							:clearable="clearable">
							<el-option
								v-for="item in zrcsselects"
								:key="item.id"
								:label="item.label"
								:value="item.id">
							</el-option>
						</el-select>
					</li>
					<li>
						<el-select
							v-model="xmlbselect"
							placeholder="项目类别"
							size='mini'
							:clearable="clearable"
							style="width: 120px;">
							<el-option
								v-for="item in xmlbselects"
								:key="item.id"
								:label="item.label"
								:value="item.id">
							</el-option>
						</el-select>
					</li>
					<li>
						<el-input
							v-model="xmmcinput1"
							placeholder="项目名称"
							style="width: 120px;"
							size="mini"
							:clearable="clearable">
						</el-input>
					</li>
					<li>
						<el-checkbox v-model="checked">仅查看未打标签项目</el-checkbox>
					</li>
					<li>
						<el-button-group >
							<el-button type="primary" size='mini' @click="search1">筛选</el-button>
							<el-button type="primary" size='mini' @click="insert">选入项目</el-button>
						 </el-button-group >
					</li>
				</ul>
				<el-divider></el-divider>
				<div class="row" id="table">
					<vxe-table
						border
						highlight-hover-row
						ref="xtable1"
						highlight-current-row
						:data="tableData1"
						:checkbox-config="{checkField: 'checked', trigger: 'row'}"
						max-height="350">
						<vxe-table-column type="checkbox" width="60"></vxe-table-column>
						<vxe-table-column type="seq" width="60"></vxe-table-column>
						<vxe-table-column field="id" title=" " :visible="false"></vxe-table-column>
						<vxe-table-column field="zrdw" title="预算单位"></vxe-table-column>
						<vxe-table-column field="xmmc" title="项目名称"></vxe-table-column>
						<vxe-table-column field="xmzje" title="项目总金额"></vxe-table-column>
						<vxe-table-column field="kndsx" title="项目跨年度属性"></vxe-table-column>
						<vxe-table-column field="xmlb" title="项目类别"></vxe-table-column>
						<vxe-table-column field="zrcs" title="财政局责任处室"></vxe-table-column>
						<vxe-table-column field="dybq" title="对应标签" :formatter="formatter1"></vxe-table-column>
					</vxe-table>
				</div>
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
				defaultProps: {
					value: 'id',
					label: 'name',
					children: 'children',
					emitPath: false,
					isLeaf: true,
				},
				bqlxses: [{
						id: 1,
						label: "标签一"
					},
					{
						id: 2,
						label: "标签二"
					}
				],
				ysdwhx: [],
				bqlx: null,
				whhx: [],
				selection1: null,
				treecheckbox: true,
				treeexpand: true,
				selectdata: null,
				options: [],
				xmmcinput: '',
				xmmcinput1: '',
				clearable: true,
				ysdwselects: [],
				ysdwselect: null,
				ysdwselect1: null,
				ndsxselects: [],
				ndsxselect: null,
				tableData: [],
				zrcsselects: [],
				zrcsselect: null,
				xmlbselects: [],
				xmlbselect: null,
				dialogVisible: false,
				tableData1: [],
				checked: false,
				treeselect: null,
				showall: false,
				treedata: null,
			}
		},
		minxins: [filterTree],
		methods: {
			checkchange(data, checked, node) {
				if (checked) {
					this.$refs.bqtree.setCheckedNodes([data])
				}
			},
			ndchange(data) {							
				api.getysdw(data).then(response => {
					if (response.data.length > 0) {
						this.ysdwselects = filterTree(response.data, "id", "pid");
					}
				});
				api.getbqtree(data).then(response => {
					this.treedata = filterTree(response.data, "id", "pid");
				});
			},
			lxchange() {
				if (this.treedata != null) {
					var param = {
						bqid: this.treedata.id,
						year: parseInt(this.selection1),
						bqlx: this.bqlx
					}
					api.getxmbybqid(param).then(response => {
						this.tableData = response.data;
					});
				}
			},
			amountformatter(cellValue) {
				return cellValue.cellValue / 10000;
			},
			add() {
				this.dialogVisible = true;
			},
			del() {
				let nodes = this.$refs.bqtree.getCheckedNodes();
				if (nodes.length == 0) {
					this.$message('请先选择一条标签类型');
					return;
				}
				this.selectdata = this.$refs.xtable.getRadioRecord();
				if (this.selectdata == null) {
					this.$message('请选择一条项目数据进行操作');
					return;
				};
				var param = {
					xmid: this.selectdata.id,
					year: this.selection1
				};
				api.delbqtoxm(param).then(response => {
					if (response.data.success) {
						this.$message('删除成功');
					}
				});
				this.$refs.xtable.removeRadioRow();
			},
			handleClose(done) {
				done();
				this.ysdwselect1 = null;
				this.zrcsselect = null;
				this.xmlbselect = null;
				this.xmmcinput1 = null;
				this.checked = false;
				this.tableData1 = [];
			},
			search() {
				var param = {
					nf: parseInt(this.selection1),
					ysdw: this.ysdwselect,
					xmmc: this.xmmcinput,
					kndsx: this.ndsxselect,
					checked: false,
				};

				api.getxmofbq(param).then(response => {
					this.tableData = response.data;
				});
			},
			search1() {
				var param = {
					nf: parseInt(this.selection1),
					ysdw: this.ysdwselect,
					zrcs: this.zrcsselect,
					xmlb: this.xmlbselect,
					xmmc: this.xmmcinput1,
					checked: this.checked,
				}
				api.getxmbysearch(param).then(response => {
					var xmlist = response.data;
					for (let i = 0; i < xmlist.length; i++) {
						xmlist[i].checked = false
					}
					this.tableData1 = xmlist;
				});

			},
			insert() {
				var selectrows = this.$refs.xtable1.getCheckboxRecords();
				if (selectrows.length == 0) {
					this.$message('请选择一条项目信息');
					return;
				}
				for (let i = 0; i < selectrows.length; i++) {
					this.tableData.push(selectrows[i])
				}
				this.dialogVisible = false;
				this.ysdwselect1 = null;
				this.zrcsselect = null;
				this.xmlbselect = null;
				this.xmmcinput1 = null;
				this.checked = false;
				this.tableData1 = [];
			},

			savebqtoxm() {
				this.treeselect = this.$refs.bqtree.getCheckedNodes();
				this.selectdata = this.$refs.xtable.getRadioRecord();
				if (this.selectdata == null) {
					this.$message('请选择一条项目信息');
					return;
				}
				if (this.treeselect.length == 0) {
					this.$message('请选择一条标签信息');
					return;
				}
				if (this.selection1 == null) {
					this.$message('请选择项目年度');
					return;
				}
				if (this.bqlx == null) {
					this.$message('请选择标签类型');
					return;
				}
				var param = {
					year: this.selection1,
					lx: this.bqlx,
					idysysxm: this.selectdata.id,
					idywjzclbdsbq: this.treeselect[0].id,
					codeywjzclbdsbq: this.treeselect[0].code,
				};
				api.savebqtoxm(JSON.stringify(param)).then(response => {
					if (response.data.success) {
						this.$message('保存成功');
					}
				});

			},
			nodeclick(node) {
				if (node.isleaf == 1) {
					this.$refs.bqtree.setCheckedNodes([node]);
					this.treedata = node
					var param = {
						bqid: node.id,
						year: parseInt(this.selection1),
						bqlx: this.bqlx
					}
					api.getxmbybqid(param).then(response => {
						this.tableData = response.data;
					});
				}
			},
			formatter1(cellValue, row, column) {
				if (cellValue.cellValue ==''||cellValue.cellValue==null) {
					return "未打标签"
				}else{
					return cellValue.cellValue
				}
			},
		},
		created() {
			var myDate = new Date();
			var tYear = myDate.getFullYear();
			this.selection1 = tYear.toString();
		
			api.getysdw(tYear).then(response => {
				this.ysdwselects = filterTree(response.data, "id", "pid");
			});
			api.getbqtree(tYear).then(response => {
				this.options = filterTree(response.data, "id", "pid");
			});
			api.getndsx().then(response => {
				this.ndsxselects = response.data;
			});
			api.getzrcs().then(response => {
				this.zrcsselects = response.data;
			});
			api.getxmlb().then(response => {
				this.xmlbselects = response.data;
			});

		}
	}
</script>

<style lang="scss" scoped>
	@import '../../styles/correspondingItems.scss';
</style>
