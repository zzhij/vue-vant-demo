<template>
  <div class="verify-wrapper">
    <van-form @submit="onSubmit" ref="formVerify">
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="introduce"
        name="introduce"
        label="介绍"
        placeholder="介绍"
        :rules="[{ required: true, message: '请填写介绍' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
    <van-button type="info" @click="getForm">验证</van-button>
  </div>
</template>
<script>
export default {
  name: 'Verify',
  data () {
    return {
      username: '',
      password: '',
      introduce: '',
      activeKey: 0
    }
  },
  methods: {
    onSubmit (values) {
      console.log('submit', values)
    },
    getForm () {
      console.log(this.$refs.formVerify)
      // 验证单个field
      this.$refs.formVerify.validateField('username')
      // 验证所有的field
      // this.$refs.formVerify.validate()
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
