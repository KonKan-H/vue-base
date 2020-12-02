<template>
  <div class="my-app-header">
    <img src="../../assets/images/logo1.png" alt="" @click="toDashboard">
    <h2 @click="toDashboard">集中财力办大事管理平台</h2>
    <!-- <div class="select-year"> -->
      <el-date-picker
        class="select-year"
        v-model="year"
        type="year"
        placeholder="选择年">
      </el-date-picker>
    <!-- </div> -->
    <!-- <ul class="check-page">
        <li>首页</li>
        <li>数据仓库</li>
        <li>交通先导</li>
    </ul> -->
    <ul class='right-user-msg'>
      <li>{{username}}，欢迎您</li>
      <li>思维导图</li>
      <li @click="logout">注销</li>
      <li>设置</li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'header-content',
  data() {
    return {
      username: '张三',
      year: '2019',
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('FedLogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
        // window.location.href = window.location.origin + '/baseManager/'
      })
    },
    toDashboard() {
      this.$router.push('/')
    },
  },
  created() {
    this.username = this.$store.state.user.nickname;
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  $yearBg: #f2f2f2;
  $bd: #4e73df;
  $fontColor: #5b5b5b;
  $userColor: #fc7e65;
  .my-app-header {
      position: relative;
      width: calc(100% - 40px);
      & > img, & > h2 {
        cursor: pointer;
      }
      h2, ul, div {
        display: inline-block;
        position: absolute;
        height: 72px;
        line-height: 72px;
      }
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        top: 0;
        display: flex;
        justify-content: space-around;
        align-items: center;
        color: $fontColor;
        li {
          cursor: pointer;
        }
      }
      h2 {
        left: 90px;
        margin: 0;
        font-size: 22px;
      }
      .select-year {
        font-size: 12px;
        left: 380px;
        width: 100px;
        height: 35px;
        line-height: 35px;
        border-radius: 5px;
        top: calc(50% - 17.5px);
        background-color: $yearBg;
      }
      .check-page {
        width: 400px;
        left: 480px;
        li {
          font-size: 15px;
          height: 72px;
          line-height: 72px;
          margin: 0;
          width: 80px;
          text-align: center;
          border-bottom: 2px solid #fff;
          &:hover {
            border-bottom: 2px solid $bd;
            color: $bd;
          }
        }
      }
      .right-user-msg {
        right: 20px;
        font-size: 12px;
        width: 300px;
        li {
          &:first-child {
            color: $userColor;
          }
        }
      }
    }
</style>