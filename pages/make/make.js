// pages/make/make.js
import infoData from '../../utils/infoimgdata.js'
var app=getApp(); 
var url=url;
var title;
var content;
var license_path;
var glicense_path;
var logo_path;
var license;
var positive;
var contrary;
var id='';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    link_origin: app.globalData.link_origin,
    motto: 'Hello World',
    userInfo: {},
    selected: true,
    open: false,
    show: true,
 
    opene: false,
    openeg: false,
    array: ['请选择！','20人以下', '20~59人', '50~100人', '100人以上'],
    renminbi: ['请选择！','不需要融资', '天使轮', 'A轮', 'B轮', 'C轮', 'D轮', 'E轮', 'F轮', '已上市'],
    financing_situation: 0,
    date: '2017-09-01',
    name:'',
    mobile: '',
    desc: '',
    position:'',
    wechat:'',
    email:'',
    website:'',
    qq:'',
    company_name:'',
    title:'',
    content:'',
    company_business:'',
    tempFilePaths: '',
    time_remaining: '', 
    license_path:'',
    glicense_path: '',
    tempFilePaths:'',
    userInfo:'',
    brands: [],
    brands2:[],
    object: [],
    object2:[],
    index22:0,
    brandindex: 0,
    brandindex2: 0,
    index:0,
    index1: 0,
    index2:0,
    company_scale:'',
    province_id:'',
    tempFilePaths:'',
    imgs: [],
    url:url,

    logo:'',
    business:'',
    registered_capital:'',
    phone:'',
    username:'',
    logo_path: '',
    financing_situation:'',
    license:'',
    positive:'',
    contrary:'',
    amend:{},
    picArr0:[],
    picArr: [],
    gname:'',
    id:'',
    image:[],
    company:'',
    arrText:'展开',
    arrTexT: '展开',
    arrText1:"展开",
    company_city_id:'',
    bg_img:'',
    video:'',
    userInfoimg:'',
    introDuce: [],
    region: ['北京市'],
    text3:'',
    progress:0,
  },
  // 上传个人图片
  updateLicence: function (e) {
    var that = this
    var index = e.currentTarget.dataset.index
    wx.chooseImage({
      count: 4, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: that.data.link_origin + '/restapi/delivery-info/upload', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {},
          success: function (res) {
            var str = res.data.slice(res.data.indexOf("\"url"), Number(res.data.indexOf(",\"filename\"") + 1))
            that.data.image.push({
              image: str.slice(str.indexOf("/"), Number(str.indexOf(",") - 1))
            })
            var imgs = that.data.introDuce
            imgs[index].img.push({ url:JSON.parse(res.data).data.file.url})
            that.setData({
              introDuce:imgs,
            })
          }
        })
      }
    })
  },
  //  标题
  EventHandle (e){
    var index = e.currentTarget.dataset.index
    var tits = this.data.introDuce
    tits[index].title = e.detail.value,
    this.setData({
      introDuce:tits,
    })
  },
  //  介绍
  contEventHandle(e) {
    var index = e.currentTarget.dataset.index
    var tits = this.data.introDuce
    tits[index].content = e.detail.value,
      this.setData({
        introDuce: tits,
      })
  },
  //个人
  selected: function (e) {
    this.setData({
      selected: true
    })
  },
  //公司
  selected1: function (e) {
    this.setData({
      selected: false,
    })
  },
  //切换
  showitem: function () {
    this.setData({
      open: !this.data.open
    })
    if (this.data.open){
        this.setData({
          arrText: '收起',
        })
    }else{
      this.setData({
        arrText: '展开',
      })
    }
  },
   //切换
  showitemm: function () {
    this.setData({
      opene: !this.data.opene
    })
    if (this.data.opene) {
      this.setData({
        arrText1: '收起',
      })
    } else {
      this.setData({
        arrText1: '展开',
      })
  }
  },
   //切换
  showitemg: function () {
    this.setData({
      openeg: !this.data.openeg
    })
    if (this.data.openeg) {
      this.setData({
        arrTexT: '收起',
      })
    } else {
      this.setData({
        arrTexT: '展开',
      })
    }
  },
  listenerPickerSelected: function (e) {
    //改变index值，通过setData()方法重绘界面
    this.setData({
      index: e.detail.value,
      company_scale: this.data.array[e.detail.value]
    });
    console.log(this.data.company_scale)
  },
  listenerPickerSelectedd: function (e) {
    //改变index值，通过setData()方法重绘界面
    this.setData({
      index1: e.detail.value,
      financing_situation: this.data.renminbi[e.detail.value]
    });
  },
  // 点击日期组件确定事件 
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value      
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  clone(data){
    var arr = []
for (let i = 0; i <data.length; i++) {
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
// 二级联动
  bindReginChange(e){
    var city = e.detail.value
    function cityFilter(city) {
      if (city[0] == '北京市') {
        city.splice(1, 1)
      }
      if (city[0] == '天津市') {
        city.splice(1, 1)
      }
      if (city[0] == '上海市') {
        city.splice(1, 1)
      }
      if (city[0] == '重庆市') {
        city.splice(1, 1)
      }
      return city
    }
    
    this.setData({
      region: cityFilter(city).join(' ')
    })
  },
  onLoad: function (options) {
    var that=this
    this.setData({
      d_id:options.id,
      e_id:options.id,
      introDuce:this.clone(infoData)
    })
    wx.getUserInfo({
      success: function (res) {
        that.setData({
          userInfo:res.userInfo.avatarUrl
        })
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country
      }
    })
    // 修改个人信息
    if (options.id && options.type=='D'){
      this.setData({
        selected: true,
        isshow:true
      })
      id = options.id
    wx.request({
      url: that.data.link_origin + '/restapi/delivery-info/update?id=' + options.id,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        var address = res.data.data.company_address.split(',')
        var citys=[],
          num=0
        if (address[0]=='北京市'){
          citys=address.slice(0, 2).join(' ')
          num = 2
        }
        else if (address[0] == '上海市') {
          citys = address.slice(0, 2).join(' ')
          num = 2
        } 
        else if (address[0] == '重庆市') {
          citys = address.slice(0, 2).join(' ')
          num = 2
        } 
        else if (address[0] == '天津市') {
          citys = address.slice(0, 2).join(' ')
          num = 2
        }
        else{
          citys = address.slice(0, 3).join(' ')
          num = 3
        }
        that.setData({
          region: citys
        })
        that.setData({
          userInfoimg: res.data.data.head_portrait,
          name:res.data.data.name,
          mobile: res.data.data.mobile,
          desc: res.data.data.desc,
          position: res.data.data.position,
          wechat: res.data.data.wechat,
          email: res.data.data.email,
          website: res.data.data.website,
          qq: res.data.data.qq,
          company_name: res.data.data.company_name,
          company_business: res.data.data.company_business,
          text3:address[num],
          video: res.data.data.video,
          bg_img:res.data.data.bg_img,
          business: res.data.data.business,  
        })  
      }
    })
    }
     // 获取个人图片
    if (options.id && options.type == 'D') {
     wx.request({
       url: that.data.link_origin + '/restapi/delivery-info/get-img?id=' + options.id,
       data: {
       },
       header: {
         'content-type': 'application/json' // 默认值
       },
       success: (res)=> {
         if (res.data){
           var infoImg = res.data.data.DeliveryInfoImg
           var infoImgSort = this.clone(infoData)
           infoImg.forEach((item, index) => {
             item.forEach((i, inx) => {
               infoImgSort.forEach((a) => {
                 if (a.index == i.img_sort) {
                   a.title = i.title
                   a.content = i.content
                   a.img.push({
                     url: i.image,
                     id: i.id
                   })
                 }
               })
             })
           })
           that.setData({
             introDuce: infoImgSort
           })
         }
       }, fail: function () {
       }
     })
   }
    // 修改企业信息
    if (options.id && options.type == 'E') {
      this.setData({
        selected: false,
        isshow: true
      })
      id = options.id
      wx.request({
        url: that.data.link_origin + '/restapi/enterprise-info/update?id=' + options.id,
        data: {
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        success: function (res) {
          var address2 = res.data.data.company_address.split(',')
          for (let i = 0; i < that.data.brands2.length; i++) {
            if (address2[0] == that.data.brands2[i].name) {
              that.setData({
                brandindex2: i
              })
              console.log(that.data.brands2[i].id)
              wx.request({
                url: that.data.link_origin + '/restapi/city/city',
                data: {
                  province_id: that.data.brands2[i].id
                },
                header: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                method: "POST",
                success: function (res) {
                  that.setData({
                    object2: res.data.data,
                  })
                  for (let i = 0; i < that.data.object2.length; i++) {
                    if (address2[1] == that.data.object2[i].name) {
                      that.setData({
                        index22: i
                      })
                      break
                    }
                  }
                }
              })
              break
            }
          }
          that.setData({
            logo: res.data.data.logo,
            username: res.data.data.username,
            company: res.data.data.name,
            phone: res.data.data.phone,
            business: res.data.data.business,
            emacompany_businessil: res.data.data.company_business,
            date: res.data.data.company_created_at,
            company_name: res.data.data.company_name,
            company_business: res.data.data.company_business,
            company_address: res.data.data.company_address,
            registered_capital: res.data.data.registered_capital,
            positive: res.data.data.business_license,
            license: res.data.data.identity_card_front,
            contrary: res.data.data.identity_card_later,
            company_scale:res.data.data.company_scale,
            financing_situation: res.data.data.financing_situation,
            company_address: address2[2]
          })
          var company_scale = that.data.company_scale
          var financing_situation = that.data.financing_situation
          var index=0
          var index1=0
          that.data.array.forEach((item) => {
            index ++
            if (item == company_scale){
              that.setData({
                index:index
              })
              return
            }
          })   
          that.data.renminbi.forEach((item) => {
            index1++
            if (item == financing_situation) {
              that.setData({
                index1: index1
              })
              return
            }
          })     
        }
      })
    }
    // 获取企业图片
    if (options.id && options.type == 'E') {
      wx.request({
        url: that.data.link_origin + '/restapi/enterprise-info/get-img?id=' + options.id,
        data: {

        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          if (res.data.data.length != 0) {
            that.setData({
              image: res.data.data,
              title: res.data.data[0].title,
              content: res.data.data[0].content,
            })
          } else {
            return
          }
        }, fail: function () {

        }
      })
    }
  },
  // ************二级省市
  bindPickerChange02: function (e) {
    var that = this;
    this.setData({
      brandindex2: e.detail.value,
      index22: 0,
      text12: this.data.brands2[e.detail.value].name
    })
    var aa = that.data.brands2[that.data.brandindex2].id
    wx.request({
      url: that.data.link_origin + '/restapi/city/city',
      data: {
        province_id: aa
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        that.setData({
          object2: res.data.data,
        })
      }
    })
  },
  bindPickerChange12: function (e) {
    this.setData({
      index22: e.detail.value,
      text22: this.data.object2[e.detail.value].name
    })
  }, 
  // 个人删除图片
  imgdel:function(e){
    var that = this
    var id = e.currentTarget.dataset.index
    var inx =e.currentTarget.dataset.inx
    var imgid = e.currentTarget.dataset.id
    var data = that.data.introDuce
    data[inx].img.splice(id, 1)

    wx.showModal({
      title: '温馨提示',
      content: '确认删除',
      success: function (res) {
        if (res.confirm) {
          that.data.image.splice(id, 1)
          that.setData({
            introDuce: data
          })
          wx.request({
            url: that.data.link_origin + '/restapi/delivery-info/delete-img?id=' + imgid,
            data: {
              // id: id
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              console.log(res)
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // 企业删除图片
  firmimgdel: function (e) {
    var that = this
    var id = e.currentTarget.dataset.index
    var imgid = e.currentTarget.dataset.id
    console.log(e)
    wx.showModal({
      title: '温馨提示',
      content: '确认删除',
      success: function (res) {
        if (res.confirm) {
          that.data.image.splice(id, 1)
          that.setData({
            image: that.data.image
          })
          wx.request({
            url: that.data.link_origin + '/restapi/enterprise-info/delete-img?id=' + imgid,
            data: {
              // id: id
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              console.log(res)
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
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
  
  },
  // 个人背景图上传
  updateBg: function () {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log(res)
        wx.uploadFile({
          url: that.data.link_origin + '/restapi/delivery-info/upload', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {},
          success: function (res) {
            console.log(JSON.parse(res.data))
            var url = JSON.parse(res.data).data.file.url
            that.setData({
              licence: true,
              bg_img: url
            })
          }
        })
      }
    })
  },
  // 个人logo上传
  logouserInfo: function () {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log(res)
        wx.uploadFile({
          url: that.data.link_origin + '/restapi/delivery-info/upload', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {},
          success: function (res) {
            var url = JSON.parse(res.data).data.file.url
            that.setData({
              licence: true,
              userInfoimg:that.data.link_origin+url
            })
          }
        })
      }
    })
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
          that.setData({
            progress: res.progress
          })
          console.log(res.progress)
        })
      }
    })
  },
  // 创建个人名片
  name: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  mobile: function (e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  desc: function (e) {
    this.setData({
      desc: e.detail.value
    })
  },
  position: function (e) {
    this.setData({
      position: e.detail.value
    })
  },
  wechat: function (e) {
    this.setData({
      wechat: e.detail.value
    })
  },
  email: function (e) {
    this.setData({
      email: e.detail.value
    })
  },
  website: function (e) {
    this.setData({
      website: e.detail.value
    })
  },
  qq: function (e) {
    this.setData({
      qq: e.detail.value
    })
  },
  business: function (e) {
    this.setData({
      business: e.detail.value
    })
  },
  company_city_id: function (e) {
    this.setData({
      company_city_id: e.detail.value
    })
  },
  company_business: function (e) {
    this.setData({
      company_business: e.detail.value
    })
  },
  company_address: function (e) {
    if (e.detail.value){
      this.setData({
        company_address: e.detail.value,
        text3: e.detail.value
      })
    }
    
   
  },
  company_name: function (e) {
    this.setData({
      company_name: e.detail.value
    })
  },
  title: function (e) {
    this.setData({
      title: e.detail.value
    })
  },
  content: function (e) {
    this.setData({
      content: e.detail.value
    })
  },
  // 提交个人信息，修改提交个人信息
  formSubmit: function (e) {
    var that = this

    if (this.data.d_id){
      console.log(that.data.text3)
      var imgsdata = that.data.introDuce
      imgsdata.forEach((item) => {
        var dataSort = [];
        item.img.forEach((i) => {
          dataSort.push(i.url)
        })
        item.img = dataSort;
      })
      wx.request({
        url: that.data.link_origin + '/restapi/delivery-info/update-img',
        data:{
          id:id,
          imgs: JSON.stringify(imgsdata)
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        success:function(res){
          console.log(res)
        }
      })
      if (!this.data.text3) {
        this.setData({
          text3: '',
        })
      }
     
      var city = Array.isArray(that.data.region) ? that.data.region.join(',') : that.data.region.split(' ').join(',')
      wx.request({
        url: that.data.link_origin + '/restapi/delivery-info/update?id=' +id,
        data: {
          head_portrait: that.data.userInfoimg,
          name: e.detail.value.name,
          mobile: e.detail.value.mobile,
          desc: e.detail.value.desc,
          position: e.detail.value.position,
          wechat: e.detail.value.wechat,
          email: e.detail.value.email,
          website: e.detail.value.website,
          qq: e.detail.value.qq,
          company_business: e.detail.value.company_business,
          company_address: city+ ',' + that.data.text3,
          company_name: e.detail.value.company_name,
          title: e.detail.value.title,
          content: e.detail.value.content,
          bg_img: that.data.bg_img,
          video: that.data.video,
          business: e.detail.value.business,  
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        success: function (res) {
          wx.showToast({
            title: '修改成功',
            icon: 'succes',
            duration: 1000,
            mask: true
          }),
            wx.switchTab({
              url: '../minemp/minemp',
            })
        },
      })
    }else{
    if (this.data.name.length == 0) {
      wx.showToast({
        title: '请输入姓名！',
        icon: 'success',
        duration: 1500
      })
      return false;
    }
    if (this.data.mobile.length == 0) {
      wx.showToast({
        title: '请输入手机号！',
        icon: 'success',
        duration: 1500
      })
      return false;
    }
    if (this.data.mobile.length != 11) {
      wx.showToast({
        title: '手机号长度有误！',
        icon: 'success',
        duration: 1500
      })
      return false;
    }
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!myreg.test(this.data.mobile)) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'success',
        duration: 1500
      })
      return false;
    }
    if (this.data.desc.length == 0) {
      wx.showToast({
        title: '请输入简介！',
        icon: 'success',
        duration: 1500
      })
      return false;
    }
    if (this.data.position.length == 0) {
      wx.showToast({
        title: '请输入职位！',
        icon: 'success',
        duration: 1500
      })
      return false;
    }
    if (that.data.bg_img == '') {
      wx.showToast({
        title: '请上传背景图！',
        icon: 'success',
        duration: 1500
      })
      return false;
    }
    if (this.data.company_name.length == 0) {
      wx.showToast({
        title: '请输入公司名称！',
        icon: 'success',
        duration: 1500
      })
      return false;
    }
    var that = this;
    var formData = e.detail.value
    if (!this.data.text3){
        this.setData({
          text3:'',
        })
    }
    var imgsdata = that.data.introDuce
    imgsdata.forEach((item) => {
      var dataSort = [];
      item.img.forEach((i) => {
        dataSort.push(i.url)
      })
      item.img = dataSort;
    })
    console.log(imgsdata)
    wx.request({
      url: that.data.link_origin+'/restapi/delivery-info/create',
      data: {
        openid: wx.getStorageSync('user').openid,
        head_portrait: that.data.userInfoimg || that.data.userInfo,
        name: e.detail.value.name,
        bg_img: that.data.bg_img,
        video: that.data.video,
        mobile: e.detail.value.mobile,
        desc: e.detail.value.desc,
        position: e.detail.value.position,
        wechat: e.detail.value.wechat,
        email: e.detail.value.email,
        website: e.detail.value.website,
        qq: e.detail.value.qq,
        company_business: e.detail.value.company_business,
        company_address: that.data.region + ',' + that.data.text3,
        company_name: e.detail.value.company_name,
        title: e.detail.value.title,
        content: e.detail.value.content,
        business: e.detail.value.business,        
        imgs: JSON.stringify(imgsdata)
      },
      
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        console.log(res.data)
        wx.showToast({
          title: '提交成功',
          icon: 'succes',
          duration: 1000,
          mask: true
        }),
        wx.switchTab({
          url: '../minemp/minemp',
        })
      },
        fail: function () {
        wx.showToast({
          title: '提交失败',
          icon: 'success',
          duration: 2000,
          mask: true,
        })
      }
    })
  }
},
  
  // 企业
  company: function (e) {
    this.setData({
      company: e.detail.value
    })
  },
  username: function (e) {
    this.setData({
      username: e.detail.value
    })
  },
  phone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  business: function (e) {
    this.setData({
      business: e.detail.value
    })
  },
  registered_capital: function (e) {
    this.setData({
      registered_capital: e.detail.value
    })
  },

  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
 
 
  // 企业logo
  updateLogo: function () {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log(res)
        wx.uploadFile({
          url: that.data.link_origin+'/restapi/enterprise-info/upload', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {},
          success: function (res) {
            var url = JSON.parse(res.data).data.file.url
            that.setData({
              licence: true,
              logo: url
            })
          }
        })
      }
    })
  },
  // 企业营业执照
  license: function () {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log(res)
        wx.uploadFile({
          url: that.data.link_origin+'/restapi/enterprise-info/upload', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {},
          success: function (res) {
            console.log(JSON.parse(res.data))
            var url = JSON.parse(res.data).data.file.url
            that.setData({
              licence: true,
              license: url
            })
          }
        })
      }
    })
  },
  // 企业身份证正面
  positive: function () {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log(res)
        wx.uploadFile({
          url: that.data.link_origin+'/restapi/enterprise-info/upload', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {},
          success: function (res) {
            console.log(JSON.parse(res.data))
            var url = JSON.parse(res.data).data.file.url
            that.setData({
              licence: true,
              positive: url
            })
          }
        })
      }
    })
  },
  // 企业身份证反面
  contrary: function () {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log(res)
        wx.uploadFile({
          url: that.data.link_origin+'/restapi/enterprise-info/upload', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {},
          success: function (res) {
            console.log(JSON.parse(res.data))
            var url = JSON.parse(res.data).data.file.url
            that.setData({
              licence: true,
              contrary: url
            })
          }
        })
      }
    })
  },
  // 企业公司上传图片
  gsupdateLicence: function () {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log(res)
        wx.uploadFile({
          url: that.data.link_origin+'/restapi/enterprise-info/upload', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {},
          success: function (res) {
            var str = res.data.slice(res.data.indexOf("\"url"), Number(res.data.indexOf(",\"filename\"") + 1))
            that.data.image.push({
              image: str.slice(str.indexOf("/"), Number(str.indexOf(",") - 1))
            })
            that.setData({
              image: that.data.image,
            })
            console.log(that.data.image, str)
          }
        })
      }
    })
  },

  // 提交企业信息
  firmformSubmit:function(e){
    var that = this   
    console.log(id)    
    if (this.data.e_id) {
      var imgs = []
      var img = []
      for (var i = 0; i < that.data.image.length; i++) {
        img.push(that.data.image[i].image)
      }
      imgs.push({
        title: e.detail.value.title,
        content: e.detail.value.content,
        img
      });
      wx.request({
        url: that.data.link_origin + '/restapi/enterprise-info/update-img',
        data: {
          id: id,
          imgs: JSON.stringify(imgs)
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        success: function () {

        }
      })
      if (!this.data.text3) {
        this.setData({
          text3: '',
        })
      }
      wx.request({
        url: that.data.link_origin + '/restapi/enterprise-info/update?id=' + id,
        data: {
          openid: wx.getStorageSync('user').openid,
          logo: that.data.logo,
          name: e.detail.value.company,
          username: e.detail.value.username,
          phone: e.detail.value.phone,
          company_created_at: that.data.date,

          company_scale: that.data.company_scale,
          registered_capital: e.detail.value.registered_capital,
          financing_situation: that.data.financing_situation,
          company_business: e.detail.value.company_business,
          company_city_id: e.detail.value.company_business,
          company_address: that.data.text12 + ',' + that.data.text22 + ',' + that.data.text3,
          business: e.detail.value.business,
          title: e.detail.value.title,
          content: e.detail.value.content,
          business_license: that.data.positive,
          identity_card_front: that.data.license,
          identity_card_later: that.data.contrary,
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        success: function (res) {
          wx.showToast({
            title: '修改成功',
            icon: 'succes',
            duration: 1000,
            mask: true
          }),
            wx.switchTab({
              url: '../minemp/minemp',
            })
        },
      })
    }else{
      if (that.data.logo == '') {
        wx.showToast({
          title: '公司logo未上传',
          icon: 'success',
          duration: 2000
        })
        return
      }
      if (this.data.company.length == 0) {
        wx.showToast({
          title: '请输入公司名称！',
          icon: 'success',
          duration: 1500
        })
        return
      }
      if (this.data.username.length == 0) {
        wx.showToast({
          title: '请输入法人姓名！',
          icon: 'success',
          duration: 1500
        })
        return
      }
      if (this.data.phone.length == 0) {
        wx.showToast({
          title: '请输入手机号或者电话号！',
          icon: 'success',
          duration: 1500
        })
        return
      }
      if (this.data.business.length == 0) {
        wx.showToast({
          title: '请输入主营业务！',
          icon: 'success',
          duration: 1500
        })
        return
      }
      if (this.data.company_address.length == 0) {
        wx.showToast({
          title: '请输入详细地址！',
          icon: 'success',
          duration: 1500
        })
        return
      }
      if (this.data.company_business.length == 0) {
        wx.showToast({
          title: '请输入行业！',
          icon: 'success',
          duration: 1500
        })
        return
      }
      if (that.data.license == '') {
        wx.showToast({
          title: '公司营业执照未上传',
          icon: 'success',
          duration: 2000
        })
        return
      }
      if (that.data.positive == '') {
        wx.showToast({
          title: '身份证正面未上传',
          icon: 'success',
          duration: 2000
        })
        return
      }
      if (that.data.contrary == '') {
        wx.showToast({
          title: '身份证反面未上传',
          icon: 'success',
          duration: 2000
        })
        return
      }
      var that = this;
      var formData = e.detail.value
      var imgs = []
      var img = []
      for (var i = 0; i < that.data.image.length; i++) {
        img.push(that.data.image[i].image)
      }
      imgs.push({
        title: e.detail.value.title,
        content: e.detail.value.content,
        img
      });
      console.log(imgs)
      if (!this.data.text3) {
        this.setData({
          text3: '',
        })
      }
      wx.request({
        url: that.data.link_origin + '/restapi/enterprise-info/create',
        data: {
          openid: wx.getStorageSync('user').openid,
          logo: that.data.logo,
          name: e.detail.value.company,
          username: e.detail.value.username,
          phone: e.detail.value.phone,

          company_created_at: that.data.date,

          company_scale: that.data.company_scale,
          registered_capital: e.detail.value.registered_capital,
          financing_situation: that.data.financing_situation,
          company_business: e.detail.value.company_business,
          company_city_id: e.detail.value.company_business,
          business: e.detail.value.business,
          title: e.detail.value.title,
          company_address: that.data.text12 + ',' + that.data.text22 + ',' + that.data.text3,
          content: e.detail.value.content,
          business_license: that.data.positive,
          identity_card_front: that.data.license,
          identity_card_later: that.data.contrary,
          imgs: JSON.stringify(imgs)
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        success: function (res) {
          console.log(res.data)
          wx.showToast({
            title: '提交成功',
            icon: 'succes',
            duration: 1000,
            mask: true
          })
          wx.switchTab({
            url: '../minemp/minemp',
          })
        },
        fail: function () {
          wx.showToast({
            title: '提交失败',
            icon: 'success',
            duration: 2000,
            mask: true,
          })
        }
      })
    }
    
  }
})
