<template>
	<div class="panel-left">
		<div class="card">
			<div class="header">
				<el-avatar style="color: #f8f8f9;background-color: #19be6b" shape="square" size="large"> kk</el-avatar>
				<div class="info">
					<div class="info-act">
						<a href="javascript:void(0)">
							<!--<Icon type="md-menu" size="26" /></Icon>-->
						</a>
					</div>
				</div>
			</div>
			<div class="userlist-tab">
				<el-tabs v-model="activeName" @tab-click="handleClick">
					<el-tab-pane label="消息列表" name="1">
						<span slot="label"><i class="fa fa-comments-o"></i> 消息列表</span>
						<ul>
							<li v-for="(msg, i) in messageList" :key="i" @click="preMsg(msg)">
								<el-avatar icon="el-icon-user-solid" class="ivu-icon"></el-avatar>
								<span> {{ msg.fromName }} </span>
								<span> {{ msg.lastTime }}</span>
								<span> {{ msg.lastMsg }}</span>
							</li>
							<!--
                            <li>
								<el-avatar icon="el-icon-user-solid" class="ivu-icon"></el-avatar>
								<span> 张三 </span>
								<span> 2020-06-01 14:33</span>
							</li>
							<li>
								<el-avatar icon="el-icon-user-solid" class="ivu-icon"></el-avatar>
								<span> 张三 </span>
								<span> 2020-06-01 14:33</span>
							</li>
							<li>
								<el-avatar icon="el-icon-user-solid" class="ivu-icon"></el-avatar>
								<span> 张三 </span>
								<span> 2020-06-01 14:33</span>
							</li>
                            -->
						</ul>
					</el-tab-pane>
					<el-tab-pane label="人员列表" name="2">
						<ul>
							<li>
								<el-avatar icon="el-icon-user-solid" class="ivu-icon"></el-avatar>
								<span> 张三1 </span>
								<span> 2020-06-01 14:33</span>
							</li>
							<li>
								<el-avatar icon="el-icon-user-solid" class="ivu-icon"></el-avatar>
								<span> 张三 2</span>
								<span> 2020-06-01 14:33</span>
							</li>
							<li>
								<el-avatar icon="el-icon-user-solid" class="ivu-icon"></el-avatar>
								<span> 张三3 </span>
								<span> 2020-06-01 14:33</span>
							</li>
						</ul>
					</el-tab-pane>
				</el-tabs>
				<div class="search" style="display: none;"></div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'PanelLeft',
	props: {
		currentMsg: {
			type: Array,
			default: () => [],
		},
	},
	data() {
		return {
			msg: [],
			activeName: '2',
			userList: [
				{ userName: '张三', userId: '1', userDid: '3442233&21' },
				{ userName: '李四', userId: '2', userDid: '3442233&22' },
				{ userName: '支付组', userId: '3', userDid: '344223@12' },
			],
			groupUserList: [
				{ groupName: '支付组', groupId: '1' },
				{ groupName: '厅领导', groupId: '2' },
				{ groupName: '中心干部', groupId: '3' },
			],
			messageList: [
				{ fromName: '支付组', fromId: '1', lastMsg: '关于XXXX通知', lastTime: '2020-04-01 14:31', type: '2' },
				{ fromName: '张三', fromId: '1', lastMsg: '好的收到', lastTime: '2020-04-01 14:31', type: '1' },
				{ fromName: '赵六', fromId: '6', lastMsg: '好的收到', lastTime: '2020-04-01 14:31', type: '1' },
				{ fromName: '李四', fromId: '2', lastMsg: '好的收到', lastTime: '2020-04-01 14:31', type: '1' },
				{ fromName: '中心干部', fromId: '3', lastMsg: '好的收到', lastTime: '2020-04-01 14:31', type: '2' },
				{ fromName: '厅领导', fromId: '2', lastMsg: '好的收到', lastTime: '2020-04-01 14:31', type: '2' },
			],
		}
	},
	methods: {
		handleClick() {},
		preMsg(msg) {
			this.$emit('12332', msg)
			console.log('触发子组件方法getMsg')
		},
	},
}
</script>

<style lang="scss" scoped>
.panel-left {
	height: 100%;
}

.panel-left > .card {
	background-color: #ffffff;
}

.panel-left .header {
	padding: 17px 7px;
	font-size: 16px;
	margin: 0 10px;
	text-align: center;
	/*border-bottom: 1px solid #989898;*/
	.el-avatar {
		border-radius: 50%;
	}
}
.panel-left .header .info {
	display: inline-block;
}

.panel-left .header .info-act {
	position: absolute;
	right: 10px;
	top: 0;
	margin-top: 25px;
}

.userlist-tab {
	height: calc(100% - 36px);
	overflow: hidden;
	overflow-y: auto;
	padding: 10px;
}
.userlist-tab ul {
	text-align: left;
	margin: 0;
	padding: 0;
}
.userlist-tab ul li:hover span {
	background: rgb(224, 231, 229);
	cursor: pointer;
}
.userlist-tab ul li {
	margin-left: 0;
	width: 100%;
	height: 50px;
	margin-bottom: 10px;
	border-bottom: 1px #b2b3b4 solid;
	list-style: none;
}
.userlist-tab .ivu-tabs-nav {
	width: 100%;
}
.userlist-tab .ivu-tabs-tab {
	width: 50%;
}

.userlist-tab .ivu-tabs-bar {
	margin-bottom: 0;
}
.userlist-tab .ivu-tabs-content {
	height: 100%;
}
.userlist-tab .ivu-tabs-tabpane {
	width: 100%;
	height: calc(100% - 36px);
	overflow: hidden;
	overflow-y: auto;
}

.userlist-tab .ivu-tabs-bar {
	border-color: #96969a;
	box-shadow: 0px -1px #cccdce;
}

.panel-left .search {
	margin: 10px 10px;
}

.panel-left .ivu-cell.selected {
	background-color: #f8f8f9;
}
.card {
	box-shadow: 0px 2px 2px 2px rgba(0, 0, 0, 0.2);
	transition: 0.3s;
	width: 98%;
	border-radius: 5px;
	margin-left: 4px;
	margin-top: 10px;
}

.card:hover {
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
}
</style>
