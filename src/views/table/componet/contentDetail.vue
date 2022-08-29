<template>
<div class="with100">
  <div class="btnRight"> 
    <el-button type="success" @click="returnRute">返回</el-button>
  </div>
 <div class="withNode">
    
     <el-card class="box-card titleClass">
       {{title}}
      </el-card>
    <el-card class="box-card">
      <div v-html="content"></div>
    </el-card>
    <!-- <el-card class="box-card footerClass">
       I am footer 
    </el-card> -->
  </div>

</div>
 
</template>

<script>

import { getInfoById } from '@/api/articleContent'

export default {
  name: "contentDetail",
  data() {
    return {
      list: null,
      listLoading: true,
      content:"",
      title:"",
    }
  },
  created() {
    this.getInfoById();
  },
  methods: {
    returnRute(){
       this.$router.push({
        path: "/example",
        query: {
        }
      }); 
    },
    getInfoById(){
      let _this = this;
      let params = {};
      params.id = this.$route.query.id;
      getInfoById(params).then(response => {
        if(response.code == 1){
           _this.content = response.result.data.content; 
           _this.title =response.result.data.title; 
            // _this.tableData = response.result.data;
        }else {
          _this.tableData  = [];
        }
        
      }).catch(error => {
        _this.$message.success(error)
      })
    },
  }
}
</script>

<style scoped>
  .with100{
    width: 100%;
    height: 100%;
    padding:0;  
    margin:0;
  }
  .withNode{
    width: 800px;
    height: 400px;
    margin: 0 auto;
  }
  .titleClass{
    margin: 20px;
  }
  .footerClass{
    margin-top: 20px;
  }
  .btnRight{
    margin-right: 86px;
    margin-top: 10px;
    position:fixed;
    right: 0px;
  }
</style>