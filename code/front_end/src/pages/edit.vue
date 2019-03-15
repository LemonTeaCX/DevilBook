<template>
  <div class="edit">
    <el-row class="edit-nav"></el-row>
    <el-row>
      <el-col class="edit-main" :offset="6" :span="12">
        <h1>Edit Info</h1>
        <el-row>
          <el-form :model="editForm" :rules="rules" :ref="formName" label-width="100px">
            <el-form-item label="原密码" prop="originalPassword">
              <el-col :span="6">
                <el-input v-model="editForm.originalPassword" clearable></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="新密码" prop="password">
              <el-col :span="6">
                <el-input type="password" v-model="editForm.password" clearable></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPassword">
              <el-col :span="6">
                <el-input type="password" v-model="editForm.checkPassword" clearable></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-col :span="6">
                <el-input v-model="editForm.phone" clearable></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-col :span="6">
                <el-input v-model="editForm.email" clearable></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-radio-group v-model="editForm.sex">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="2">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-col :span="12">
                <el-input type="textarea" v-model="editForm.remark"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm">确认修改</el-button>
              <el-button @click="resetForm">重置</el-button>
            </el-form-item>
          </el-form>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Valid from '../util/valid';
import { edit } from '../api';
export default {
  name: 'edit',
  data() {
    let { isPhone } = Valid;
    let validPass = (rule, value, callback) => {
      if (value === '')
        return callback(new Error('请输入密码'));

      if (this.editForm.checkPassword !== '')
        this.$refs[this.formName].validateField('checkPass');

      callback();
    };
    let validCheckPass = (rule, value, callback) => {
      if (value === '')
        return callback(new Error('请再次输入密码'));

      if (value !== this.editForm.password)
        return callback(new Error('两次输入密码不一致!'));

      callback();
    };
    return {
      formName: 'formEle',
      editForm: {
        id: 0,
        originalPassword: '',
        password: '',
        checkPassword: '',
        phone: '',
        email: '',
        sex: '',
        remark: ''
      },
      rules: {
        originalPassword: [
          { required: true, message: '请输入原密码', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
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
  mounted() {
    this.initEditForm();
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    initEditForm() {
      this.editForm.id = this.userInfo.id;
      this.editForm.phone = this.userInfo.phone;
      this.editForm.email = this.userInfo.email;
      this.editForm.sex = this.userInfo.sex;
      this.editForm.remark = this.userInfo.remark;
    },
    async submitForm() {
      let _this = this,
        isValid = await _this.validForm();
      if (!isValid) return;
      let res = await edit(_this.editForm),
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
.edit {
  width: 100%;
  min-height: 100%;
  background: #fafbfc;
}
.edit-nav {
  height: 80px;
  background: #24292e;
}
.edit-main {
  padding-top: 50px;
}
h1 {
  margin-bottom: 30px;
}
</style>
