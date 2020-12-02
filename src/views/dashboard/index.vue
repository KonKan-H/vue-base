/* 首页 */
<template>
  <div class="dashboard-container">
    <div class="dashboard-up">
      <el-card class="dashboard-left dashboard-table">
        <el-tabs v-model="activeLeftHeader" @tab-click="handleClick">
          <el-tab-pane :label="item" :name="'left' + index" v-for="(item, index, key) in header.left" :key=key>
            {{item}}
          </el-tab-pane>
        </el-tabs>
      </el-card>
      <el-card class="dashboard-right dashboard-table">
        <el-tabs v-model="activeRightHeader" @tab-click="handleClick">
          <el-tab-pane :label="item" :name="'right' + index" v-for="(item, index, key) in header.right" :key=key>
            <ul class="dashboard-right-list">
              <li v-for="(item, index, key) in dataList" :key="key">
                <i></i>
                {{item.title}}
              </li>
            </ul>
            <div class="view-more">
              <span>
                - 查看更多 -
              </span>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <el-card class="dashboard-down dashboard-table">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="一致性 Consistency" name="1">
          <div>
            <el-table
              :data="tableData"
              style="width: 100%"
              border>
              <el-table-column
                fixed
                v-for="(head, key) in tableHead"
                :key=key
                :prop="head.filed"
                :label="head.label">
              </el-table-column>
            </el-table>
          </div>
          <div class="memorabilia-btn">
            <el-tabs v-model="activeMemorabilia" type="card">
              <el-tab-pane v-for="(item, index, key) in memorabiliaData" :key=key :label="item.label" :name="'memorabilia' + index">
                <ul class="memorabilia-list">
                  <li v-for="(child, index, k) in item.children" :key=k>
                    <div>
                      {{child.num}}
                    </div>
                    <div>
                      {{child.name}}
                    </div>
                  </li>
                </ul>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'dashboard',
    data() {
      return {
        header: { // 表头信息
          left: ['资金', '资产', '资源', '资本',],
          right: ['平衡分析', '纲要', '政策',],
        },
        activeLeftHeader: 'left0', // 左侧默认表头
        activeRightHeader: 'right0', // 右侧默认表头
        activeNames: ['1'], // 下方默认表头
        dataList: [
          {
            title: '11111111aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1',
          },
          {
            title: '111111111',
          },
          {
            title: '111111111',
          },
          {
            title: '111111111',
          },
          {
            title: '111111111',
          },
          {
            title: '111111111',
          },
          {
            title: '111111111',
          },
          {
            title: '111111111',
          },
          {
            title: '111111111',
          },
          {
            title: '111111111',
          },
          {
            title: '111111111',
          },
          {
            title: '111111111',
          },
          {
            title: '111111111',
          },
          {
            title: '111111111',
          },
          {
            title: '111111111',
          },
          {
            title: '111111111',
          },
        ],
        tableHead: [{
          filed: 'task',
          label: '八大任务',
        }, {
          filed: 'invest',
          label: '总投入',
        }, {
          filed: 'budget',
          label: '当年预算金额',
        }, {
          filed: 'pay',
          label: '项目支出金额',
        }, {
          filed: 'schedule',
          label: '进度',
        }, ],
        tableData: [{
          task: '1231231231',
          invest: '1231231231',
          budget: '12321322131',
          pay: '12321322131',
          schedule: '12321322131',
        }, {
          task: '12321322131',
          invest: '12321322131',
          budget: '12321322131',
          pay: '12321322131',
          schedule: '12321322131',
        }, {
          task: '12321322131',
          invest: '12321322131',
          budget: '12321322131',
          pay: '12321322131',
          schedule: '12321322131',
        }, {
          task: '12321322131',
          invest: '12321322131',
          budget: '12321322131',
          pay: '12321322131',
          schedule: '12321322131',
        }, {
          task: '12321322131',
          invest: '12321322131',
          budget: '12321322131',
          pay: '12321322131',
          schedule: '12321322131',
        }, {
          task: '12321322131',
          invest: '12321322131',
          budget: '12321322131',
          pay: '12321322131',
          schedule: '12321322131',
        }, {
          task: '12321322131',
          invest: '12321322131',
          budget: '12321322131',
          pay: '12321322131',
          schedule: '12321322131',
        }, {
          task: '12321322131',
          invest: '12321322131',
          budget: '12321322131',
          pay: '12321322131',
          schedule: '12321322131',
        },],
        project: [{
          num: '123142',
          name: '123123',
          img: '123123',
        }, {
          num: '123142',
          name: '123123',
          img: '123123',
        }, {
          num: '123142',
          name: '123123',
          img: '123123',
        }, {
          num: '123142',
          name: '123123',
          img: '123123',
        }, ],
        activeMemorabilia: 'memorabilia0', // 最下方默认大事
        memorabiliaData: [{
          label: '三大攻坚战',
          children: [{
            num: '123142',
            name: '三大攻坚战',
            img: '123123',
          }, {
            num: '123142',
            name: '123123',
            img: '123123',
          }, {
            num: '123142',
            name: '123123',
            img: '123123',
          }],
        }, {
          label: '八大任务',
          children: [{
            num: '123142',
            name: '八大任务',
            img: '123123',
          }, {
            num: '123142',
            name: '123123',
            img: '123123',
          }, {
            num: '123142',
            name: '123123',
            img: '123123',
          }, {
            num: '123142',
            name: '123123',
            img: '123123',
          },],
        }, {
          label: '四大政策',
          children: [{
            num: '123142',
            name: '四大政策',
            img: '123123',
          }, {
            num: '123142',
            name: '123123',
            img: '123123',
          }, {
            num: '123142',
            name: '123123',
            img: '123123',
          }, {
            num: '123142',
            name: '123123',
            img: '123123',
          }, {
            num: '123142',
            name: '123123',
            img: '123123',
          }, {
            num: '123142',
            name: '123123',
            img: '123123',
          }, {
            num: '123142',
            name: '123123',
            img: '123123',
          },],
        }, ]
      }
    },
    computed: {
    },
    watch: {
    },
    methods: {
      handleChange(val) {
        console.log(val);
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
    },
    beforeCreate() {
    },
    created() {
    },
    beforeMount() {
    },
    mounted() {
    },
    beforeUpdate() {
    },
    updated() {
    },
    beforeDestory() {
    },
    destoryed() {
    },
  }
