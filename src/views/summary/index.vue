/* 概述 */
<template>
  <div class="my-summary-content">
    <el-card>
      <el-collapse v-model="summaryHeader.activeNames" @change="handleChange">
        <el-collapse-item :title="summaryHeader.title" name="1">
          <div class="summary-content">
            <div class="summary-image">
              <img :src="summaryHeader.imgUrl" alt="">
            </div>
            <div class="summary-text">{{summaryHeader.text}}</div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-card>
    <el-card>
      <el-tabs v-model="listData.active" @tab-click="handleClick">
        <el-tab-pane
          v-for="(item, index, key) in listData.data"
          :key="key"
          :label="item.label"
          :name="'list' + index">
          <ul>
            <li v-for="(list, k) in item.list" :key=k :title="list.title">
              <i></i>
              <span>{{list.title}}</span>
            </li>
          </ul>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            background
            :current-page="item.currentPage"
            :page-sizes="[10, 20, 30]"
            :page-size="item.pageSize"
            layout="total, prev, pager, next, sizes, jumper"
            :total="item.maxSize">
          </el-pagination>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        summaryHeader: {
          title: '概述',
          activeNames: ['1'],
          imgUrl: '',
          text: '根据集中财力办大事的要求，提高财政资金使用绩效，对2019-2022年交通项目的支出进行统计分析、测算，对现有政策进行梳理、整合，并根据新形势新任务新要求，反复迭代优惠，编制集中财力办大事-交通先导',
        },
        listData: {
          active: 'list0',
          data: [],
        },
        list: [{
          title: '9.《关于加快市区公共交通优先发展的实施意见（试行）》（衢政发【2019】）',
        }, {
          title: '7.《关于印发浙江省内河水运基础设施建设项目资金补助办法的通知》（浙江省内河水运基础设施建设）',
        }, {
          title: '5.《浙江省高水平建设“四好农村路”助推乡村振兴战略三年（2018-2020）》',
        }, {
          title: '3.中国民用航空局出台《民航基础设施项目投资补助管理暂行办法》（民航基础设施项目）',
        }, {
          title: '交通先导——省级有关政策',
        }, {
          title: '8.《关于加快市区公共交通优先发展的实施意见（试行）》（衢政发【2019】）',
        }, {
          title: '6.《关于印发浙江省内河水运基础设施建设项目资金补助办法的通知》（浙江省内河水运基础设施建设）',
        }, {
          title: '4.《浙江省高水平建设“四好农村路”助推乡村振兴战略三年（2018-2020）》',
        }, {
          title: '1.中国民用航空局出台《民航基础设施项目投资补助管理暂行办法》（民航基础设施项目）',
        }, {
          title: '交通先导——省级有关政策',
        }, {
          title: '8.《关于加快市区公共交通优先发展的实施意见（试行）》（衢政发【2019】）',
        }, {
          title: '5.《浙江省高水平建设“四好农村路”助推乡村振兴战略三年（2018-2020）》',
        }, {
          title: '3.中国民用航空局出台《民航基础设施项目投资补助管理暂行办法》（民航基础设施项目）',
        }, {
          title: '交通先导——省级有关政策',
        }, {
          title: '8.《关于加快市区公共交通优先发展的实施意见（试行）》（衢政发【2019】）',
        }, {
          title: '6.《关于印发浙江省内河水运基础设施建设项目资金补助办法的通知》（浙江省内河水运基础设施建设）',
        }, {
          title: '交通先导——省级有关政策',
        }, {
          title: '8.《关于加快市区公共交通优先发展的实施意见（试行）》（衢政发【2019】）',
        }, {
          title: '6.《关于印发浙江省内河水运基础设施建设项目资金补助办法的通知》（浙江省内河水运基础设施建设）',
        }, {
          title: '4.《浙江省高水平建设“四好农村路”助推乡村振兴战略三年（2018-2020）》',
        }, {
          title: '1.中国民用航空局出台《民航基础设施项目投资补助管理暂行办法》（民航基础设施项目）',
        }, {
          title: '6.《关于印发浙江省内河水运基础设施建设项目资金补助办法的通知》（浙江省内河水运基础设施建设）',
        }, {
          title: '4.《浙江省高水平建设“四好农村路”助推乡村振兴战略三年（2018-2020）》',
        }, {
          title: '1.中国民用航空局出台《民航基础设施项目投资补助管理暂行办法》（民航基础设施项目）',
        }, {
          title: '交通先导——省级有关政策',
        }, {
          title: '4.《浙江省高水平建设“四好农村路”助推乡村振兴战略三年（2018-2020）》',
        }, {
          title: '1.中国民用航空局出台《民航基础设施项目投资补助管理暂行办法》（民航基础设施项目）',
        }, {
          title: '交通先导——省级有关政策',
        }, {
          title: '8.《关于加快市区公共交通优先发展的实施意见（试行）》（衢政发【2019】）',
        }, {
          title: '6.《关于印发浙江省内河水运基础设施建设项目资金补助办法的通知》（浙江省内河水运基础设施建设）',
        },]
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
      handleClick(tab) {
      },
      handleSizeChange(val) {
        const listData = this.listData;
        const data = listData.data;
        if (val !== data.pageSize) {
          const list = this.list;
          for (let i = 0, l = data.length; i < l; i++) {
            const value = data[i];
            value.pageSize = val;
            val >= list.length && (val = list.length);
            const start = (value.currentPage - 1) * val;
            value.list = list.slice(start, start + val)
          }
        }
      },
      handleCurrentChange(val) {
        const listData = this.listData;
        const data = listData.data[listData.active.slice(-1)];
        const start = (val - 1) * data.pageSize;
        data.currentPage = val; // 记住当前界面的页数
        data.list = this.list.slice(start, start + data.pageSize);
      },
    },
    beforeCreate() {
    },
    created() {
      const list = [{
          label: '纲要',
          maxSize: 30,
          pageSize: 10,
          currentPage: 1,
          list: [{
            title: '9.《关于加快市区公共交通优先发展的实施意见（试行）》（衢政发【2019】）',
          }, {
            title: '7.《关于印发浙江省内河水运基础设施建设项目资金补助办法的通知》（浙江省内河水运基础设施建设）',
          }, {
            title: '5.《浙江省高水平建设“四好农村路”助推乡村振兴战略三年（2018-2020）》',
          }, {
            title: '3.中国民用航空局出台《民航基础设施项目投资补助管理暂行办法》（民航基础设施项目）',
          }, {
            title: '交通先导——省级有关政策',
          }, {
            title: '8.《关于加快市区公共交通优先发展的实施意见（试行）》（衢政发【2019】）',
          }, {
            title: '6.《关于印发浙江省内河水运基础设施建设项目资金补助办法的通知》（浙江省内河水运基础设施建设）',
          }, {
            title: '4.《浙江省高水平建设“四好农村路”助推乡村振兴战略三年（2018-2020）》',
          }, {
            title: '1.中国民用航空局出台《民航基础设施项目投资补助管理暂行办法》（民航基础设施项目）',
          }, {
            title: '交通先导——省级有关政策',
          }, ]
        },
        {
          label: '政策',
          maxSize: 30,
          pageSize: 10,
          currentPage: 1,
          list:[{
            title: '9.《关于加快市区公共交通优先发展的实施意见（试行）》（衢政发【2019】）',
          }, {
            title: '8.《关于加快市区公共交通优先发展的实施意见（试行）》（衢政发【2019】）',
          }, {
              title: '5.《浙江省高水平建设“四好农村路”助推乡村振兴战略三年（2018-2020）》',
          }, {
            title: '7.《关于印发浙江省内河水运基础设施建设项目资金补助办法的通知》（浙江省内河水运基础设施建设）',
          }, {
            title: '3.中国民用航空局出台《民航基础设施项目投资补助管理暂行办法》（民航基础设施项目）',
          }, {
            title: '6.《关于印发浙江省内河水运基础设施建设项目资金补助办法的通知》（浙江省内河水运基础设施建设）',
          }, {
            title: '交通先导——省级有关政策',
          }, {
            title: '4.《浙江省高水平建设“四好农村路”助推乡村振兴战略三年（2018-2020）》',
          }, {
            title: '1.中国民用航空局出台《民航基础设施项目投资补助管理暂行办法》（民航基础设施项目）',
          }, {
            title: '交通先导——省级有关政策',
          }, ]
        },
        {
          label: '项目总览',
          maxSize: 30,
          pageSize: 10,
          currentPage: 1,
          list: [{
            title: '7.《关于印发浙江省内河水运基础设施建设项目资金补助办法的通知》（浙江省内河水运基础设施建设）',
          }, {
            title: '9.《关于加快市区公共交通优先发展的实施意见（试行）》（衢政发【2019】）',
          }, {
            title: '交通先导——省级有关政策',
          }, {
              title: '3.中国民用航空局出台《民航基础设施项目投资补助管理暂行办法》（民航基础设施项目）',
          }, {
            title: '5.《浙江省高水平建设“四好农村路”助推乡村振兴战略三年（2018-2020）》',
          }, {
            title: '8.《关于加快市区公共交通优先发展的实施意见（试行）》（衢政发【2019】）',
          }, {
            title: '6.《关于印发浙江省内河水运基础设施建设项目资金补助办法的通知》（浙江省内河水运基础设施建设）',
          }, {
            title: '4.《浙江省高水平建设“四好农村路”助推乡村振兴战略三年（2018-2020）》',
          }, {
            title: '1.中国民用航空局出台《民航基础设施项目投资补助管理暂行办法》（民航基础设施项目）',
          }, {
            title: '交通先导——省级有关政策',
          }, ]
        },
        {
          label: '资金总览',
          maxSize: 30,
          pageSize: 10,
          currentPage: 1,
          list: [{
            title: '9.《关于加快市区公共交通优先发展的实施意见（试行）》（衢政发【2019】）',
          }, {
            title: '7.《关于印发浙江省内河水运基础设施建设项目资金补助办法的通知》（浙江省内河水运基础设施建设）',
          }, {
            title: '5.《浙江省高水平建设“四好农村路”助推乡村振兴战略三年（2018-2020）》',
          }, {
            title: '3.中国民用航空局出台《民航基础设施项目投资补助管理暂行办法》（民航基础设施项目）',
          }, {
            title: '交通先导——省级有关政策',
          }, {
            title: '6.《关于印发浙江省内河水运基础设施建设项目资金补助办法的通知》（浙江省内河水运基础设施建设）',
          }, {
            title: '交通先导——省级有关政策',
          }, {
            title: '8.《关于加快市区公共交通优先发展的实施意见（试行）》（衢政发【2019】）',
          }, {
            title: '4.《浙江省高水平建设“四好农村路”助推乡村振兴战略三年（2018-2020）》',
          }, {
            title: '1.中国民用航空局出台《民航基础设施项目投资补助管理暂行办法》（民航基础设施项目）',
          }, ]
      }];
      this.listData.data = list;
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
  $font: #808796;
  $titleFont: #5b5b5b;
  $titleBg: #f8f9fc;
  $listBd: #e3e6f0;
  $listBg: #4198f7;
  $white: #fff;
  $listFlag: #1cc88a;
  .my-summary-content {
    .el-card {
      .el-card__body {
        padding: 0;
        .el-collapse {
          border: none;
          .el-collapse-item__header {
            background-color: $titleBg;
            font-size: 14px;
            color: $titleFont;
            padding: 0 20px;
          }
          .el-collapse-item__wrap {
            border: none;
          }
          .el-collapse-item__content {
            padding: 20px;
            .summary-content {
              display: grid;
              grid-template-columns: 15% 83%;
              grid-column-gap: 2%;
              align-items: center;
              font-size: 12px;
              color: $font;
              .summary-image {
                background-color: #aaa;
                height: 80px;
                border-top-right-radius: 20px;
                border-bottom-left-radius: 20px;
              }
            }
          }
        }
        .el-tabs__header {
          font-size: 14px;
          color: $titleFont;
          background-color: $titleBg;
          .el-tabs__nav-wrap {
            padding: 0 20px;
          }
        }
        .el-tabs__content {
          color: $font;
          padding: 20px;
          .el-tab-pane {
            & > ul {
              list-style: none;
              margin: 0;
              padding: 0;
              display: grid;
              grid-template-columns: 49% 49%;
              grid-column-gap: 2%;
              align-items: center;
              font-size: 12px;
              li {
                height: 50px;
                line-height: 50px;
                border: 1px solid $listBd;
                margin: 10px 0;
                display: flex;
                align-items: center;
                padding: 0 20px;
                cursor: pointer;
                i {
                  margin-right: 15px;
                  display: inline-block;
                  height: 5px;
                  width: 5px;
                  border-radius: 50%;
                  background-color: $listFlag;
                }
                span {
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  word-break: break-all;
                }
                &:hover {
                  background-color: $listBg;
                  border-color: $listBg;
                  color: $white;
                  i {
                    background: $white;
                  }
                }
              }
            }
            .el-pagination {
              display: flex;
              justify-content: flex-end;
              margin: 30px 0 20px;
            }
          }
        }
      }
      &:last-child {
        margin-top: 20px;
      }
    }
  }
</style>