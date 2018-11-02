<template>
  <div class="login">
    <header></header>
    <form class="login-content">
      <BaseInput
        placeholder="昵称"
        v-model.trim="name"
        class="login-input"
        maxlength="10"
        clearable
      />
      <BaseInput
        placeholder="密码"
        v-model.trim="password"
        class="login-input"
        maxlength="20"
        type="password"
        clearable
      />
      <div
        v-show="!isRegister"
        class="btn-primary btn-large"
        @click="submit">登录</div>
      <div
        v-show="isRegister"
        class="btn-primary btn-large"
        @click="signUp">注册</div>
      <div v-show="!isRegister">
        <span>没有用户名？</span>
        <span
          class="login-register"
          @click="changeRegister">点击注册</span>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: 'Login',
  metaInfo: {
    title: 'my login',
    meta: [
      {
        'property': 'keywords',
        'content': 'vue登录页'
      },
      {
        'property': 'description',
        'content': 'vue登录页'
      }
    ]
  },
  data () {
    return {
      name: '',
      password: '',
      sendData: {
        name: '',
        password: ''
      },
      isRegister: false
    }
  },

  methods: {
    submit () {
      const errorMsg = this.check();
      if (errorMsg) {
        this.showError(errorMsg);
        return;
      }
      this.combineData();
      this.postData();
    },
    // 校验
    check () {
      let errorMsg;
      if (!this.name) {
        errorMsg = '请输入名字';
        return errorMsg;
      }
      if (!this.password) {
        errorMsg = '请输入密码';
        return errorMsg;
      }
      return errorMsg;
    },
    // 组合数据
    combineData () {
      const { name, password } = this;
      this.sendData = {
        name,
        password
      };
    },
    // 请求数据
    postData () {
      this.$store.dispatch('SIGN_IN', this.sendData).then(() => {
        this.$router.push('/my');
      }).catch((res) => {
        this.showError(res.msg);
      });
    },
    // 注册
    async signUp () {
      const errMsg = this.check();
      if (errMsg) {
        this.showError(errMsg);
        return;
      }
      try {
        await this.$store.dispatch('SIGN_UP', this.name);
        location.reload();
        // this.$router.push({ path: '/my' });
      } catch(err) {
        this.showError(err);
      }
    },
    changeRegister () {
      this.isRegister = true;
    },
    showError (text) {
      this.$message({
        type: 'error',
        message: text
      });
    }

  }
}
</script>
<style lang="scss">
.login {
  header {
    width: rem(150);
    height: rem(150);
    margin: rem(100) auto;
    background: url('../../assets/img/logo.png') top/100% no-repeat;
  }
  &-content {
    width: 80%;
    margin: auto;
    .btn-primary {
      margin-top: rem(40);
    }
  }
  &-input {
    margin-bottom: rem(40);
  }
  &-register {
    text-decoration: underline;
    color: nth($fgreen, 1);
  }
}
</style>


