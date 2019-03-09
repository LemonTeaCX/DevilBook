<template>
	<div class="edit-wrap">
	  <div class="edit-box">
	    <div class="header">添加用户账号</div>
	    <div class="contant">
				<el-form :model="editForm" :rules="rules" :ref="formName" size="small" label-width="100px">
				  <el-form-item label="姓名" prop="name">
					  <el-col :span="6">
					    <el-input v-model="editForm.name" clearable></el-input>
				    </el-col>
				  </el-form-item>
				  <el-form-item label="邮箱" prop="email">
					  <el-col :span="6">
					    <el-input v-model="editForm.email" clearable></el-input>
				    </el-col>
				  </el-form-item>
				  <el-form-item label="账号状态" prop="status">
				    <el-switch v-model="editForm.status"></el-switch>
				  </el-form-item>
				  <el-form-item label="用户权限" prop="auth">
				    <el-checkbox-group v-model="editForm.auth">
				      <el-checkbox label="1">餐厅线上活动</el-checkbox>
				      <el-checkbox label="2">地推活动</el-checkbox>
				      <el-checkbox label="3">线下主题活动</el-checkbox>
				      <el-checkbox label="4">单纯品牌曝光</el-checkbox>
				    </el-checkbox-group>
				  </el-form-item>
				  <el-form-item label="用户角色" prop="role">
				    <el-radio-group v-model="editForm.role">
				      <el-radio label="1">线上品牌商赞助</el-radio>
				      <el-radio label="2">线下场地免费</el-radio>
				    </el-radio-group>
				  </el-form-item>
				  <el-form-item label="备注" prop="remark">
				  	<el-col :span="12">
				    	<el-input type="textarea" v-model="editForm.remark"></el-input>
				    </el-col>
				  </el-form-item>
				  <el-form-item>
				    <el-button type="primary" @click="submitForm">立即添加</el-button>
				    <el-button @click="resetForm">重置</el-button>
				  </el-form-item>
				</el-form>
	    </div>
	  </div>
  </div>
</template>

<script>
export default {
  name: 'user',
  data() {
  	return {
  		formName: 'formEle',
  		editForm: {
        name: '',
        email: '',
        status: false,
        auth: [],
        role: '',
        remark: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入账号名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        auth: [
          { type: 'array', required: true, message: '请至少选择一个用户权限', trigger: 'change' }
        ],
        role: [
          { required: true, message: '请选择用户角色', trigger: 'change' }
        ],
        remark: [
          { required: false, message: '请填写备注信息', trigger: 'blur' }
        ]
      }
  	}
  },
  methods: {
    submitForm() {
      this.$refs[this.formName].validate((valid) => {
        if (valid) {
          console.log(this.editForm);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm() {
      this.$refs[this.formName].resetFields();
    }
  }
}
</script>

<style lang="less">
.edit-wrap {
	height: 100%;
	padding: 20px;
}
.edit-box {
	height: 100%;
	border: 1px dashed #ddd;
	.header {
		height: 40px;
		line-height: 40px;
		padding-left: 20px;
		background: #eee;
		border-bottom: 1px dashed #ddd;
	}
	.contant {
		padding: 16px;
	}
}
.form-row {
	height: 30px;
	line-height: 30px;
	.form-text {
		text-align: right;
		padding-right: 20px;
	}
}
</style>
