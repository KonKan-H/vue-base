<template>
	<div id="panel-main">
		<div class="card">
			<el-row :gutter="20" class="text-center">
				<el-col :span="6" class="contacts">
					<span><b>联系人:</b></span>
					<span>已选择 6 位联系人</span>
				</el-col>
				<el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
				<el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
				<el-col :span="6">
					<el-button type="primary">清空联系人</el-button>
				</el-col>
			</el-row>
			<el-row>
				<div class="imitate-input">
					<el-tag v-for="tag in tags" :key="tag.name" closable :type="tag.type">
						{{ tag.name }}
					</el-tag>
				</div>
			</el-row>
			<div class="chat-input">
				<ul>
					<li class="chat-mine">
						<div class="chat-user">
							<el-avatar icon="el-icon-user-solid" class="ivu-icon"></el-avatar>
							<p><span class="msg_from">张三</span><span class="msg_time">2020-06-03 14:31</span></p>
						</div>
						<div class="chat-text">第三方的士大夫</div>
					</li>
					<li class="chat-from">
						<div class="chat-user">
							<el-avatar icon="el-icon-user-solid" class="ivu-icon"></el-avatar>
							<p><span class="msg_from">张三</span><span class="msg_time">2020-06-03 14:31</span></p>
						</div>
						<div class="chat-text">第三方的士大夫</div>
					</li>
					<li class="chat-from">
						<div class="chat-user">
							<el-avatar icon="el-icon-user-solid" class="ivu-icon"></el-avatar>
							<p><span class="msg_from">张三</span><span class="msg_time">2020-06-03 14:31</span></p>
						</div>
						<div class="chat-text">第三方的士大夫</div>
					</li>
					<li class="chat-from">
						<div class="chat-user">
							<el-avatar icon="el-icon-user-solid" class="ivu-icon"></el-avatar>
							<p><span class="msg_from">张三</span><span class="msg_time">2020-06-03 14:31</span></p>
						</div>
						<div class="chat-text">第三方的士大夫</div>
					</li>
					<li class="chat-from">
						<div class="chat-user">
							<el-avatar icon="el-icon-user-solid" class="ivu-icon"></el-avatar>
							<p><span class="msg_from">张三</span><span class="msg_time">2020-06-03 14:31</span></p>
						</div>
						<div class="chat-text">第三方的士大夫</div>
					</li>
					<li class="chat-from">
						<div class="chat-user">
							<el-avatar icon="el-icon-user-solid" class="ivu-icon"></el-avatar>
							<p><span class="msg_from">张三</span><span class="msg_time">2020-06-03 14:31</span></p>
						</div>
						<div class="chat-text">第三方的士大夫</div>
					</li>
				</ul>
			</div>
			<div class="chat-send">
				<el-row>
					<el-col :span="21">
						<el-form ref="form" :model="form">
							<el-form-item>
								<el-input rows="4" type="textarea" v-model="form.desc"></el-input>
							</el-form-item>
							<el-form-item>
								<el-checkbox-group v-model="form.type">
									<el-checkbox label="钉消息" name="type"></el-checkbox>
									<el-checkbox label="短消息" name="type"></el-checkbox>
								</el-checkbox-group>
							</el-form-item>
						</el-form>
					</el-col>
					<el-col :span="3">
						<el-row style="margin-bottom:4px ;">
							<el-button type="primary">发送消息</el-button>
						</el-row>
						<el-row>
							<el-button type="primary">定时发送</el-button>
						</el-row>
					</el-col>
				</el-row>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'PanelMain',
	props: {
		tags: {
			type: Array,
			default: () => [],
		},
	},
	data() {
		return {
			form: {
				name: '',
				type: [],
				resource: '',
				desc: '',
			},
			
		}
	},
}
</script>

<style lang="scss" scoped>
#panel-main {
	margin: 0 auto;
	height: 100%;
}

.chat-input {
	width: 100%;
	height: 360px;
	border: 1px solid rgb(225, 229, 233);
	border-radius: 3px;
	padding: 13px 10px;
	text-align: left;
	size: 16px;
	line-height: 16px;
	outline: none;
	color: #000;
	overflow: hidden;
	overflow-y: auto;
}
.chat-input .chat-from {
	text-align: right;
}
.chat-input ul {
	margin: 0px auto;
	padding: 0px;
}
.chat-input ul li {
	list-style: none;
}
.imitate-input {
	width: 100%;
	height: 60px;
	border: 1px solid rgb(225, 229, 233);
	border-radius: 3px;
	padding: 13px 10px;
	text-align: left;
	size: 16px;
	line-height: 16px;
	outline: none;
	color: #000;
}

.card {
	box-shadow: 0px 2px 2px 2px rgba(0, 0, 0, 0.2);
	transition: 0.3s;
	width: 98%;
	border-radius: 5px;
	margin-left: 8px;
	margin-top: 10px;
	background-color: #fff;
}

.contacts {
	height: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
}

.card:hover {
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
}
</style>
