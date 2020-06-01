import Layout from '@/views/layout'

export default [{
  path: '/systems',
  name: 'Systems',
  component: Layout,
  redirect: 'systems/camera',
  meta: {
    title: '系统功能运用'
  },
  children: [
    {
      path: 'camera',
      name: 'SystemsCamera',
      meta: {
        title: '摄像头'
      },
      component: () => import('@/views/system/camera.vue')
    }
  ]
}]
