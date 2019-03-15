<template>
  <div class="main">
    <div class="main-left">
      <div class="logo">logo</div>
      <div class="menu">
        <el-menu
          background-color="#202427"
          text-color="#fff"
          active-text-color="#ffd04b">
          
          <el-submenu v-for="(menu01, index01) in $store.state.menu" :key="menu01.id" :index="menu01.id + ''">
            <template slot="title">
              <i :class="menu01.icon"></i>
              <span>{{menu01.menu}}</span>
            </template>
            <el-menu-item-group v-for="(menu02, index02) in menu01.nodes" :key="menu02.id">
              <el-menu-item :index="menu02.id + ''"
                @click="selectMenu(menu02)">{{menu02.menu}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
    </div>
    <div class="main-right">
      <div class="main-nav">
        <div class="menu-nav">
          {{curMenu.menu}}
        </div>
        <div class="nav-space"></div>
        <div class="user-wrap">
          <el-dropdown trigger="click" @command="userCommand">
            <span class="el-dropdown-link">
              {{userInfo.username}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="editInfo">
                <i class="el-icon-edit-outline"></i> 修改信息
              </el-dropdown-item>
              <el-dropdown-item divided command="loginOut">
                <i class="el-icon-back"></i> 退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="message" @click="notifyMsg">
          <i class="el-icon-bell"><el-badge is-dot></el-badge></i>
        </div>
      </div>
      <div class="main-page">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Util from '../util/util';
let { setCookie } = Util;
export default {
  name: 'Index',
  data() {
    return {
      curMenu: {
        menu: '首页'
      }
    }
  },
  mounted() {
    this.$store.dispatch('setMenu');
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    selectMenu(menu = {}) {
      this.curMenu = menu;
      menu.path && this.$router.push(menu.path);
    },
    userCommand(command) {
      switch (command) {
        case 'editInfo':
          this.editInfo();
          break;
        case 'loginOut':
          this.loginOut();
          break;
        default:
          break;
      }
    },
    editInfo() {
      this.$router.push('/edit');
    },
    loginOut() {
      window.localStorage.setItem('userInfo', '');
      setCookie('token', '');
      this.$router.push('/login');
    },
    notifyMsg() {
      this.$notify({
        title: '消息',
        message: '快看，我只是一条消息！！！',
        type: 'warning',
        position: 'bottom-right'
      });
    }
  }
}
</script>

<style lang="less">
.main {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .main-left {
    flex: 0 0 210px;
    background: #121212;
  }
  .main-right {
    /*这里需要设置一个宽度数值，防止内容里的elementUI table组件最外层无法获取正确100%宽度*/
    /*flex: 1;*/
    width: calc(100% - 210px);
    height: 100%;
  }
}
.logo {
  height: 80px;
  color: #fff;
  text-align: center;
  font-size: 22px;
  line-height: 80px;
}
.main-nav {
  display: flex;
  height: 50px;
  line-height: 50px;
  box-shadow: 0 0 10px #000;
}
.menu-nav {
  padding: 0 18px;
  border-right: 1px solid #ddd;
  border-bottom: 3px solid orange;
}
.nav-space {
  flex: 1;
}
.user-wrap {
  padding: 0 18px;
  border-left: 1px solid #ddd;
  cursor: pointer;
}
.message {
  padding: 0 18px;
  border-left: 1px solid #ddd;
  cursor: pointer;
}
.main-page {
  overflow-y: auto;
  height: calc(100% - 50px);
}

.el-menu {
  border-right: 0;
}
</style>
