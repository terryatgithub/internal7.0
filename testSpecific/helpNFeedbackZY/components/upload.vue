<template>
	<div id="upload">
		<el-form :model="ruleForm" ref="ruleForm" class="demo-ruleForm" v-if="showForm">
			<div class="whirt"> 
				 <div class="zdy">
					<el-form-item label="反馈问题类型（必填）" prop="category">			 
						<el-radio-group v-model="ruleForm.category" @change="descInput1">
						<el-radio label="影视播放"  border size="small"></el-radio>
						<el-radio label="网络问题" border size="small"></el-radio>
						<el-radio label="会员帐户" border size="small"></el-radio>
						<el-radio label="应用中心" border size="small"></el-radio>
						<el-radio label="系统设置" border size="small"></el-radio>
						<el-radio label="其他" border size="small"></el-radio>
						</el-radio-group>
					</el-form-item>
					<div class="el-form-item__error" v-if="radioTxt">请选择问题类型</div>
					</div>
					<el-form-item prop="content">
						<el-input type="textarea" placeholder="请输入遇到的问题或建议（必填）" rows=3 maxlength="400" @input="descInput" v-model="ruleForm.content"></el-input>
					<span class="textNum">{{remnant}}/400</span>
					<div class="el-form-item__error" v-if="radioArea">请输入遇到的问题或建议</div>
					</el-form-item>
		  
					<el-form-item label="添加图片说明（选填）">
						<el-upload
							ref="upload"
							prop="upload"
							v-model="ruleForm.upload"
							:file-list="imagelist"
							:class="classA ? 'disabled ' : 'show' "
							action="https://webx.coocaa.com/hfdplatform/help/addFeedbackExtra"
							list-type="picture-card"
							:on-change="handleChanged"
							:on-preview="handlePictureCardPreview"
							:before-upload="submitForm1"
							:on-remove="handleRemove"
							:on-success="handleSuccess"
							:on-error="handleError"
							:on-progress="handleProgress"
							:auto-upload= false
							:on-exceed="handleExceed"
							:multiple="true"
							:limit="3">
							<i class="el-icon-plus"></i>
						</el-upload>
						<el-dialog :visible.sync="dialogVisible">
							<img :src="dialogImageUrl" alt="">
						</el-dialog>
					</el-form-item>
		  </div>
		  <el-form-item prop="contact">
		    <el-input label="联系方式：" v-model.number="ruleForm.contact" maxlength="11" placeholder="选填，便于我们联系你" autocomplete="off">
				<template slot="prepend">联系电话</template>
			</el-input>
		  </el-form-item>
		  <el-form-item style="margin-top:20px; text-align:center">
				<el-button type="primary"  @click="submitForm('ruleForm')">提交</el-button>
		  </el-form-item>
		</el-form>

		<div class="showSuccess" v-if="showSuccess">
			<i class="el-icon-circle-check"></i>
			<p style="color:#030303; font-size:18px; margin-top:8px">反馈成功</p>
			<p>感谢您对我们的关注与支持</br>我们会尽快修复和完善相关功能</p>

		</div>
		<div class="showError" v-if="showError">
			<i class="el-icon-warning"></i>
			<p style="color:#030303; font-size:18px; margin-top:8px">反馈失败</p>
			<p>因故障原因未能反馈成功</br>可拨打客服电话：400-168-8888</p>
		</div>
	</div>


</template>


<script>
	var chip=getUrlParam("chip");
	var model=getUrlParam("model");
	var mac=getUrlParam("mac");
	var activeid=getUrlParam("activeid");
  export default {
    data() {
      return {
		remnant: 0,
        dialogImageUrl: '',
		dialogVisible: false,
		showForm:true,
		showSuccess:false,
		showError:false,
		radioArea:false,
		radioTxt:false,
		imagelist:[],
		classA: false,
        ruleForm: {
			category:'',
			content:'',
			contact:'',
			upload:'',
			fileCount:0,
		},
	  };
    },
    methods: {
		descInput(){
			var txtVal = this.ruleForm.content.length;
			this.remnant = txtVal;
			this.radioArea = false;
		},
		descInput1(){
			console.log("22222222");
			this.radioTxt = false;
		},
		submitForm(ruleForm) {
				var _this = this;
				console.log('submitForm11111：'+this.fileCount);
				if(this.fileCount == 0 || this.fileCount == undefined){
					if (!this.ruleForm.category) {
						_this.radioTxt = true;
						return this.ruleForm.category
					}else if (!this.ruleForm.content) {
						_this.radioArea = true;
						return this.ruleForm.content
					}else{
						var _this = this;						
						this.$http({
							method: 'post',
							url: 'https://webx.coocaa.com/hfdplatform/help/addFeedback',
							data: {
								chip:chip,
								model:model,
								mac:mac,
								activeid:activeid,
								title: "title",
								category: this.ruleForm.category,						
								content:this.ruleForm.content,
								contact:String(this.ruleForm.contact),
							}
						})
						.then((res)=>{
								console.log("======没有图片===="+JSON.stringify(res.data));
								_this.showForm = false;
								_this.showSuccess = true; 
						})
						.catch(function (error) {
								console.log("======error==="+error);
								_this.showForm = false;
								_this.showError = true; 	
						});
					}
				}else{
					if (!this.ruleForm.category) {
						_this.radioTxt = true;
					}else if (!this.ruleForm.content) {
						_this.radioArea = true;
						return this.ruleForm.content
					}else{
						this.$refs.upload.submit();
					}
				}
		},
		submitForm1(ruleForm) {
			var _this = this;
				console.log('submitForm1有图片');
				const isLt2M =ruleForm.size / 1024 / 1024 < 10;
				//判断图片类型
				if (ruleForm.type == 'image/jpeg' || ruleForm.type == 'image/png' || ruleForm.type == 'image/JPG') {
					var  isJPG =  true
				} else {
					isJPG =  false
				}
				if (isJPG == false) {
					this.$message.error('上传产品图片只能是 JPG/PNG/JPEG 格式!');
					return isJPG
				}else if (isLt2M == false) {
					this.$message.error('上传产品图片大小不能超过10M!');
					return isLt2M
				}else{
					let fd = new FormData();
					fd.append('file',ruleForm);
					fd.append('chip',chip);
					fd.append('model',model);
					fd.append('mac', mac);
					fd.append('activeid', activeid);
					fd.append('title', 'title');
					fd.append('category',this.ruleForm.category);
					fd.append('content',this.ruleForm.content);
					fd.append('contact',this.ruleForm.contact);
					var _this = this;
					//https://webx.coocaa.com/hfdplatform/help
					this.$http.post('https://webx.coocaa.com/hfdplatform/help/addFeedbackExtra', fd).then(function (res) {
						console.log("=====有上传图片====="+JSON.stringify(res.data));		
						_this.showForm = false;	
						_this.showSuccess = true; 				
					})
					.catch(function (error) {
						console.log("======error=---------=="+error);
						_this.showForm = false;
						_this.showError = true; 
					});
				}
		},
		handleRemove(file, fileList) {
				this.fileCount = fileList.length;
				console.log(this.fileCount)
				if(this.fileCount < 3){
					this.classA = false
				}
		},
		handleSuccess(response,file,fileList) {
				console.log('handleSuccess response = ' + response);
		},
		handleError(err,file,fileList) {
				console.log('handleError err = ' + err);
		},
		handleProgress(event,file,fileList) {
		//		console.log('handleProgress percent = ' + event.percent);
		},
		handleChanged(file, fileList) {
				this.fileCount = fileList.length;
				console.log(this.fileCount);
				if(this.fileCount >= 3){
					this.classA = true
				}
		},
		handleExceed(file, fileList) {
        	this.$message.warning(`最多上传 3 张，共选择了 ${file.length + fileList.length} 张`);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
	  },

    }
  }

