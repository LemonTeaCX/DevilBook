<template>
  <div class="register">
    <el-row class="register-nav"></el-row>
    <el-row>
      <el-col class="register-main" :offset="6" :span="12">
        <h1>join us</h1>
        <el-row>
          <el-form :model="registerForm" :rules="rules" :ref="formName" label-width="100px">
            <el-form-item label="用户名" prop="username">
              <el-col :span="6">
                <el-input v-model="registerForm.username" clearable></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-col :span="6">
                <el-input type="password" v-model="registerForm.password" clearable></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPassword">
              <el-col :span="6">
                <el-input type="password" v-model="registerForm.checkPassword" clearable></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-col :span="6">
                <el-input v-model="registerForm.phone" clearable></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-col :span="6">
                <el-input v-model="registerForm.email" clearable></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-radio-group v-model="registerForm.sex">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="2">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-col :span="12">
                <el-input type="textarea" v-model="registerForm.remark"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm">注册</el-button>
              <el-button @click="resetForm">重置</el-button>
            </el-form-item>
          </el-form>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Valid from '../util/valid';
import { register } from '../api';
export default {
  name: 'Register',
  data() {
    let { isPhone } = Valid;
    let validPass = (rule, value, callback) => {
      if (value === '')
        return callback(new Error('请输入密码'));

      if (this.registerForm.checkPassword !== '')
        this.$refs[this.formName].validateField('checkPass');

      callback();
    };
    let validCheckPass = (rule, value, callback) => {
      if (value === '')
        return callback(new Error('请再次输入密码'));

      if (value !== this.registerForm.password)
        return callback(new Error('两次输入密码不一致!'));

      callback();
    };
    return {
      formName: 'formEle',
      registerForm: {
        username: '',
        password: '',
        checkPassword: '',
        phone: '',
        email: '',
        sex: 1,
        remark: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入账号名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validPass, trigger: 'blur' }
        ],
        checkPassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: validCheckPass, trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: isPhone, message: '请输入正确的手机号码', trigger: 'blur' }
        ],
        email: [
          { required: false, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        remark: [
          { required: false, message: '请填写备注信息', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async submitForm() {
      let _this = this,
        isValid = await _this.validForm();
      if (!isValid) return;
      let res = await register(_this.registerForm),
        isSuccess = res.result;

      _this.$message({
        message: res.msg,
        type: isSuccess ? 'success' : 'error',
        onClose(msgIns) {
          if (isSuccess) _this.$router.push('/login');
        }
      });
    },
    resetForm() {
      this.$refs[this.formName].resetFields();
    },
    validForm() {
      return new Promise((resolve, reject) => {
        this.$refs[this.formName].validate(valid => resolve(valid));
      });
    }
  }
}
</script>

<style lang="less">
.register {
  width: 100%;
  min-height: 100%;
  background: #fafbfc;
}
.register-nav {
  height: 80px;
  background: #24292e;
}
.register-main {
  padding-top: 50px;
}
h1 {
  margin-bottom: 30px;
}
</style>
