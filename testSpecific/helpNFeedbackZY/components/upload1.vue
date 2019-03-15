<template>
	<div id="upload">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100%" class="demo-ruleForm">
		  <el-form-item label="问题类型："  prop="resource">
		    <el-radio-group v-model="ruleForm.resource">
		      <el-radio label="会员问题"></el-radio>
		      <el-radio label="帐号问题"></el-radio>
		      <el-radio label="产品建议"></el-radio>
		      <el-radio label="播放不顺畅"></el-radio>
		      <el-radio label="操作卡顿"></el-radio>
		      <el-radio label="其他"></el-radio>
		    </el-radio-group>
		  </el-form-item>
		  <el-form-item label="问题描述，意见或建议：" prop="desc">
		    <el-input type="textarea" placeholder="请填写具体问题描述以便我们提供更好的帮助" v-model="ruleForm.desc"></el-input>
		  </el-form-item>
		  <el-form-item label="选填（提供电视故障界面）：">
			<el-upload
				ref="upload"
				action="http://172.20.133.47:3010/help/uploadIssue"
				list-type="picture-card"
        :on-change="handleChanged"
        :before-upload="submitForm1"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :on-error="handleError"
        :on-progress="handleProgress"
        :auto-upload="false"
        :multiple="true"
				:limit="5">
				<i class="el-icon-plus"></i>
			</el-upload>



			<el-dialog :visible.sync="dialogVisible">
				<img width="100%" :src="dialogImageUrl" alt="">
			</el-dialog>
		  </el-form-item>
		  <el-form-item label="联系方式：" prop="contact">
		    <el-input v-model.number="ruleForm.tel" placeholder="请输入QQ号/手机号，便于我们与你联系" autocomplete="off"></el-input>
		  </el-form-item>
		  <el-form-item style="margin-top: 50px; text-align:center">
				<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
		  </el-form-item>
		</el-form>
	</div>
</template>


<script>
	var fileList = 0;
  export default {
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        ruleForm: {
          resource: '',
          desc: '',
					contact: '',
					upload:'',
        },rules: {
          resource: [
            {required: true, message: '请至少选择一个问题类型', trigger: 'change' }
					],
					desc: [
            { required: true, message: '请填写问题描述', trigger: 'change' }
					],
					tel: [
						{ required: true, message: '请填写您的联系方式', trigger: 'change' },
						{ type: 'number', message: '必须为数字值'}
          ],
				}
      };
    },
    methods: {
			submitForm() {
					console.log('submitForm11111：'+fileList);
					this.$refs.upload.submit();
			},
			submitForm1(ruleForm) {
				console.log('submitForm1');
      //  this.$refs[ruleForm].validate((valid) => {
        //  if (valid) {
						console.log(this.ruleForm);// 表单数据
            let fd = new FormData();
            fd.append('file',ruleForm);
            fd.append('chip', '9S52');
            fd.append('model', 'Q4A');
            fd.append('issueType',this.ruleForm.resource);
            fd.append('issueContent',this.ruleForm.desc);
						fd.append('contact',this.ruleForm.tel);
						console.log(this.ruleForm.resource+JSON.stringify(fd));
						this.$http.post('http://172.20.133.47:3010/help/uploadIssue', fd).then(function (res) {
							console.log("=========="+JSON.stringify(res.data));							
						})
						.catch(function (error) {
								console.log("======error==="+error);
						});

        //   } else {
        //     console.log('error submit!!');
        //     return false;
        //   }
				// });
      },
			handleRemove(file, fileList) {
					fileList = fileList.length;
					console.log(fileList)
			},
			handlePreview(file) {
					console.log('handlePreview file = ' + file);
			},
			handleSuccess(response,file,fileList) {
					console.log('handleSuccess response = ' + response);
			},
			handleError(err,file,fileList) {
					console.log('handleError err = ' + err);
			},
			handleProgress(event,file,fileList) {
					console.log('handleProgress percent = ' + event.percent);
			},
			handleChanged(file, fileList) {
				//	console.log('handleChanged file = ' + JSON.stringify(file));
				//	console.log('handleChanged fileList = ' + JSON.stringify(fileList));
					fileList = fileList.length;
					console.log(fileList)
			}
    }
  }


</script>

<style>
html {font-size: 625%; /*100 ÷ 16 × 100% = 625%*/}
@media screen and (min-width:360px) and (max-width:374px) and (orientation:portrait) {
    html { font-size: 703%; }
}
@media screen and (min-width:375px) and (max-width:383px) and (orientation:portrait) {
    html { font-size: 732.4%; }
}
@media screen and (min-width:384px) and (max-width:399px) and (orientation:portrait) {
    html { font-size: 750%; }
}
@media screen and (min-width:400px) and (max-width:413px) and (orientation:portrait) {
    html { font-size: 781.25%; }
}
@media screen and (min-width:414px) and (max-width:431px) and (orientation:portrait){
    html { font-size: 808.6%; }
}
@media screen and (min-width:432px) and (max-width:479px) and (orientation:portrait){
    html { font-size: 843.75%; }
}

.el-button {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    border-color: #dcdfe6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    transition: .1s;
    font-weight: 500;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
}

