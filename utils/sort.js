import pinying from './pinying'
import hash from './hash'
function sort(x){
  function objToArr(obj){
    var DeliveryInfo = []
    for(var i=0;i<obj.length;i++){
      obj[i].DeliveryInfo.selfId = obj[i].id;
      obj[i].DeliveryInfo.is_top = obj[i].top;
      DeliveryInfo.push(obj[i].DeliveryInfo)
    }
    return DeliveryInfo
  }
  var s = objToArr(x)
  var arr = []
  for (let i = 0; i < s.length; i++) {
    var name = {}
    var str = s[i].name.substr(0, 1)
    name.key = pinying.makePy(str)[0]
    name.list = []
    arr.push(name)
  }
  var list = hash(arr, 'key').sort(function (a, b) {
    if (a.key > b.key) {
      return 1
    } else if (b.key > a.key) {
      return -1
    } else {
      return 0
    }
    return a.a - b.a
  })
  list.unshift({
    key: '重点用户',
    list: []
  })
  for(let i = 0; i < s.length; i++){
    if(s[i].is_top > 0){
      list[0].list.push(s.splice(i,1)[0])
      i--;
    }
  }
  var itemAll = s
  console.log(itemAll)
  for (let i = 0; i < list.length; i++) {
    for (let j = 0; j < itemAll.length; j++) {
      let nameUpperCase = pinying.makePy(itemAll[j].name.substr(0, 1))[0]
      
      if (nameUpperCase == list[i].key) {
          list[i].list.push(itemAll[j])
      }
    }
  }
  return list
  
}
export default sort