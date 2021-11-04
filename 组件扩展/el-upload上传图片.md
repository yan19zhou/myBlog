   
   #### 使用el-upload
   #### html代码
          <el-upload
                drag
                :auto-upload="false"
                class="avatar-uploader"
                action
                :show-file-list="false"
                :on-change="handlePicture"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="baseImgPath" :src="baseImgPath" class="avatar" />
                <img v-else src="../../../assets/images/face-upload.png" class="avatar" />
                <el-button slot="trigger" type="text">Upload Photos</el-button>
              </el-upload>

#### js

    handlePicture(res, file) {
         // 文件改变时获取文件信息
      try {
        this.baseImgPath = webkitURL.createObjectURL(file[file.length - 1].raw);
      } catch (error) {
        this.baseImgPath = URL.createObjectURL(file[file.length - 1].raw);
      }

      this.uploadData(file[file.length - 1].raw);
    },
    // 调用uploadData方法request上传图片
    uploadData(file) {
      // 上传图片
      const formData = new FormData();
      formData.append("file", file);
      uploadData(formData).then(res => {
        this.ruleForm.headImageURL = res[0].relativeUrl;
      });
    },
    // 上传之前判定
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }