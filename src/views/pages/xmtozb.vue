<template>
	<div class="corresponding-items-container">
		<el-card>
			<h3 id="page-title">预算项目对应指标</h3>
			<ul>
				<li>
					<el-date-picker v-model="nf" value-format='yyyy' size='mini' type="year" placeholder="选择年" style="width: 90px;"
					@change="ndchange">
					</el-date-picker>
				</li>
				<li>
					<el-button-group >
						<el-button type="primary" size="mini" @click="showxm"> 查看项目详情</el-button>
						<el-button type="primary" size="mini" @click="save">保存</el-button>
						<el-button type="primary" size="mini" @click="autoconnect">系统自动对应未关联指标</el-button>					
						</el-button-group >
				</li>
			</ul>
		</el-card>

		<div class="corresponding-items-content">
			<el-card>
				<h3>预算项目</h3>				
				<el-tree
					ref="ysxmtree"
					:data="xmtree"
					:props="defaultProps"
					node-key="id"
					:default-expand-all="treeexpand"
					@node-click="nodeclick"
					:show-checkbox="treecheckbox"
					@check-change="checkchange"
					:check-strictly="checkstrictly">
				</el-tree>
			</el-card>
			<el-card>
				<h3>金财指标</h3>
				<ul class="el-row">
					<li>
						<el-cascader v-model="ysdwsel1" :props="defaultProps" :show-all-levels="showall" :options="ysdwselects"
						 placeholder="预算单位" style="width: 120px;" size="mini" :clearable="clearable"></el-cascader>
					</li>
					<li>
						<el-input v-model="xmmc1" placeholder="项目名称 " style="width: 120px;" size="mini" :clearable="clearable"></el-input>
					</li>
					<li>
						<el-input v-model="zbid" placeholder="指标ID " style="width: 120px;" size="mini" :clearable="clearable"></el-input>
					</li>
					<li>
						<el-input v-model="wh" placeholder="文号 " style="width: 120px;" size="mini" :clearable="clearable"></el-input>
					</li>
					<li>
						<el-button-group >
							<el-button type="primary" size="mini" @click="search1">筛选</el-button>
							<el-button type="primary" size="mini" @click="showzbdetail">查看指标详情</el-button>
							<el-button type="primary" size="mini" @click="del">删除</el-button>
							<el-button type="primary" size="mini" @click="addzb">新增</el-button>
						</el-button-group >
					</li>
				</ul>

				<div class="row">
					<vxe-table border resizable show-overflow class="checkbox-table" keep-source ref="zbTable" :data="tableData1"
					 :radio-config="{trigger: 'row'}" max-height="350">
						<vxe-table-column type="radio" title="" width="80"></vxe-table-column>
						<vxe-table-column type="seq" width="60"></vxe-table-column>
						<vxe-table-column field="budgetid" title="指标ID"></vxe-table-column>
						<vxe-table-column field="dwmc" title="预算单位"></vxe-table-column>
						<vxe-table-column field="programname" title="项目名称"></vxe-table-column>
						<vxe-table-column field="ysmoney" title="指标金额" :formatter="amountformatter"></vxe-table-column>
						<vxe-table-column field="gnkmmc" title="功能科目"></vxe-table-column>
						<vxe-table-column field="dwqkwh" title="指标文号"></vxe-table-column>
					</vxe-table>
					<p>
						<vxe-pager :current-page.sync="page1.currentPage" :page-size.sync="page1.pageSize" :total="page1.totalResult"
						 @page-change="pagechange1" :layouts="['PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'Sizes', 'FullJump', 'Total']">
						</vxe-pager>
					</p>
				</div>
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

				<el-dialog title=" " :visible.sync="zbadddialog" width="90%" :before-close="handleClose">
					<div style="margin-top: 15px;">
						<h2>金财指标</h2>
					</div>
				
					<ul>
						<li>
							<el-cascader v-model="ysdwsel2" :props="defaultProps" :show-all-levels="showall" :options="ysdwselects"
							 placeholder="预算单位" style="width: 120px;" size="mini"></el-cascader>
						</li>
						<li>
							<el-input v-model="xmmc2" placeholder="项目名称" style="width: 120px;" size="mini"></el-input>
						</li>
						<li>
							<el-input v-model="zbid2" placeholder="指标ID" style="width: 120px;" size="mini"></el-input>
						</li>
						<li>
							<el-input v-model="wh2" placeholder="文号" style="width: 120px;" size="mini"></el-input>
						</li>
						<li>
							<el-checkbox v-model="checked2">仅未关联指标</el-checkbox>
						</li>
						<li>
							<el-button-group >
								<el-button type="primary" size="mini" @click="search2">筛选</el-button>
								<el-button type="primary" size="mini" @click="add">选入</el-button>
							 </el-button-group >
						</li>
					</ul>
					<el-divider></el-divider>
					<vxe-table border resizable show-overflow class="checkbox-table" keep-source ref="addTable" :data="tableData2"
					:radio-config="{trigger: 'row'}">
						<vxe-table-column type="radio" title="" width="80"></vxe-table-column>
						<vxe-table-column type="seq" width="60"></vxe-table-column>
						<vxe-table-column field="budgetid" title="指标ID"></vxe-table-column>
						<vxe-table-column field="dwmc" title="预算单位"></vxe-table-column>
						<vxe-table-column field="programname" title="项目名称"></vxe-table-column>
						<vxe-table-column field="ysmoney" title="指标金额" :formatter="amountformatter"></vxe-table-column>
						<vxe-table-column field="gnkmmc" title="功能科目"></vxe-table-column>
						<vxe-table-column field="dwqkwh" title="指标文号"></vxe-table-column>
					</vxe-table>
					<p>
						<vxe-pager :current-page.sync="page2.currentPage" :page-size.sync="page2.pageSize" :total="page2.totalResult"
						 @page-change="pagechange2" :layouts="['PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'Sizes', 'FullJump', 'Total']">
						</vxe-pager>
					</p>
				</el-dialog>
				<el-dialog title=" " :visible.sync="autocondialog" width="60%" :before-close="handleClose">
					<div>
						<span>按照同单位、同项目自动设置未对应项目的指标和预算项目对应关系</span>
						<el-button style="margin-left: 20px;" type="info" size="mini">自动关联</el-button>
					</div>
					<el-divider></el-divider>
					<div style="margin-top: 20px;"><span>按照已有关联过的指标，自动对应相同金财项目guid的指标</span>
						<el-button style="margin-left: 20px;" type="info" size="mini">自动关联</el-button>
					</div>
				</el-dialog>
			</el-card>
		</div>
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
		filterTree,
		filterTree1
	} from "@/assets/js/treeformat.js";
	export default {
		data() {
			return {
				treeexpand: false,
				treecheckbox: true,
				checkstrictly: true,
				xmtree: [],
				page1: {
					currentPage: 1,
					pageSize: 5,
					totalResult: 0,
				},
				page2: {
					currentPage: 1,
					pageSize: 5,
					totalResult: 0,
				},
				totalzb1: [],
				defaultProps: {
					value: 'id',
					label: 'name',
					children: 'children',
					emitPath: false,
				},
				wh2: '',
				ysdwsel1: null,
				clearable: true,
				autocondialog: false,
				zbdetaildialog: false,
				zbadddialog: false,
				showall: false,
				xmdetail: {},
				xmdiavis: false,
				ysdwselects: [],
				tableData2: [],
				nf: '',
				tableData1: [],
				totalzb: [],
				xmmc1: '',
				zbid: '',
				wh: '',
				xmnode: [],
				zbqkdata: [],
				zbmxdata: [],
				zbzfdata: [],
				ysdwsel2: null,
				xmmc2: '',
				zbid2: '',
				checked2: false,
				extral1: false,
				extral2: false,
			}
		},
		// minxins: [filterTree],
		methods: {
			nodeclick(node) {
				if (node.id.indexOf('xm') > -1) {
					this.$refs.ysxmtree.setCheckedNodes([node]);
				}
			},
			checkchange(data, checked, node) {
				if (checked) {
					this.$refs.ysxmtree.setCheckedNodes([data])
				}
				var param = {
					xmid: data.id.slice(3),
					year: this.nf
				}
				api.getzbbyxm(param).then(response => {
					this.totalzb = response.data;
					this.page1.totalResult = this.totalzb.length;
					this.tableData1 = this.totalzb.slice(this.page1.currentPage * this.page1.pageSize - this.page1.pageSize,
					this.page1.currentPage * this.page1.pageSize);
				});
			},
			amountformatter(cellValue) {
				return cellValue.cellValue / 10000;
			},
			
			pagechange2(currentPage) {
				this.page2.currentPage = currentPage.currentPage;
				this.page2.pageSize = currentPage.pageSize;
				this.tableData2 = this.totalzb1.slice(this.page2.currentPage * this.page2.pageSize - this.page2.pageSize,
					this.page2.currentPage * this.page2.pageSize);
			},
			ndchange(data) {
				api.getxmtree(data).then(response => {
					this.xmtree = filterTree1(response.data, "id", "pid");
					api.getysdw(data).then(response => {
						this.ysdwselects = filterTree(response.data, "id", "pid");
					})
				});
			},

			del() {
				var zbdata = this.$refs.zbTable.getRadioRecord();
				if (zbdata == null) {
					this.$message('请选择一条指标数据');
					return
				}

				api.delxmtozb(zbdata.budgetid).then(response => {
					if (response.data.success) {
						this.$message("删除成功")
					}
					var xmdata = this.$refs.xmtable.getRadioRecord();
					var param = {
						xmid: xmdata.id,
						year: this.nf
					}
					api.getzbbyxm(param).then(response => {
						this.totalzb = response.data;
						this.page1.totalResult = this.totalzb.length;
						this.tableData1 = this.totalzb.slice(this.page1.currentPage * this.page1.pageSize - this.page1.pageSize,
							this.page1.currentPage * this.page1.pageSize);

					});
				});
			},
			save() {
				var xmdata = this.$refs.ysxmtree.getCheckedNodes();
				var zbdata = this.$refs.zbTable.getRadioRecord()
				if (xmdata.length == 0) {
					this.$message('请选择一条预算项目数据');
					return
				}
				if (zbdata == null) {
					this.$message('请选择一条指标数据');
					return
				}

				var param = {
					year: this.nf,
					idysxm: xmdata[0].id,
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
			autoconnect() {
				this.autocondialog = true
			},
			search1() {
				let node=this.$refs.ysxmtree.getCheckedNodes();
				var param = {
					xmid: node[0].id.slice(3),
					year: parseInt(this.nf),
					dwid: this.ysdwsel1,
					xmmc: this.xmmc1,
					zbid: this.zbid,
					wh: this.wh,
				}
				console.log(param);
				api.searchzb(param).then(response => {
					this.totalzb = response.data;
					this.page1.totalResult = this.totalzb.length;
					this.tableData1 = this.totalzb.slice(this.page1.currentPage * this.page1.pageSize - this.page1.pageSize,
						this.page1.currentPage * this.page1.pageSize);
				});
			},
			search2() {
				if (this.ysdwsel2 == null) {
					this.$message('请选择预算单位')
					return
				}
				var param = {
					year: parseInt(this.nf),
					dwid: this.ysdwsel2,
					xmmc: this.xmmc2,
					zbid: this.zbid2,
					wh: this.wh2,
					checked: this.checked2,
				};
				api.addzb(param).then(response => {
					this.totalzb1 = response.data;
					for (let i = 0; i < this.totalzb1.length; i++) {
						this.totalzb1[i].checked = false
					}
					this.page2.totalResult = this.totalzb1.length;
					this.tableData2 = this.totalzb1.slice(this.page2.currentPage * this.page2.pageSize - this.page2.pageSize,
						this.page2.currentPage * this.page2.pageSize);
						
				});
			},
			add() {
				var adddata = this.$refs.addTable.getRadioRecord();
				if (adddata==null) {
					this.$message('请先选择一条指标数据')
					return
				}
				this.totalzb.push(adddata);				
				this.page1.totalResult = this.totalzb.length;
				this.tableData1 = this.totalzb.slice(this.page1.currentPage * this.page1.pageSize - this.page1.pageSize,
					this.page1.currentPage * this.page1.pageSize);

				this.ysdwsel2 = null,
					this.xmmc2 = '',
					this.zbid2 = '',
					this.wh2 = '',
					this.checked2 = false,
					this.tableData2 = [];
				this.zbadddialog = false;
			},

			pagechange1(currentPage) {
				this.page1.currentPage = currentPage.currentPage;
				this.page1.pageSize = currentPage.pageSize;
				this.tableData1 = this.totalzb.slice(this.page1.currentPage * this.page1.pageSize - this.page1.pageSize,
					this.page1.currentPage * this.page1.pageSize);
			},
			showzbdetail() {
				var zbdata = this.$refs.zbTable.getRadioRecord();
				if (zbdata == null) {
					this.$message("请选择一条指标数据")
					return
				}
				var param = {
					zbid: zbdata.budgetid,
					year: this.nf
				};
				api.getzbdetailbyzbid(param).then(response => {
					const res = response.data;
					this.zbqkdata = res.zbqk;
					this.zbmxdata = res.zbmx;
					this.zbzfdata = res.zbzf;
				});
				this.zbdetaildialog = true
			},
			addzb() {
				this.zbadddialog = true;
			},
			handleClose(done) {
				done();
			},
			showxm() {
				this.xmnode = this.$refs.ysxmtree.getCheckedNodes();
				if (this.xmnode.length == 0) {
					this.$message('请选择一条项目数据');
					return;
				}
				var param = {
					xmid: this.xmnode[0].id,
					year: this.nf
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

			api.getxmtree(tYear).then(response => {
				this.xmtree = filterTree1(response.data, "id", "pid");
				api.getysdw(tYear).then(response => {
					this.ysdwselects = filterTree(response.data, "id", "pid");
				})
			});
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../styles/correspondingItems.scss';
</style>
