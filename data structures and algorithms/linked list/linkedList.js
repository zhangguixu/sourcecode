/*
	单向链表
*/
(function(exports){
	//定义节点
	function Node(value,next){
		this.value = value || null;
		this.next = next || null;
	}
	//定义链表
	function LinkedList(list){
		this.head = null;

		for(var i = 0, len = list.length; i < len; i++){
			this.add(list[i]);
		}

	}

	exports.LinkedList = LinkedList;

	LinkedList.prototype = {

		constructor : LinkedList,

		add : function(data){
			if(this.head === null){
				this.head = new Node(data);
				return;
			}
			var tail = this.head;
			while(tail.next){
				 tail = tail.next;
			}
			tail.next = new Node(data);
		},

		print : function(){
			if(this.head === null)return;

			var head = this.head;
			while(head){
				console.log(head.value);
				head = head.next;
			}
		},

		reverse : function(){ 	//反转链表
			if(this.head === null)return;

			var head = this.head,
				pre = null,tmp;

			while(head){
				tmp = head.next;
				head.next = pre;
				pre = head;
				head = tmp;
			}

			this.head = pre;
		},

		getMiddleNode : function(){ //当链表为偶个数节点时，会取得偏右
			if(this.head === null)return;

			var fast,slow;

			fast = slow = this.head;

			while(fast){
				if(fast.next){
					fast = fast.next.next;
					slow = slow.next;
				} else {
					break;
				}
			}
			return slow.value;
		}
	}

})(window);


