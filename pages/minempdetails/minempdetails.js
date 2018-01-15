// pages/minempdetails/minempdetails.js
import iData from '../../utils/infoimgdata.js'
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    link_origin: app.globalData.link_origin,
    list:{},
    listti:[],
    id: '',
    time_remaining:0,
    infoData: {
      DeliveryInfo: {
      },
      DeliveryInfoImg: [
      ]
    },
    self:false,
    is_collect: 0,
  },
  // 收藏
  shoucang(e){
    var that = this
    var idd = e.currentTarget.dataset.index,
        Type = e.currentTarget.dataset.type
      if (!that.data.time_remaining){
        wx.showModal({
          title: '温馨提示',
          content: '先做一张自己的名片，才可以收藏哦!',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              wx.navigateTo({
                url: '../index/index',
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
            return;
          }
    wx.request({
      url: that.data.link_origin + '/restapi/default/addcollect',
      data: {
        id: idd,
        type: Type,
        openid: wx.getStorageSync('user').openid,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        if (res.data.success == true) {
          wx.showToast({
            title: '收藏成功',
            icon: 'succes',
            duration: 1000,
            mask: true,
          })
          that.setData({
            is_collect:res.data.data.id
          })
        } else {
          wx.showToast({
            title: res.data.data.message,
            icon: 'succes',
            duration: 1000,
            mask: true
          })
        }
      }
    })
  },
  // 电话
  opentel(e){
    var tel = e.currentTarget.dataset.tel,
    name=e.currentTarget.dataset.name
    // 长按号码响应函数
      var that = this;
      // 提示呼叫号码还是将号码添加到手机通讯录
      wx.showActionSheet({
        itemList: ['呼叫', '添加联系人'],
        success: function (res) {
          if (res.tapIndex === 0) {
            // 呼叫号码
            wx.makePhoneCall({
              phoneNumber: tel,
            })
          } else if (res.tapIndex == 1) {
            // 添加到手机通讯录
            wx.addPhoneContact({
              firstName: name,//联系人姓名
              mobilePhoneNumber: tel,//联系人手机号
            })
          }
        }
      })
    return
    wx.showModal({
      title: '提示',
      content: '拨打电话',
      success: function (res) {
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: tel //仅为示例，并非真实的电话号码
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //wechat
  // wechat(){
  //   wx.previewImage({
  //     current: 'https://card.xiaoniren.cn/upload/deliveryinfo/2018/0115/15159976704467.jpg', // 当前显示图片的http链接
  //     urls: ['https://card.xiaoniren.cn/upload/deliveryinfo/2018/0115/15159976704467.jpg'] // 需要预览的图片http链接列表
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  clone(data) {
    var arr = []
    for (let i = 0; i < data.length; i++) {
      if (typeof data[i] == 'object') {
        var obj = new Object();
        for (let a in data[i]) {
          var newArr = []
          if (Array.isArray(data[i][a])) {
            newArr = newArr.concat(data[i][a])
          } else if (!Array.isArray(data[i][a])) {
            newArr = data[i][a]
          }
          obj[a] = newArr
        }
        arr.push(obj)
      }
    }
    return arr;
  },
  onLoad: function (options) {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      is_collect: +options.is_collect
    })
    if (options.self){
      this.setData({
        self:true
      })
    }
    wx.request({
      url: that.data.link_origin + '/restapi/default/view',
      data: {
        id: options.id,
        type: 'DeliveryInfo',
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        var infoData=that.data.infoData
        infoData.DeliveryInfo=res.data.data.DeliveryInfo
        var infoImg = res.data.data.DeliveryInfoImg
        var infoImgSort = that.clone(iData)
        if (Array.isArray(infoImg)){
          infoImg.forEach((item, index) => {
            item.forEach((i, inx) => {
              infoImgSort.forEach((a) => {
                if (a.index == i.img_sort) {
                  a.title = i.title
                  a.content = i.content
                  a.img.push(i.image)
                }
              })
            })
          })
          infoData.DeliveryInfoImg = infoImgSort
        }

        that.setData({
          id: options.id,
          infoData:infoData
        })
        wx.hideLoading()
      }
    })


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
          console.log(res)
          that.setData({
            time_remaining: res.data.data.time_remaining
          })
        }

      })
    })
  },
  // 点击制作
  zhifu:function(){
      wx.navigateTo({
        url:'../index/index'
      })
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