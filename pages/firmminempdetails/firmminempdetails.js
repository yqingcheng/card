// pages/minempdetails/minempdetails.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    firmlist:{},
    listti: [],
    time_remaining: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
      wx.request({
        url: 'https://card.xiaoniren.cn/restapi/default/create',
        data: {
          openid: wx.getStorageSync('user').openid,
          nickname: that.data.userInfo.nickName,
          head_image: that.data.userInfo.avatarUrl,
          gender: that.data.userInfo.gender,
          country: that.data.userInfo.country,
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        success: function (res) {
          that.setData({
            time_remaining: res.data.data.time_remaining
          })
        }

      })
    })
      wx.request({
      url: 'https://card.xiaoniren.cn/restapi/default/view',
        data: {
          id: options.id,
          type: 'EnterpriseInfo'
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        success: function (res) {
          that.setData({
            id: options.id,
            firmlist: res.data.data.EnterpriseInfo,
            listti: res.data.data.EnterpriseInfoImg
          })
          console.log(res)
        }
      })
  },
// 点击制作
  zhifu: function () {
    if (this.data.time_remaining > 0) {
      wx.navigateTo({
        url: '../make/make'
      })
    } else {
      wx.navigateTo({
        url: '../index/index',
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})