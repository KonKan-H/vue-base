 /* function filterTree(data,id,pid,rootid){    
    let req = [];
    data.forEach((item0, index0) => {
      // console.log(item0);
        item0.children = [];
        // 获取当前层级
        let res = data.filter((item1, index1) => {
            console.log("pid"+item1[pid]);
            console.log("id"+item0[id]);
            return item1[pid] === item0[id]
        });
        if(res.length > 0){
            item0.children.addall(res);
            if(item0[pid]==rootid){
              req.push(item0);
            }
        }
        
    });
    
    return req;

}

Array.prototype.addall = function (val,callback) {
    if (val == null) return;
    var l = val.length;
    if (l != null && l > 0) {
      for (var i = 0; i < l; i++) {
        this[this.length] = val[i];
      }
    }
  } */

  function filterTree(lists, id, parentId) {
   
    var idList = {},
        treeList = [];
    for (var i = 0, len = lists.length; i < len; i++) {
        //生成一个以id为键的对象
        idList[lists[i][id]] = lists[i]
    }
    // console.log(idList);
    for (var j = 0, len1 = lists.length; j < len1; j++) {
        var aVal = lists[j];
        var aValParent = idList[aVal[parentId]];
        //如果aValParent存在；就说明当前的aVal是aValParent的孩子
        if (aValParent) {
            if ('children' in aValParent) {
                aValParent['children'].push(aVal)
            } else {
                aValParent['children'] = [];
                aValParent['children'].push(aVal)
            }
        } else {
            treeList.push(aVal)
        }
    }
	
    return treeList
}
function filterTree1(lists, id, parentId) {
   
    var idList = {},
        treeList = [];
    for (var i = 0, len = lists.length; i < len; i++) {
        //生成一个以id为键的对象
        idList[lists[i][id].slice(3)] = lists[i]
    }
    // console.log(idList);
    for (var j = 0, len1 = lists.length; j < len1; j++) {
        var aVal = lists[j];
        var aValParent = idList[aVal[parentId]];
        //如果aValParent存在；就说明当前的aVal是aValParent的孩子
        if (aValParent) {
            if ('children' in aValParent) {
                aValParent['children'].push(aVal)
            } else {
                aValParent['children'] = [];
                aValParent['children'].push(aVal)
            }
        } else {
            treeList.push(aVal)
        }
    }
	
    return treeList
}

export {
    filterTree,
    filterTree1
}