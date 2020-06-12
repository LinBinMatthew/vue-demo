<template>
  <div class='second'>
      {{msg}}
      <p><router-link to='/first'>去第一个页面</router-link></p>
  </div>
</template>

<script>
export default {
  name: 'Second',
  data () {
    return {
      msg: 'Welcome to SecondApp'
    }
  }
}
</script>

<style lang="less" scoped>
  .second {
    color: blue
  }
</style>
