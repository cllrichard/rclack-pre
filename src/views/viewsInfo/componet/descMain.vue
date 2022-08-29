<template>
   <div class="with100">
       <div class="withCenter">
            <el-card class="box-card">
                <p>关于该网站的建立的一些讲解:</p>
                <p>一、首先嘛，技术一直在伸手，然后觉得自己碰到的问题所学的知识然后分享出来也算是一种“知恩图报”吧！</p>
                <p>二、其次呢，一直想做一个自己的网站，不单是其一的问题，毕竟自己也是一个开发，
                    关于前辈们的技术网站和图书也读过一些，给的建议很多，
                    但自己的理解是建立一个自己独有的网站用来分享自己的所学，所想，所思，对于自己的职业啊，技术啊，都是很有好处的，
                    毕竟能够写出来分享，代表了一种态度，而这种态度没有认真做的话，是分享不出来的！</p>
                <p>三、最后.....</p>
            </el-card>
       </div>
   </div>
</template>

<script>

export default {
  name: "add",
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
  },
  methods: {
   
  }
}
</script>

<style scoped>
    .with100{
        width: 100%;
        height: 100%;
    }
    .withCenter{
        margin: 0 auto;
        width: 800px;
    }
</style>
