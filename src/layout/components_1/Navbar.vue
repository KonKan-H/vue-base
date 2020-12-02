<template>
  <el-menu class="navbar" mode="horizontal">
    <breadcrumb></breadcrumb>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
// import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    // Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('FedLogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
        // window.location.href = window.location.origin + '/baseManager/'
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  text-align: left;
  height: 20px;
  line-height: 20px;
  border-radius: 0px !important;
  .app-breadcrumb.el-breadcrumb {
    line-height: 20px;
  }
}
</style>

