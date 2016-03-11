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

		inOrderPrint : function(root){ //中序遍历
			if(root === null)return;

			if(root.left){
				this.inOrderPrint(root.left);
			}
			if(root){
				console.log(root.value);
			}
			if(root.right){
				this.inOrderPrint(root.right);
			}

		},

		print : function(choice){//pre in post
			if(this.root === null)return;

			switch (choice) {
				case 'pre':
					this.preOrderPrint(this.root);
					break;
				case 'in':
					this.inOrderPrint(this.root);
					break;
				case 'post':
					this.postOrderPrint(this.root);
					break;
				default:
					break;
			}
		}
	}

})(window);