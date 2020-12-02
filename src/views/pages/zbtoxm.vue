<template>
	<div class="table2-container">
		<el-card>
			<h3 id="page-title">指标对应预算项目</h3>
			<ul>
				<li>
					<el-date-picker v-model="nf" value-format='yyyy' size='mini' type="year" placeholder="选择年" style="width: 120px;"
					@change="ndchange">
					</el-date-picker>
				</li>
				<li>
					<el-button-group>
						<el-button type="primary" size="mini" @click="save">保存</el-button>
						<el-button type="primary" size="mini" @click="autoconnect">系统自动对应未关联指标</el-button>
					</el-button-group>
				</li>
			</ul>
		</el-card>

		<el-card class="table1-content">
			<h3>金财指标</h3>
			<ul class="row">
				<li>
					<el-cascader v-model="ysdwsel" :props="defaultProps" :show-all-levels="showall" :options="ysdwselects" placeholder="预算单位"
					:clearable="clearable" style="width: 120px;" size="mini"></el-cascader>
				</li>
				<li>
					<el-input v-model="xmmc" placeholder="项目名称" style="width: 120px;" size="mini" :clearable="clearable"></el-input>
				</li>
				<li>
					<el-input v-model="zbid" placeholder="指标ID" style="width: 120px;" size="mini" :clearable="clearable"></el-input>
				</li>
				<li>
					<el-input v-model="wh" placeholder="文号" style="width: 120px;" size="mini" :clearable="clearable"></el-input>
				</li>
				<li>
					<el-checkbox v-model="checked">仅未关联指标</el-checkbox>
				</li>
				<li>
					<el-button-group>
						<el-button type="primary" size="mini" @click="search">筛选</el-button>
						<el-button type="primary" size="mini" @click="showzbdetail">查看指标详情</el-button>
						<el-button type="primary" size="mini">对应/变更对应预算项目</el-button>
					</el-button-group>
				</li>
			</ul>

			<vxe-table border resizable show-overflow class="checkbox-table" keep-source ref="zbTable" :clearable="clearable"
			:data="tableData" :radio-config="{trigger: 'row'}" @cell-click="cellclick" max-height="200">
				<vxe-table-column type="radio" title="" width="80"></vxe-table-column>
				<vxe-table-column type="seq" width="60"></vxe-table-column>
				<vxe-table-column field="budgetid" title="指标ID"></vxe-table-column>
				<vxe-table-column field="dwmc" title="预算单位"></vxe-table-column>
				<vxe-table-column field="programname" title="项目名称"></vxe-table-column>
				<vxe-table-column field="ysmoney" title="指标金额"></vxe-table-column>
				<vxe-table-column field="gnkmmc" title="功能科目"></vxe-table-column>
				<vxe-table-column field="dwqkwh" title="指标文号"></vxe-table-column>
			</vxe-table>
			<p>
				<vxe-pager :current-page.sync="page.currentPage" :page-size.sync="page.pageSize" :total="page.totalResult"
				@page-change="pagechange" :layouts="['PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'Sizes', 'FullJump', 'Total']">
				</vxe-pager>
			</p>
		</el-card>
		<el-card class="table2-content">
			<h3>预算项目</h3>
			<ul class="row">
				<li>
					<el-cascader v-model="ysdwsel2" :props="defaultProps" :show-all-levels="showall" :clearable="clearable" size="mini"
					:options="ysdwselects" placeholder="预算单位" style="width: 120px;"></el-cascader>
				</li>
				<li>
					<el-input v-model="xmmc2" placeholder="项目名称" style="width: 120px;" size="mini" :clearable="clearable"></el-input>
				</li>
				<li>
					<el-select v-model="kndsxsel" placeholder="项目跨年度属性" style="width: 120px;" size="mini" :clearable="clearable">
						<el-option v-for="item in kndsxsels" :key="item.id" :label="item.label" :value="item.id">
						</el-option>
					</el-select>
				</li>
				<li>
					<el-button-group>
						<el-button type="primary" size="mini" @click="search1">筛选</el-button>
						<el-button type="primary" size="mini" @click="showxmdetail">查看项目详情</el-button>
					</el-button-group>
				</li>
			</ul>

			<vxe-table border resizable show-overflow :radio-config="{trigger: 'row'}" class="checkbox-table" keep-source ref="xmtable"
			:data="tableData1">
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
		<el-dialog title=" " :visible.sync="zbdetaildialog" width="80%" :before-close="handleClose">
			<div style="margin-top: 15px;text-align: left;">
				<h2>指标情况</h2>
			</div>
			<vxe-table border resizable show-overflow class="checkbox-table" keep-source :data="zbqkdata">
				<vxe-table-column field="dwmc" title="单位名称"></vxe-table-column>
				<vxe-table-column field="programname" title="项目名称"></vxe-table-column>
				<vxe-table-column field="gnkmbm" title="功能科目编码"></vxe-table-column>
				<vxe-table-column field="gnkmmc" title="功能科目名称"></vxe-table-column>
				<vxe-table-column field="dwqkwh" title="文号"></vxe-table-column>
				<vxe-table-column field="ysmoney" title="指标年初下达数"></vxe-table-column>
				<vxe-table-column field="tzmoney" title="指标调整数"></vxe-table-column>
				<vxe-table-column field="tzhmoney" title="调整后指标数"></vxe-table-column>
				<vxe-table-column field="zfmoney" title="支出数"></vxe-table-column>
				<vxe-table-column field="sbmoney" title="结余数"></vxe-table-column>
			</vxe-table>
			<div style="margin-top: 15px;text-align: left;">
				<h2>指标明细</h2>
			</div>
			<vxe-table border resizable show-overflow class="checkbox-table" keep-source :data="zbmxdata">
				<vxe-table-column field="jjkmbm" title="经济科目编码"></vxe-table-column>
				<vxe-table-column field="jjkmmc" title="经济科目名称"></vxe-table-column>
				<vxe-table-column field="money" title="金额"></vxe-table-column>
			</vxe-table>
			<div style="margin-top: 15px;text-align: left;">
				<h2>支付/申拔明细</h2>
			</div>
			<vxe-table border resizable show-overflow class="checkbox-table" keep-source :data="zbzfdata">
				<vxe-table-column field="lx" title="类型"></vxe-table-column>
				<vxe-table-column field="zflh" title="支付令/申拨号"></vxe-table-column>
				<vxe-table-column field="mxxh" title="明细序号"></vxe-table-column>
				<vxe-table-column field="yt" title="用途"></vxe-table-column>
				<vxe-table-column field="jjkmmc" title="经济科目"></vxe-table-column>
				<vxe-table-column field="totalmoney" title="金额"></vxe-table-column>
				<vxe-table-column field="" title="支付状态"></vxe-table-column>
			</vxe-table>
		</el-dialog>
		<el-dialog title=" " :visible.sync="xmdiavis" width="65%" :before-close="handleClose">
			<div style="margin-top: -15px;">
				<h2>项目详情</h2>
			</div>
			<vxe-form :data="xmdetail" size="medium" :span="12" title-align="left" title-width="135px">
				<vxe-form-item title="项目名称">
					<template v-slot>
						<vxe-input v-model="xmdetail.xmmc" placeholder=" "></vxe-input>
					</template>
				</vxe-form-item>
				<vxe-form-item title="项目类别">
					<template v-slot>
						<vxe-input v-model="xmdetail.xmlb" placeholder=" "></vxe-input>
					</template>
				</vxe-form-item>
				<vxe-form-item title="行政区划">
					<template v-slot>
						<vxe-input v-model="xmdetail.xzqy" placeholder=" "></vxe-input>
					</template>
				</vxe-form-item>
				<vxe-form-item title="责任单位">
					<template v-slot>
						<vxe-input v-model="xmdetail.zrdw" placeholder=" "></vxe-input>
					</template>
				</vxe-form-item>
				<vxe-form-item title="财政局责任处室">
					<template v-slot>
						<vxe-input v-model="xmdetail.zrcs" placeholder=" "></vxe-input>
					</template>
				</vxe-form-item>
				<vxe-form-item title="项目总金额（万元）">
					<template v-slot>
						<vxe-input v-model="xmdetail.xmzje" placeholder=" "></vxe-input>
					</template>
				</vxe-form-item>
				<vxe-form-item title="项目年度">
					<template v-slot>
						<vxe-input v-model="xmdetail.year" placeholder=" "></vxe-input>
					</template>
				</vxe-form-item>
				<vxe-form-item title="项目跨年度属性">
					<template v-slot>
						<vxe-input v-model="xmdetail.kndsx" placeholder=" "></vxe-input>
					</template>
				</vxe-form-item>
				<vxe-form-item title="项目标签1">
					<template v-slot>
						<vxe-input v-model="xmdetail.bq1" placeholder=" "></vxe-input>
					</template>
				</vxe-form-item>
				<vxe-form-item title="项目标签2">
					<template v-slot>
						<vxe-input v-model="xmdetail.bq2" placeholder=" "></vxe-input>
					</template>
				</vxe-form-item>
				<vxe-form-item title="建设单位" v-show="extral1">
					<template v-slot>
						<vxe-input v-model="xmdetail.jsdw" placeholder=" "></vxe-input>
					</template>
				</vxe-form-item>
				<vxe-form-item title="项目地址" v-show="extral1">
					<template v-slot>
						<vxe-input v-model="xmdetail.xmdz" placeholder=" "></vxe-input>
					</template>
				</vxe-form-item>
				<vxe-form-item title="融资者模式" v-show="extral1">
					<template v-slot>
						<vxe-input v-model="xmdetail.trzms" placeholder=" "></vxe-input>
					</template>
				</vxe-form-item>
				<vxe-form-item title="项目状态" v-show="extral1">
					<template v-slot>
						<vxe-input v-model="xmdetail.xmzt" placeholder=" "></vxe-input>
					</template>
				</vxe-form-item>
				<vxe-form-item title="项目开始年份" v-show="extral2">
					<template v-slot>
						<vxe-input v-model="xmdetail.xmksnf" placeholder=" "></vxe-input>
					</template>
				</vxe-form-item>
				<vxe-form-item title="项目结束年份" v-show="extral2">
					<template v-slot>
						<vxe-input v-model="xmdetail.xmjsnf" placeholder=" "></vxe-input>
					</template>
				</vxe-form-item>
				<vxe-form-item title="政策期限">
					<template v-slot>
						<vxe-input v-model="xmdetail.zcqxqs" placeholder=" " style="width: 155px;"></vxe-input>
						-
						<vxe-input v-model="xmdetail.zcqxjz" placeholder=" " style="width: 155px;"></vxe-input>
					</template>
				</vxe-form-item>
				<vxe-form-item title="是否划转县市区">
					<template v-slot>
						<vxe-input v-model="xmdetail.sfhzxsq" placeholder=" "></vxe-input>
					</template>
				</vxe-form-item>

				<vxe-form-item title="政策依据" :span="24">
					<template v-slot>
						<vxe-textarea v-model="xmdetail.zcyj" placeholder=" "></vxe-textarea>
					</template>
				</vxe-form-item>
				<vxe-form-item title="资金来源" :span="24">
					<template v-slot>
						<vxe-textarea v-model="xmdetail.zjly" placeholder=" "></vxe-textarea>
					</template>
				</vxe-form-item>
				<vxe-form-item title="项目内容" :span="24">
					<template v-slot>
						<vxe-textarea v-model="xmdetail.xmnr" placeholder=" "></vxe-textarea>
					</template>
				</vxe-form-item>
				<vxe-form-item title="绩效目标" :span="24">
					<template v-slot>
						<vxe-textarea v-model="xmdetail.jxmb" placeholder=" "></vxe-textarea>
					</template>
				</vxe-form-item>
				<vxe-form-item title="绩效实现情况（项目进度）:" :span="24">
					<template v-slot>
						<vxe-textarea v-model="xmdetail.jxsxqk" placeholder=" "></vxe-textarea>
					</template>
				</vxe-form-item>
				<vxe-form-item title="备注：" :span="24">
					<template v-slot>
						<vxe-textarea v-model="xmdetail.bz" placeholder=" "></vxe-textarea>
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
				zbdetaildialog: false,
				xmdiavis: false,
				xmdetail: {},
				zbqkdata: [],
				zbmxdata: [],
				zbzfdata: [],
				ysdwhx: [],
				kndsxsels: [],
				tableData1: [],
				tableData: [],
				ysdwselects: [],
				formysdwselects: [],
				trzselects: [],
				xmztselects: [],
				zrcsselects: [],
				xmlbselects: [],
				sfhzxsqsel: [{
						id: 1,
						label: "是"
					},
					{
						id: 2,
						label: "否"
					}
				],
				nf: '',
				ysdwsel: null,
				defaultProps: {
					value: 'id',
					label: 'name',
					children: 'children',
					emitPath: false,
				},
				showall: false,

				xmmc: '',
				zbid: '',
				wh: '',
				checked: false,
				extral1: false,
				extral2: false,
				clearable: true,
				kndsxsel: null,


				ysdwsel2: null,
				xmmc2: '',
				page: {
					currentPage: 1,
					pageSize: 5,
					totalResult: 0,
				},
				totalzb: [],
			}
		},
		minxins: [filterTree],
		methods: {
			ndchange(data) {
				api.getysdw(data).then(response => {
					if (response.data.length > 0) {
						this.ysdwselects = filterTree(response.data, "id", "pid");
					}
				});
			},
			save() {
				var xmdata = this.$refs.xmtable.getRadioRecord();
				var zbdata = this.$refs.zbTable.getRadioRecord();
				if (xmdata == null) {
					this.$message('请选择一条预算项目数据');
					return
				}
				if (zbdata == null) {
					this.$message('请选择一条指标数据');
					return
				}
				var param = {
					year: this.nf,
					idysxm: xmdata.id,
					idbudget: zbdata.budgetid
				};
				api.savexmtozb(JSON.stringify(param)).then(response => {
					if (response.data.success) {
						this.$message('保存成功');
					} else {
						this.$message(response.data.content);
					}
				});
			},
			autoconnect() {},
			search() {
				var param = {
					year: parseInt(this.nf),
					dwid: this.ysdwsel,
					xmmc: this.xmmc,
					zbid: this.zbid,
					wh: this.wh,
					checked: this.checked,
				}
				api.addzb(param).then(response => {
					this.totalzb = response.data;
					this.page.totalResult = this.totalzb.length;
					this.tableData = this.totalzb.slice(this.page.currentPage * this.page.pageSize - this.page.pageSize,
						this.page.currentPage * this.page.pageSize);
				});
			},
			search1() {
				var param = {
					ysdw: this.ysdwsel2,
					xmmc: this.xmmc2,
					kndsx: this.kndsxsel,
					checked: false,
					nf: parseInt(this.nf),
				};
				api.getxmofbq(param).then(response => {
					this.tableData1 = response.data
				});
			},

			amountformatter(cellValue) {
				return cellValue.cellValue / 10000;
			},

			cellclick(row) {
				var zbdata = this.$refs.zbTable.getRadioRecord();
				var param = {
					zbid: zbdata.budgetid,
					year: this.nf
				};
				api.getxmbyzbid(param).then(response => {
					this.tableData1 = response.data
				});


			},
			showzbdetail() {
				var zbdata = this.$refs.zbTable.getRadioRecord();
				if (zbdata == null) {
					this.$message('请选择一条指标数据')
					return
				}
				var param = {
					zbid: zbdata.budgetid,
					year: this.nf
				};
				api.getzbdetailbyzbid(param).then(response => {
					this.zbqkdata = response.data.zbqk;
					this.zbmxdata = response.data.zbmx;
					this.zbzfdata = response.data.zbzf;
				});
				this.zbdetaildialog = true

			},

			pagechange(currentPage) {
				this.page.currentPage = currentPage.currentPage;
				this.page.pageSize = currentPage.pageSize;
				this.tableData = this.totalzb.slice(this.page.currentPage * this.page.pageSize - this.page.pageSize,
					this.page.currentPage * this.page.pageSize);
			},
			handleClose(done) {
				done();
				// for (let key in this.formdata) {
				// 	this.formdata[key] = "";
				// };	
			},
			showxmdetail() {
				this.xmtdata = this.$refs.xmtable.getRadioRecord();
				if (this.xmtdata == null) {
					this.$message('请选择一条数据');
					return;
				}
				var param = {
					xmid: this.xmtdata.id,
					year: this.xmtdata.year
				}
				api.getxmdetail(param).then(response => {
					var res = response.data.ysxm;
					var amount = res.xmzje;
					res.xmzje = amount / 10000;
					this.xmdetail = res;
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
				this.xmdiavis = true;
			},
		},
		created() {
			var myDate = new Date();
			var tYear = myDate.getFullYear();
			this.nf = tYear.toString();
			var param = {
				year: tYear
			}
			api.getysdw(tYear).then(response => {
				this.ysdwhx = response.data;
				this.ysdwselects = filterTree(response.data, "id", "pid");
				console.log(response)
			})

			api.getndsx().then(response => {
				this.kndsxsels = response.data;
			});

			api.gettrzms().then(response => {
				this.trzselects = response.data;
			});

			api.getxmzt().then(response => {
				this.xmztselects = response.data;
			});
			api.getxzqh().then(response => {
				this.xzqhselects = response.data;
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
	@import '../../styles/table2.scss';
</style>
