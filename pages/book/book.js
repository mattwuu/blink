import { BookModel } from '../../models/book.js'
import { random } from '../../utils/common.js'

const bookModel = new BookModel()

// pages/book/book.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    books: [],
    searching: false,
    more: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    bookModel.getHotList().then(resp => {
      this.setData({
        books: resp
      })
    })
  },

  onSearching() {
    this.setData({
      searching: true
    })
  },

  onCancel() {
    this.setData({
      searching: false
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.setData({
      more: random(16)
    })
  }
})
