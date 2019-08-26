function flat(arr){
    var res =[];
    for (var i=0;i<arr.length;i++){
        if (Array.isArray(arr[i])){
            res=res.concat(flat(arr[i]));
        }
        else{
            res.push(arr[i])
        }
    }
    console.log(res)
    return res
}
flat([1,[2,[3,4],5],6])
