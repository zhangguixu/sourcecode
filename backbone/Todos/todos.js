
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
		},
	});
	//列表
	var ListView = Backbone.View.extend({
		el : $('#todoList'),
		events : {
			'mouseover li' : 'showDelete',
			'mouseleave li' : 'hideDelete',
			'click .delete':'deleteItem'
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
		appendItem : function(item){
			var itemView = new ItemView({
				model :item
			});
			$(this.el).append(itemView.render().el);
		},
		showDelete : function(event){
			$(event.target).children('.delete').animate({opacity:1});
		},
		hideDelete : function(event){
			$(event.target).children('.delete').animate({opacity:0});
		},
		deleteItem : function(event){
			var $deleteElement = $(event.target).parent('li');
			var content = $deleteElement.children('span').html();
			var item = this.collection.findWhere({content:content});
			counter--;
			this.collection.remove(item);
			$deleteElement.remove();
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