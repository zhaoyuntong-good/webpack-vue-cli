<template>
  <div class="login">
    <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-width="54px" class="login-form">
      <el-form-item label="账号：" prop="userName">
        <el-input v-model="loginForm.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="passWord">
        <el-input type="password" v-model="loginForm.passWord"></el-input>
      </el-form-item>
      <el-button type="primary" @click="login()">登录</el-button>
    </el-form>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex';
  import { setToken, getToken } from '@/utils/saveToLocal.js';
  import { login, getLocalJson } from '@/api/login.js';
  export default {
    name: 'Login',
    data(){
    	return {
        loginForm: {
          userName: '',
          passWord: '',
        },
        loginRules: {
          userName: [
            { 
              validator: (rule, value, callback) => {
                if (value === '') {
                  callback(new Error('请输入账号'));
                } else {
                  callback();
                }
              },
              trigger: 'blur' 
            }
          ],
          passWord: [
            { 
              validator: (rule, value, callback) => {
                if (value === '') {
                  callback(new Error('请输入密码'));
                } else {
                  callback();
                }
              },
              trigger: 'blur' 
            }
          ]
        }
      }
    },
    created(){
      if (getToken()) {
        this.$router.push({
          path: '/'
        })
      }
      this.getLocalJson();
    },
    methods: {
      ...mapMutations(['setAsyncRoutes', 'setHandledRoutes']),
      // 登录
      async login(){
        // const { data } = await login({
        //   opId: "3000",
        //   password: "NjY2NjY2"
        // });
        // console.log(data)
        // import('@/router/asyncRoutes.js').then( res => {
        //   this.setAsyncRoutes(res.default);
        //   setToken('1234567');
        //   this.$router.push({
        //     path: '/'
        //   })
        // })
      },
      async getLocalJson() {
        const { data } = await getLocalJson();
        console.log(data)
      }
    }
  }
</script>

<style scoped>
  .login {
    width: 100vw;
    height: 100vh;
    background-image: url('../../assets/imgs/login/login.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: auto 100%;
    overflow: hidden;
  }
  .login-form {
    width: 400px;
    margin: 350px auto;
  }
</style>
