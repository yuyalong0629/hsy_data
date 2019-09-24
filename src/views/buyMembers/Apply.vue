<template>
  <div v-html="apply" @click="apply">{{apply}}</div>
</template>

<script>
export default {
  name: 'apply',
  data() {
    return {
      apply: ''
    }
  },
  mounted() {
    let form = this.$route.query.htmls
    this.apply = form
    this.$nextTick(() => {
      document.getElementsByName('punchout_form')[0].submit()
    })
  }
}
</script>

<style lang="less" scope>
</style>
