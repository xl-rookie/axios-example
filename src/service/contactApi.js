const CONTACT_API = {
  // 获取联系人列表
  getContactList: {
    method: 'get',
    url: '/contactList'
  },
  // 新建联系人 form-data
  newContactForm: {
    method: 'post',
    url: '/contact/new/form',
    params: {
      id: 1,
      age: 20
    }
  },
  // 新建联系人 application/json
  newContactjson: {
    method: 'post',
    url: '/contact/new/json'
  },
  // 编辑联系人
  editContact: {
    method: 'put',
    url: '/contact/edit'
  },
  // 删除联系人
  delContact: {
    method: 'delete',
    url: '/contact'
  }
}
export default CONTACT_API
