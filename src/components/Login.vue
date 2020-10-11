<template>
    <div class="login_div">
        <div class="login_box">
            <div class="sth_box">
                <img src="../assets/logo.png" alt="">
            </div>
            <!-- 登录表单区域 -->
            <el-form  ref ="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="form_class">
                <!-- userName -->
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username"
                        placeholder="请输入身份证号或手机号"
                        prefix-icon="el-icon-user-solid"
                        >
                    </el-input>
                </el-form-item>
                <!-- password -->
                <el-form-item prop="password">
                    <el-input  v-model="loginForm.password"
                        placeholder="密码"
                        prefix-icon="el-icon-lock"
                        type="password"></el-input>
                </el-form-item>
                <el-form-item class='btns'>
                    <el-button type="primary" @click="login">主要按钮</el-button>
                    <el-button type="info">信息按钮</el-button>
                </el-form-item>

            </el-form>
        </div>
    </div>
</template>

<script>

import Vue from 'vue'
import { Component } from 'vue-property-decorator'

export default {
  data () {
    return {
      // 登录数据绑定的对象
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 登录输入验证规则的对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入身份证或手机号', trigger: 'blur' }
        //   { min: 11, max: 18, message: '请输入正确的身份证或手机号', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          //   { min: 8, message: '密码最少8位', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]+$/, message: '密码由大小写字母和数字构成', trigger: 'blur"' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginFormRef.validate(async (valid) => {
        // console.log(valid)
        if (valid) {
          const { data: res } = await this.$http.post('login', this.loginForm)
          if (res.meta.status !== 200) return this.$message.error('登录失败！')
          this.$message.success('登录成功！')
          sessionStorage.setItem('token', res.data.token)
          this.$router.push('/home')
        }
      })
    }
  }
}
</script>

<style lang="less"  scoped>
.login_div{
    background-color: #79bafa;
    height:100%;
    border-style:solid;
    border-width:5px;
}

.login_box{
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

}

.sth_box{
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: rgb(248, 246, 246);
    }
}

.btns{
    display: flex;
    justify-content: flex-end;
}

.form_class{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}

</style>
