/*
	将DOM结构序列化为XML或HTML字符串时
*/

function outputAttribtues(element){
    var pairs = [],
        attrName,
        attrValue,
        i,
        len;

    for(i = 0,len = element.attributes.length;i < len;i++){
       attrName = element.attributes[i].nodeName;
        attrValue = element.attributes[i].nodeValue;
         /*
            针对IE7及更早版本中存在的问题，可以利用每个属性节点的specified
            属性，如果这个属性的值为true，说明要么是在HTML中指定了相应属性
            ，要么是通过了setAttribute()方法设置了该属性。在IE中，所有未设
            置过的属性的该属性值为false。当然其他浏览器不会有问题2的存在，
            所以无需考虑(在其他浏览器，任何属性节点的specified值始终是(
            true)    
        */
        if(element.attributes[i].specified){
            pairs.push(attrName + '=\"' + attrValue + '\"');
        }
    }

    return pairs.join(' ');
}