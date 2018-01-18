// pages/personal/personal.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    list:{},
    Llist:[],
    qrcode: '',
    id:'',
    www:'https://card.xiaoniren.cn',
    amount:0,
    openid:'',
    grand_total:'',

    lopen: false,
    lshow: true,
    withdraw_deposit:'',
    arrtet:'',
    particulars:[],
    time_remaining:0,
    input_num:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // 获取信息
  onLoad: function (option) {
   console.log(1)
    var that = this    
    //调用应用实例的方法获取全局数据
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
          var id = res.data.data.id
          var qrcode = res.data.data.qrcode
          var openid = res.data.data.openid
          var grand_total = res.data.data.grand_total
          var withdraw_deposit = res.data.data.withdraw_deposit
          that.setData({
            list: res.data.data,
            id: id,
            openid: openid,
            qrcode: qrcode,
            grand_total: grand_total,
            withdraw_deposit: withdraw_deposit,
            time_remaining: res.data.data.time_remaining
          })
          console.log(res)
        }
      })
    })
  },
  deposit:function(e){
    this.setData({
      lopen: !this.data.lopen
    })
  },
  guanbi:function(){
    this.setData({
      lopen: !this.data.lopen
    })
  },
  //提现
  grand_total: function (e) {
    this.setData({
      arrtet: e.detail.value
    })
  },
  input_actvie(e){
    this.setData({
      input_num:1
    })
  },
  input_normal(e){
    this.setData({
      input_num: 0
    })
  },
  depositsub: function (e) {
    var formData = e.detail.value
    var that = this
    console.log(this.data.arrtet, that.data.withdraw_deposit)

    wx.request({
      url: 'https://card.xiaoniren.cn/restapi/balance-withdrawal/create',
      data: {
        openid: that.data.openid,
        id: that.data.id,
        amount: that.data.arrtet,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        wx.showToast({
          title: '提现成功',
          icon: 'succes',
          duration: 1000,
          mask: true
        }),
          that.setData({
            lopen: false,
            lshow: true,
            openid: that.data.openid,
            id: that.data.id,
            amount: that.data.arrtet,
          })
        console.log(res)
        if (res.data.success == true) {
          wx.showToast({
            title: '提现成功',
            icon: 'succes',
            duration: 1000,
            mask: true
          }),
            that.setData({
              lopen: false,
              lshow: true,
              openid: that.data.openid,
              id: that.data.id,
              amount: that.data.arrtet,
            })
        } else {
          wx.showToast({
            title: res.data.data.message,
            icon: 'success',
            duration: 2000,
            mask: true,
          })
        }
        that.onShow();
      },
      fail: function () {
        wx.showToast({
          title: '提现失败',
          icon: 'success',
          duration: 2000,
          mask: true,
        })
      }
    })
    
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    // var onOff = false;
    // onOff = wx.getStorageSync('auth')
    // if (!onOff){
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
      path: '/pages/index/index?referrer='+that.data.id,
      imageUrl: that.data.www+that.data.qrcode,
      success: function (res) {
        // 转发成功
        console.log('/pages/index/index?referrer=' + that.data.id)
      },
      
      fail: function (res) {
        // 转发失败
      }
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
    var that=this
    that.onLoad()
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
    var that=this
    //调用应用实例的方法获取全局数据
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
          var id = res.data.data.id
          var qrcode = res.data.data.qrcode
          var openid = res.data.data.openid
          var grand_total = res.data.data.grand_total
          var withdraw_deposit = res.data.data.withdraw_deposit
          that.setData({
            list: res.data.data,
            id: id,
            openid: openid,
            qrcode: qrcode,
            grand_total: grand_total,
            withdraw_deposit: withdraw_deposit
          })
        }

      })
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },
  // 点击二维码放大
  iconcode(){
    console.log(this.data.qrcode)
    wx.previewImage({
      current: this.data.www+'this.data.qrcode', // 当前显示图片的http链接
      urls: [this.data.www+this.data.qrcode] // 需要预览的图片http链接列表
    })
  },
})