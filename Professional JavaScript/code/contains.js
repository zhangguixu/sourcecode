/*
	检测某个节点是否是另一个节点的后代
*/
function contains(refNode,otherNode){
    if(typoef refNode.contains === 'function' &&
     (!client.engine.webkit || client.engine.webkit >= 522)){ 
     	/*
			这一部分代码还检查了当前浏览器所用的WebKit 版本号。如果方法存在而且不是WebKit
			（!client.engine.webkit），则继续执行代码。否则，如果浏览器是WebKit 且至少是Safari 3（WebKit
			版本号为522 或更高），那么也可以继续执行代码	
     	*/

        return refNode.contains(otherNode);
     } else if (typeof refNode.compareDocumentPosition === 'function'){
        return !!(refNode.compareDocumentPosition(otherNode) & 16);
     } else {
        var node = otherNode.parentNode;
        do{
            if (node === refNode){
                return true;
            } else {
                node = node.parentNode;
            }
        } while (node !== null);
        
        return false;
     }
}