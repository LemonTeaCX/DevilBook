<template>
  <div class="home">
    <el-row>
      <el-col :span="7">
        <div class="brief">
          <el-card shadow="hover">
            <div class="brief-header" slot="header">
              <div class="icon">
                <img :src="author.icon" alt="">
              </div>
              <div class="user">
                <div class="name"><typewriter :text="author.name" /></div>
                <div class="post"><typewriter :text="author.post" /></div>
                <div class="github">
                  <el-button type="text" @click="jumpUrl(author.github)">
                    <typewriter :text="author.github" />
                  </el-button>
                </div>
              </div>
            </div>
            <div class="state">
              <typewriter :text="author.state" />
            </div>
          </el-card>
        </div>
        <div class="languages">
          <el-card shadow="hover">
            <div class="language-item" v-for="(item, index) in languages" :key="index">
              {{item.text}}
              <el-progress :percentage="item.per" :color="item.color"></el-progress>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="17">
        <div class="frames">
          <el-row :gutter="20">
            <el-col :span="24 / (frames.length || 1)" v-for="(item, index) in frames" :key="index">
              <el-card shadow="hover">
                <div class="frame-wrap">
                  <div class="frame-icon"
                       title="点击跳转官网"
                       @click="jumpUrl(item.url)">
                    <img :src="item.icon" alt="">
                  </div>
                  <div class="frame-info">
                    <p :title="item.text">
                      <typewriter :text="item.text" />
                    </p>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
        <div class="skills">
          <el-card shadow="hover">
            <div class="skills-header" slot="header">
              个人技能
            </div>
            <div class="skills-item" v-for="(item, index) in skills" :key="index">
              <typewriter :text="`${index + 1}. ${item.text}`" />
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <div class="education">
        <el-card shadow="hover">
          <div class="skills-header" slot="header">
            教育背景
          </div>
          <div class="card-item" v-for="(item, index) in author.educations" :key="index">
            学校：{{item.school}} &nbsp; &nbsp; &nbsp;
            时间：{{item.time}} &nbsp; &nbsp; &nbsp;
            专业：{{item.major}} &nbsp; &nbsp; &nbsp;
            学历：{{item.education}}
          </div>
        </el-card>
      </div>
    </el-row>
    <el-row>
      <div class="work">
        <el-card shadow="hover">
          <div class="skills-header" slot="header">
            工作经历
          </div>
          <div class="card-item" v-for="(item, index) in author.experiences" :key="index">
            <h4>{{item.company}}</h4>
            <div>时间：{{item.time}}</div>
            <div>岗位：{{item.post}}</div>
            <div>工作内容：{{item.content}}</div>
          </div>
        </el-card>
      </div>
    </el-row>
  </div>
</template>

<script>
import { getAuthorInfo, getFrames, getLanguages, getSkills } from '../api';
import typewriter from '../components/typewriter';
export default {
  name: 'home',
  components: { typewriter },
  data() {
    return {
      author: {
        educations: [],
        experiences: []
      },
      frames: [],
      languages: [],
      skills: []
    }
  },
  computed: {
    experiences() {
      return this.author.experiences || [];
    }
  },
  mounted() {
    this.getAuthorInfo();
    this.getFrames();
    this.getLanguages();
    this.getSkills();
  },
  methods: {
    async getAuthorInfo() {
      const res = await getAuthorInfo();
      this.author = res.data;

      if (res.result) return;
      this.$message({
        message: res.msg,
        type: 'error'
      });
    },
    async getFrames() {
      const res = await getFrames();
      this.frames = res.data;

      if (res.result) return;
      this.$message({
        message: res.msg,
        type: 'error'
      });
    },
    async getLanguages() {
      const res = await getLanguages();
      this.languages = res.data;

      if (res.result) return;
      this.$message({
        message: res.msg,
        type: 'error'
      });
    },
    async getSkills() {
      const res = await getSkills();
      this.skills = res.data;

      if (res.result) return;
      this.$message({
        message: res.msg,
        type: 'error'
      });
    },
    jumpUrl(url = '') {
      window.top.open(url);
    },
  }
}
</script>

<style lang="less">
.home {
  width: 100%;
  padding: 15px;
  overflow-x: hidden;
}
.brief, .languages, .frames, .skills, .education, .work {
  padding: 10px;
}
.brief-header {
  display: flex;
  .icon {
    flex: 0 0 120px;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: auto;
    }
  }
  .user {
    padding: 20px 0 0 40px;
    flex: 1;
    .name {
      font-weight: bold;
      font-size: 22px;
    }
    .post {
      margin-top: 10px;
      color: #999;
    }
  }
}
.skills-item {
  margin-bottom: 12px;
}
.frame-wrap {
  display: flex;
  height: 80px;
  .frame-icon {
    flex: 0 0 80px;
    cursor: pointer;
    img {
      width: 100%;
      height: auto;
    }
  }
  .frame-info {
    flex: 1;
    padding-left: 15px;
    font-size: 12px;
    line-height: 26px;
    overflow: hidden;
    -webkit-line-clamp: 3;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
}
.language-item {
  margin: 8px 0;
}
.card-item {
  margin-bottom: 20px;
  padding: 15px;
  box-shadow: 0 0 10px #ccc;
  line-height: 1.6;
  h4 {
    margin-bottom: 12px;
  }
}
</style>
