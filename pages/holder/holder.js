// pages/holder/holder.js
var app = getApp()
var page_index = 1;
import pinying from '../../utils/pinying'
import hash from '../../utils/hash'
import sort from '../../utils/sort'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    open: false,
    show: true,
    search: [],
    card: '',
    yeshu: 1,
    gssearch: [],
    link_origin: app.globalData.link_origin,
    id: '',
    nameList: [],
    display_num:0,
  },
  // 取消收藏
  showitemm: function (e) {
    var that = this
    var iddd = e.target.dataset.key
    wx.request({
      url: that.data.link_origin + '/restapi/default/deletecollect',
      data: {
        id: iddd,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        if (res.data.success == true) {
          wx.showToast({
            title: '取消成功',
            icon: 'succes',
            duration: 1000,
            mask: true
          })
          page_index = 1
        } else {
          wx.showToast({
            title: res.data.data.message,
            icon: 'succes',
            duration: 1000,
            mask: true
          })
        }
        that.onLoad()
      }
    })
  },
  // 标记重点
  emphasis: function (e) {
    var that = this
    var ind = e.currentTarget.dataset.index
    var index = e.currentTarget.dataset.ind
    var num = e.currentTarget.dataset.num
    wx.request({
      url: that.data.link_origin + '/restapi/default/set-top',
      data: {
        id: ind
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: (res) => {
        this.ajax();
      }
    })
  },
  // 取消标记
  cancel_emphasis: function (e) {
    var that = this
    var ind = e.currentTarget.dataset.index
    console.log(ind)
    wx.request({
      url: that.data.link_origin + '/restapi/default/delete-top',
      data: {
        id: ind
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: (res) => {
        console.log(this.ajax)
        this.ajax();
      }
    })
  },

  ajax(){
    wx.request({
      url: 'https://card.xiaoniren.cn/restapi/collect-deliver-enterprise',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        user_id: wx.getStorageSync('userId')
      },
      success: (res) => {
        var a = res.data.data._meta.totalCount, b = res.data.data._meta.perPage
        var aa = parseInt(a / b) + (a % b == 0 ? 0 : 1)
        var search = []
        this.setData({
          search: sort(res.data.data.items),
          yeshu: aa,
        })
        if (res.data.data.items.length == 0) {
          this.setData({
            display_num: 1
          })
        }else{
          this.setData({
            display_num: 0
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this
    // 个人
    this.ajax();
    // 企业
    // wx.request({
    //   url: 'https://card.xiaoniren.cn/restapi/enterprise-info-search/index',
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   data: {
    //     user_id: wx.getStorageSync('userId')
    //   },
    //   success: function (res) {
    //     var a = res.data.data._meta.totalCount, b = res.data.data._meta.perPage
    //     var aa = parseInt(a / b) + (a % b == 0 ? 0 : 1)
    //     var gssearch = []
    //     that.setData({
    //       gssearch: res.data.data.items,
    //       yeshu: aa
    //     })
    //   }
    // })
  },
  onHide: function () {
  },
  //搜索
  searchmp: function (e) {
    var that = this;
    var card = e.detail.value;
    wx.request({
      url: 'https://card.xiaoniren.cn/restapi/delivery-info-search/index',
      data: {
        user_id: wx.getStorageSync('userId'),
        name: card,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          search: sort(res.data.data.items),
        })
      }
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
    var that = this
    // 个人
    this.ajax();
    // 企业
    // wx.request({
    //   url: 'https://card.xiaoniren.cn/restapi/enterprise-info-search/index',
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   data: {
    //     user_id: wx.getStorageSync('userId')
    //   },
    //   success: function (res) {
    //     var a = res.data.data._meta.totalCount, b = res.data.data._meta.perPage
    //     var aa = parseInt(a / b) + (a % b == 0 ? 0 : 1)
    //     var gssearch = []
    //     that.setData({
    //       gssearch: res.data.data.items,
    //       yeshu: aa
    //     })
    //   }
    // })
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
    if (page_index <= this.data.yeshu) {
      console.log(1)
      wx.request({
        url: 'https://card.xiaoniren.cn/restapi/collect-deliver-enterprise',
        header: {
          'content-type': 'application/json' // 默认值
        },
        data: {
          user_id: wx.getStorageSync('userId'),
          page: page_index
        },
        success: (res) => {
          console.log(res,1)
          var a = res.data.data._meta.totalCount, b = res.data.data._meta.perPage
          var aa = parseInt(a / b) + (a % b == 0 ? 0 : 1)
          var arr = that.data.search
          var user_id = ""
          var arrs = sort(res.data.data.items)
          arr = arr.concat(arrs)
          this.setData({
            search: arr,
            yeshu: aa,
          })
        }
      })
    }
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