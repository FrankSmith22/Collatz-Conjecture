let m={
	stepCounter: 0,
	currentStepDisplay: null,
	showingFormula: false,
};
let v={};
let c={};

c.initialize = function(){
	v.numberField = document.querySelector('#numberField');
		v.numberField.addEventListener('keyup', c.checkInput);
	v.stepList = document.querySelector('#stepList');
}

c.collatzConjecture = function(num){
	let formula;
	if(num === 1){
		c.assignStepListeners();
	}
	else if(num % 2 === 0){
		formula = `(${num})/2`
		num /= 2;
		m.stepCounter++;
		c.appendStep(num, formula);
		c.collatzConjecture(num);
	}
	else if(num % 2 !== 0){
		formula = `3(${num})+1`
		num = (3*num)+1;
		m.stepCounter++;
		c.appendStep(num, formula);
		c.collatzConjecture(num);
	}
};

////////////////////HELPERS////////////////////

c.checkInput = function(e){
	console.log(e.target.value);
	console.log(e.keycode);
	if(e.target.value.match(/^[1-9]\d*$/) === null){
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

c.appendStep = function(num, formula){
	//ternary purely to determine positioning of result # relative to step # using nbsp
	let listItem = m.stepCounter < 10
	? `<div class="stepItem" data-formula="${formula}"><span class="stepSpan">${m.stepCounter})&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${num}</span><span class="formulaSpan">?</span></div>`
	: m.stepCounter >= 100
	? `<div class="stepItem" data-formula="${formula}"><span class="stepSpan">${m.stepCounter})&nbsp;&nbsp;${num}</span><span class="formulaSpan">?</span></div>`
	: `<div class="stepItem" data-formula="${formula}"><span class="stepSpan">${m.stepCounter})&nbsp;&nbsp;&nbsp;&nbsp;${num}</span><span class="formulaSpan">?</span></div>`
	v.stepList.innerHTML += listItem;
}

c.assignStepListeners = function(){
	v.stepItem = document.getElementsByClassName('stepItem');
	Array.from(v.stepItem).forEach((element)=>{
		element.addEventListener('mouseover', c.focusStep);
		element.addEventListener('mouseout', c.unfocusStep);
	})
	v.formulaSpan = document.getElementsByClassName('formulaSpan');
	Array.from(v.formulaSpan).forEach((element, i)=>{
		element.addEventListener('mousedown', ()=>{c.showStepFormula(i)});
	})
}

c.focusStep = function(e){
	if(e.target.className === "stepItem"){
		e.target.childNodes[1].style.opacity = 1;
		e.target.childNodes[1].style.display = 'inline';
	}
	else if(e.target.className === 'stepSpan'){
		e.target.parentNode.childNodes[1].style.opacity = 1;
		e.target.parentNode.childNodes[1].style.display = 'inline';
	}
	else{
		e.target.style.opacity = 1;
		e.target.style.display = 'inline';
	}
}

c.unfocusStep = function(e){
	if(e.target.className === "stepItem"){
		e.target.childNodes[1].style.opacity = 0;
		e.target.childNodes[1].style.display = 'none';
		
		if(m.showingFormula){
			e.target.childNodes[0].innerHTML = m.currentStepDisplay;
			m.showingFormula = false;
		}
	}
	else if(e.target.className === 'stepSpan'){
		e.target.parentNode.childNodes[1].style.opacity = 0;
		e.target.parentNode.childNodes[1].style.display = 'none';
		
		if(m.showingFormula){
			e.target.parentNode.childNodes[0].innerHTML = m.currentStepDisplay;
			m.showingFormula = false;
		}
	}
	else{
		e.target.style.opacity = 0;
		e.target.style.display = 'none';
		
		if(m.showingFormula){
			e.target.parentNode.childNodes[0].innerHTML = m.currentStepDisplay;
			m.showingFormula = false;
		}
	}
}

c.showStepFormula = function(i){
	if(m.showingFormula){return;}
	//basically preventing m.currentStepDisplay from being set to the formula 
	//due to clicking after formula already showing...
	m.showingFormula = true;
	let currentStepItem = Array.from(v.stepItem)[i];
	m.currentStepDisplay = currentStepItem.childNodes[0].innerHTML;
	currentStepItem.childNodes[0].innerHTML = currentStepItem.dataset.formula
}