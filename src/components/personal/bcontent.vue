<template>

    <div>
      <keep-alive>
      <tab1 v-if="active == 1"></tab1>
      <tab2 v-if="active == 2"></tab2>
      <tab3 v-if="active == 3"></tab3>
      </keep-alive>
    </div>

</template>

<script type="text/ecmascript-6">
  import tab1 from '../personal/balall.vue'
  import tab2 from '../personal/cash.vue'
  import tab3 from '../personal/balance2.vue'

  export default{
    name : 'bcontent',
    props:{
      active : ''
    },

    components:{
      'tab1' : tab1,
      'tab2' : tab2,
      'tab3' : tab3
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
