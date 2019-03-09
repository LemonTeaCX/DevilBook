<template>
	<div class="edit-wrap">
	  <div class="edit-box">
	    <div class="header">{{formId ? '编辑用户账号' : '添加用户账号'}}</div>
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
				      <el-checkbox v-for="(item, index) in authList"
				      	:key="item.id" :label="item.value">{{item.name}}
				      </el-checkbox>
				    </el-checkbox-group>
				  </el-form-item>
				  <el-form-item label="用户角色" prop="role">
				    <el-radio-group v-model="editForm.role">
				      <el-radio v-for="(item, index) in roleList"
				      	:key="item.id" :label="item.value">{{item.name}}
				      </el-radio>
				    </el-radio-group>
				  </el-form-item>
				  <el-form-item label="备注" prop="remark">
				  	<el-col :span="12">
				    	<el-input type="textarea" v-model="editForm.remark"></el-input>
				    </el-col>
				  </el-form-item>
				  <el-form-item>
				    <el-button type="primary" @click="submitForm">
							{{formId ? '立即修改' : '立即添加'}}
				    </el-button>
				    <el-button @click="resetForm">重置</el-button>
				  </el-form-item>
				</el-form>
	    </div>
	  </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { getAuth, getRole, getAccountDetail, addAccount, editAccount } from '../../api';
export default {
  name: 'AccountEdit',
  data() {
  	return {
  		formName: 'formEle',
  		formId: 0,
  		// authList: [],
  		// roleList: [],
  		editForm: {
        name: '',
        email: '',
        status: 0,
        auth: [],
        role: 1,
        remark: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入账号名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
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
  mounted() {
  	this.initEditForm();
  },
  computed: {
  	...mapState(['authList', 'roleList'])
  },
  methods: {
  	async initEditForm() {
  		this.$store.dispatch('setAuthList');
    	this.$store.dispatch('setRoleList');
  		this.formId = this.$route.query.id || 0;
  		if (!this.formId) return;

  		let result = await getAccountDetail({ id: this.formId });
  		this.editForm = result.data;
  	},
    async submitForm() {
      let _this = this, 
      	isValid = await _this.validForm();
      if (!isValid) return;

      console.log(_this.editForm);
      let id = _this.formId,
      	result = {},
      	isSuccess = false;

      if (id) {
      	_this.editForm.id = id;
      	result = await editAccount(_this.editForm);
    	} else {
    		result = await addAccount(_this.editForm);
    	};
    	isSuccess = result.result;

    	_this.$message({
    		message: result.msg,
    		type: isSuccess ? 'success' : 'error',
    		onClose() {
    			if (isSuccess) _this.$router.push('/system/account');
    		}
    	});
    },
    validForm() {
    	return new Promise((resolve, reject) => {
    		this.$refs[this.formName].validate((valid) => resolve(valid));
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
