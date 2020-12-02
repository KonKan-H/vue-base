<template>
  <div class="app-wrapper">
    <el-header height="72px" class="my-app-header">
      <header-content></header-content>
    </el-header>
    <el-container>
      <el-aside width="200px" class="my-app-aside">
        <sidebar></sidebar>
      </el-aside>
      <el-main class="my-app-main">
        <div class="my-navbar">
        <navbar></navbar>
        </div>
        <app-main></app-main>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import HeaderContent from './components_1/HeaderContent';
import Navbar from './components_1/Navbar';
import { Sidebar, AppMain, TagsView } from '@/layout/components'

export default {
  name: 'layout',
  components: {
    HeaderContent,
    Sidebar,
    AppMain,
    Navbar,
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  $asideBgUp: #4a6eda;
  $asideBgDown: #2c53c6;
  $mainBg: #f2f3f6;
  .app-wrapper {
    user-select: none;
    height: 100vh;
    .el-header {
      text-align: left;
      box-shadow: 0 2px 12px rgba(0, 0, 0, .1);
      position: relative;
      z-index: 1;
    }
    .my-app-aside {
      height: calc(100vh - 72px);
      width: 200px;
      text-align: left !important;
      overflow: hidden;
      /* .scroll-container {
        background-image: linear-gradient($asideBgUp, $asideBgDown);
        ul, div, li {
          background-color: none !important;
        }
      } */
    }
    .my-app-main {
      background-color: $mainBg;
      height: calc(100vh - 72px);
      overflow: hidden;
      padding-right: 0;
      padding-top: 0;
      .my-navbar {
        padding-right: 27px;
        .navbar {
          border: none;
          background-color: #fff;
          padding: 10px 0;
          height: 40px;
          box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        }
      }
      .app-main {
        margin-top: 20px;
        padding-right: 10px;
        overflow-y: auto;
        height: calc(100vh - 112px);
      }
    }
  }
</style>
