<template>
	<div class="items-to-tag-container">
		<el-card>
			<h3 id="page-title">项目对应标签</h3>
			<ul>
				<li>
					<el-date-picker
						v-model="selection1"
						value-format='yyyy'
						size='mini'
						type="year"
						placeholder="项目年度"
						style="width: 120px;"
					 	@change="ndchange">
					</el-date-picker>
				</li>
				<li>
					<el-select
						v-model="selection2"
						placeholder="标签类型"
						size='mini'
						class="select"
						style="width: 120px;"
						@change="lxchange">
						<el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</li>
				<li>
					<el-button type="primary" size="mini" @click="savebqtoxm">保存</el-button>
				</li>
			</ul>
		</el-card>
		
		<div class="items-to-tag-content">
			<el-card>
				<h3 style="text-align: left;margin-top: -10px;">预算项目</h3>
				<el-row class="row">
					<el-col :span="4">
						<el-cascader v-model="ysdwselect" :props="defaultProps" size="mini" :show-all-levels="showall" :options="ysdwselects"
						 placeholder="预算单位" style="width: 130px;" :clearable="clearable"></el-cascader>
					</el-col>
					<el-col :span="4">
						<el-input v-model="xmmcinput" placeholder="项目名称" style="width: 130px;" size="mini" :clearable="clearable"></el-input>
					</el-col>
					<el-col :span="4">
						<el-select v-model="ndsxselect" placeholder="项目跨年度属性" size='mini' style="width: 130px;" :clearable="clearable">
							<el-option v-for="item in ndsxselects" :key="item.id" :label="item.label" :value="item.id">
							</el-option>
						</el-select>
					</el-col>
					<el-col :span="5">
						<el-checkbox v-model="checked">仅查看未打标签项目</el-checkbox>
					</el-col>			
						<el-col :span="5">
							<el-button-group >
								<el-button type="primary" size='mini' @click="search">筛选</el-button>
								<el-button type="primary" size='mini' @click="showdetail">查看项目详情</el-button>
							</el-button-group >						
						</el-col>
				</el-row>
				<vxe-table border highlight-hover-row ref="xtable" highlight-current-row :radio-config="{trigger: 'row'}" :data="tableData"
					@cell-click="cellclick">
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
			</el-card>
			<el-card>
				<h3 style="text-align: left;margin-top: -3px; ">标签</h3>
				<div style="margin-top: 35px;">
					<el-aside width="250px" height="250px" right="15px">
						<el-tree ref="bqtree" :data="treedata" :show-checkbox="treecheckbox" node-key="id" :default-expanded-keys="treeexpand"
							:props="defaultProps" @node-click="nodeclick" @check-change="checkchange" :check-strictly="checkstrictly">
						</el-tree>
					</el-aside>
				</div>
			</el-card>	
		</el-container>
		</div>
	
		<el-dialog title=" " :visible.sync="dialogVisible" width="65%" :before-close="handleClose">
			<div style="margin-top: -15px;">
				<h2>项目详情</h2>
			</div>

			<vxe-form :data="formdata" size="medium" :span="12" title-align="left" title-width="135px">
				<vxe-form-item title="项目名称">
					<template v-slot>
						<vxe-input v-model="formdata.xmmc" placeholder=" " :disabled="disabled"></vxe-input>
					</template>
				</vxe-form-item>
				<vxe-form-item title="项目类别">
					<template v-slot>
						<vxe-input v-model="formdata.xmlb" placeholder=" " :disabled="disabled"></vxe-input>
					</template>
				</vxe-form-item>
				<vxe-form-item title="行政区划">
					<template v-slot>
						<vxe-input v-model="formdata.xzqy" placeholder=" " :disabled="disabled"></vxe-input>
					</template>
				</vxe-form-item>
				<vxe-form-item title="责任单位">
					<template v-slot>
						<vxe-input v-model="formdata.zrdw" placeholder=" " :disabled="disabled"></vxe-input>
					</template>
				</vxe-form-item>
				<vxe-form-item title="财政局责任处室">
					<template v-slot>
						<vxe-input v-model="formdata.zrcs" placeholder=" " :disabled="disabled"></vxe-input>
					</template>
				</vxe-form-item>
				<vxe-form-item title="项目总金额（万元）">
					<template v-slot>
						<vxe-input v-model="formdata.xmzje" :disabled="disabled"></vxe-input>
					</template>
				</vxe-form-item>
				<vxe-form-item title="项目年度">
					<template v-slot>
						<vxe-input v-model="formdata.year" :disabled="disabled"></vxe-input>
					</template>
				</vxe-form-item>
				<vxe-form-item title="项目跨年度属性">
					<template v-slot>
						<vxe-input v-model="formdata.kndsx" :disabled="disabled"></vxe-input>
					</template>
				</vxe-form-item>
				<vxe-form-item title="项目标签1">
					<template v-slot>
						<vxe-input v-model="formdata.bq1" :disabled="disabled"></vxe-input>
					</template>
				</vxe-form-item>
				<vxe-form-item title="项目标签2">
					<template v-slot>
						<vxe-input v-model="formdata.bq2" :disabled="disabled"></vxe-input>
					</template>
				</vxe-form-item>
				<vxe-form-item title="建设单位" v-show="extral1">
					<template v-slot>
						<vxe-input v-model="formdata.jsdw" :disabled="disabled"></vxe-input>
					</template>
				</vxe-form-item>
				<vxe-form-item title="项目地址" v-show="extral1">
					<template v-slot>
						<vxe-input v-model="formdata.xmdz" :disabled="disabled"></vxe-input>
					</template>
				</vxe-form-item>
				<vxe-form-item title="融资者模式" v-show="extral1">
					<template v-slot>
						<vxe-input v-model="formdata.trzms" :disabled="disabled"></vxe-input>
					</template>
				</vxe-form-item>
				<vxe-form-item title="项目状态" v-show="extral1">
					<template v-slot>
						<vxe-input v-model="formdata.xmzt" :disabled="disabled"></vxe-input>
					</template>
				</vxe-form-item>
				<vxe-form-item title="项目开始年份" v-show="extral2">
					<template v-slot>
						<vxe-input v-model="formdata.xmksnf" :disabled="disabled"></vxe-input>
					</template>
				</vxe-form-item>
				<vxe-form-item title="项目结束年份" v-show="extral2">
					<template v-slot>
						<vxe-input v-model="formdata.xmjsnf" :disabled="disabled"></vxe-input>
					</template>
				</vxe-form-item>
				<vxe-form-item title="政策期限">
					<template v-slot>
						<vxe-input v-model="formdata.zcqxqs" :disabled="disabled" style="width: 155px;"></vxe-input>
						-
						<vxe-input v-model="formdata.zcqxjz" :disabled="disabled" style="width: 155px;"></vxe-input>
					</template>
				</vxe-form-item>
				<vxe-form-item title="是否划转县市区">
					<template v-slot>
						<vxe-input v-model="formdata.sfhzxsq" :disabled="disabled"></vxe-input>
					</template>
				</vxe-form-item>

				<vxe-form-item title="政策依据" :span="24">
					<template v-slot>
						<vxe-textarea v-model="formdata.zcyj" :disabled="disabled"></vxe-textarea>
					</template>
				</vxe-form-item>
				<vxe-form-item title="资金来源" :span="24">
					<template v-slot>
						<vxe-textarea v-model="formdata.zjly" :disabled="disabled"></vxe-textarea>
					</template>
				</vxe-form-item>
				<vxe-form-item title="项目内容" :span="24">
					<template v-slot>
						<vxe-textarea v-model="formdata.xmnr" :disabled="disabled"></vxe-textarea>
					</template>
				</vxe-form-item>
				<vxe-form-item title="绩效目标" :span="24">
					<template v-slot>
						<vxe-textarea v-model="formdata.jxmb" :disabled="disabled"></vxe-textarea>
					</template>
				</vxe-form-item>
				<vxe-form-item title="绩效实现情况（项目进度）:" :span="24">
					<template v-slot>
						<vxe-textarea v-model="formdata.jxsxqk" :disabled="disabled"></vxe-textarea>
					</template>
				</vxe-form-item>
				<vxe-form-item title="备注：" :span="24">
					<template v-slot>
						<vxe-textarea v-model="formdata.bz" :disabled="disabled"></vxe-textarea>
					</template>
				</vxe-form-item>
			</vxe-form>
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
				disabled:true,
				defaultProps: {
					value: 'id',
					label: 'name',
					children: 'children',
					emitPath: false,
				},
				clearable: true,
				ysdwhx: [],
				selection1: null,
				selection2: 1,
				ysdwselects: [],
				ysdwselect: null,
				xmmcinput: '',
				ndsxselects: [],
				ndsxselect: null,
				checked: false,
				treedata: [],
				selectdata: null,
				treeselect: null,
				treecheckbox: true,
				treeexpand: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
				tableData: [],
				dialogVisible: false,
				extral1: true,
				extral2: true,
				showall: false,
				checkstrictly: true,
				formdata: {},
				options1: [{
					value: 1,
					label: "标签一"
				}, {
					value: 2,
					label: "标签二"
				}],
			}
		},
		minxins: [filterTree],
		methods: {
			ndchange(data) {
				this.$refs.bqtree.setCheckedNodes([]);
				api.getysdw(data).then(response => {
					if (response.data.length > 0) {
						this.ysdwselects = filterTree(response.data, "id", "pid");
					}
				});
				api.getbqtree(data).then(response => {
					this.treedata = filterTree(response.data, "id", "pid");
				});
			},
			lxchange(data) {
				this.selectdata = this.$refs.xtable.getRadioRecord();
				if (this.selectdata != null) {
					var param = {
						xmid: this.selectdata.id,
						year: this.selection1,
						bqlx: data
					}
					api.getbqbyxmid(param).then(response => {
						this.$refs.bqtree.setCheckedKeys([response.data.idywjzclbdsbq])
					});
				}
			},
			checkchange(data, checked, node) {
				if (checked) {
					this.$refs.bqtree.setCheckedNodes([data])
				}
			},
			amountformatter(cellValue) {
				return cellValue.cellValue / 10000;
			},
			savebqtoxm() {
				this.treeselect = this.$refs.bqtree.getCheckedNodes();
				this.selectdata = this.$refs.xtable.getRadioRecord();
				if (this.selectdata == null) {
					this.$message('请选择一条项目信息');
					return;
				}
				if (this.treeselect.length > 1 || this.treeselect.length == 0) {
					this.$message('请选择一条标签信息');
					return;
				}
				if (this.selection1 == null) {
					this.$message('请选择项目年度');
					return;
				}
				if (this.selection2 == null) {
					this.$message('请选择标签类型');
					return;
				}
				var param = {
					year: this.selection1,
					lx: this.selection2,
					idysysxm: this.selectdata.id,
					idywjzclbdsbq: this.treeselect[0].id,
					codeywjzclbdsbq: this.treeselect[0].code,
				};
				api.savebqtoxm(JSON.stringify(param)).then(response => {
					if (response.data.success) {
						this.$message('保存成功');
					} else {
						this.$message(response.data.content)
					}
				});
			},
			search() {
				var param = {
					nf: parseInt(this.selection1),
					ysdw: this.ysdwselect,
					xmmc: this.xmmcinput,
					kndsx: this.ndsxselect,
					checked: this.checked,
				};
				api.getxmofbq(param).then(response => {
					this.tableData = response.data;
				});
			},
			showdetail() {
				this.selectdata = this.$refs.xtable.getRadioRecord();
				if (this.selectdata == null) {
					this.$message('请选择一条数据');
					return;
				}
				var param = {
					xmid: this.selectdata.id,
					year: parseInt(this.selection1)
				}

				api.getxmdetail(param).then(response => {
					var res = response.data.ysxm;
					var amount = res.xmzje;
					res.xmzje = amount / 10000;
					this.formdata = res;
					var xmlb = parseInt(response.data.xmlb);
					var xmkndsx = parseInt(response.data.kndsx)
					if (xmlb == 3 || xmlb == 4) {
						this.extral1 = true;
					} else {
						this.extral1 = false;
					}
					if (xmkndsx == 3) {
						this.extral2 = true;
					} else {
						this.extral2 = false;
					}
				});
				this.dialogVisible = true;
			},
			handleClose(done) {
				done();
				for (let key in this.formdata) {
					this.formdata[key] = "";
				};

			},
			cellclick(row) {
				var param = {
					xmid: row.row.id,
					year: this.selection1,
					bqlx: this.selection2
				}
				api.getbqbyxmid(param).then(response => {
					this.$refs.bqtree.setCheckedKeys([response.data.idywjzclbdsbq])
				});
			},
			nodeclick(node) {
				if (node.isleaf == 1) {
					this.$refs.bqtree.setCheckedNodes([node]);
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
				this.treedata = filterTree(response.data, "id", "pid");
			});
			api.getndsx().then(response => {
				this.ndsxselects = response.data;
			});


		},

	}
</script>

<style lang="scss" scoped>
	@import "../../styles/itemsToTag.scss";
</style>
