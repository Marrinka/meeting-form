'use strict';

document.addEventListener('DOMContentLoaded', () => {
	function fillOptions(selector, k, n) {
		const items = document.querySelector(selector);
		for (let i = k; i <= n; ++i) {
			const option = document.createElement('option');
			option.value = `${i}`;
			option.textContent = i;
			items.append(option); 
		}
	}

	fillOptions('#floor', 5, 27);
	fillOptions('#room', 3, 10);

	function fillDate(dateSelector, timeStartSelector, timeEndSelector) {
		const date = document.querySelector(dateSelector),
			timeStart = document.querySelector(timeStartSelector),
			currTime = timeStart.value,
			timeEnd = document.querySelector(timeEndSelector);

		const newDate = new Date();
		let year = newDate.getFullYear();
		let month = newDate.getMonth();
		++month;
		if (month < 10) month = `0${month}`;
		let day = newDate.getDate();
		if (day < 10) day = `0${day}`;
		let hours =  newDate.getHours();
		++hours;
		let hoursEnd = hours + 1;
		if (hours < 10) hours = `0${hours}`;
		if (hoursEnd < 10) hoursEnd = `0${hoursEnd}`;
        
		date.value = `${year}-${month}-${day}`;
		timeStart.value = `${hours}:00`;
		timeEnd.value = `${hoursEnd}:00`;
	}

	function checkDate(dateSelector, timeStartSelector, timeEndSelector) {
		const date = document.querySelector(dateSelector),
			timeStart = document.querySelector(timeStartSelector),
			timeEnd = document.querySelector(timeEndSelector),
			currTime = timeStart.value,
			currDate = date.value;
		date.addEventListener('input', () => {
			console.log(date.value);
			console.log(currDate);
			if (date.value < currDate) {
				date.classList.add('wrongInfo');
			}
			else {
				date.classList.remove('wrongInfo');
			}
		});

		timeEnd.addEventListener('input', () => {
			if (timeStart.value > timeEnd.value) {
				timeEnd.classList.add('wrongInfo');
			}
			else {
				timeEnd.classList.remove('wrongInfo');
			}
		});

		timeStart.addEventListener('input', () => {
			console.log(date.value, currDate);
			console.log(currTime, timeStart.value);
			if (date.value == currDate && currTime > timeStart.value) {
				timeStart.classList.add('wrongInfo');
			}
			else {
				timeStart.classList.remove('wrongInfo');
			}
		});

	}

	function formReset(form) {
		form.reset();
		fillDate('#date', '#time-start', '#time-end');
	};


	const form = document.querySelector('.meeting-form'),
		resetButton = document.querySelector('.reset-button');

	formReset(form);
	checkDate('#date', '#time-start', '#time-end');
	resetButton.addEventListener('click', () => formReset(form));

	form.addEventListener('submit', (e) => {
		e.preventDefault();
		const formData = new FormData(form); 
		const json = JSON.stringify(Object.fromEntries(formData.entries()));
		console.log(json);
	});

	if (!localStorage.getItem('tower')) localStorage.setItem('tower', 'A');
	if (!localStorage.getItem('floor')) localStorage.setItem('floor', '3');
	if (!localStorage.getItem('room')) localStorage.setItem('room', '1');

	function formInit(towerSelector, floorSelector, roomSelector) {
		const towerChoice = document.querySelector(towerSelector),
			floorChoice = document.querySelector(floorSelector),
			roomChoice = document.querySelector(roomSelector);
		towerChoice.value = localStorage.getItem('tower');
		floorChoice.value = localStorage.getItem('floor');
		roomChoice.value = localStorage.getItem('room');   
	}

	formInit('#tower', '#floor', '#room');

	const meetingChoices = document.querySelectorAll('.meeting-room__choose select');
	meetingChoices.forEach(el => {
		el.addEventListener('input', () => {
			switch (el.getAttribute('id')) {
			case 'tower':
				localStorage.setItem('tower', el.value);
				break;
			case 'floor':
				localStorage.setItem('floor', el.value);
				break;
			case 'room':
				localStorage.setItem('room', el.value);
				break;
			}
		});
	});

	const userInfo = document.querySelectorAll('.user-info__field input');
	console.log(userInfo);
	userInfo.forEach(el => {
		el.addEventListener('input', () => {
			if (el.value.match(/[^A-Za-zА-Яа-я]/)) {
				el.classList.add('wrongInfo');
				console.log(el);
			}
			else{
				el.classList.remove('wrongInfo');
			}
		});
	});

}); 