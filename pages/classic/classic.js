import { ClassicModel } from '../../models/classic.js'
import { LikeModel } from '../../models/like'

let classicModel = new ClassicModel()
let likeModel = new LikeModel()
// pages/classic/classic.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    classic: null,
    latest: true,
    first: false,
    likeCount: 0,
    likeStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    classicModel.getLatest(resp => {
      this.setData({
        classic: resp,
        likeCount: resp.fav_nums,
        likeStatus: resp.like_status
        // ...resp // 扩展运算符
      })
    })
  },

  onLike: function(event) {
    let behavior = event.detail.behavior
    likeModel.like(behavior, this.data.classic.id, this.data.classic.type)
  },

  onNext: function() {
    this._updateClassic('next')
  },

  onPrevious: function() {
    this._updateClassic('previous')
  },

  _updateClassic: function(nextOrPrevious) {
    let index = this.data.classic.index
    classicModel.getClassic(index, nextOrPrevious, resp => {
      this._getLikeStatus(resp.id, resp.type)
      this.setData({
        classic: resp,
        latest: classicModel.isLatest(resp.index),
        first: classicModel.isFirst(resp.index)
      })
    })
  },

  _getLikeStatus: function(artID, category) {
    likeModel.getClassicLikeStatus(artID, category, resp => {
      this.setData({
        likeCount: resp.fav_nums,
        likeStatus: resp.like_status
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
})
