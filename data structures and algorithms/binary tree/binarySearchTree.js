/*
	二叉查找树（BST）
*/
(function(exports){

	function Node(value,left,right){
		this.value = value || null;
		this.left = left || null;
		this.right = right || null;
	}

	function BinarySearchTree(list){
		this.root = null;

		for(var i = 0,len = list.length; i < len; i++){
			this.insert(list[i]);
		}
	}

	exports.BinarySearchTree = BinarySearchTree;

	var handler = function(root,handle){
		console.log(root.value);
		if(handle)handle(root);
	}; //节点的处理函数

	BinarySearchTree.prototype = {
		constructor : BinarySearchTree,

		insert : function(data){
			if(this.root === null){
				this.root = new Node(data);
				return;
			}

			var root = this.root,
				parent,
				isLeft;

			while(root){
				parent = root;
				if(data > root.value){
					root = root.right;
					isLeft = false;
				} else {
					root = root.left;
					isLeft = true;
				}
			}

			root = new Node(data);
			if(isLeft){
				parent.left = root;
			} else {
				parent.right = root;
			}

		},

		inOrderTraverse : function(root){ //中序遍历
			if(root === null )return;

			this.inOrderTraverse(root.left);

			handler(root);

			this.inOrderTraverse(root.right);


		},

		preOrderTraverse : function(root){//前序遍历
			if(root === null)return;

			handler(root);

			this.preOrderTraverse(root.left);

			this.preOrderTraverse(root.right);

		},

		postOrderTraverse : function(root){//后序遍历
			if(root === null)return;

			this.postOrderTraverse(root.left);

			this.postOrderTraverse(root.right);

			handler(root);

		},

		levelOrderTraverse : function(root){ //广度优先
			var queue = [];

			queue.push(root);

			while(root = queue.shift()){
				handler(root);
				if(root.left)queue.push(root.left);
				if(root.right)queue.push(root.right);
			}
		},

		print : function(choice){//pre in post
			if(this.root === null)return;

			switch (choice) {
				case 'pre':
					this.preOrderTraverse(this.root);
					break;
				case 'in':
					this.inOrderTraverse(this.root);
					break;
				case 'post':
					this.postOrderTraverse(this.root);
					break;
				case 'level':
					this.levelOrderTraverse(this.root);
					break;
				default:
					break;
			}
		}
	};

})(window);