<template>
  <div>
    <el-tree
    show-checkbox
    default-expand-all
    :data="treeData"
    node-key="id"
    :props="treeProps"
    @check-change="handleCheckChange">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <i v-show="data.type === 2" class="el-icon-star-off"></i>
      </span>
    </el-tree>
  </div>
</template>
<script>
export default {
  data () {
    return {
      treeData: [
        {
          name: 'All',
          id: 'all',
          children: [
            { 
              id: '01',
              name: '001',
              children: [
                {id: '0101', name: '0101', type: 1, children: []},
                {id: '0102', name: '0102', type: 1, children: []},
                {id: '0103', name: '0103', type: 1, children: []},
                {id: '0104', name: '0104', type: 2, children: []}
              ]
            }
            // { 
            //   id: '02',
            //   name: '002',
            //   children: [
            //     {id: '0201', name: '0201', type: 1, children: []},
            //     {id: '0202', name: '0202', type: 1, children: []},
            //     {id: '0203', name: '0203', type: 1, children: []},
            //     {id: '0204', name: '0204', type: 1, children: []}
            //   ]
            // }
          ] 
        }
      ]
    }
  },
  computed: {
    treeProps () {
      return {
        label: 'name',
        children: 'children',
        disabled:  (item) => {
          return this.disabledTypes.includes(item.type)
        }
      }
    },
    disabledTypes () {
      return [3]
    }
  },
  methods: {
    handleCheckChange (data, check) {
      // const firstOne 
      console.log(data)

    }
  }
}
</script>
<style lang="scss" scoped>
.custom-tree-node {
  font-size: 16px;
}
</style>