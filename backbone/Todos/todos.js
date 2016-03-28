
$(function(){

	var Item = Backbone.Model.extend({
		defaults : {
			content : '';
		}
	});

	var ItemCollection = Backbone.Model.extend({
		model : Item;
	});

	//列表单项，选择，
	var ItemView = Backbone.View.extend({

	});
	//列表
	var ListView = Back.View.extend({

	});
	//底部信息
	var InfoView = Back.View.extend({

	});

	//选择全部
	var ChooseView = Back.View.extend({

	});

})