/*
	双向链表
*/

(function(exports){

	function Node(value,pre,next){
		this.value = value || null;
		this.pre = pre || null;
		this.next = next || null;
	}

	function DoubleLinkedList(list){
		this.head = null;

		for(var i = 0, len = list.length; i < len; i++){
			this.add(list[i]);
		}
	}

	exports.DoubleLinkedList = DoubleLinkedList;

	DoubleLinkedList.prototype = {

		constructor : DoubleLinkedList,

		add : function(data){
			if(this.head === null){
				this.head = new Node(data);
				return;
			}

			var head = this.head;
			while(head.next){
				head = head.next;
			}
			head.next = new Node(data);
			head.next.pre = head;
		},

		print : function(){
			if(this.head === null)return;

			var head = this.head;
			while(head){
				console.log(head.value);
				head = head.next;
			}
		},

		reverse : function(){
			if(this.head === null)return;

			var head = this.head,
				tmp = null;

			while(head.next){ //二个值交换的问题
				tmp = head.next;
				head.next = head.pre;
				head.pre = tmp;
				head = tmp;
			}

			//最后一个节点
			tmp = head.pre;
			head.pre = head.next;
			head.next =tmp;

			this.head = head;
		}
	}

})(window);




