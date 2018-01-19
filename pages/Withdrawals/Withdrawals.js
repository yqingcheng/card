// pages/Withdrawals/Withdrawals.js
var page_index=1;
var index;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    yeshu: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    wx.request({
      url: 'https://card.xiaoniren.cn/restapi/balance-withdrawal?wechat_user_id=12',
      //  + wx.getStorageSync('id')
      data: {
        openid: wx.getStorageSync('user').openid,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        var a = res.data.data._meta.totalCount, b = res.data.data._meta.perPage
        var aa = parseInt(a / b) + (a % b == 0 ? 0 : 1)
        var list = []
        this.setData({
          list: res.data.data.items,
          yeshu: aa,
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    page_index = 1
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    page_index = 1
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
    var that = this
    page_index++;
    console.log(page_index)
    wx.request({
      url: 'https://card.xiaoniren.cn/restapi/balance-withdrawal?wechat_user_id=12',
      //  + wx.getStorageSync('id')
      data: {
        openid: wx.getStorageSync('user').openid,
        page: page_index
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        var a = res.data.data._meta.totalCount, b = res.data.data._meta.perPage
        var aa = parseInt(a / b) + (a % b == 0 ? 0 : 1)
        var arr = that.data.list
        this.setData({
          list: arr,
          yeshu: aa,
        })
      },
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    // var onOff = false;
    // onOff = wx.getStorageSync('auth')
    // if (!onOff) {
    //   wx.showModal({
    //     title: '温馨提示',
    //     content: '请先授权',
    //     success: function (res) {
    //       if (res.confirm) {
    //         console.log('用户点击确定')
    //         wx.redirectTo({
    //           url: '../index/index'
    //         })
    //       } else if (res.cancel) {
    //         console.log('用户点击取消')
    //       }
    //     }
    //   })

    //   return false;
    // }

    var that = this
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '',
      path: '/pages/index/index?referrer=' + wx.getStorageSync('userId'),
      imageUrl: that.data.www + that.data.qrcode,
      success: function (res) {
        // 转发成功
        console.log('/pages/index/index?referrer=' + wx.getStorageSync('userId'))
      },

      fail: function (res) {
        // 转发失败
      }
    }
  },
})