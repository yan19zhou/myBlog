export function getTree(data) {
    /* 
        1维数组转换成树状结构
    */
    let parents = data.filter(value => value.pId == '0' || value.pId == null)// 过滤父节点
    let children = data.filter(value => value.pId !== '0' && value.pId != null)
    let translator = (parents, children) => {
        parents.forEach((parent) => {
            children.forEach((current, index) => {
                if (current.pId === parent.id) {
                    let temp = JSON.parse(JSON.stringify(children))
                    temp.splice(index, 1)
                    translator([current], temp)
                    typeof parent.children !== 'undefined' ? parent.children.push(current) : parent.children = [current]
                }
            }
            )
        }
        )
    }

    translator(parents, children)

    return parents
}