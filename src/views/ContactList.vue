<template>
  <div>
    <van-button type="primary" @click="getList">主要按钮</van-button>
    <van-button type="warning" @click="add">警告按钮</van-button>
    <van-button type="danger" @click="addpost">33333333</van-button>
    <van-button type="warning">4444444</van-button>
  </div>

</template>

<script>
import { Button } from 'vant'

export default {
  name: 'ContactList',
  components: {
    // 组件注册
    [Button.name]: Button
  },
  methods: {
    async getList () {
      // eslint-disable-next-line no-unused-vars
      const res = await this.$Http.getContactList({
        id: 1
      })
      console.log('sss' + res.code)
    },
    async add () {
      // eslint-disable-next-line no-unused-vars
      const res = await this.$Http.newContactForm({
        id: 2
      })
      console.log(res.data.code)
      if (res.data.code === '404 Not Found') {
        console.log('404错误')
      } else {
        console.log('其他错误')
      }
    },
    async addpost () {
      // eslint-disable-next-line no-unused-vars
      const res = await this.$Http.newContactjson()
    }
  }
}
</script>

<style scoped>

</style>
