<template>
  <div class="droplist-wrap">
    <!-- <van-field
      v-model="value"
      placeholder="请选择类名"
      right-icon="arrow-down"
      label="类别"
      @input="onchange1"
      @click-right-icon="clickright"
    />
    <div class="drop-box">
      <van-list
        style="position: absolute; z-index: 10;width:100%"
        v-model="loading"
        :finished="finish"
      >
        <van-search v-model="value" placeholder="请输入搜索" v-if="showcell" />
        <van-cell
          v-for="item in list"
          :key="item"
          :title="item"
          @click="clickcell(item)"
        />
      </van-list>
    </div> -->
    <div class="blog"></div>
  </div>
</template>

<script>
export default {
  name: 'Droplist',
  data () {
    return {
      list: [
        '大型户外广告',
        '高炮',
        '看板',
        '企业指示板',
        '工地围挡',
        '店招标牌',
        '其他'
      ],
      loading: false,
      finish: true,
      search1: '',
      value: '',
      value1: '',
      showcell: false
    }
  },
  watch: {
    value: function (val) {
      this.$emit('transferdata', val)
    } // 监听并传值给父组件
  },
  methods: {
    onchange1 () {
      console.log(this.value, 'change')
    },
    // focusfield(){this.showcell=true},
    // blurfield(){this.showcell=false},
    clickright () {
      this.showcell = !this.showcell
      //  this.value='';
      console.log('d', 'd')
    },
    clickcell (item) {
      this.value = item
      this.showcell = false
      console.log(this.value, 'ss')
    }
  }
}
</script>
<style lang='less'>
.droplist-wrap {
  .drop-box {
    background: #ccc;
    position: relative;
  }
}
.blog {
  width: 375px; height: 100px;
  background: #000;
}
</style>
