// pages/cardcase/cardcase.js
var app = getApp()
var page_index = 1;
var index;
function initSubMenuDisplay() {
  return ['hidden', 'hidden', 'hidden'];
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    open: true,
    show: false,
    _num: 0,
    subMenuDisplay: initSubMenuDisplay(),
    areaTxt:'地区',
    search:[],
    card:'',
    yeshu: 1,
    gssearch:[],
    link_origin: app.globalData.link_origin,
    id:'',
    idd:'',
    user_id:'',
    is_c:'',
    time_remaining:'0',
  },
  //切换显示隐藏 添加移除class
  tapMainMenu: function (e) { // 获取当前显示的一级菜单标识
    var index = parseInt(e.currentTarget.dataset.index);        // 生成数组，全为hidden的，只对当前的进行显示
    console.log(index)
    var newSubMenuDisplay = initSubMenuDisplay();//        如果目前是显示则隐藏，反之亦反之。同时要隐藏其他的菜单
    if (this.data.subMenuDisplay[index] == 'hidden') {
      newSubMenuDisplay[index] = 'show';
    } else {
      newSubMenuDisplay[index] = 'hidden';
    }        // 设置为新的数组
    this.setData({
      subMenuDisplay: newSubMenuDisplay,
      _num: e.target.dataset.index
    });
  },
  // 地区
  tapSubMenu: function (e) {
    var index = e.currentTarget.dataset.index;
    var that = this
        that.setData({
          subMenuDisplay: initSubMenuDisplay(),
          areaTxt:index
        })
    console.log(index);  // 隐藏所有一级菜单
  },
  // 行业
  tapSubMenumian: function (e) {
    var index = e.currentTarget.dataset.index;
    var that = this
    that.setData({
      subMenuDisplay: initSubMenuDisplay(),
    })
    console.log(index);  // 隐藏所有一级菜单
  },
  // 排序
  tapSubMens: function (e) {
    var index = e.currentTarget.dataset.index;
    var that = this
    that.setData({
      subMenuDisplay: initSubMenuDisplay(),
    })
    console.log(index);  // 隐藏所有一级菜单
  },
  // dianji: function (e) {
  //   console.log("我看过")
  //   var aa = e.
  //   console.log(id)
  // },
  // 点击收藏
  showitem: function (e) {
    console.log()
    var that = this
    var idd = e.currentTarget.dataset.index, 
    Type = e.currentTarget.dataset.type 
    if (!+wx.getStorageSync('time_remaining')){
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
        openid:wx.getStorageSync('user').openid,
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
          page_index = 1
        } else {
          wx.showToast({
            title: res.data.data.message,
            icon: 'succes',
            duration: 1000,
            mask: true
          })
         
        }
        that.onShow()
      }
    })
  },
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
        console.log(res.data.data)
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
        that.onShow()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  onHide: function () {
    page_index = 1
  },
  
  //搜搜
  searchmp:function(e){
    var that = this;
    var card = e.detail.value;
    console.log(e)
    wx.request({
      url: that.data.link_origin + '/restapi/delivery-info-search/index',
      data: {
        user_id: wx.getStorageSync('userId'),
        name: card,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          search: res.data.data.items
        })
      }
    })
  },

  // 查看
  chakan:function (e) {
    var that = this;
    var Type = e.currentTarget.dataset.type;
    var idd = e.currentTarget.dataset.index;
    wx.request({
      url: 'https://card.xiaoniren.cn/restapi/default/select-view',
      data: {
        id:idd,
        type:Type,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        
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
    wx.request({
      url: 'https://card.xiaoniren.cn/restapi/delivery-info-search/index',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        user_id: wx.getStorageSync('userId')
      },
      success: function (res) {
        var a = res.data.data._meta.totalCount, b = res.data.data._meta.perPage
        var aa = parseInt(a / b) + (a % b == 0 ? 0 : 1)
        var search = []
        var user_id = ""
        for (var i = 0; i < res.data.data.items.length; i++) {
          user_id += res.data.data.items[i].user_id + ','
        }
        wx.setStorageSync('morePreson', res.data.data.items);

        that.setData({
          search: res.data.data.items,
          yeshu: aa,
          user_id: user_id
        })
        console.log(res)
      }
    })
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
    console.log(12345)
    wx.removeStorage({
      key: 'morePreson'
    })
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
    // 个人
    var that = this
    page_index++;
    wx.showLoading({
      title: '加载中',
    })
    if (page_index <= this.data.yeshu) {
      wx.request({
        url: 'https://card.xiaoniren.cn/restapi/delivery-info-search/index',
        header: {
          'content-type': 'application/json' // 默认值
        },
        data: {
          user_id: wx.getStorageSync('userId'),
          page: page_index
        },
        success: function (res) {
          var a = res.data.data._meta.totalCount, b = res.data.data._meta.perPage
          var aa = parseInt(a / b) + (a % b == 0 ? 0 : 1)
          var arr =that.data.search
          var user_id = ""
          arr = arr.concat(res.data.data.items)
          for (var i = 0; i < res.data.data.items.length; i++) {
            user_id += res.data.data.items[i].user_id + ','
          }
          that.setData({
            search: arr ,
            yeshu: aa,
            user_id: user_id
          })
          wx.hideLoading()
        }
      })
    }else{
      wx.hideLoading()
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
      path: '/pages/index/index?referrer='+wx.getStorageSync('userId'),
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
  // 收藏

})