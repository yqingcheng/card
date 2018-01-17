//app.js
var app = getApp()
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  onLaunch: function() {
    var that = this
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.request({
            url: 'https://card.xiaoniren.cn/restapi/default/openid',
            data: {
              code:res.code
            },
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function (res) {
             
              var obj = {};
              obj.openid = res.data.data.openid;
              obj.expires_in = Date.now() + res.data.data.expires_in;
              wx.setStorageSync('user', obj);
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  },
  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          wx.setStorageSync('auth', true)
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },
  /**
   * 用户点击右上角分享
   */ 
  globalData: {
    openid: null,
    userInfo: null,
    time_remaining:0,
    length:null,
    link_origin: 'https://card.xiaoniren.cn',
  }
})
