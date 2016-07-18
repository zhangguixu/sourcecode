//非IE
function hasPlugin(name){
    name = name.toLowerCase();
    var plugins = navigator.plugins,
        i,
        len = plugins.length;

    for (i = 0;i < len;i++){
        if(plugins[i].name.toLowerCase().indexOf(name) > -1){
            return true;
        }
    }

    return false;
}

//检测IE中的插件
function hasIEPlugin(name){
    try{
        new ActiveXObject(name);
        return true;
    } catch (ex){
        return false;
    }
}

//检测所有浏览器中的Flash
function hasFlash(){
    var result = hasPlugin('Flash'); //在IE中返回false len=0
    if(!result){
        result = hasIEPlugin('ShockwaveFlash.ShockwaveFlash');
    }
    return result;
}