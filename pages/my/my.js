import { ClassicModel } from '../../models/classic.js'
import { BookModel } from '../../models/book.js'

const classicModel = new ClassicModel()
const bookModel = new BookModel()

// pages/my/my.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    userInfo: null,
    bookCount: 0,
    classics: null
  },

  onLoad: function() {
    this.userAuthorized()
    this.getMyBookCount()
    this.getMyFavor()
  },

  userAuthorized() {
    wx.getSetting({
      success: data => {
        if (data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: data => {
              this.setData({
                authorized: true,
                userInfo: data.userInfo
              })
            }
          })
        }
      }
    })
  },

  // getUserInfo() {},

  onGetUserInfo(event) {
    const userInfo = event.detail.userInfo
    if (userInfo) {
      this.setData({
        authorized: true,
        userInfo
      })
    }
  },

  onJumpToAbout() {
    wx.navigateTo({
      url: '/pages/about/about'
    })
  },

  onStudy() {
    wx.navigateTo({
      url: '/pages/course/course'
    })
  },

  getMyBookCount() {
    bookModel.getMyBookCount().then(resp => {
      this.setData({
        bookCount: resp.count
      })
    })
  },

  getMyFavor() {
    classicModel.getMyFavor(resp => {
      this.setData({
        classics: resp
      })
    })
  },

  onPreviewTap: function(event) {
    wx.navigateTo({
      url:
        '/pages/classic-detail/index?cid=' +
        event.detail.cid +
        '&type=' +
        event.detail.type
    })
  }
})
