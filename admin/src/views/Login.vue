<template>
	<div class="contanier">
		<el-form
		  :model="ruleForm"
		  :rules="rules"
		  ref="ruleForm"
		  label-width="100px"
		  class="demo-ruleForm"
		>
		  <el-form-item label="账号" prop="name">
		    <el-input v-model="ruleForm.name"></el-input>
		  </el-form-item>
		 <el-form-item label="密码" prop="passwd">
		    <el-input v-model="ruleForm.passwd" type="password"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
		  </el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default{
		data() {
      return {
        ruleForm: {
          name: '',
          passwd: ''
         
        },
        rules: {
          name: [
            { required: true, message: '请输入管理员名称', trigger: 'blur' },
           
          ],
          passwd: [
            { required: true, message: '请输入密码', trigger: 'blur' },
           
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
			  this.axios.post('/login',this.ruleForm)
			  .then(res=>{
				   console.log(res)
				  if(res.data.r == 'name-not-exist'){
				      this.$message('账号不存在');
				      return ;
				  }
				  
				  if(res.data.r == 'passwd-err'){
				      this.$message('密码错误');
				      return ;
				  }
				  
				  if(res.data.r == 'ok'){
				      this.$router.push('/center');
				      return ;
				  }
			  })
			  .catch(err => {
              console.error(err); 
          })
				  
			  
            
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
	}
</script>

<style scoped="scoped">
	  .contanier{
	    width: 500px;
	    height: 200px;
	    margin: 100px auto;
	}
</style>
