<template>
  <div id="app">
    <!-- 我是中文你这也算吗 -->
    <!-- <p>你是个假的标题么？</p>
    <p title="这是要国际化的内容哦！"></p>
    <div class="" :content="$t('当前数量{count}个', { count: count })">
    </div> -->
    {{$t(`pages_App_thisIsA`)}}{{$t('pages_App_thisIsAnother')}}
    {{`${$t('pages_App_notInThisTemplate')}`}}
    <span>{{$t('pages_App_iAmADifferentText')}}</span>
    <div>
      {{`${$t('pages_App_thisIsATemplate2')}${count}${$t('pages_App_hahaha')}`}}
    </div>
    <p>{{`${$t('pages_App_hahahahahaha')}${textContent} ${$t('pages_App_empty')}`}}</p>
    {{`hhhhh`}}
    <!-- ggggg -->
    <p :title="`${$t('pages_App_thisIsATemplate')}${count}${$t('pages_App_example')}`" :data-name="$t('pages_App_hahahaha')" :content="$t('pages_App_but')">{{$t('pages_App_thisIsALabel')}}</p>
    {{$t('pages_App_comeFromBehind')}}
    <router-view :name="$t('pages_App_onlyAfterTomorrow')"></router-view>
  </div>
</template>

<script>
import i18n from '@/locales'
export default {
  name: 'app',
  components: {},
  data () {
    const type = 'name'
    return {
      textContent: i18n.t('App_pages_App_withinTheTest'),
      select: `${i18n.t('pages_App_globalization')}${this.title}${i18n.t('pages_App_itHasStarted')}${this.count}`,
      count: 10,
      title: i18n.t('App_pages_App_text')
    }
  },

  filters: {
    numberFilter () {
      return i18n.t(`App_pages_App_started`)
    }
  }
}
</script>

<style scoped>
/* #app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  padding: 0 30px;
} */
</style>
