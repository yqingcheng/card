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
    userId: 0
  },

  asdf(userInfo,ref) {
    //更新数据

    var ajax = (ref) => {
      that.setData({
        userInfo: userInfo
      })
      console.log(userInfo)
      console.log(ref)
      wx.request({
        url: 'https://card.xiaoniren.cn/restapi/default/create',
        data: {
          openid: wx.getStorageSync('user').openid,
          nickname: userInfo.nickName,
          head_image: userInfo.avatarUrl,
          gender: userInfo.gender,
          country: userInfo.country,
          referrer: ref
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        success: function (res) {
          console.log(res)
          var time_remaining = res.data.data.time_remaining
          var referrer = res.data.data.referrer
          var id = res.data.data.id
          that.setData({
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
        }
      })
    }
    
    if (userId > 0) {
      ajax(userId)
    } else {
      ajax(0)
    }


  },  

  // 获取信息
  onLoad: function (option) {
    var that = this
    var userId = option.referrer
    
    if (userId > 0){
      // console.log('分享id',referrer)
      that.setData({
        userId: userId
      })
      
    }

    

      //调用应用实例的方法获取全局数据
      app.getUserInfo((userInfo) => {
        console.log(this)
        console.log(this.data.userId)
        // this.asdf(userInfo)
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
    wx.navigateTo({
      url: '../index/index',
    })
  },
  onShow(){
    wx.getSetting({
      success: (res) => {
         if (res.authSetting['scope.userInfo']){
            this.setData({
              userinfo:true
            })
         }
      }
    })
  },
  // 分享
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '小泥人电子智能商务共享名片制作',
      path: '',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
    // 个人视频上传
  bindButtonTap: function () {
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      compressed:true,
      success: function (res) {
        var tempFilePath= res.tempFilePath
        var videosize=wx.uploadFile({
          url: that.data.link_origin + '/restapi/delivery-info/upload', //仅为示例，非真实的接口地址
          filePath: tempFilePath,
          name: 'file',
          formData: {},
          success: function (res) {
            var url = "" 
            try{
              url=JSON.parse(res.data).data.file.url
            }catch(e){
              wx.showToast({
                title: JSON.parse(res.data).data.message,
                icon: 'success',
                duration: 2000,
                mask: true,
              })
            }
            that.setData({
              licence: true,
              video: url
            })
            if (JSON.parse(res.data).success == true){
              wx.showToast({
                title: '上传成功',
                icon: 'succes',
                duration: 1000,
                mask: true
              })
            }
            console.log(res.data)
          },
          fail:function(res){
            wx.showToast({
              title: '上传失败',
              icon: 'success',
              duration: 2000,
              mask: true,
            })
          }
        })
        videosize.onProgressUpdate( (res) => {
          console.log(res)
        })
      }
    })
  },
}) 
