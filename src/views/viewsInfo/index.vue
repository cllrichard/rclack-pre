<template>
<el-container>
  <el-header class="with100">
      <el-menu :default-active="activeIndex" class="el-menu-demo withNote" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">首页</el-menu-item>
        <el-menu-item index="14" class="withRight" disabled>版本V-1.0</el-menu-item> 
        <el-menu-item index="2" class="withRight" >介绍中心</el-menu-item> 
     </el-menu>
  </el-header>
  <el-main>
      <preMain v-if="preMainInfo" :proParams="propParams" @returnInfo="returnGetInfo"></preMain>
      <descMain v-if="descMainInfo"></descMain>
      <view-info v-if="viewMainInfo" :propInfo="propForm" @returnCheckInfo="returnCheck"></view-info>
  </el-main>
</el-container> 
</template>

<script>
import preMain from "./componet/preMain";
import descMain from "./componet/descMain";
import viewInfo from  "./componet/viewInfo";
export default {
  name: "index",
  components:{
      preMain,
      descMain,
      viewInfo
  },
  data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        preMainInfo: false,
        descMainInfo: false,
        viewMainInfo: false,
        propParams:{},
        propForm:{} 
      };
    },
  created() {
     this.preMainInfo = true; 
  },
   methods: {
      returnGetInfo(item){
          this.preMainInfo = false; 
          this.descMainInfo = false;   
          this.viewMainInfo = true;
          this.propForm = {
            id: item.id,
            articleTypeId:item.articleTypeId,
          };
      },
      returnCheck(item) {
            this.preMainInfo = true; 
             this.descMainInfo = false; 
             this.viewMainInfo = false;
             this.$store.dispatch('count/checkChange', item);
      },
      handleSelect(key, keyPath) {
          if(key == 1) {
             this.preMainInfo = true; 
             this.descMainInfo = false; 
             this.viewMainInfo = false; 
          }
          if(key == 2) {
             this.preMainInfo = false; 
             this.descMainInfo = true;  
             this.viewMainInfo = false;  
          }
      }
    }
}
</script>

<style scoped>
    .withRight{
        float: right;
    }
</style>