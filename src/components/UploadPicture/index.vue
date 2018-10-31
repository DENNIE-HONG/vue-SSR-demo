<template>
  <div class="com-upload">
    <div class="com-upload-btn">
      <img
        v-if="imgUrl"
        :src="imgUrl"
        class="com-upload-pic"/>
      <input
        type="file"
        class="com-upload-input"
        accept="image"
        @change="onChange"
      />
    </div>
  </div>
</template>
<script>
/**
 * 上传图片模块
 * @param {String}      imgUrl, 初始图片src
 * @param {Number}      maxSize, 最大size，默认5M
 * @param {String}      acceptType, 可接受图片类型
 * @author luyanhong 2018-08-08
*/
export default {
  name: 'UploadPicture',
  model: {
    prop: 'imgUrl',
    event: 'change'
  },
  props: {
    imgUrl: String,
    acceptType: {
      default: 'png,jpg,jpeg,bmp',
      type: String
    },
    maxSize: {
      default: 5,
      type: Number
    }
  },
  methods: {
    async onChange ($event) {
      const [file] = $event.target.files;
      const errorMsg = this.check(file);
      if (errorMsg) {
        this.fail(errorMsg);
        return;
      }
      try {
        const newUrl = await this.changeToBase64(file);
        this.$emit('change', newUrl);
        this.$message({
          type: 'success',
          message: '图片上传成功'
        });
      } catch (error) {
        this.fail(error);
      }
    },
    /**
     * 校验图片
     * @param {Object}  file
     * @return {String} 错误信息
    */
    check (file) {
      let errorMsg;
      if (!file) {
        errorMsg = '请选择图片';
        return errorMsg;
      }
      const size = file.size / 1024 / 1024;
      const [,type] = file.type.split('/');
      const reg = new RegExp(type);
      if (!reg.test(this.acceptType)) {
        errorMsg = '图片类型不对哦';
        return errorMsg;
      }
      if (size > this.maxSize) {
        errorMsg = `图片超过${this.maxSize}M了哦`;
        return errorMsg;
      }
    },
    /**
     * 图片转为base64编码
     * @param {Object}    file
     * @return {String}   url
    */
    changeToBase64 (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise((resolve, reject) => {
        reader.onload = (e) => {
          resolve(e.target.result);
        };
        reader.onerror = (error) => {
          reject(error);
        };
      });
    },

    fail (error) {
      this.$message({
        type: 'error',
        message: error
      });
    }
  }
}
</script>
<style lang="scss">
.com-upload {
  height: rem(100);
  width: rem(100);
  &-pic {
    display: inline-block;
    width: 100%;
    height: auto;
    min-height: 100%;
  }
  &-input {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
  }
  &-btn {
    position: relative;
    display: inline-block;
    height: 100%;
    width: 100%;
    @include hid;
    border: 1px dashed nth($fgray, 1);
    border-radius: rem(8);
    text-align: center;
    &:after {
      content: '+';
      font-size: rem(48);
    }
  }
}
</style>


