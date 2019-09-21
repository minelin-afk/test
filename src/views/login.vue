<template>
  <div id="login">
    <!-- <h1>登录页面</h1> -->
    <div class="main">
      <div class="left">
        <div>
          <img class="logo" src="../../public/image/favicon.jpg" alt />
        </div>
        <h3 style="  color: #128C7F;text-align:center">智学无忧后台管理系统</h3>
        <div class="text-2">做最有态度，责任，良心的IT教育</div>
      </div>
      <div class="right">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item prop="userMobile">
            <el-input
              type="text"
              v-model="ruleForm.userMobile"
              autocomplete="off"
              prefix-icon="el-icon-s-custom"
            ></el-input>
          </el-form-item>
          <el-form-item prop="userPassword">
            <el-input
              type="password"
              v-model="ruleForm.userPassword"
              autocomplete="off"
              prefix-icon="el-icon-lock"
            ></el-input>
          </el-form-item>
          <el-checkbox v-model="checked">记住密码</el-checkbox>
          <el-form-item>
            <el-button
              :icon="forbidden?'el-icon-loading':''"
              type="primary"
              @click="submitForm('ruleForm')"
              :disabled="forbidden "
            >登录</el-button>
          </el-form-item>
        </el-form>
        <!-- el-icon-loading -->
      </div>
    </div>
  </div>
</template>
<script>
//配置 Cookies 
import Cookies from "js-cookie";
// import { longStackSupport } from "q";
// import { log } from "util";
// import CryptoJS from "crypto-js";
export default {
  data() {
     /**
       * 输入的账号或者密码不能为空，如果为空就提示
      */
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        if (this.ruleForm.userPassword !== "") {
          this.$refs.ruleForm.validateField("userPassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      forbidden: false,
      /**
       * 记住密码
       */
      checked: false,

      /**
       * 账号和密码
      */
      ruleForm: {
        userMobile: "",
        userPassword: ""
      },
      /**
       * 失去焦点事件
      */
      rules: {
        userMobile: [{ validator: validatePass, trigger: "blur" }],
        userPassword: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      console.log( location.search.slice(5,-1))
       console.log( location.search.indexOf("="))
      /**
       * 禁用登录按钮
       */
      this.forbidden = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          /**
           * 向后台请求数据实现登录，获取令牌
          */
          this.axios
            .get(
              "/api/OAuth/authenticate?stuMobile=" +
                this.ruleForm.userMobile +
                "&stuPassword=" +
                this.ruleForm.userPassword
            )
            .then(res => {
              console.log(res.data);
              /**
               * 把token存储到会话
               */
              sessionStorage.token = res.data.access_token;
              /**
               * 记住密码
               */
              if (this.checked) {
                /**
                 * 对账号后密码进行加密 btoa
                 * */ 
                Cookies.set("userMobile", btoa(this.ruleForm.userMobile), {
                  expires: 7
                });
                Cookies.set("userPassword", btoa(this.ruleForm.userPassword), {
                  expires: 7
                });
                Cookies.set("checked", this.checked, { expires: 7 });
              } else {
                Cookies.set("checked", this.checked, { expires: 7 });
              }
              this.forbidden = false;
              /**
               * 登录成功跳转到首页
               */
              this.$router.push("/")
              /**
               * 登录成功显示
              */
              this.$message({
                message: '登录成功！！！',
                type: 'success'
              });
            })
            .catch(res => {
              console.log(res);
              this.forbidden = false;
            });
        } else {
          this.forbidden = false;
          console.log("error submit!!");
          this.$message.error("账号或者密码不能为空！！！");
          return false;
        }
      });
    }
  },
  mounted() {
    /**
     * 判断用户是否使用了记住密码
    */
    if (Cookies.get("checked") == "true") {
      this.checked = true;
      /**
       * 对已经保存的账号和密码进行解密 atob
       */
      this.ruleForm.userMobile = atob(Cookies.get("userMobile"));
      this.ruleForm.userPassword = atob(Cookies.get("userPassword"));
    } else {
      this.checked = false;
    }
  }
};
</script>
<style lang="less">
#login {
  width: 100%;
  height: 100%;
  background: url(../../public/image/background.jpg) 0px 0px no-repeat;
  display: flex;
  .main {
    // border: 1px solid aqua;
    box-shadow: 0px 0px 10px 10px #042d7c;
    // height: 210px;
    // width: 610px;
    margin: auto;
    padding: 40px 0px;
    display: flex;
    background-color: #d8ecf5;
    border-radius: 10px;
    .left {
      width: 49.9%;
      line-height: 40px;
      padding: 0px 30px;
      border-right: 1px solid #9bc3c2;
      div {
        text-align: center;
        color: #9ba6aa;
        font-size: 14px;
      }
      .logo {
        width: 110px;
      }
    }
    .right {
      width: 50%;
      padding: 0px 30px;
      .el-form {
        margin: 0px;
      }
      // .el-form-item{
      //   margin: 0px;
      //   line-height: 60px;
      // }
      .el-form-item__content {
        margin: 0px !important;
      }
      .el-checkbox {
        margin-bottom: 22px;
      }
      .el-button {
        width: 100%;
        background-color: #65c23b;
      }
      .el-icon-s-custom {
        color: #65c23b;
        font-size: 25px;
      }
      .el-icon-lock {
        color: #65c23b;
        font-size: 25px;
      }
    }
  }
  @media screen and (max-width: 550px) {
    .main {
      display: block !important;
      padding: 40px 30px !important;
    }
    .left {
      width: 100% !important;
      border-right: none !important;
      padding: 0px !important;
    }
    .right {
      width: 100% !important;
      padding: 0px !important;
      margin-top: 15px;
    }
  }
}
</style>