import Layout from '@/views/layout'

export default [{
  path: '/css',
  name: 'Css',
  component: Layout,
  redirect: 'css/layout',
  meta: {
    title: 'Css 运用'
  },
  children: [
    {
      path: 'layout',
      name: 'cssLayout',
      meta: {
        title: 'Css 布局'
      },
      component: () => import('@/views/css/layout.vue')
    },
    {
      path: 'animation',
      name: 'cssAnimation',
      meta: {
        title: 'Css 动画'
      },
      component: () => import('@/views/css/animation.vue')
    }
  ]
}]