//获取url中的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return decodeURI(r[2], 'utf-8');
    return null; //返回参数值
}

</script>

<style>
body{
	background: #f1f1f1;
	margin: auto;
}
.showSuccess,.showError{
	text-align: center;
	color: #B2B2B2;
	letter-spacing: -0.39px;
	padding:80px 40px
}
.disabled .el-upload--picture-card {
    display: none;
}
.show .el-upload--picture-card {
    display: inline-block;
}
.el-icon-circle-check{
	font-size: 44px;
	color: #1EB852
}
.el-icon-warning{
	font-size: 40px;
	color: #f00
}
.el-radio--mini.is-bordered .el-radio__label, .el-radio--small.is-bordered .el-radio__label{
	font-size: 16px !important;
}
.whirt{
	background: #fff;
	padding: 8px;
	margin-bottom: 20px;
	border-bottom:solid 1px #d3d3d3
}
.zdy .el-form-item__error{
	top: 19px !important;
    left: 167px !important;
}
.el-radio-group{
	text-align: center
}
.el-textarea__inner,.el-input__inner{
	border:0px !important;
    padding: 5px 0px !important
}
.el-input-group__append, .el-input-group__prepend{
	background: #fff !important;
	border:0px !important
}
.el-radio{
    width:30%;
    margin-left: 5px !important;
    margin-bottom: 10px;
	margin-right:5px;
	height: 30px !important;
	line-height: 30px !important;
	border-radius: 2px;
	text-align: center;
	font-weight: normal !important
}
.el-radio.is-bordered{
	padding: inherit !important;
	background: #fff
}
.el-form-item__label{
    width: 100%;
    text-align: left !important;
}
.el-upload--picture-card,.el-upload-list--picture-card .el-upload-list__item{
    width: 90px !important;
    height: 90px !important;
}
.el-form-item{
    margin-bottom:10px !important
}
.el-icon-plus{
    line-height:90px !important
}
.textNum{
	float:right;
	color: #B2B2B2;
	position: absolute;
    right: 0px;
}
.el-button{
	width: 95%
}
.el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before{
	content:"" !important;
	margin-right:0px !important
}
.el-dialog{
	width: 90% !important;
}
.el-dialog__body img{
 	width:100%
}
.el-radio__inner{
	border: 0px solid transparent !important;
}
.el-radio__input.is-checked .el-radio__inner,.el-radio--small.is-bordered .el-radio__inner{
	background: transparent !important;
	height: 0px !important;
    width: 0px !important;	
	border:0px !important;
	margin-bottom: 18px;
	border-radius:inherit !important;
	box-sizing:inherit !important;
	/* border-color:transparent !important; */

}
.el-radio__input.is-checked .el-radio__inner::before{
	font-family: element-icons!important;
	content: "\E611";
	color:#409EFF;

}
.el-radio__label{
	padding:0px !important
}
.is-checked .el-radio__inner{
	margin-right: 18px;
}
.el-radio__inner:after{
	background: transparent !important;
	width: 0px !important;
	height: 0px !important;
	border-radius:inherit !important;
	content:"" !important;
    -webkit-transform: inherit !important;
    transform: inherit !important;
    -webkit-transition: inherit !important;
    transition: inherit !important;
}
.el-progress-circle{
	width: 78px !important;
	height: 78px !important;
	margin: 0 auto;
	display: inline-block
}
.el-upload-list--picture-card .el-progress{
	text-align: center
}
</style>



