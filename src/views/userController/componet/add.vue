<template>
<div>
    <el-row>
         <el-form :model="queryForm"  label-width="140px" size="mini" ref="queryForm">
                <el-row>
                    <el-col :span="2">&nbsp;</el-col>
                    <el-col :span="20">
                        <el-form-item label="类型标题">
                            <el-input v-model="queryForm.name" placeholder="请输入"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2">&nbsp;</el-col>
                </el-row>
                <el-row>
                    <el-col :span="2">&nbsp;</el-col>
                    <el-col :span="20">
                        <el-form-item label="类型描述">
                            <el-input
                                type="textarea"
                                :rows="2"
                                placeholder="请输入内容"
                                v-model="queryForm.desc">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2">&nbsp;</el-col>
                </el-row>
                <el-row>
                    <el-col :span="2">&nbsp;</el-col>
                    <el-col :span="20">
                        <el-form-item label="类型状态">
                           <el-select v-model="queryForm.status" placeholder="请选择" >
                                <el-option key="01" label="是" value="01">是</el-option>   
                                <el-option key="02" abel="否" value="02">否</el-option>    
                            </el-select> 
                        </el-form-item>
                    </el-col>
                    <el-col :span="2">&nbsp;</el-col>
                </el-row>
            </el-form>
    </el-row>
    <div slot="footer" class="dialog-footer">
            <el-button @click="resetForm()">重置</el-button>
            <el-button type="primary" @click="dialogFormVisible('queryForm')">确 定</el-button>
    </div>  
</div> 

</template>

<script>

import {saveArticleTypeInfo ,updArticleTypeInfo} from "@/api/articleType"

export default {
  name: "add",
  props: {
      queryForm: {type : Object}
  },
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
  },
  methods: {
      dialogFormVisible(item){
        let _this = this;
        let params = {};
        params.title = _this.queryForm.name;
        params.titleDesc = _this.queryForm.desc;
        params.isShow = _this.queryForm.status;
        if(_this.queryForm.isUpd == "true"){
            params.id = _this.queryForm.id;
         updArticleTypeInfo(params).then(response => {
             _this.$message.success("更新成功!"); 
                _this.$emit("returnMethod","成功");
                }).catch(error => {
                    reject(error)
            });
        }else {
          saveArticleTypeInfo(params).then(response => {
                _this.$message.success("保存成功!"); 
                _this.$emit("returnMethod","成功");
                }).catch(error => {
                    reject(error)
                })   
        }
      },
      resetForm(){
          this.queryForm = {
              name:"",
              desc:"",
              status:""
          }
      }
  }
}
</script>

<style lang="scss" scoped>
    .dialog-footer{
        margin-left: 480px;
    }
</style>