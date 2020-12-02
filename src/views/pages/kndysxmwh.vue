<template>
	<div class="table-container">
		<el-card>
			<h3 id="page-title">跨年度预算项目维护</h3>
			<ul>
				<li>
					<el-date-picker
						v-model="value4"
						value-format='yyyy' 
						size='mini'
						type="year"
						placeholder="项目年度"
						style="width: 120px;"
						@change="nfchange"
						:clearable="clearable">
					</el-date-picker>
				</li>
				<li>
					<el-cascader
						v-model="selection2"
						:props="defaultProps"
						:show-all-levels="showall"
						:options="ysdwselects"
						:clearable="clearable"
						placeholder="预算单位"
						style="width: 120px;">
					</el-cascader>
				</li>
				<li>
					<el-input v-model="selection3" placeholder="项目名称 " style="width: 120px;" size="mini"></el-input>
				</li>
				<li>
					<el-button-group>
						<el-button type="primary" @click="add">新增</el-button>
						<el-button type="primary" @click="edit">编辑</el-button>
						<el-button type="primary" @click="del">删除</el-button>
						<el-button type="primary" @click="search">查询</el-button>
						<el-button type="primary" @click="clear">重置</el-button>
						<el-upload style="display: inline;" :show-file-list="uplist" class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"
						:on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3"
						:on-exceed="handleExceed" :file-list="fileList">
						<el-button type="primary">导入</el-button>
						</el-upload>
					</el-button-group>
				</li>
			</ul>
		</el-card>
		<el-card class="down-table">
			<vxe-table
				border
				resizable
				show-overflow
				class="checkbox-table"
				keep-source
				ref="xTable"
				:data="tableData"
			 	:checkbox-config="{checkField: 'checked', trigger: 'row'}"
				max-height="350">
				<vxe-table-column type="checkbox" width="60"></vxe-table-column>
				<vxe-table-column type="seq" width="60"></vxe-table-column>
				<vxe-table-column field="id" title=" " :visible="false"></vxe-table-column>
				<vxe-table-column field="zrdw" title="预算单位"></vxe-table-column>
				<vxe-table-column field="xmmc" title="项目名称"></vxe-table-column>
				<vxe-table-column field="year" title="项目年度"></vxe-table-column>
				<vxe-table-column field="xmzje" title="项目总金额" :formatter="amountformatter"></vxe-table-column>
				<vxe-table-column field="kndsx" title="项目跨年度属性"></vxe-table-column>
				<vxe-table-column field="xmlb" title="项目类别"></vxe-table-column>
				<vxe-table-column field="zrcs" title="财政局责任处室"></vxe-table-column>
				<vxe-table-column field="xzqy" title="行政区域"></vxe-table-column>
			</vxe-table>
			<p>
				<vxe-pager :current-page.sync="page.currentPage" :page-size.sync="page.pageSize" :total="page.totalResult"
				 @page-change="pagechange" :layouts="['PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'Sizes', 'FullJump', 'Total']">
				</vxe-pager>
			</p>
		</el-card>

		<el-dialog title=" " :visible.sync="dialogVisible" width="65%" :before-close="handleClose">
			<el-tabs v-model="activeName2" type="card" @click.native="handleClick">
				<el-tab-pane label="项目信息" name="first">
					<div class="savebtn">
						<el-row class="row">
							<el-col :span="1">
								<el-button type="primary" size="mini" @click="save">保存</el-button>
							</el-col>
						</el-row>
					</div>
					<vxe-form :data="formdata" size="medium" :span="12" title-align="left" title-width="135px" ref="xmxxform" :rules="rules">
						<vxe-form-item title="项目名称" field="xmmc">
							<template v-slot>
								<vxe-input v-model="formdata.xmmc" placeholder=" " clearable></vxe-input>
							</template>
						</vxe-form-item>

						<vxe-form-item title="项目类别" field="xmlbid">
							<template v-slot>
								<el-select v-model="formdata.xmlbid" placeholder="请选择" @change="xmlbchange">
									<el-option v-for="item in xmlbselects" :key="item.id" :label="item.label" :value="item.id">
									</el-option>
								</el-select>
							</template>
						</vxe-form-item>
						<vxe-form-item title="行政区划" field="xzqhid">
							<template v-slot>
								<el-select v-model="formdata.xzqhid" placeholder="请选择" @change="xzqhchange">
									<el-option v-for="item in xzqhselects" :key="item.id" :label="item.label" :value="item.id">
									</el-option>
								</el-select>
							</template>
						</vxe-form-item>
						<vxe-form-item title="项目年度">
							<template v-slot>
								<el-date-picker v-model="formdata.year" type="year" value-format='yyyy' style="width: 325px;" placeholder="选择日期"
								 @change="xmndchange">
								</el-date-picker>
							</template>
						</vxe-form-item>
						<vxe-form-item title="责任单位" field="zrdw">
							<template v-slot>
								<el-cascader v-model="formdata.zrdw" :props="defaultProps" :show-all-levels="showall" :options="formysdwselects"
								 placeholder="请选择"></el-cascader>
							</template>
						</vxe-form-item>
						<vxe-form-item title="财政局责任处室">
							<template v-slot>
								<el-select v-model="formdata.zrcs" placeholder="请选择">
									<el-option v-for="item in zrcsselects" :key="item.id" :label="item.label" :value="item.id">
									</el-option>
								</el-select>
							</template>
						</vxe-form-item>
						<vxe-form-item title="项目总金额（万元)" field="jexmzje">
							<template v-slot>
								<vxe-input v-model="formdata.jexmzje" placeholder=" "></vxe-input>
							</template>
						</vxe-form-item>

						<vxe-form-item title="项目跨年度属性">
							<template v-slot>
								<el-select v-model="formdata.xmkndsxid" placeholder="请选择" @change="ndsxchange">
									<el-option v-for="item in ndsxselects" :key="item.id" :label="item.label" :value="item.id">
									</el-option>
								</el-select>
							</template>
						</vxe-form-item>
						<vxe-form-item title="项目标签1" field="bqjzclbdsyicode" v-show="extral3">
							<template v-slot>
								<vxe-input v-model="formdata.bqjzclbdsyicode" placeholder=" " clearable></vxe-input>
							</template>
						</vxe-form-item>
						<vxe-form-item title="项目标签2" v-show="extral3">
							<template v-slot>
								<vxe-input v-model="formdata.bqjzclbdsercode" placeholder=" "></vxe-input>
							</template>
						</vxe-form-item>
						<vxe-form-item title="建设单位" v-show="extral1">
							<template v-slot>
								<vxe-input v-model="formdata.jsdw" placeholder=" " clearable></vxe-input>
							</template>
						</vxe-form-item>
						<vxe-form-item title="项目地址" v-show="extral1">
							<template v-slot>
								<vxe-input v-model="formdata.xmdz" placeholder=" "></vxe-input>
							</template>
						</vxe-form-item>
						<vxe-form-item title="融资者模式" v-show="extral1">
							<template v-slot>
								<el-select v-model="formdata.trzmsid" placeholder="请选择" @change="trzmschange">
									<el-option v-for="item in trzselects" :key="item.id" :label="item.label" :value="item.id">
									</el-option>
								</el-select>
							</template>
						</vxe-form-item>
						<vxe-form-item title="项目状态" v-show="extral1">
							<template v-slot>
								<el-select v-model="formdata.xmztid" placeholder="请选择" @change="xmztchange">
									<el-option v-for="item in xmztselects" :key="item.id" :label="item.label" :value="item.id">
									</el-option>
								</el-select>
							</template>
						</vxe-form-item>
						<vxe-form-item title="项目开始年份">
							<template v-slot>
								<el-date-picker v-model="formdata.xmksnf" type="year" style="width: 325px;" placeholder="选择日期" value-format='yyyy'>
								</el-date-picker>
							</template>
						</vxe-form-item>
						<vxe-form-item title="项目结束年份">
							<template v-slot>
								<el-date-picker v-model="formdata.xmjsnf" type="year" style="width: 325px;" placeholder="选择日期" value-format='yyyy'>
								</el-date-picker>
							</template>
						</vxe-form-item>
						<vxe-form-item title="政策期限">
							<template v-slot>
								<el-date-picker v-model="formdata.zcqxqs" type="date" style="width: 155px;" placeholder="选择日期">
								</el-date-picker> -
								<el-date-picker v-model="formdata.zcqxjz" type="date" style="width: 155px;" placeholder="选择日期">
								</el-date-picker>
								<!-- <vxe-input v-model="formdata.zcqxqs" placeholder=" " style="width: 99px;"></vxe-input> -
										<vxe-input v-model="formdata.zcqxjz" placeholder=" " style="width: 99px;"></vxe-input> -->
							</template>
						</vxe-form-item>
						<vxe-form-item title="是否划转县市区">
							<template v-slot>
								<el-select v-model="formdata.sfhzxsq" placeholder="请选择">
									<el-option v-for="item in sfhzxsqsel" :key="item.id" :label="item.label" :value="item.id">
									</el-option>
								</el-select>
							</template>
						</vxe-form-item>

						<vxe-form-item title="政策依据" :span="24">
							<template v-slot>
								<vxe-textarea v-model="formdata.zcyj" placeholder=" "></vxe-textarea>
							</template>
						</vxe-form-item>
						<vxe-form-item title="资金来源" :span="24">
							<template v-slot>
								<vxe-textarea v-model="formdata.zjly" placeholder=" "></vxe-textarea>
							</template>
						</vxe-form-item>
						<vxe-form-item title="项目内容" :span="24">
							<template v-slot>
								<vxe-textarea v-model="formdata.xmnr" placeholder=" "></vxe-textarea>
							</template>
						</vxe-form-item>
						<vxe-form-item title="绩效目标" :span="24">
							<template v-slot>
								<vxe-textarea v-model="formdata.jxmb" placeholder=" "></vxe-textarea>
							</template>
						</vxe-form-item>
						<vxe-form-item title="绩效实现情况（项目进度）:" :span="24">
							<template v-slot>
								<vxe-textarea v-model="formdata.jxsxqk" placeholder=" "></vxe-textarea>
							</template>
						</vxe-form-item>
						<vxe-form-item title="备注：" :span="24">
							<template v-slot>
								<vxe-textarea v-model="formdata.bz" placeholder=" "></vxe-textarea>
							</template>
						</vxe-form-item>
						<vxe-form-item title="www " :folding="folding">
							<template v-slot>
								<vxe-input v-model="formdata.id" placeholder=" " clearable></vxe-input>
							</template>
						</vxe-form-item>
					</vxe-form>
				</el-tab-pane>
				<el-tab-pane label="预算情况表" name="second" :disabled="tabsec">
					<div class="savebtn">
						<el-row class="row">
							<el-col :span="1">
								<el-button type="primary" size="mini" @click="save">保存</el-button>
							</el-col>
						</el-row>
					</div>


					<div>
						<el-row class="row">
							<el-col :span="4">
								<span>年度 </span>
								<el-date-picker v-model="ndselect" value-format='yyyy' size='mini' type="year" placeholder="选择年" style="width: 120px;"
								 @change="ndchange">
								</el-date-picker>
							</el-col>
						</el-row>
					</div>
					<div class="row">
						<vxe-grid border stripe resizable height="500" :columns="tableColumn" :data="tableData1" ref="ysqkgrid"
						 :edit-config="{trigger: 'click', mode: 'cell'}" @edit-closed="inputchange">
						</vxe-grid>
					</div>
				</el-tab-pane>
			</el-tabs>
		</el-dialog>


		<el-dialog title="提示" :visible.sync="dialogVisible1" width="25%">
			<span>{{xmlbdialog}}</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialog1can">取 消</el-button>
				<el-button type="primary" @click="dialog1yes">确 定</el-button>
			</span>
		</el-dialog>

		<el-dialog title="提示" :visible.sync="xmnddialog" width="25%">
			<span>{{xmndmessage}}</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="xmnddialogcan">取 消</el-button>
				<el-button type="primary" @click="xmnddialogyes">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="提示" :visible.sync="deldialog" width="25%">
			<span>{{delmessage}}</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="deldialogcan">取 消</el-button>
				<el-button type="primary" @click="deldialogyes">确 定</el-button>
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
				tabsec:true,
				deldialog:false,
				delmessage:'',
				activeName2: 'first',
				page: {
					currentPage: 1,
					pageSize: 5,
					totalResult: null,
				},
				xmnddialog: false,
				xmndmessage: '',
				formysdwselects: [],
				showall: false,
				ysdwselects: [],
				defaultProps: {
					value: 'id',
					label: 'name',
					children: 'children',
					emitPath: false,
					//multiple: false,
				},
				folding: true,
				dialogVisible1: false,
				xmlbdialog: '',
				tableData: [],
				options2: [],
				options3: [],
				selection2: null,
				selection3: '',
				ndselect: '',
				ndsxselects: [],
				xmlbselects: [],
				xzqhselects: [],
				xmztselects: [],
				trzselects: [],
				zrcsselects: [],
				sfhzxsqsel: [{
						id: 1,
						label: "是"
					},
					{
						id: 2,
						label: "否"
					}
				],
				dialogVisible: false,
				value4: null,
				totalysxm: [],
				clearable: true,
				//表单数据
				formdata: {
					xmmc: '',
					xmlbid: null,
					xmlbcode: '',
					xzqhid: '',
					xzqhcode: '',
					zrdw: null,
					zrcs: null,
					jexmzje: null,
					year: '',
					xmkndsxid: null,
					xmkndsxcode: '',
					bqjzclbdsyiid: null,
					bqjzclbdsyicode: '',
					bqjzclbdserid: null,
					bqjzclbdsercode: '',
					jsdw: '',
					xmdz: '',
					trzmsid: null,
					trzmscode: '',
					xmztid: null,
					xmztcode: '',
					xmksnf: null,
					xmjsnf: null,
					zcyj: '',
					zjly: '',
					xmnr: '',
					jxmb: '',
					jxsxqk: '',
					zcqxqs: '',
					zcqxjz: '',
					sfhzxsq: null,
					bz: ''
				},
				extral1: false,
				extral3: false,
				//项目类别
				xmlb: null,
				//项目跨年度属性
				xmkndsx: null,
				//选中行数据
				selectdata: [],
				//展示上传成功文件列表
				uplist: false,
				fileList: [],
				rules: {
					xmmc: [{
						required: true,
						message: '请输入项目名称',
					}],
					xmlbid: [{
						required: true,
						message: '请输入项目类别',
					}],
					xzqhid: [{
						required: true,
						message: '请输入行政区划',
					}],
					zrdw: [{
						required: true,
						message: '请输入责任单位',
					}],
					jexmzje: [{
						required: true,
						message: '请输入项目总金额',
					}],
					bqjzclbdsyicode: [{
						required: true,
						message: '请选择标签一',
					}],
					zcyj: [{
						required: true,
						message: '请输入政策依据',
					}],
					zjly: [{
						required: true,
						message: '请输入资金来源',
					}],
					xmnr: [{
						required: true,
						message: '请输入项目内容',
					}],
					jxmb: [{
						required: true,
						message: '请输入绩效目标',
					}],
					jxsxqk: [{
						required: true,
						message: '请输入绩效实现情况',
					}]
				},
				tableColumn: [{
						field: 'id',
						title: '',
						visible: false
					}, {
						field: 'ysnd',
						title: ' 预算年度',
						width: '100px',
					},
					{
						field: 'total',
						title: '资金投入合计',
						width: '120px',
						editRender: {
							name: 'input'
						}
					},
					{
						field: 'govtotal',
						title: '政府性资金合计',
						width: '120px',
						editRender: {
							name: 'input'
						}
					},
					{
						title: '资金',
						align: 'center',
						children: [{
								field: 'plus1',
								title: '小计',
								width: '120px',
								editRender: {
									name: 'input'
								}
							},
							{
								field: 'zjybggys',
								title: '一般公共预算',
								width: '100px',
								editRender: {
									name: 'input'
								}
							},
							{
								field: 'zjzfxjjys',
								title: '政府性基金预算',
								width: '100px',
								editRender: {
									name: 'input'
								}
							},
							{
								field: 'zjgyzbjyys',
								title: '国有资本经营预算',
								width: '100px',
								editRender: {
									name: 'input'
								}
							},
							{
								field: 'zjqt',
								title: '其他',
								width: '100px',
								editRender: {
									name: 'input'
								}
							},
						]
					},
					{
						title: '资产',
						align: 'center',
						children: [{
								field: 'plus2',
								title: '小计',
								width: '100px',
								editRender: {
									name: 'input'
								}
							},
							{
								field: 'zcchuzusr',
								title: '资产出租收入',
								width: '100px',
								editRender: {
									name: 'input'
								}
							},
							{
								field: 'zcchuzhisr',
								title: '资产处置收入',
								width: '100px',
								editRender: {
									name: 'input'
								}
							},
							{
								field: 'zcdwtcsy',
								title: '对外投资收益',
								width: '100px',
								editRender: {
									name: 'input'
								}
							},
							{
								field: 'zczczr',
								title: '资产注入',
								width: '100px',
								editRender: {
									name: 'input'
								}
							},
						]
					},
					{
						title: '资产',
						align: 'center',
						children: [{
								field: 'plus3',
								title: '小计',
								width: '100px',
								editRender: {
									name: 'input'
								}
							},
							{
								field: 'zyysschzy',
								title: '要素市场化资源',
								width: '100px',
								editRender: {
									name: 'input'
								}
							},
							{
								field: 'zyxzspzy',
								title: '行政审批资源',
								width: '100px',
								editRender: {
									name: 'input'
								}
							},
						]
					},

					{
						field: 'gygszyzj',
						title: '国有公司自有资金',
						width: '100px',
						editRender: {
							name: 'input'
						}
					},
					{
						field: 'ydjrcb',
						title: '引导金融资本、社会资本投入',
						width: '100px',
						editRender: {
							name: 'input'
						}
					},
				],
				tableData1: [],
			}
		},
		minxins: [filterTree],
		methods: {
			inputchange(item) {
				const sum = this.tableData1[item.rowIndex];				 	 	
				sum.plus1 = Number(sum.zjybggys || 0) + Number(sum.zjzfxjjys || 0) + Number(sum.zjgyzbjyys || 0)+Number(sum.zjqt || 0)			
				sum.plus2=Number(sum.zcchuzusr || 0) +Number(sum.zcchuzhisr || 0) +Number(sum.zcdwtcsy || 0) +Number(sum.zczczr || 0) 
				sum.plus3=Number(sum.zyysschzy || 0) +Number(sum.zyxzspzy || 0) 
				sum.govtotal=Number(sum.plus1 || 0)+Number(sum.plus2 || 0)+Number(sum.plus3 || 0)
				sum.total=Number(sum.govtotal || 0)+Number(sum.gygszyzj || 0)+Number(sum.ydjrcb || 0)
			},
			deldialogcan(){
				this.deldialog=false;
			},
			deldialogyes(){
				var datas = [];
				for (let i = 0; i < this.selectdata.length; i++) {
					var data = {};
					data.id = this.selectdata[i].id;
					data.year = this.selectdata[i].year;
					datas.push(data);
				}
				api.delxmbyid(JSON.stringify(datas)).then(response => {
					if (response.data.success) {
						this.$message('删除成功');
						var param = {
							ndsx: "3",
							year: this.value4
						}
						api.getysxmbyndsx(param).then(response => {
							var xmlist = response.data;
							for (let i = 0; i < xmlist.length; i++) {
								xmlist[i].checked = false
							}
							this.tableData = xmlist;
						});
					}
				});
				this.deldialog=false;
			},
			handleClick(tab, event) {
					if(this.formdata.year==''){
						this.$message("请先选择项目年度");
					}
			},
			xmnddialogcan() {
				this.xmnddialog = false;
				this.formdata.year = '';
			},
			xmnddialogyes() {
				let year = this.formdata.year;
				api.getysdw(year).then(response => {
					this.formysdwselects = filterTree(response.data, "id", "pid");
				});
				this.tableData1 = [];
				this.ndselect = year.toString();
				var begin = parseInt(this.ndselect);
				let obj = {
					ysnd: (begin - 1) + '年预算'
				};
				this.tableData1.push(obj);
				for (var i = 0; i < 4; i++) {
					let obj = {};
					obj.ysnd = begin + '年预算';
					begin += 1;
					this.tableData1.push(obj);
				};
				this.xmnddialog = false;
				this.tabsec=false;
			},
			nfchange(data) {
				var param = {
					ndsx: "3",
					year: data
				}
				api.getysxmbyndsx(param).then(response => {
					this.tableData = response.data;
				});
				api.getysdw(data).then(response => {
					if (response.data.length > 0) {
						this.ysdwselects = filterTree(response.data, "id", "pid");
					}
				});
			},
			amountformatter(cellValue) {
				return cellValue.cellValue / 10000;
			},
			dialog1can() {
				this.dialogVisible1 = false;
				this.formdata.xmlbid = null
				this.extral1 = false
			},
			dialog1yes() {
				this.dialogVisible1 = false;
				this.extral1 = true
			},
			add() {
				this.extral3 = false;
				this.dialogVisible = true;
			},
			del() {
				this.selectdata = this.$refs.xTable.getCheckboxRecords();
				if (this.selectdata.length == 0) {
					this.$message('请选择数据进行操作');
					return;
				};
				this.delmessage="确定删除选中数据？";
				this.deldialog=true;
			
			},
			pagechange(currentPage) {
				this.page.currentPage = currentPage.currentPage;
				this.page.pageSize = currentPage.pageSize;
				var xmlist = this.totalysxm.slice(this.page.currentPage * this.page.pageSize - this.page.pageSize,
					this.page.currentPage * this.page.pageSize);
				for (let i = 0; i < xmlist.length; i++) {
					xmlist[i].checked = false
				}
				this.tableData = xmlist;
			},
			edit() {
				this.tabsec=false;
				this.extral3 = true;
				this.selectdata = this.$refs.xTable.getCheckboxRecords();
				if (this.selectdata.length == 0 || this.selectdata.length > 1) {
					this.$message('请选择一条数据进行操作');
					return;
				}
				var id = this.selectdata[0].id;
				var year = this.selectdata[0].year;
				var param = {
					id: id,
					year: year
				};
				api.getysxmbyid(param).then(response => {
					var map = response.data;
					this.formdata = map.ysxm;
					var map1 = map.bq1;
					var map2 = map.bq2;
					if (map1 != null) {
						var bq1 = map.bq1.NAME;
						this.formdata.bqjzclbdsyicode = bq1;
					}
					if (map2 != null) {
						var bq2 = map.bq2.NAME;
						this.formdata.bqjzclbdsercode = bq2;
					}
					var year = this.formdata.year;
					api.getysdw(year).then(response => {
						this.formysdwselects = filterTree(response.data, "id", "pid");
					});
					var ks = this.formdata.xmksnf;
					var js = this.formdata.xmjsnf
					var amount = this.formdata.jexmzje;
					this.formdata.jexmzje = amount / 10000
					this.formdata.year = year.toString()
					if (ks != null && js != null) {
						if (this.formdata.xmkndsxcode == 3) {
							this.formdata.xmksnf = ks.toString()
							this.formdata.xmjsnf = js.toString()
						}
					}
					var xmlb = this.formdata.xmlbid;
					var xmkndsx = this.formdata.xmkndsxid;
					if (xmlb == 3 || xmlb == 4) {
						this.extral1 = true;
					} else {
						this.extral1 = false;
					}

					//预算情况表
					this.tableData1 = map.ysqk;
					this.ndselect = year.toString();

					if (this.tableData1.length > 0) {
						for (let i = 0; i < this.tableData1.length; i++) {
							const obj=this.tableData1[i]
							let ysnd = obj.ysnd + '年预算'
							obj.ysnd = ysnd
							obj.zjybggys=obj.zjybggys/10000
							obj.zjzfxjjys=obj.zjzfxjjys/10000
							obj.zjgyzbjyys=obj.zjgyzbjyys/10000
							obj.zjqt=obj.zjqt*10000
							obj.zcchuzusr=obj.zcchuzusr/10000
							obj.zcchuzhisr=obj.zcchuzhisr/10000
							obj.zcdwtzsy=obj.zcdwtzsy/10000
							obj.zczczr=obj.zczczr/10000
							obj.zyysschzy=obj.zyysschzy/10000
							obj.zyxzspzy=obj.zyxzspzy/10000
							obj.gygszyzj=obj.gygszyzj/10000
							obj.ydjrcb=obj.ydjrcb/10000
							obj.plus1=obj.zjybggys+obj.zjzfxjjys+obj.zjgyzbjyys+obj.zjqt
							obj.plus2=obj.zcchuzusr+obj.zcchuzhisr+obj.zcdwtzsy+obj.zczczr
							obj.plus3=obj.zyysschzy+obj.zyxzspzy
							obj.govtotal=obj.plus1+obj.plus2+obj.plus3
							obj.total=obj.govtotal+obj.gygszyzj+obj.ydjrcb
						}
					} else {
						var begin = year;
						let obj = {
							ysnd: (begin - 1) + '年预算'
						};
						this.tableData1.push(obj);
						for (var i = 0; i < 4; i++) {
							let obj = {};
							obj.ysnd = begin + '年预算';
							begin += 1;
							this.tableData1.push(obj);
						}
					}
				});
				this.dialogVisible = true;
			},

			ndchange(ndselect) {
				this.tableData1 = [];
				var begin = parseInt(ndselect);
				let obj = {
					ysnd: (begin - 1) + '年预算'
				};
				this.tableData1.push(obj);
				for (var i = 0; i < 4; i++) {
					let obj = {};
					obj.ysnd = begin + '年预算';
					begin += 1;
					this.tableData1.push(obj);
				};
			},
			save() {
			var formdata = this.formdata;
			formdata.jexmzje=formdata.jexmzje*10000
			var tabledata=this.tableData1;
			for(let i=0;i<tabledata.length;i++){
				const obj=this.tableData1[i]
				delete obj._XID
				obj.zjybggys=obj.zjybggys*10000
				obj.zjzfxjjys=obj.zjzfxjjys*10000
				obj.zjgyzbjyys=obj.zjgyzbjyys*10000
				obj.zjqt=obj.zjqt*10000
				obj.zcchuzusr=obj.zcchuzusr*10000
				obj.zcchuzhisr=obj.zcchuzhisr*10000
				obj.zcdwtzsy=obj.zcdwtzsy*10000
				obj.zczczr=obj.zczczr*10000
				obj.zyysschzy=obj.zyysschzy*10000
				obj.zyxzspzy=obj.zyxzspzy*10000
				obj.gygszyzj=obj.gygszyzj*10000
				obj.ydjrcb=obj.ydjrcb*10000
			}												
			var param = {
				formdata: JSON.stringify(formdata),
				tabledata:JSON.stringify(tabledata)
			}
				api.saveysxm(param).then(response => {
					if (response.data.success) {
						this.$message('保存成功');
						this.tableData1 = [];
						this.ndselect = '';
						for (let key in this.formdata) {
							this.formdata[key] = "";
						}
						var param = {
							ndsx: "3",
							year: this.value4
						}
						api.getysxmbyndsx(param).then(response => {
							var xmlist = response.data;
							for (let i = 0; i < xmlist.length; i++) {
								xmlist[i].checked = false
							}
							this.tableData = xmlist;
						});
					}
				});
				this.dialogVisible = false
			},

			handleClose(done) {
				done();
				var param = {
					year: this.value4,
					ndsx: '3,'
				}
				api.getysxmbyndsx(param).then(response => {
					var xmlist = response.data;
					for (let i = 0; i < xmlist.length; i++) {
						xmlist[i].checked = false
					}
					this.tableData = xmlist;
				});
				this.tableData1 = [];
				this.ndselect = '';
				for (let key in this.formdata) {
					this.formdata[key] = "";
				}
				this.tabsec=true;
			},

			search() {
				var param = {
					year: parseInt(this.value4),
					zrdw: this.selection2,
					xmmc: this.selection3,
					ndsx: '3,'
				}

				api.ysxmsearch(param).then(res => {
					for (let i = 0; i < res.data.length; i++) {
						res.data[i].checked = false
					}
					this.totalysxm = res.data;
					this.page.totalResult = this.totalysxm.length;
					var xmlist = this.totalysxm.slice(this.page.currentPage * this.page.pageSize - this.page.pageSize,
						this.page.currentPage * this.page.pageSize);
					for (let i = 0; i < xmlist.length; i++) {
						xmlist[i].checked = false
					}
					this.tableData = xmlist;

				})
			},
			clear() {
				this.selection1 = '';
				this.selection2 = '';
				this.selection3 = '';
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},
			handleExceed(files, fileList) {
				this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
			},
			beforeRemove(file, fileList) {
				return this.$confirm(`确定移除 ${ file.name }？`);
			},
			xmlbchange(value) {
				let obj = {}
				obj = this.xmlbselects.find((item) => {
					return item.id === value;
				});
				this.formdata.xmlbcode = obj.code
				if (this.formdata.xmlbcode == 1 || this.formdata.xmlbcode == 2) {
					this.extral1 = false
				}
				if (this.formdata.xmlbcode == 3) {
					this.xmlbdialog = '新建预算项目类型为政府投资项目？'
					this.dialogVisible1 = true
				} else if (this.formdata.xmlbcode == 4) {
					this.xmlbdialog = '新建预算项目类型为市场化项目？'
					this.dialogVisible1 = true
				}

			},
			xzqhchange(value) {
				let obj = {}
				obj = this.xzqhselects.find((item) => {
					return item.id === value;
				});
				this.formdata.xzqhcode = obj.code
			},
			trzmschange(value) {
				let obj = {}
				obj = this.trzselects.find((item) => {
					return item.id === value;
				});
				this.formdata.trzmscode = obj.code
			},
			xmztchange(value) {
				let obj = {}
				obj = this.xmztselects.find((item) => {
					return item.id === value;
				});
				this.formdata.xmztcode = obj.code
			},
			ndsxchange(value) {
				let obj = {}
				obj = this.ndsxselects.find((item) => {
					return item.id === value;
				});
				this.formdata.xmkndsxcode = obj.code
			},
			xmndchange(value) {
				this.xmndmessage = "预算单位将切换到" + value + "年对应单位列表"
				this.xmnddialog = true;
			},



		},

		created() {
			var myDate = new Date();
			var tYear = myDate.getFullYear();
			this.value4 = tYear.toString();
			var param = {
				ndsx: "3",
				year: tYear
			}
			api.getysxmbyndsx(param).then(response => {
				for (let i = 0; i < response.data.length; i++) {
					response.data[i].checked = false
				}
				this.totalysxm = response.data;
				this.page.totalResult = this.totalysxm.length;
				var xmlist = this.totalysxm.slice(this.page.currentPage * this.page.pageSize - this.page.pageSize,
					this.page.currentPage * this.page.pageSize);
				this.tableData = xmlist;
				api.getysdw(tYear).then(response => {
					this.ysdwselects = filterTree(response.data, "id", "pid");
				});

				api.getxmlb().then(response => {
					this.xmlbselects = response.data;
				});
				api.getxzqh().then(response => {
					this.xzqhselects = response.data;
				});

				api.getndsx().then(response => {
					this.ndsxselects = response.data;
					for (let i = 0; i < this.ndsxselects.length; i++) {
						if (this.ndsxselects[i].code == 1) {
							this.ndsxselects.splice(i, 1)
						}
						if (this.ndsxselects[i].code == 2) {
							this.ndsxselects.splice(i, 1)
						}
					}
				});
				api.gettrzms().then(response => {
					this.trzselects = response.data;
				});
				api.getxmzt().then(response => {
					this.xmztselects = response.data;
				});
				api.getzrcs().then(response => {
					this.zrcsselects = response.data;
				});
			})


		}
	}
</script>

<style lang="scss" scoped>
	@import '../../styles/tableContainer.scss';
</style>
