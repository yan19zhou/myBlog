
**

function deepClone (sourceObj, targetObj) {
    let cloneObj = targetObj || {}
    if(!sourceObj || typeof sourceObj !== "object" || sourceObj.length === undefined){
        return sourceObj
    }
    if(sourceObj instanceof Array){
        cloneObj = sourceObj.concat()
    } else {
        for(let i in sourceObj){
            if (typeof sourceObj[i] === 'object') {
                cloneObj[i] = deepClone(sourceObj[i], {})
            } else {
                cloneObj[i] = sourceObj[i]
            }
        }
    }
    return cloneObj
}


