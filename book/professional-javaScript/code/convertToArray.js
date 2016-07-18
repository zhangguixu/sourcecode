/*
    由于IE8及更早版本将NodeList实现为一个COM对象，因此只能手动枚举所有成员。
    其他的版本或其他浏览器，则使用Array.prototype.slice进行转换就可以
*/
function convertToArray(nodes){
    var array = null;
    try{
        array = [].prototype.slice.call(nodes,0);
    } catch (ex){
        array = [];
        for (var i = 0,len = nodes.length;i++){
            array.push(nodes[i]);
        }
    }

    return array;
}