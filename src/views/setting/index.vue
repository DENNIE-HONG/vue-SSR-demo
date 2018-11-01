<template>
  <div class="setting">
    <header-banner>设置</header-banner>
    <section class="setting-info">
      <div class="info-item">
        <span>vue头像</span>
        <div class="info-item-right">
          <upload-picture
            :imgUrl="avatar"
            class="info-item-pic"
            @change="changeAvatar"
            :name="name">
          </upload-picture>
        </div>
      </div>
      <div class="info-item">
        <span>vue昵称</span>
        <div class="info-item-right">
          {{name}}
          <i class="iconfont icon-right"></i>
        </div>
      </div>
    </section>
    <section class="setting-info">
      <div class="info-item">
        <span>性别</span>
        <div
          class="info-item-right"
          @click="handleGender">
          {{sex}}
          <i class="iconfont icon-right"></i>
        </div>
      </div>
      <base-radio-group
        title="修改性别"
        v-model="gender"
        :is-hide="isHideGender"
        @closeRadio="closeGender">
        <base-radio :label="1">女</base-radio>
        <base-radio :label="2">男</base-radio>
      </base-radio-group>
      <div class="info-item">
        <span>帅吗</span>
        <div class="info-item-right">
          <base-checkbox v-model="checked"/>
        </div>
      </div>
      <div class="info-item">
        <span>兴趣</span>
        <div class="info-item-right">
          <base-select
            v-model="hobby"
            :style="{textAlign: 'right', height: '1.2rem'}">
            <base-option
              value="1"
              label="吴亦凡">
            </base-option>
            <base-option
              value="2"
              label="黄景瑜">
            </base-option>
          </base-select>
          <i class="iconfont icon-right"></i>
        </div>
      </div>
      <div class="info-item">
        <span>标签</span>
        <div class="info-item-right">
          <base-select
            v-model="topic"
            :style="{textAlign: 'right'}" multiple>
            <base-option
              value="3"
              label="沉迷学习">
            </base-option>
            <base-option
              value="4"
              label="不可自拔">
            </base-option>
            <base-option
              value="5"
              label="小点声">
            </base-option>
            <base-option
              value="6"
              label="日渐肥硕">
            </base-option>
          </base-select>
          <i class="iconfont icon-right"></i>
        </div>
      </div>
    </section>
    <div
      class="btn-primary btn-large"
      @click="submit">提交修改
    </div>
  </div>
</template>
<script>
/**
 * 设置个人资料页
 * @author luyanhong 2018-11-01
*/

import UploadPicture from 'coms/UploadPicture/index.vue';
import HeaderBanner from 'coms/HeaderBanner/index.vue';
export default {
  name: 'Setting',
  metaInfo: {
    title: 'my setting',
    meta: [
      {
        'property': 'keywords',
        'content': 'vue设置页'
      },
      {
        'property': 'description',
        'content': 'vue练习设置也'
      }
    ]
  },
  components: {
    UploadPicture,
    HeaderBanner
  },
  data () {
    return {
      gender: 1,
      isHideGender: true,
      checked: true,
      hobby: '1',
      topic: ['3'],
      isChange: false,
      sentData: {
        name: '',
        avatar: ''
      },
      isLoading: false
    }
  },
  computed: {
    sex: {
      get () {
        return this.gender === 1 ? '女' : '男'
      }
    },
    name () {
      return this.$store.state.name;
    },
    avatar () {
      return this.$store.state.avatar;
    }
  },
  watch: {
    gender (val) {
      console.log(val);
    },
    hobby (val) {
      console.log(val);
    },
    topic (val) {
      console.log(val);
    }
  },
  methods: {
    handleGender () {
      this.isHideGender = false;
      this.isChange = true;
    },
    closeGender (options) {
      this.isHideGender = options.isHide;
      this.isChange = true;
    },
    changeAvatar (url) {
      console.log(url);
      this.isChange = true;
    },
    submit () {
      this.$confirm('确定提交吗？').then(() => {
        if (!this.isChange) {
          this.$message({
            type: 'warning',
            message: '没有任何修改哦'
          });
          return;
        }
        if (this.isLoading) {
          return;
        }
        this.isLoading = true;
      }).catch(() => {});
    },
    failTip (message) {
      this.$message({
        type: 'error',
        message
      });
    }
  }
}
</script>
<style lang="scss">
.setting {
  &-info {
    margin-bottom: rem(15);
    .info-item {
      display: flex;
      padding: 0 rem(20);
      background-color: white;
      border-bottom: 1px solid nth($fgray, 1);
      font-size: rem(34);
      line-height: rem(90);
      align-items: center;
      &-right {
        flex: 1;
        display: flex;
        min-height: rem(90);
        align-items: center;
        justify-content: flex-end;
        color: nth($fblack, 3);
        font-size: rem(30);
        width: 100%;
        > .iconfont {
          font-size: rem(36);
        }
      }
      &-pic {
        display: inline-block;
        margin: rem(20) rem(20) rem(20) 0;
      }
    }
  }
  .btn-primary {
    margin: rem(60) rem(40);
  }
}
</style>



