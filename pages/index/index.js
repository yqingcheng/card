var app = getApp()
var id;
import sum from '../../utils/sum'
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    time_remaining:0,
    open: false,
    show: true,
    time_remaining: app.globalData.time_remaining,
    listlength: '',
    Dlistlength: '',
    length: '',
    referrer:'',
    id:'',
    referrer_id: 0,
    userinfo:false,
    userId: 0,
    options: null,
  },
  asdf(userInfo,ref) {
    //更新数据
    var ajax = (ref) => {
      this.setData({
        userInfo: userInfo,
        userinfo: true
      })
      console.log(userInfo) 
      console.log(+ref)
      const data = {
        openid: wx.getStorageSync('user').openid,
        nickname: userInfo.nickName,
        head_image: userInfo.avatarUrl,
        gender: userInfo.gender,
        country: userInfo.country,
        referrer: +ref
      };
      wx.request({
        url: 'https://card.xiaoniren.cn/restapi/default/create',
        data: data,
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        success: (res) => {
          var time_remaining = res.data.data.time_remaining
          var referrer = res.data.data.referrer
          var id = res.data.data.id
          this.setData({
            list: res.data.data,
            time_remaining: time_remaining,
            referrer: referrer,
            id: id

          })
          if (time_remaining > 0 && sum.com == 0) {
            wx.switchTab({
              url: '../minemp/minemp',
            })
          }
          wx.setStorageSync('userId', res.data.data.id + '')
          wx.getStorageSync('userId')
          
          wx.setStorageSync('time_remaining', res.data.data.time_remaining + '')
          wx.getStorageSync('time_remaining')
          wx.setStorageSync('id', res.data.data.id + '')
          wx.getStorageSync('id')
        }
      })
    }
    if (ref > 0) {
      console.log('大于0' + ref)
      ajax(ref)
    } else {
      console.log('小于0' + ref)
      ajax(0)
    }
  },  
  // 获取信息
  onLoad: function (option) {
    var that = this
    var userId = option.referrer
    var scene = decodeURIComponent(option.scene)

    var optionStr = JSON.stringify(option)

    wx.setClipboardData({
      data: optionStr,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
          }
        })
      }
    })

    // var jiexi = '{"scene":"referrer%3D521"}'
    // //referrer=521
    // console.log(decodeURIComponent(JSON.parse(jiexi).scene).split('=')[1])

    if (scene !== 'undefined'){
      userId = scene.split('=')[1]
    }
    if (userId && userId > 0){
      that.setData({
        userId: userId
      })
    }else{
    }
    console.log(this.data, "页面数据")
      //调用应用实例的方法获取全局数据
      app.getUserInfo((userInfo) => {
        // console.log(this)
        console.log(this.data.userId)
        this.asdf(userInfo,this.data.userId)
      })
  },
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // 支付
  zhifu:function(e){    
    var that = this;
      wx.request({
        url: 'https://card.xiaoniren.cn/restapi/order/create',
        data: {
          openid: wx.getStorageSync('user').openid,
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        success: function (res) {
          var nonceStr = res.data.data.nonceStr
          var timeStamp = res.data.data.timeStamp
          var pkg = res.data.data.package
          var paySign = res.data.data.paySign
          wx.requestPayment({
            timeStamp: timeStamp,
            nonceStr: nonceStr,
            package: pkg,
            signType: 'MD5',
            paySign: paySign,
            success: function () {
              wx.showToast({
                title: '购买成功',
                icon: 'success',
                duration: 2000,
                mask: true,
              })
              wx.navigateTo({
                url: '../index/index',
              })

            },
            fail: function () {
              wx.showToast({
                title: '购买失败',
                icon: 'success',
                duration: 2000,
                mask: true,
              })
            }
          })
        }
      })
   
  },
  // 去制作
  make: function () {
    var that = this
    wx.request({
      url: 'https://card.xiaoniren.cn/restapi/default/index',
      data: {
        openid: wx.getStorageSync('user').openid,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var listlength = res.data.data.DeliveryInfo.length
        var Dlistlength = res.data.data.EnterpriseInfo.length
        var length = listlength + Dlistlength
        that.setData({
          list: res.data.data.DeliveryInfo,
          listlength: listlength,
          EnterpriseInfo: res.data.data.EnterpriseInfo,
          Dlistlength: Dlistlength,
          length: length
        })
        wx.switchTab({
          url: '../minemp/minemp'
        })
      }
    })
    
  },
  close:function(){
    this.setData({
      open: !this.data.open
    }),
      wx.switchTab({
      url: '../minemp/minemp',
      })
  },
  userInfoHandler(e){
    var that = this
    wx.openSetting({
      success(res){
        console.log(res.authSetting['scope.userInfo'])
        if(res.authSetting['scope.userInfo']){
          console.log(that)
          that.setData({
            userinfo: true
          })
        }
      }
    })
    var that = this
  },
  onShow(){

    app.getUserInfo((userInfo) => {
      // console.log(this)
      console.log(this.data.userId)
      this.asdf(userInfo, this.data.userId)
    })
  },
  // 分享
  onShareAppMessage: function (res) {
    //   var onOff = false;
    //   onOff = wx.getStorageSync('auth')
    //   if (!onOff) {
    //     wx.showModal({
    //       title: '温馨提示',
    //       content: '请先授权',
    //       success: function (res) {
    //         if (res.confirm) {
    //           console.log('用户点击确定')
    //           wx.redirectTo({
    //             url: '../index/index'
    //           })
    //         } else if (res.cancel) {
    //           console.log('用户点击取消')
    //         }
    //       }
    //     })


    //   }
    //   if (!onOff){
    //   return false;
    // }

    var that = this
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: '',
      path: '/pages/index/index?referrer=' + wx.getStorageSync('userId'),
      imageUrl: that.data.www + that.data.qrcode,
      success: function (res) {
        // 转发成功
      },

      fail: function (res) {
        // 转发失败
      }
    }
  },
}) 