</script>

<style lang="scss" scope>
  $headerBg: #f8f9fc;
  $activeTitle: #4e73df;
  $viewMore: #4198f7;
  $font: #808796;
  $titleFont: #5b5b5b;
  $icon: #fc9a49;
  $btnBd: #e3e6f0;
  $white: #fff;
  .dashboard-container {
    text-align: left;
    display: grid;
    grid-template-rows: 430px auto;
    grid-row-gap: 20px;
    .el-card__body {
      padding: 0;
      padding-bottom: 20px;
    }
    .dashboard-up {
      color: $font;
      display: grid;
      grid-template-columns: 38% 60%;
      grid-column-gap: 2%;
      .el-tabs__header {
        background-color: $headerBg;
      }
      .el-tabs__nav-scroll {
        color: $titleFont;
      }
      .el-tabs__nav-scroll, .el-tabs__content  {
        padding: 0 20px;
      }
      .dashboard-right-list {
        display: grid;
        list-style: none;
        margin: 0;
        padding: 0;
        grid-template-columns: 42.5% 42.5%;
        grid-column-gap: 15%;
        font-size: 14px;
        color: $font;
        li {
          cursor: pointer;
          height: 40px;
          line-height: 40px;
          position: relative;
          padding-left: 15px;
          width: 100%;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          word-break: break-all;
          &:hover {
            color: $icon;
          }
          i {
            left: 1px;
            background-color: $icon;
            width: 5px;
            height: 5px;
            position: absolute;
            top: 17.5px;
            transform: rotateZ(45deg);
          }
        }
      }
      .view-more {
        margin-top: 10px;
        font-size: 14px;
        text-align: center;
        color: $viewMore;
        span {
          cursor: pointer;
        }
      }
    }
    .dashboard-down {
      .el-collapse-item > div {
        &:first-child {
          background-color: $headerBg;
          .el-collapse-item__header {
            background-color: transparent;
          }
        }
      }
      .el-collapse-item__header, .el-collapse-item__wrap {
        padding: 0 20px;
        .el-collapse-item__content {
          padding: 0;
        }
      }
      .el-collapse-item__wrap {
        border: none;
        padding: 20px;
      }
      .memorabilia-btn {
        margin-top: 20px;
        .el-tabs--card>.el-tabs__header {
          border: none;
          .el-tabs__nav {
            border: none;
          }
          .el-tabs__item {
            border: 1px solid $btnBd;
            color: $font;
            height: 35px;
            line-height: 35px;
            &:first-child {
              border-right: none;
            }
            &:last-child {
              border-left: none;
            }
          }
          .is-active {
            background-color: $viewMore;
            color: $white;
          }
        }
        .memorabilia-list {
          display: grid;
          // grid-template-columns: repeat(auto-fill, 19.2%);
          grid-template-columns: repeat(5, 1fr);
          grid-column-gap: 1%;
          grid-row-gap: 10px;
          justify-content: start;
          align-items: center;
          width: 100%;
          list-style: none;
          margin: 0;
          padding: 0;
          li {
            background-color: #00ff00;
            width: 100%;
            height: 120px;
          }
        }
      }
    }
  }
</style>