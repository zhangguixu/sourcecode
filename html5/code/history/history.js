window.onload = newgame;
window.onpopstate = popState; //处理历史记录
var state,ui;

function newgame(playagain){
	ui = {
		heading : null,
		prompt : null,
		input : null,
		low : null,
		mid : null,
		high : null
	};

	for(var id in ui){
		ui[id] = document.getElementById(id);
	}

	ui.input.onchange = handleGuess;

	state = {
		n : Math.floor(99 * Math.random()) + 1,// 0<n<100
		low : 0,
		high : 100,
		guessnum : 0,
		guess : undefined
	};

	display(state);

	if(playagain === true){
		save(state);
	}
}

function save(state){
	if(!history.pushState){
		return;
	}

	var url = '#guess' + state.guessnum;

	history.pushState(state, //要保存的状态对象
					 	'', //状态标题，当前浏览器会忽略它
						url); //状态url
}

function popState(event){
	if(event.state){ //如果事件有一个状态对象，则恢复该状态
		//要注意的是，event.state是对已保存状态对象的一个深拷贝
		state = event.state; //恢复历史状态
		display(state); //显示恢复的状态
	} else {
		//第一次载入页面，会触发一个没有状态的popstate事件
		//用真实的状态将null状态替换掉
		history.replaceState(state,'','#guess'+state.guessnum);
	}
}

function handleGuess(){
	var g = parseInt(this.value);
	if((g > state.low) && (g < state.high)){
		if(g < state.n) state.low = g;
		else if (g > state.n) state.high = g;
		state.guess = g;
		state.guessnum++;

		//保存状态
		save(state);
		display(state);
	} else {
		alert('invalible value');
	}
}

function display(state){
	ui.heading.innerHTML = document.title =
		'I am thinking of a number between ' +
		state.low + ' and ' + state.high + '.';

	ui.low.style.width = state.low + '%';
	ui.mid.style.width = (state.high - state.low) + '%';
	ui.high.style.width = (100 - state.high) + '%';

	ui.input.style.visibility = 'visible';
	ui.input.value = '';
	ui.input.focus();

	if(state.guess === undefined){
		ui.prompt.innerHTML = 'Type your guess and hit here';
	} else if (state.guess < state.n){
		ui.prompt.innerHTML = state.guess + ' is too low. Guess again';
	} else if (state.guess > state.n){
		ui.prompt.innerHTML = state.guess + ' is too high. Guess again';
	} else {
		ui.input.style.visibility = 'hidden';
		ui.heading.innerHTML = document.title = state.guess + ' is correct';
		ui.prompt.innerHTML = "<button onclick='newgame(true)'>Play Again</button>";
	}
}