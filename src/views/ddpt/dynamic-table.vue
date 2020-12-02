<template>
    <div class="app-container">
        <div class="filter-container">
                <el-input v-model="listQuery.primarySchool" placeholder="primarySchool" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
                <el-input v-model="listQuery.junioryHighSchool" placeholder="junioryHighSchool" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
                <el-input v-model="listQuery.highSchool" placeholder="highSchool" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
                <el-input v-model="listQuery.university" placeholder="university" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
                <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
                    Search
                </el-button>
                <!-- <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
                    Add
                </el-button> -->
                <el-button :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload" >
                    Export
                </el-button>
            </div>

            <el-table
                :data="tables"
                ref="multipleTable"
                tooltip-effect="dark"
                style="width: 100%"
                border
                fit
                highlight-current-row
                @selection-change='selectArInfo'>
                <!-- <el-table-column type="selection" width="45px"></el-table-column> -->
                <!-- <el-table-column label="序号" width="62px" type="index"></el-table-column> -->
                <template v-for='(col) in tableData'>
                    <el-table-column
                        sortable
                        :show-overflow-tooltip="true"
                        :prop="col.dataItem"
                        :label="col.dataName"
                        :key="col.dataItem"
                        width="124px"
                        align="center">  
                    </el-table-column>
                </template>
                <!-- <el-table-column label="操作" width="80" align="center">
                <template slot-scope="scope">
                <el-button size="mini" class="del-com" @click="delTabColOne()" ><i class="iconfont icon-shanchu"></i></el-button>
                </template>
                </el-table-column> -->
            </el-table>

            <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"  @pagination="getList"  />
    </div>
</template>
<script>
import Pagination from '@/components/Pagination'

 export default {
    components: { Pagination },
    data () {
        return {
            tables: [],
            tableData: [],
            downloadLoading: false,
            total: 1,
            //查询条件
            listQuery: {
                page: 1,
                limit: 20,
                primarySchool: undefined,
                junioryHighSchool: undefined,
                highSchool: undefined,
                university: undefined
            },
        }},
    //初始化表格
    created() {
        this.getList()
    },
    methods: {
    // 获取表格选中时的数据
    selectArInfo (val) {
        this.selectArr = val
    },
    handleFilter() {
        this.listQuery.page = 1
        this.getList()
        console.log(this.listQuery)
    },
    getList() {
        this.total = 2;
        // fetchList(this.listQuery).then(res => {

        // });
        this.tables = [ {
            xiaoxue: '福兰',
            chuzhong: '加芳',
            gaozhong: '蒲庙',
            daxue: '西安',
            yanjiusheng: '西安',
            shangban: '北京'
        }, 
        {
            xiaoxue: '南坊',
            chuzhong: '礼泉',
            gaozhong: '礼泉',
            daxue: '西安',
            yanjiusheng: '西安',
            shangban: '南坊'
        }, 
        {
            xiaoxue: '马山',
            chuzhong: '加芳',
            gaozhong: '蒲庙',
            daxue: '西安',
            yanjiusheng: '重庆',
            shangban: '北京'
        }];
        this.tableData = [
            
        {
            dataItem: 'xiaoxue',
            dataName: '小学'
        }, 
        {
            dataItem: 'chuzhong',
            dataName: '初中'
        }, 
        {
            dataItem: 'gaozhong',
            dataName: '高中'
        }, 
        {
            dataItem: 'daxue',
            dataName: '大学'
        }, 
        {
            dataItem: 'yanjiusheng',
            dataName: '研究生'
        }, 
        {
            dataItem: 'shangban',
            dataName: '上班'
        }];
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
       const tHeader = [];
        const filterVal = [];
        var json = eval(this.tableData)
        for(var i = 0; i < json.length; i++) {
            tHeader.push(json[i].dataName);
            filterVal.push(json[i].dataItem)
        }
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
        console.log(filterVal)
      return this.tables.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
}
}
</script> 