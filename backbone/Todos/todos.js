
$(function(){

	var counter = 0;

	var Item = Backbone.Model.extend({
		defaults : {
			content : '',
			index : 0
		},

		idAttribute : 'index'
	});

	var ItemList = Backbone.Collection.extend({
		model : Item
	});

	//输入框
	var InputView = Backbone.View.extend({
		el : $('#todos'),
		initialize : function(){
			_.bindAll(this,'addTodos');
			$(this.el).on('keypress',this.addTodos).val('');
		},
		addTodos : function(event){
			if(event.keyCode == '13'){
				var item = new Item();
				var content = $(this.el).val();
				if(/\S+/.test(content)){
					item.set({
						content : content,
						index : counter
					});
					counter++;
					this.collection.add(item);
				}
			}
		}
	});

	//编辑框
	var EditView = Backbone.View.extend({
		tagName : 'input',
		className : 'todosInput',
		id : 'modify',
		attributes : {
			type : 'text',
			placeholder : '代办事务'
		},

		initialize : function(){
			_.bindAll(this,'render');
		},
		render : function(){
			$(this.el).val(this.model.get('content'));
			return this;
		}
	});

	//列表单项，选择，
	var ItemView = Backbone.View.extend({
		tagName : 'li',

		initialize : function(){
			_.bindAll(this,'render');
		},
		render : function(){
			$(this.el).html('<input class="checked" type="checkbox"><span>'
			 + this.model.get('content') + '</span><div class="delete"></div>');
			return this;
		}
	});
	//列表
	var ListView = Backbone.View.extend({
		el : $('#todoList'),
		events : {
			'mouseover li' : 'showDelete',
			'mouseleave li' : 'hideDelete',
			'click .delete':'deleteItem',
			'dblclick li' : 'editing',
			'blur #modify' : 'edited'
		},

		initialize : function(){
			_.bindAll(this,'render','appendItem','deleteItem');

			this.collection.on('add',this.appendItem);
			this.render();
		},
		render : function(){
			var self = this;
			_(this.collection.models).each(function(item){
				self.appendItem(item);
			},this);
		},
		appendItem : function(item){ //添加列表项
			var itemView = new ItemView({
				model :item
			});
			$(this.el).append(itemView.render().el);
		},
		showDelete : function(event){ //展示删除按钮
			$(event.target).children('.delete').animate({opacity:1},100);
		},
		hideDelete : function(event){//隐藏删除按钮
			$(event.target).children('.delete').animate({opacity:0},100);
		},
		deleteItem : function(event){//删除列表项
			var $deleteElement = $(event.target).parent('li');
			var content = $deleteElement.children('span').html();
			var item = this.collection.findWhere({content:content});
			counter--;
			this.collection.remove(item);
			$deleteElement.remove();
		},
		editing : function(event){ //显示编辑框
			var content = '';
			var nodeName = event.target.nodeName.toLowerCase();
			var $li;
			if( nodeName === 'li'){
				content = $(event.target).children('span').html();
				$li = $(event.target);
			} else if (nodeName === 'span'){
				content = $(event.target).html();
				$li = $(event.target).parent('li');
			} else {
				return;
			}
			var item = this.collection.findWhere({content:content});
			this.editView = new EditView({
				model : item
			});
			$li.html(this.editView.render().el);
			$li.children('input').focus();
		},
		edited : function(event){ //显示编辑结果
			var content = $(event.target).val();
			if(/\S+/g.test(content)){
				this.editView.model.set({
					content : content
				});
				this.collection.add(this.editView.model,{merge:true}); //更新数据集
				var itemView = new ItemView({
					model : this.editView.model
				});
				$(event.target).parent('li').html(itemView.render().el);
			}
		}
	});

	//底部信息
	var InfoView = Backbone.View.extend({
		el : $('#itemInfo'),
		initialize : function(){
			_.bindAll(this,'render');


			this.collection.on('add',this.render);
			this.collection.on('remove',this.render);
			this.render();
		},
		render : function(){
			$('#itemInfo').html('共有' + counter + '件事');
		}
	});

	//选择全部
	var ChooseView = Backbone.View.extend({
		el : $('#chosen'),
		initialize : function(){
			_.bindAll(this,'check');

			$(this.el).on('click',this.check);
		},
		check : function(){
			if(this.el.checked){
				$('.checked').prop('checked',true);
			} else {
				$('.checked').prop('checked',false);
			}
		}
	});

	//共用数据
	var itemList = new ItemList();

	var listView = new ListView({collection:itemList});

	var inputView = new InputView({collection:itemList});

	var infoView = new InfoView({collection:itemList});

	var chooseView = new ChooseView();

});