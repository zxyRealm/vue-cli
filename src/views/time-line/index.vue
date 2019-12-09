<template>
  <div>
    <el-button @click="addActives">添加</el-button>
    <FullCalendar
      ref="scheduler"
      v-bind="options"
      :plugins="calendarPlugins"></FullCalendar>
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';

export default {
  components: {
    FullCalendar
  },
  data () {
    return {
      calendarPlugins: [ resourceTimelinePlugin ],
      calendar: null,
      options: {
        defaultView: 'resourceTimeline',
        resourcesInitiallyExpanded: false,
        header: {
          title: '',
          left: '',
          right: ''
        },
        resources: [{
          id: 'A',
          groupId: '1',
          title: 'Resource A'
        }]
      }
    }
  },
  mounted () {
  },
  methods: {
    addActives () {
      let scheduler = this.$refs.scheduler
      const api = scheduler.getApi()
      console.log(scheduler)
      console.log(api)
    }
  }
}
</script>

<style>
@import '~@fullcalendar/core/main.css';
@import '~@fullcalendar/timeline/main.css';
@import '~@fullcalendar/resource-timeline/main.css';

#calendarEl {
  /* width: 300px; */
  height: 300px;
  border: 1px solid #ddd;
}
</style>