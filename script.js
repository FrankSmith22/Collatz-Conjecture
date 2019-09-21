let m={
	stepCounter: 0,
};
let v={};
let c={};

c.initialize = function(){
	v.numberField = document.querySelector('#numberField');
		v.numberField.addEventListener('keyup', c.checkInput);
	v.stepList = document.querySelector('#stepList');
}

c.collatzConjecture = function(num){
	if(num === 1){
		console.log(`Done! num: ${num} in ${m.stepCounter} steps.`);
		c.assignStepListeners();
		return num;
	}
	else if(num % 2 === 0){
		num /= 2;
		console.log(num);
		m.stepCounter++;
		c.appendStep(num);
		c.collatzConjecture(num);
	}
	else if(num % 2 !== 0){
		num = (3*num)+1;
		console.log(num);
		m.stepCounter++;
		c.appendStep(num);
		c.collatzConjecture(num);
	}
};

////////////////////HELPERS////////////////////

c.checkInput = function(e){
	console.log(e.target.value);
	console.log(e.keycode);
	if(e.target.value.match(/^[1-9]\d*$/) == null){
		//successfully checking for non- positive whole numbers!
		//yell at user to use required number type
		console.log('number must be a positive whole number')
	}
	else if(e.which == 13 || e.keyCode == 13){
		v.stepList.innerHTML = '';
		m.stepCounter = 0;
		c.collatzConjecture(e.target.value);
	}
}

c.appendStep = function(num){
	//ternary purely to determine positioning of numbers using nbsp
	let listItem = m.stepCounter < 10
	? `<div class="stepItem"><span class="stepSpan">${m.stepCounter})&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${num}</span><span class="formulaSpan">?</span></div>`
	: m.stepCounter >= 100
	? `<div class="stepItem"><span class="stepSpan">${m.stepCounter})&nbsp;&nbsp;${num}</span><span class="formulaSpan">?</span></div>`
	: `<div class="stepItem"><span class="stepSpan">${m.stepCounter})&nbsp;&nbsp;&nbsp;&nbsp;${num}</span><span class="formulaSpan">?</span></div>`
	v.stepList.innerHTML += listItem;
}

c.assignStepListeners = function(){
	v.stepItem = document.getElementsByClassName('stepItem');
	Array.from(v.stepItem).forEach((element)=>{
		element.addEventListener('mouseover', c.showQMark);
		element.addEventListener('mouseout', c.hideQMark);
	})
}

c.showQMark = function(e){
	if(e.target.className === "stepItem"){
		e.target.childNodes[1].style.opacity = 1;
	}
	else if(e.target.className === 'stepSpan'){
		e.target.parentNode.childNodes[1].style.opacity = 1;
	}
	else{
		e.target.style.opacity = 1;
	}
}

c.hideQMark = function(e){
	if(e.target.className === "stepItem"){
		e.target.childNodes[1].style.opacity = 0;
	}
	else if(e.target.className === 'stepSpan'){
		e.target.parentNode.childNodes[1].style.opacity = 0;
	}
	else{
		e.target.style.opacity = 0;
	}
}