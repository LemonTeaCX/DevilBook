<template>
  <div class="detail-view">
    <el-row class="header">
      <el-col :span="8">
        <h3>{{detail.name}}</h3>
      </el-col>
      <el-col :span="16">
        <div class="btns tar">
          <el-button type="primary" size="small" @click="back">返回列表</el-button>
          <el-button v-if="detail.url" type="text" size="small" @click="jumpSource(detail.url)">查看原文</el-button>
        </div>
      </el-col>
    </el-row>
    <div class="article">
      <mavon-editor v-model="detail.article"
        :externalLink="editor.externalLink"
        :defaultOpen="editor.defaultOpen"
        :toolbarsFlag="editor.toolbarsFlag" 
        :editable="editor.editable" 
        :subfield="editor.subfield"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailView',
  data() {
    return {
      editor: {
        externalLink: false,
        defaultOpen: 'preview',
        toolbarsFlag: false,
        editable: false,
        subfield: false
      },
    }
  },
  props: {
    detail: Object
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    jumpSource(url = '') {
      window.top.open && window.top.open(url);
    }
  }
}
</script>

<style lang="less">
.detail-view {
  margin: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  box-shadow: 0 0 20px #ccc;
}
.header {
  padding: 0 13px;
}
.article {
  padding: 15px;
}
</style>
