<template>
  <div class="home">
    <el-container>
      <el-header>
        <div class="left">
          <div class="nav" :style="{width:action}">
            <img src="../../public/image/favicon.jpg" alt />
            <div v-show="!isCollapse">智学无忧教育</div>
          </div>
        </div>
        <div class="top-content" :style="{marginLeft:action}">
          <div class="el-icon-caret-left" @click="showS()"></div>
          <div id="wjg">
               <div class="biaoqiang">
            <el-tabs
              v-model="editableTabsValue2"
              type="card"
              closable
              @tab-remove="removeTab"
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
              <span class="el-icon-s-custom"></span>
              退出
            </div>
            <div>
              <img src="../../public/image/favicon.jpg" alt />
            </div>
          </div>
          </div>
         
        </div>
         
      </el-header>
      <el-container>
        <el-aside>
          <el-row class="tac">
            <el-col :span="24">
              <el-menu
                :default-active="defaultActive"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
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
                <el-submenu index="2">
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
  // components: {
  // }
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
        this.action = "64px";
      } else {
        this.action = "200px";
      }
    },

    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
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
      console.log(i, url);
      this.defaultActive = url;
      this.incoCaret = url;
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
    }
  }
};
</script>
<style scoped lang="less">
.home {
  height: 100%;
  width: 100%;
  /*设置侧边导航栏高度为游览器高度*/
  .el-container {
    height: 100%;
  }
  .el-aside {
    overflow-x: auto;
    width: auto !important;
    height: 100%;
  }
  .el-row {
    height: 100%;
  }
  .el-col {
    height: 100%;
  }
  .el-menu {
    height: 100%;
    border: none;
  }
  .el-menu-item {
    position: relative;
  }
 
  /*设置侧边导航栏高度为游览器高度结束*/
  /*
    设置头部导航的样式
  */
  .el-header {
    // overflow: hidden;
    border-bottom: 1px solid #999;
    padding-left: 0px;
    position: relative;
    display: flex;
    /**
    * 头部右边内容
    */
    .right {
      display: flex;
      // float: right;
      div {
        width: 65px;
        height: 60px;
        line-height: 60px;
        padding: 0px 3px;
      }
      img {
        width: 50px;
        vertical-align: middle;
      }
    }
    /**
    *头部左边内容
    */
    .left {
      display: flex;
      position: absolute;
      left: 0px;
      .nav {
        height: 60px;
        background-color: #ffeb3a;
        display: flex;
        overflow: hidden;
        img {
          width: 40px;
          height: 40px;
          padding-left: 14px;
          vertical-align: middle;
          margin-top: 10px;
        }
        div {
          line-height: 60px;
          color: #079787;
        }
      }
    }
    /**
    * 头部中间内容
    */
    .top-content {
      display: flex;
      margin-left: 200px;
      width: 100%;

      .el-icon-caret-left {
        background-color: #079787;
        color: white;
        width: 30px;
        text-align: center;
        height: 60px;
        line-height: 60px;
        font-size: 20px;
        // margin-right: 3%;
      }
      #wjg{
        display: flex;
        width: 100%;
        justify-content: space-between;
      }
    }
    .el-icon-menu {
      color: white;
    }
    .template {
      width: auto;
    }
    .biaoqiang {
      height: 50px;
      margin-top: 7px;
      line-height: 50px;
      border-bottom: none;
      border-radius: 5px 5px 0px 0px;
    }
    .el-tag {
      color: black;
      border-radius: 0px;
      border: 1px solid #999;
      background-color: white;
      height: 40px;
      line-height: 40px;
      border: none;
      border-left: 1px solid #999;
    }
    .el-tag:nth-child(1) {
      border: none;
    }
  }
  /*
    设置头部导航的样式结束
  */
}
</style>