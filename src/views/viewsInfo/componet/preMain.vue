<template>
   <div class="with100">
        <div class="withLeft">
               <el-card class="with120">
                <div v-for="o in article"  class="text item">
                    <el-button  type="text" class="clickInfo" @click="getArticleList(o)">{{o.title}}</el-button>({{o.cous}})
                </div>
                </el-card>
           </div>
       <div class="withCenter">
            <div class="infinite-list-wrapper" >
                <ul
                class="list"
                v-infinite-scroll="load"
                infinite-scroll-disabled="disabled">
                <li v-for="item in count" class="list-item" >
                    <el-card class="box-card mainWith">
                        <span>{{item.title}}</span>
                        <div class="content"> {{item.contentDesc}}</div> 
                    <div class="footerWith">
                        <el-button type="text" @click="getIndex(item)">详细</el-button>
                    </div>
                    </el-card>
                </li>
                </ul>
                <p v-if="loading">加载中...</p>
                <p v-if="noMore">没有更多了</p>
            </div>
       </div>
       <!-- 会挽雕弓如满月，西北望， -->
      <div class="withRight">
          <div class="floatRight">
            <p>会</p>
            <p>挽</p>
            <p>雕</p>
            <p>弓</p>
            <p>如</p>
            <p>满</p>
            <p>月</p>
            <p>,</p>
          </div>
          <div class="floatRight2">
            <p>西</p>
            <p>北</p>
            <p>望</p>
            <p>,</p>
          </div>
      </div> 
   </div>
</template>

<script>

import { getInfoList} from '@/api/articleContent'


import { getArticleTypeInfoWithCount} from '@/api/articleType'


export default {
  name: "preMain",
  props: {
      propInfo: {type : Object}
  },
  data() {
    return {
      list: null,
      listLoading: true,
      count: [],
      article:[],
      loading: false
    }
  },
 computed: {
  myValue() { return this.$store.state.count.cou }
  },
  created() {
      this.getInfoList();
      this.getArticleTypeInfoList();
  },
  methods: {
      load () {
        // this.count += 2
        // this.loading = false
      },
      getIndex(item){
        let _this = this;
        _this.$emit("returnInfo",item);
          //  this.$router.push({
          //       path: "/contentDetail",
          //       query: {
          //       id:item.id 
          //       }
          //   }); 
      },
      getArticleList(item){
         let _this = this;
        let params = {};
        // params.title = this.formInline.name;
        // params.isShow = this.formInline.status
        params.articleTypeId = item.id; 
        getInfoList(params).then(response => {
            if(response.code == 1){
                _this.count = response.result.data;
            }else {
            _this.count  = [];
            }
        }).catch(error => {
            _this.$message.success(error)
        }) 
      },
      noMore () {
        return true;
        
      },
      getArticleTypeInfoList(){
        let _this = this;
        let params = {};
        
        getArticleTypeInfoWithCount(params).then(response => {
            if(response.code == 1){
                _this.article = response.result.data;
            }else {
            _this.count  = [];
            }
        }).catch(error => {
            _this.$message.success(error)
        }) 
      },
      getInfoList(){
        let _this = this;
        let params = {};
        params.articleTypeId = this.$store.state.count.cou; 
        // params.title = this.formInline.name;
        // params.isShow = this.formInline.status 
        getInfoList(params).then(response => {
            if(response.code == 1){
                _this.count = response.result.data;
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

<style scoped>
.with100{
    width:100%;
    height: 100%;
    padding:0;  
    margin:0;
}
.withCenter{
    width: 800px;
    margin: 0 auto;
    height: 620px;
}
.withLeft{
    width:120px;
    line-height:30px;
    position:fixed;
    top:140px;
    left:0px;
}
.withRight{
    width:120px;
    line-height:30px;
    position:fixed;
    top:140px;
    right:0px; 
}
.floatRight{
  float: right;
  margin-right: 100px;
}
.floatRight2{
  margin-right: 130px;
  float: right;
}
.with120{
    width: 120px;
}
.infinite-list-wrapper {
  height: 620px;
  text-align: center;
}
.infinite-list-wrapper .list {
  padding: 0;
  margin: 0;
  list-style: none;
  width: 720px;
}

.infinite-list-wrapper .list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
  width: 700px;
  cursor:pointer;
  background: var(--el-color-danger-light-9);
  color: var(--el-color-danger);
}
.infinite-list-wrapper .list-item + .list-item {
  margin-top: 10px;
}
.text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 600px;
    min-height: 400px;
  }
  .mainWith{
      position: relative;
  }
  .content{
      position: absolute;
      left: 0px;
      margin: 20px;
      padding: 10px;
      font-size: 20px;
      min-width: 540px;
      min-height: 270px;
      border-top:1px solid lightslategray;
      border-bottom:1px solid lightslategray;
  }
  .footerWith{
      position: absolute;
      right:0px;
      bottom: 0px;
      min-height: 30px;
      margin: 10px;
  }
  .clickInfo{
     /* cursor:pointer;  */
     /* color: lightslategrey; */

  }
</style>
