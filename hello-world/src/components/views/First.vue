<template>
  <div class='first-app'>
    {{msg}}
    <confirm text='注册' @message='getMessage'></confirm>
    <p><router-link to='second'>去第二个页面</router-link></p>
  </div>
</template>

<script>
import Confirm from '../sub/Confirm'

export default {
  name: 'First',
  components: {
    'confirm': Confirm
  },
  data () {
    return {
      msg: 'Welcome to FirstApp'
    }
  },
  methods: {
    getMessage (val) {
      alert(val)
    }
  }
}
</script>

<style lang="less" scoped>
  .first-app {
    font-size: 30px;
    color: red;
  }
</style>
