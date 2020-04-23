export default [{
  path: '/systems',
  name: 'Systems',
  meta: {
    showMenu: true,
    index: '/systems',
    title: '系统功能运用'
  },
  component: () => import('@/views/system'),
  children: [
    {
      meta: {
        showMenu: true,
        index: '/systems/camera',
        title: '摄像头'
      },
      path: 'camera',
      name: 'SystemsCamera',
      component: () => import('@/views/system/camera.vue')
    }
  ]
}]
