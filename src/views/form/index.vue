<template>
  <div class="form-wrapper">
    <div class="nav">
      <van-sidebar v-model="activeKey">
        <van-sidebar-item title="下拉框" to='/form/drop-select' />
        <van-sidebar-item title="表单验证" to='/form/verify' />
      </van-sidebar>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
/* import DropSelect from 'views/form/drop-select/index.vue' */

export default {
  name: 'From',
  components: {
    /* DropSelect */
  },
  beforeRouteEnter (to, from, next) {
    // 每次刷新 更新nav选中状态 或者通过vuex
    // 个人比较建议 vuex 的状态管理方式
    console.log(to)
    console.log(from)
    next(vm => {
      // 通过 `vm` 访问组件实例
      if (vm.activeKey === 0 && to.path !== '/form/drop-select') { // 如果本来导航就是到 '/form/drop-select'  再导航到这个地址会报错
        vm.$router.push('/form/drop-select')
      }
    })
  },
  data () {
    return {
      username: '',
      password: '',
      introduce: '',
      activeKey: 0
    }
  },
  mounted () {
    // if (this.activeKey === 0) {
    //   this.$router.push('/form/drop-select')
    // }
  },
  watch: {
    activeKey: function (val) {
      console.log(1212122)
      console.log(1212121212, val)
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
      this.$refs.formVerify.validate()
    }
  }
}
</script>
<style lang="less" scoped>
.form-wrapper {
  display: flex;
  height: 100%;
  .nav {
    background: #f7f8fa;
  }
  .content {
    flex: 1;
  }
}
</style>
