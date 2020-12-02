/* 大事 */
<template>
  <div class="my-memorabilia-content">
    <el-card>
      <el-tabs v-model="activeHeader" @tab-click="handleClick">
        <el-tab-pane :label="item.label" :name="'header' + index" v-for="(item, index, key) in headerList" :key=key>
          <ul class="list-children clearfix">
            <li class="app-container" v-for="(child, index, k) in item.children" :key=k :style="setActive(item, index)" @click="getActive(item, index)">
              <div v-if="child.num !== null">{{child.num}}</div>
              <div>{{child.label}}</div>
            </li>
          </ul>
          <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item title="查询条件" name="1">
              <div class="query-input">
                <ul>
                  <li v-for="(item, key) in queryData" :key=key>
                    <label :for="item.key">{{item.label}}</label>
                    <input type="text" :id="item.key">
                  </li>
                </ul>
                <div class="query-submit">
                  <button>查询</button>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
          <div class="data-table">
            <el-table
              :data="tableData"
              :max-height="tableMaxHeight"
              border
              row-key="id"
              default-expand-all
              :tree-props="{chldren: 'children', hasChildren: 'hasChildren'}"
              style="width: 100%">
              <template v-for="(head, index, key) in tableHead">
                <el-table-column
                  align="center"
                  :fixed="index === 0"
                  :key=key
                  :prop="head.prop"
                  :label="head.label"
                  width="200">
                  <el-table-column
                    v-for="(child, k) in head.children"
                    :key="k"
                    :prop="child.prop"
                    :label="child.label"
                    width="200"
                    align="center">
                  </el-table-column>
                </el-table-column>
              </template>
              <el-table-column
                align="center"
                v-if="percent.isHas"
                :prop="percent.prop"
                :label="percent.label"
                v-for="(percent, key) in tablePercent"
                :key=key>
                <template slot-scope="scope" v-if="percent.isHas">
                  <el-progress :percentage="getPercent(scope.row)" :format="getValue(scope.row)"></el-progress>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
      <!-- <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="查询条件" name="1">
          <div class="query-input">
            <ul>
              <li v-for="(item, key) in queryData" :key=key>
                <label :for="item.key">{{item.label}}</label>
                <input type="text" :id="item.key">
              </li>
            </ul>
            <div class="query-submit">
              <button>查询</button>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
      <div class="data-table">
        <el-table
          :data="tableData"
          :max-height="tableMaxHeight"
          border
          row-key="id"
          default-expand-all
          :tree-props="{chldren: 'children', hasChildren: 'hasChildren'}"
          style="width: 100%">
          <template v-for="(head, index, key) in tableHead">
            <el-table-column
              align="center"
              :fixed="index === 0"
              :key=key
              :prop="head.prop"
              :label="head.label"
              width="200">
              <el-table-column
                v-for="(child, k) in head.children"
                :key="k"
                :prop="child.prop"
                :label="child.label"
                width="200"
                align="center">
              </el-table-column>
            </el-table-column>
          </template>
          <el-table-column
            align="center"
            v-if="percent.isHas"
            :prop="percent.prop"
            :label="percent.label"
            v-for="(percent, key) in tablePercent"
            :key=key>
            <template slot-scope="scope" v-if="percent.isHas">
              <el-progress :percentage="getPercent(scope.row)" :format="getValue(scope.row)"></el-progress>
            </template>
          </el-table-column>
        </el-table>
      </div> -->
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'memorabilia',
    data() {
      return {
        headerList: [{
          label: '纲要',
          active: 0,
          children: [{
            label: 'skdjafh',
            num: 2,
            color: {
              default: '#16b4ff',
              active: '#3876ff',
            },
          }, {
            label: 'skdjafh',
            num: 2,
            color: {
              default: '#fce5cd',
              active: '#f87c16',
            },
          }, {
            label: 'skdjafh',
            num: 2,
            color: {
              default: '#f9ebcd',
              active: '#e8a718',
            },
          }, ],
        }, {
          label: '政策',
          active: 0,
          color: {
            default: '#fce5cd',
            active: '#f87c16',
          },
          children: [{
            label: 'skdjafh',
            num: 2,
            color: {
              default: '#16b4ff',
              active: '#3876ff',
            },
          }, {
            label: 'skdjafh',
            num: 2,
            color: {
              default: '#fce5cd',
              active: '#f87c16',
            },
          }, {
            label: 'skdjafh',
            num: 2,
            color: {
              default: '#f9ebcd',
              active: '#e8a718',
            },
          }, ],
        }, {
          label: '项目总览',
          active: 0,
          children: [{
            label: 'skdjafh',
            num: 2,
            color: {
              default: '#16b4ff',
              active: '#3876ff',
            },
          }, {
            label: 'skdjafh',
            num: 2,
            color: {
              default: '#fce5cd',
              active: '#f87c16',
            },
          }, {
            label: 'skdjafh',
            num: 2,
            color: {
              default: '#f9ebcd',
              active: '#e8a718',
            },
          }, ],
        }, {
          label: '资金总览',
          active: 0,
          color: {
            default: '#16b4ff',
            active: '#3876ff',
          },
          children: [{
            label: 'skdjafh',
            num: null,
            color: {
              default: '#16b4ff',
              active: '#3876ff',
            },
          }, {
            label: 'skdjafh',
            num: null,
            color: {
              default: '#fce5cd',
              active: '#f87c16',
            },
          }, {
            label: 'skdjafh',
            num: null,
            color: {
              default: '#f9ebcd',
              active: '#e8a718',
            },
          }, {
            label: 'skdjafh',
            num: null,
            color: {
              default: '#cbf2f7',
              active: '#37a5a7',
            },
          }, {
            label: 'skdjafh',
            num: null,
            color: {
              default: '#d9f9ec',
              active: '#1cc88a',
            },
          },],
        }, ],
        activeHeader: 'header2',
        activeNames: ['1'],
        queryData: [{
          label: '关键字',
          key: 'keyword',
        }, {
          label: '责任部门',
          key: 'department',
        }, {
          label: '财政局责任处室',
          key: 'room',
        }, {
          label: '项目类型',
          key: 'type',
        }, ],
        tableData: [{
          name: '',
          department: '',
          room: '',
          type: '',
          budget: '',
          progress: '',
          children: [],
        }, ],
        tableHead: [],
        tablePercent: [{
          isHas: true,
          prop: '',
          label: '',
        },],
        tableMaxHeight: 400,
      }
    },
    computed: {
    },
    watch: {
      defaultVal(val) {
        console.log(val);
      }
    },
    methods: {
      handleChange(val) {
        // this.tableMaxHeight = val.length === 0 ? 360 : 290;
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      setActive(item, index) {
        const color = item.children[index].color;
        let style = {
          color: color.active,
          'background-color': color.default
        };
        item.active === index && (style = {
          color: '#fff',
          'background-image': `linear-gradient(to bottom right, ${color.active}, ${color.default})`,
          transform: 'scale(1.1, 1.1)'
        })
        return style
      },
      getActive(item, index) {
        item.active = index;
      },
      getPercent(row) {
        return row.progress > 100 ? 100 : row.progress;
      },
      getValue(row) {
        return () => {
          return `${row.progress}%`;
        }
      },
    },
    beforeCreate() {
    },
    created() {
      const tableHead1 = [{
        prop: 'name',
        label: '项目名称',
        hasChildren: false,
        isPercent: false,
      }, {
        prop: 'department',
        label: '责任部门',
        hasChildren: false,
        isPercent: false,
      }, {
        prop: 'room',
        label: '财政局责任处室',
        hasChildren: false,
        isPercent: false,
      }, {
        prop: 'type',
        label: '项目类型',
        hasChildren: false,
        isPercent: false,
      }, {
        prop: 'budget',
        label: '项目总预算',
        hasChildren: false,
        isPercent: false,
      }];
      const tableHead2 = [{
        prop: 'name',
        label: '项目名称',
        children: [],
      }, {
        prop: '',
        label: '合计',
        children: [{
          prop: 'aaa',
          label: 'AAA',
        }, {
          prop: 'bbb',
          label: 'BBB',
        }, {
          prop: 'ccc',
          label: 'CCC',
        }, {
          prop: 'ddd',
          label: 'DDD',
        },]
      }, {
        prop: '',
        label: '2020年资金预算数',
        children: [{
          prop: 'eee',
          label: 'EEE',
        }, {
          prop: 'fff',
          label: 'FFF',
        }, {
          prop: 'ggg',
          label: 'GGG',
        }, {
          prop: 'hhh',
          label: 'HHH',
        }, {
          prop: 'iii',
          label: 'III',
        },]
      }, {
        prop: '',
        label: 'JK',
        children: [{
          prop: 'jjj',
          label: 'JJJ',
        }, {
          prop: 'kkk',
          label: 'KKK',
        },]
      },];
      const percent1 = [{
        prop: 'progress',
        label: '当年进度',
        hasChildren: false,
        isPercent: true,
        isHas: true,
      }];
      const percent2 = [{
        prop: '',
        label: '',
        hasChildren: false,
        isPercent: true,
        isHas: false,
      }];
      const tableData1 = [{
        name: '（一）交通先导',
        department: '',
        room: '',
        type: '政府性投资项目',
        budget: 694130,
        progress: 117.61,
        id: 1,
        children: [{
          id: 11,
          name: '2.351国道衢州名称名称2',
          department: '',
          room: '经建处',
          type: '政府性投资项目',
          budget: 69130,
          progress: 193.44,
        }, {
          id: 12,
          name: '2.351国道衢州名称名称2',
          department: '',
          room: '经建处',
          type: '政府性投资项目',
          budget: 69130,
          progress: 193.44,
        }, {
          id: 13,
          name: '2.351国道衢州名称名称2',
          department: '',
          room: '经建处',
          type: '政府性投资项目',
          budget: 69130,
          progress: 193.44,
        }, ],
      }, {
        name: '（一）交通先导',
        department: '',
        room: '',
        type: '政府性投资项目',
        budget: 694130,
        progress: 117.61,
        id: 2,
        children: [{
          id: 21,
          name: '2.351国道衢州名称名称2.123',
          department: '',
          room: '经建处',
          type: '政府性投资项目',
          budget: 69130,
          progress: 193.44,
        }, {
          id: 22,
          name: '2.351国道衢州名称名称2',
          department: '',
          room: '经建处',
          type: '政府性投资项目',
          budget: 69130,
          progress: 193.44,
        }, {
          id: 23,
          name: '2.351国道衢州名称名称2',
          department: '',
          room: '经建处',
          type: '政府性投资项目',
          budget: 69130,
          progress: 193.44,
        }, ],
      }, {
        name: '（一）交通先导',
        department: '',
        room: '',
        type: '政府性投资项目',
        budget: 694130,
        progress: 117.61,
        id: 3,
        children: [{
          id: 31,
          name: '2.351国道衢州名称名称2',
          department: '',
          room: '经建处',
          type: '政府性投资项目',
          budget: 69130,
          progress: 193.44,
        }, {
          id: 32,
          name: '2.351国道衢州名称名称2',
          department: '',
          room: '经建处',
          type: '政府性投资项目',
          budget: 69130,
          progress: 193.44,
        }, {
          id: 33,
          name: '2.351国道衢州名称名称2',
          department: '',
          room: '经建处',
          type: '政府性投资项目',
          budget: 69130,
          progress: 193.44,
        }, ],
      }, ]
      const tableData2 = [{
        name: '（一）交通先导',
        id: 1,
        aaa: 3333,
        bbb: 222,
        ccc: 11111,
        ddd: 694130,
        eee: 117.61,
        fff: 1111,
        ggg: 1233,
        hhh: 1234,
        iii: 1234,
        jjj: 12334,
        kkk: 1234,
        children: [{
          id: 11,
          name: '2.351国道衢州名称名称2',
          aaa: 3333,
          bbb: 222,
          ccc: 11111,
          ddd: 694130,
          eee: 117.61,
          fff: 1111,
          ggg: 1233,
          hhh: 1234,
          iii: 1234,
          jjj: 12334,
          kkk: 1234,
        }, {
          id: 12,
          aaa: 3333,
          bbb: 222,
          ccc: 11111,
          ddd: 694130,
          eee: 117.61,
          fff: 1111,
          ggg: 1233,
          hhh: 1234,
          iii: 1234,
          jjj: 12334,
          kkk: 1234,
        }, {
          id: 13,
          aaa: 3333,
          bbb: 222,
          ccc: 11111,
          ddd: 694130,
          eee: 117.61,
          fff: 1111,
          ggg: 1233,
          hhh: 1234,
          iii: 1234,
          jjj: 12334,
          kkk: 1234,
        }, ],
      }, {
        name: '（一）交通先导',
        aaa: 3333,
        bbb: 222,
        ccc: 11111,
        ddd: 694130,
        eee: 117.61,
        fff: 1111,
        ggg: 1233,
        hhh: 1234,
        iii: 1234,
        jjj: 12334,
        kkk: 1234,
        id: 2,
        children: [{
          id: 21,
          name: '2.351国道衢州名称名称2.123',
          aaa: 3333,
          bbb: 222,
          ccc: 11111,
          ddd: 694130,
          eee: 117.61,
          fff: 1111,
          ggg: 1233,
          hhh: 1234,
          iii: 1234,
          jjj: 12334,
          kkk: 1234,
        }, {
          id: 22,
          name: '2.351国道衢州名称名称2',
          aaa: 3333,
          bbb: 222,
          ccc: 11111,
          ddd: 694130,
          eee: 117.61,
          fff: 1111,
          ggg: 1233,
          hhh: 1234,
          iii: 1234,
          jjj: 12334,
          kkk: 1234,
        }, {
          id: 23,
          name: '2.351国道衢州名称名称2',
          aaa: 3333,
          bbb: 222,
          ccc: 11111,
          ddd: 694130,
          eee: 117.61,
          fff: 1111,
          ggg: 1233,
          hhh: 1234,
          iii: 1234,
          jjj: 12334,
          kkk: 1234,
        }, ],
      }, {
        name: '（一）交通先导',
        aaa: 3333,
        bbb: 222,
        ccc: 11111,
        ddd: 694130,
        eee: 117.61,
        fff: 1111,
        ggg: 1233,
        hhh: 1234,
        iii: 1234,
        jjj: 12334,
        kkk: 1234,
        id: 3,
        children: [{
          id: 31,
          name: '2.351国道衢州名称名称2',
          aaa: 3333,
          bbb: 222,
          ccc: 11111,
          ddd: 694130,
          eee: 117.61,
          fff: 1111,
          ggg: 1233,
          hhh: 1234,
          iii: 1234,
          jjj: 12334,
          kkk: 1234,
        }, {
          id: 32,
          name: '2.351国道衢州名称名称2',
          aaa: 3333,
          bbb: 222,
          ccc: 11111,
          ddd: 694130,
          eee: 117.61,
          fff: 1111,
          ggg: 1233,
          hhh: 1234,
          iii: 1234,
          jjj: 12334,
          kkk: 1234,
        }, {
          id: 33,
          name: '2.351国道衢州名称名称2',
          aaa: 3333,
          bbb: 222,
          ccc: 11111,
          ddd: 694130,
          eee: 117.61,
          fff: 1111,
          ggg: 1233,
          hhh: 1234,
          iii: 1234,
          jjj: 12334,
          kkk: 1234,
        }, ],
      }, ]
      this.tableHead = tableHead1;
      this.tableData = tableData1;
      this.tablePercent = percent1;
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
  $queryBg: #f2f3f6;
  $queryBtnBg: #4198f7;
  $btnHoverBg: #41a8f7;
  $white: #fff;
  $titleBg: #f8f9fc;
  .my-memorabilia-content {
    // height: 100%;
    .el-card {
      // height: 98%;
      .el-card__body {
        padding: 0;
        // padding-bottom: 20px;
        font-size: 14px;
        .el-tabs__header {
          margin: 0;
          padding: 0;
          .el-tabs__nav-scroll {
            padding: 0 30px;
            background-color: $titleBg;
          }
        }
        .list-children {
          list-style: none;
          display: flex;
          padding: 0;
          align-items: center;
          height: 130px;
          width: calc(100% - 60px);
          margin: 0 auto;
          li {
            float: left;
            margin-left: 20px;
            height: 90px;
            width: 20%;
            border-radius: 15px;
            cursor: pointer;
            &:first-child {
              margin-left: 0;
            }
            /* &:hover {
              transform: scale(1.1, 1.1);
            } */
            transition: all 0.3s;
          }
        }
        .el-collapse {
        padding: 0 20px;
        border: none;
        margin-bottom: 20px;
        .el-collapse-item__header {
          border: none;
          background-color: $queryBg;
          padding: 0 10px;
          font-weight: bold;
          height: 45px;
          line-height: 45px;
        }
        .query-input {
          height: 50px;
          line-height: 50px;
          margin-top: 20px;
          padding: 0 20px;
          display: grid;
          grid-template-columns: 80% 20%;
          align-items: center;
          ul {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: space-around;
            li > input {
              border-radius: 4px;
              outline: none;
              border: 1px solid #999;
              height: 30px;
              line-height: 30px;
            }
          }
          .query-submit {
              text-align: center;
              button {
                width: 100px;
                height: 30px;
                line-height: 30px;
                outline: none;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                background-color: $queryBtnBg;
                color: #fff;
                &:hover {
                  background-color: $btnHoverBg;
                }
              }
            }
        }
        .el-collapse-item__wrap {
          border: none;
          .el-collapse-item__content {
            height: 50px;
            line-height: 50px;
          }
        }
        }
        .data-table {
          padding: 0 40px 40px;
          .el-table {
            font-size: 13px;
            th {
              background-color: #f8f9fc;
              color: #3d3d3d;
            }
          }
        }
      }
    }
  }
</style>