<template>
  <div class="taskO">
    <keep-alive>
      <task1 v-if="active == 1"></task1>
      <task2 v-if="active == 2"></task2>
      <task3 v-if="active == 3"></task3>
      <task4 v-if="active == 4"></task4>
      <task5 v-if="active == 5"></task5>
    </keep-alive>

  </div>
</template>

<script type="text/ecmascript-6">
  import task1 from '../personal/taskall.vue'
  import task2 from '../personal/audit.vue'
  import task3 from '../personal/rejected.vue'
  import task4 from '../personal/successful.vue'
  import task5 from '../personal/failure.vue'

  export default{
      name : 'tasko',
      props : {
        active : ''
      },
      components :{
        task1,
        task2,
        task3,
        task4,
        task5,
      }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
