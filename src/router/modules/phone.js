import Layout from '@/views/layout'

export default [{
  path: '/phone',
  // name: 'Phone',
  component: Layout,
  children: [
    {
      path: '',
      name: 'Phone',
      meta: {
        title: '手机号'
      },
      component: () => import('@/views/phone')
    }
  ]
}]
