<template>
  <div class="dashboard-container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="标题名称">
        <el-input v-model="formInline.title" placeholder="请输入"></el-input>
      </el-form-item>
     <el-form-item label="是否显示">
          <el-select v-model="formInline.status" placeholder="请选择" >
              <el-option key="01" label="是" value="01">是</el-option>   
              <el-option key="02" label="否" value="02">否</el-option>    
          </el-select> 
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="resetForm">重置</el-button>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="leftPage">
      <el-button type="text" @click="dialogFormVisible">添加用户</el-button>
    </div>
      <el-table
      class="tableHeight"
      :data="tableData.slice((currentPage-1) * pageSize,currentPage*pageSize)"
      border
      style="width: 100%">
      <el-table-column
        prop="userName"
        label="用户姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="userType"
        label="用户类型">
      </el-table-column>
       <el-table-column
        label="操作" min-width="100px">
          <template slot-scope="scope">
              <!-- 修改 -->
              <el-button @click="update(scope.row)" type="text" size="small">禁用用户</el-button>
              <!-- 删除 -->
              <el-button @click="onDel(scope.row)" type="text" size="small" >删除</el-button>
          </template>
      </el-table-column>
    </el-table>
    <div class="block leftPage">
      <el-pagination
        background
        @current-change="changePage"
        layout="prev, pager, next"
        :total="tableData.length"
        :page-size="pageSize"
        :current-page="currentPage"
        >
      </el-pagination>
    </div>

    <el-dialog title="文章类型"
     :close-on-click-modal="false" 
     :center="true" @close="closeDialog" :visible.sync="dialogVisible" >
      <Add :queryForm="propForm" @close="closeDialog()"  @returnMethod="onRefreshData"></Add>
    </el-dialog>
  </div>
</template>

<script>
import {queryUserInfoList} from '@/api/user'

import Add from "./componet/add.vue"
export default {
  name: 'Dashboard',
  components:{
      Add
  },
  data() {
    return {
      dialogVisible:false,
      propForm:{},
      currentPage:1,
      pageSize:10,
      formInline: {
        title: '',
        status: ''
        },
        tableData: []
      }
  },
  created() {
    this.getInfo();
  },
  methods:{
    update(row){
      this.dialogVisible = true;
      this.propForm = {
         name: row.title,
         status:row.isShow,
         desc:row.titleDesc,
         isUpd:"true",
         id:row.id,
      };
    },
    onDel(row){
      let _this = this;
      let params = {};
      params.id = row.id;

      this.$confirm('是否进行该类型删除？', '确认删除', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确认删除',
          cancelButtonText: '放弃删除'
        })
          .then(() => { //成功
            delArticleTypeInfo(params).then(response => {
              if(response.code == 1){
                _this.getInfo();
              }else {
                _this.tableData  = [];
              }
            }).catch(error => {
              _this.$message.success(error)
            }) 
          })
          .catch(action => { //放弃
            // do nothing 
          });
    },
    resetForm() {
      this.formInline.name = "";
      this.formInline.status = ""; 
    },
    onSubmit() {  
      let _this = this;
      let params = {};
      // params.title = this.formInline.name;
      // params.isShow = this.formInline.status 
      queryUserInfoList(params).then(response => {
        if(response.code == 1){
            _this.tableData = response.result.data;
        }else {
          _this.tableData  = [];
        }
        
      }).catch(error => {
        _this.$message.success(error)
      })
    },
    changePage(item){
      if(this.currentPage !== 0)
        this.currentPage = item;
    },
    onRefreshData(item){
       this.dialogVisible = false;
        this.getInfo(); 
    },
    closeDialog(){
      this.dialogVisible = false;
    },
    dialogFormVisible(){
      let _this = this;
       _this.$message.success("暂时无用户添加选项") 
    },
    getInfo() {
      let _this = this;
      let params = {};
      // params.title = this.formInline.name;
      // params.isShow = this.formInline.status 
      queryUserInfoList(params).then(response => {
        if(response.code == 1){
            _this.tableData = response.result.data;
        }else {
          _this.tableData  = [];
        }
      }).catch(error => {
        _this.$message.success(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
  .leftPage{
    float: right;
    margin: 3px;
  }
  .tableHeight{
    min-height: 400px;

  }
</style>
