<template>
  <div>
     <div class="floatInfo">
           <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
            <el-form-item label="标题">
              <el-input v-model="title"></el-input>
            </el-form-item>
          </el-form> 
        </div>
        <!-- wangEditor 富文本编辑器 -->
       <div style="border: 1px solid blue;">
        <Toolbar
            style="border-bottom: 1px solid blue"
            :editor="editor"
            :defaultConfig="toolbarConfig"
            :mode="mode"
        />
        <Editor
            style="height: 500px; overflow-y: hidden;"
            v-model="html"
            :defaultConfig="editorConfig"
            :mode="mode"
            @onCreated="onCreated"
            @onChange="onChange"
           

        />
    </div>
     <div class="floatInfo">
           <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
            <el-form-item label="文章描述">
              <el-input v-model="sizeForm.titleDesc"></el-input>
            </el-form-item>
            <el-form-item label="文章类型">
              <el-select v-model="sizeForm.articleTypeId" placeholder="请选择文章类型">
                <el-option  v-for="data in articleType" :key="data.id" :label="data.title" :value="data.id" ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="文章状态">
              <el-select v-model="sizeForm.isShow" placeholder="请选择文章状态">
                   <el-option label="发布" value="01"></el-option>
                    <el-option label="草稿" value="02"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item size="large" class="getInfo">
              <el-button type="primary" @click="onSubmit">提交</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form> 
        </div>
  </div>
  
</template>

<script>
import Vue from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { getArticleTypeInfo ,delArticleTypeInfo} from '@/api/articleType'
import { saveInfoList } from '@/api/articleContent'

export default {
  name: "add",
  components: { Editor, Toolbar },
  data() {
    return {
        editor: null,
        html: '',
        toolbarConfig: { },
        editorConfig: { placeholder: '请输入内容...' },
        mode: 'default', // or 'simple',
        title:"",
        sizeForm: {
          title: '',
          titleDesc: '',
          isShow: '',
          content: '',
          articleTypeId:''
        },
        articleType:[],
    }
  },
  created(){
    this.getArticleType();
  },
  methods: {
      getArticleType(){
        let _this = this;
        let params = {};
        params.isShow = "01"//默认选择为 展示的文章类型 
        getArticleTypeInfo(params).then(response => {
          if(response.code == 1){
              _this.articleType = response.result.data;
          }else {
            _this.articleType  = [];
          }
          
        }).catch(error => {
          _this.$message.success(error)
        })
      },
      onCreated(editor) {
          this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
      },
      onSubmit() {
        let _this = this;
        let params = {};
        params.title = _this.title;
        params.contentDesc = _this.sizeForm.titleDesc ;
        params.isShow = _this.sizeForm.isShow;
        params.content = _this.html;
        params.articleTypeId = _this.sizeForm.articleTypeId;
        saveInfoList(params).then(response => {
          if(response.code == 1) {//成功
            this.$router.push({
              path: "/example",
              query: {
              }
            }); 
          }else {
            _this.$message.success(response.msg);
          }
        }).catch(error => {
          _this.$message.success(error)
        })
        
        console.log(this.html);
      },
      onChange(editor) { console.log('onChange', editor.children) },
  },
  mounted() {
  },
  beforeDestroy() {
      const editor = this.editor
      if (editor == null) return
      editor.destroy() // 组件销毁时，及时销毁编辑器
  }
}
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>
<style scoped>
  .floatInfo{
    margin: 20px;
    width: 600px;
  }
  .getInfo{
    margin-left: 300px;
  }
</style>