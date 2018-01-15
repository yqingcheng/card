function hash(arr,k){
  var hash = {};
  var arrhash = arr.reduce(function (item, next) {
    hash[next[k]] ? '' : hash[next[k]] = true && item.push(next);
    return item
  }, [])
  return arrhash
}
export default hash