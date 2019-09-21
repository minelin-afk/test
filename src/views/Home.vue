<template>
  <div id="home">
    <el-container>
      <el-aside :style="{width:action}">
        <!-- 头部logo -->
        <div class="broadsidenav">
          <div class="broadsidenav-1">
            <div class="logo">
              <img src="../../public/image/favicon.jpg" alt />
            </div>
            <div class="title">智学无忧教育</div>
          </div>
        </div>
        <!-- 侧边导航 -->
        <el-row class="tac">
          <el-col :style="{width:action}">
            <el-menu
              :default-active="defaultActive"
              class="el-menu-vertical-demo"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
              :collapse="isCollapse"
              router
            >
              <el-submenu index="1" :style="{width:action}">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>基础数据</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item
                    v-for="(item,index) in broadsidenav.routerbase"
                    :index="item.url"
                    :route="{name:item.url}"
                    :key="index"
                    @click="addTab(item.name,item.url)"
                  >
                    <span :class="incoCaret == item.url?'icon-caret':''"></span>
                    {{item.name}}
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2" :style="{width:action}">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>在线测试</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item
                    v-for="(item,index) in broadsidenav.routertest"
                    :index="item.url"
                    :route="{name:item.url}"
                    :key="index"
                    @click="addTab(item.name,item.url)"
                  >
                    <span :class="incoCaret == item.url?'icon-caret':''"></span>
                    {{item.name}}
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-container>
        <el-header>
          <div class="nav">
            <div class="el-icon-caret-left" @click="showS()"></div>
            <div style="width:10px;"></div>
            <div class="nav-content">
              <div class="left">
                <el-tabs
                  type="card"
                  closable
                  @tab-remove="removeTab"
                  v-model="editableTabsValue2"
                  @tab-click="topNavRouter(editableTabsValue2)"
                  @edit="topNavRouter(editableTabsValue2)"
                >
                  <el-tab-pane
                    v-for="item in editableTabs2"
                    :key="item.title"
                    :label="item.title"
                    :name="item.name"
                  ></el-tab-pane>
                </el-tabs>
              </div>
              <div class="right">
                <div>
                  <span>中文/English</span>
                  <span @click="retreatfrom">退出</span>
                </div>

                <img src="../../public/image/favicon.jpg" alt />
              </div>
            </div>
          </div>
        </el-header>
        <el-main>
          <div>主页面</div>
          <router-view name="right"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      /**
       * 显示侧边导航栏的三角形
       */
      incoCaret: "",
      /**
       * 侧边导航栏的隐藏和显示
       */
      isCollapse: false,
      action: "200px",
      /**
       * 侧边导航栏目录内容
       */
      broadsidenav: {
        routerbase: [
          { url: "TeacherManage", name: "教师管理" },
          { url: "ClassManage", name: "班级管理" },
          { url: "ModifyPassword", name: "修改密码" },
          { url: "StudentManage", name: "学生管理" }
        ],
        routertest: [
          { url: "MakeTestPaper", name: "制作试卷" },
          { url: "TestPaperManage", name: "安排测试" },
          { url: "TestResult", name: "查看成绩" },
          { url: "TestSetter", name: "试卷管理" },
          { url: "ViewTestPaper", name: "批阅试卷" }
        ]
      },
      /**
       *  激活侧边栏菜单的样式
       */
      defaultActive: "",
      /**
       * 激活头部导航的样式
       */
      editableTabsValue2: "/",
      /**
       * 头部导航的列表内容
       */
      editableTabs2: [
        {
          title: "首页",
          name: "/",
          url: "/"
        }
      ],
      tabIndex: 2
    };
  },
  methods: {
    /**
     * 侧边导航栏隐藏和显示
     */
    showS() {
      this.isCollapse = !this.isCollapse;
      if (this.isCollapse) {
        this.action = "65px";
      } else {
        this.action = "200px";
      }
    },
    /**
     * 头部导航栏进行跳转路由
     */
    topNavRouter(e) {
      console.log(e);
      this.defaultActive = e;
      this.incoCaret = e;
      if (e == "/") {
        this.$router.push("/");
      } else {
        this.$router.push("/" + e);
      }
    },
    /**
     * 删除头部导航
     */
    removeTab(targetName) {
      console.log(targetName);
      let tabs = this.editableTabs2;
      let activeName = this.editableTabsValue2;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
              this.$router.push(nextTab.name);
              this.defaultActive = nextTab.name;
            }
          }
        });
      }
      this.editableTabsValue2 = activeName;
      this.editableTabs2 = tabs.filter(tab => tab.name !== targetName);
    },
    /**
     * 侧边导航栏跳转路由
     */
    addTab(i, url) {
      this.defaultActive = url;
      this.incoCaret = url;
      this.defaultActive = url;
      let info = true;
      this.editableTabsValue2 = url;
      for (let p in this.editableTabs2) {
        if (this.editableTabs2[p].title == i) {
          info = false;
        }
      }
      if (info) {
        this.editableTabs2.push({
          title: i,
          name: url,
          url: "/to"
        });
      }
    },
    retreatfrom() {
      this.$confirm("此操作将退出当前账号, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          sessionStorage.clear();
          var token = sessionStorage.getItem("token");
          if (!token) {
            this.$router.replace(
              "/login?returnUrl=" + location.pathname + location.search
            );
          }
          this.$message({
            type: "success",
            message: "退出成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出"
          });
        });
    }
  },
  beforeCreate() {
    var token = sessionStorage.getItem("token");
    if (!token) {
      this.$router.replace(
        "/login?returnUrl=" + location.pathname + location.search
      );
    }
  }
};
</script>
<style scoped lang="less">
#home {
  height: 100%;
  .el-container {
    height: 100%;
  }
  /*头部logo开始*/
  .broadsidenav {
    width: 100%;
    display: flex;
    background-color: #ffeb3a;
    .broadsidenav-1 {
      width: 100%;
      height: 60px;

      display: flex;
      overflow: hidden;
      .logo {
        box-shadow: 0px 0px 5px 5px #06837e;
        width: 40px;
        height: 40px;
        margin-top: 10px;
        margin-left: 14px;
        border-radius: 50%;
        img {
          width: 40px;
          height: 40px;
          vertical-align: middle;
        }
      }
      .title {
        line-height: 60px;
        color: #079787;
        margin-left: 15px;
      }
    }
  }
  /*头部logo结束*/
  /*侧边导航开始*/
  .icon-caret {
    display: inline-block;
    border-width: 10px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0);
    border-right-color: white;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(0%, -50%);
  }
  /*侧边导航结束*/
  /*头部导航开始*/

  .nav {
    height: 60px;
    display: flex;
    overflow: hidden;
    .el-icon-caret-left {
      background-color: #008181;
      height: 100%;
      margin-bottom: 2px;
      display: block;
      width: 30px;
      text-align: center;
      color: white;
      line-height: 60px;
      font-size: 20px;
      margin-right: 15px;
    }
    .nav-content {
      display: flex;
      width: 100%;
      flex: 1;
      justify-content: space-between;
      .left {
        overflow: hidden;
        height: 50px;
        margin-top: 19px;
        // line-height: 50px;
        border-bottom: none;
        border-radius: 5px 5px 0px 0px;
        .el-tabs {
          height: 100%;
        }
      }
      .right {
        width: 200px;
        display: flex;
        margin-right: 40px;
        div {
          width: 145px;
          height: 60px;
          line-height: 60px;
          span {
            padding: 0px 5px;
            font-size: 14px;
            cursor: pointer;
          }
        }
        img {
          width: 40px;
          height: 40px;
          margin-top: 7px;
        }
      }
    }
  }
}

.el-header,
.el-footer {
  background-color: #b3c0d1;
  padding-left: 0px;
}

.el-aside {
  background-color: rgb(84, 92, 100);
  transition: width 0.8s;
}

.el-main {
  background-color: #e9eef3;
}

.el-tabs--card > .el-tabs__header .el-tabs__item {
  border-bottom: 2px solid aqua !important;
}
.el-menu-vertical-demo {
  border: none;
}
</style>
