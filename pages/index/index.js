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
    options: null
  },

  asdf(userInfo,ref) {
    //更新数据

    var ajax = (ref) => {
      console.log(this)
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
      console.log('传输的数据', data)
      wx.request({
        url: 'https://card.xiaoniren.cn/restapi/default/create',
        data: data,
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        success: (res) => {
          console.log(res)
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
        }
      })
    }
    console.log(ref)
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
    console.log(option)
    if (userId && userId > 0){
      console.log('分享id',userId)
      console.log(that)
      that.setData({
        userId: userId
      })
      
    }else{
      console.log(that)
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
    console.log(that)
    // wx.getSetting({
    //   success(res) {
    //     // if ('scope.userInfo' in res.authSetting){
    //     //   delete res.authSetting['scope.userInfo']
    //     //   console.log(res.authSetting)
    //     // }
    //     console.log(res.authSetting['scope.record'])
    //     if (!res.authSetting['scope.record']) {
    //       wx.authorize({
    //         scope: 'scope.record',
    //         success() {
    //           // console.log(12)
    //           // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
    //           this.setData({
    //             userinfo: true
    //           })
    //           app.getUserInfo((userInfo) => {
    //             // console.log(this)
    //             console.log(this.data.userId)
    //             this.asdf(userInfo, this.data.userId)
    //           })
    //         }
    //       })
    //     }
    //   }
    // })
    // console.log(this.data.options)
    // wx.navigateTo({
    //   url: '../index/index?referrer=' + 521,
    // })
  },
  onShow(){

    app.getUserInfo((userInfo) => {
      // console.log(this)
      console.log(this.data.userId)
      this.asdf(userInfo, this.data.userId)
    })

    // wx.getSetting({
    //   success: (res) => {
    //      if (res.authSetting['scope.userInfo']){
    //         this.setData({
    //           userinfo:true
    //         })
    //      }
    //   }
    // })
  },
  // 分享
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      // console.log(res.target)
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
  // bindButtonTap: function () {
  //   var that = this
  //   wx.chooseVideo({
  //     sourceType: ['album', 'camera'],
  //     maxDuration: 60,
  //     camera: 'back',
  //     compressed:true,
  //     success: function (res) {
  //       var tempFilePath= res.tempFilePath
  //       var videosize=wx.uploadFile({
  //         url: that.data.link_origin + '/restapi/delivery-info/upload', //仅为示例，非真实的接口地址
  //         filePath: tempFilePath,
  //         name: 'file',
  //         formData: {},
  //         success: function (res) {
  //           var url = "" 
  //           try{
  //             url=JSON.parse(res.data).data.file.url
  //           }catch(e){
  //             wx.showToast({
  //               title: JSON.parse(res.data).data.message,
  //               icon: 'success',
  //               duration: 2000,
  //               mask: true,
  //             })
  //           }
  //           that.setData({
  //             licence: true,
  //             video: url
  //           })
  //           if (JSON.parse(res.data).success == true){
  //             wx.showToast({
  //               title: '上传成功',
  //               icon: 'succes',
  //               duration: 1000,
  //               mask: true
  //             })
  //           }
  //           // console.log(res.data)
  //         },
  //         fail:function(res){
  //           wx.showToast({
  //             title: '上传失败',
  //             icon: 'success',
  //             duration: 2000,
  //             mask: true,
  //           })
  //         }
  //       })
  //       videosize.onProgressUpdate( (res) => {
  //         // console.log(res)
  //       })
  //     }
  //   })
  // },
  

 
}) 