.el-form-item__label{
	float: initial;
	font-size: 0.4rem;
	font-weight: bold
}
.el-form-item__content{
	margin-left:auto !important;
	font-size: 0.3rem;
}
.el-form-item{
	text-align: left
}
.el-radio__label{
	font-size: 0.4rem;	
}
.el-radio__inner{
	border: 4px solid #dcdfe6;
	width: 0.4rem;
	height: 0.4rem;
}
.el-radio{
	width: 50%;
	margin-left:auto !important;
	height: 60px;
 	line-height: 60px;
 	display: inline-block;
}
.el-upload--picture-card{
	border:4px dashed #c0ccda
}

.el-input__inner {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border:2px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: 0.4rem;
    height: 40px;
    height: 0.9rem;
    outline: 0;
    padding: 0 15px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
}
.el-button{
	padding: 0.2rem;
  font-size: 0.4rem;
}




.el-upload--picture-card {
    background-color: #fbfdff;
    border: 3px dashed #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    width: 148px;
    height: 148px;
    line-height: 146px;
    vertical-align: top;
}
.el-upload {
    display: inline-block;
    text-align: center;
    cursor: pointer;
    outline: 0;
}
.el-form-item__content {
    line-height: 40px;
    position: relative;
}
.el-form-item__content {
    line-height: 40px;
    position: relative;
}
.el-upload-list--picture-card {
    margin: 0;
    display: inline;
    vertical-align: top;
}
.el-upload-list--picture-card .el-upload-list__item {
    overflow: hidden;
    background-color: #fff;
    border: 1px solid #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    width: 148px;
    height: 148px;
    margin: 0 8px 8px 0;
    display: inline-block;
}
.el-upload-list__item {
    transition: all .5s cubic-bezier(.55,0,.1,1);
    font-size: 14px;
    color: #606266;
    line-height: 1.8;
    margin-top: 5px;
    position: relative;
    box-sizing: border-box;
    border-radius: 4px;
    width: 100%;
}
.el-upload-list--picture-card .el-upload-list__item-thumbnail {
    width: 100%;
    height: 100%;
}

.el-upload__input {
    display: none;
}

.el-radio-group {
    display: inline-block;
    line-height: 1;
    vertical-align: middle;
    font-size: 0;
}
.el-radio {
    color: #606266;
    font-weight: 500;
    line-height: 1;
    cursor: pointer;
    white-space: nowrap;
    outline: 0;
}
.el-radio__input {
    white-space: nowrap;
    cursor: pointer;
    outline: 0;
    line-height: 1;
    vertical-align: middle;
}
.el-radio__inner {
    border: 1px solid #dcdfe6;
    border-radius: 100%;
    width: 14px;
    height: 14px;
    background-color: #fff;
    cursor: pointer;
    box-sizing: border-box;
}
.el-radio__inner:after {
    width: 4px;
    height: 4px;
    border-radius: 100%;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%) scale(0);
    transition: transform .15s ease-in;
}
.el-radio__original{
	width: 30px;
	height: 30px;
}
.el-textarea__inner {
    display: block;
    resize: vertical;
    padding: 5px 15px;
    line-height: 1.5;
    box-sizing: border-box;
    width: 100%;
    color: #606266;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
		border:2px solid #dcdfe6;
		height: 1.6rem;
		font-size: 0.4rem;
}
.el-button--primary {
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
		border-radius: 4px;
}
.el-form-item__error {
    color: #f56c6c;
    font-size: 0.3rem;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 100%;
    left: 0;
}
.el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before {
    content: "*";
    color: #f56c6c;
    margin-right: 4px;
}
.el-icon-plus:before {
    content: "\E62B";
}
.el-upload-list--picture-card .el-upload-list__item-actions {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    cursor: default;
    text-align: center;
    color: #fff;
    opacity: 0;
    font-size: 20px;
    background-color: rgba(0,0,0,.5);
    transition: opacity .3s;
}
.el-upload-list--picture-card .el-upload-list__item-status-label {
    position: absolute;
    right: -15px;
    top: -6px;
    width: 40px;
    height: 24px;
    background: #13ce66;
    text-align: center;
    transform: rotate(45deg);
    box-shadow: 0 0 1pc 1px rgba(0,0,0,.2);
}
.el-upload-list--picture-card .el-upload-list__item-status-label i {
    font-size: 12px;
    margin-top: 11px;
    transform: rotate(-45deg);
}
.el-upload-list--picture-card .el-upload-list__item .el-icon-check, .el-upload-list--picture-card .el-upload-list__item .el-icon-circle-check {
    color: #fff;
}
.el-upload-list--picture-card .el-upload-list__item-actions .el-upload-list__item-delete {
    position: static;
    font-size: inherit;
    color: inherit;
}
.el-upload-list--picture-card .el-upload-list__item-actions span+span {
    margin-left: 15px;
}
.el-upload-list--picture-card .el-upload-list__item-actions span {
    display: none;
    cursor: pointer;
}
.el-upload-list__item .el-icon-close {
    display: none;
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
    opacity: .75;
    color: #606266;
}
[class*=" el-icon-"], [class^=el-icon-] {
    font-family: element-icons!important;
    speak: none;
    font-style: normal;
    font-weight: 400;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    vertical-align: baseline;
    display: inline-block;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>