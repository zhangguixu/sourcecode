//作者 Peter Michaux
function isHostMethod(object,property){
    var t = typeof object[property];
    return t == 'function' || //!！进行布尔值转换
           (!!(t == 'object' && object[property])) ||
           t == 'unknown';
}