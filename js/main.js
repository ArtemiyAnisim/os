document.getElementById('depositForm').addEventListener('submit', function(event) {
	event.preventDefault();

	var depositAmount = parseFloat(document.getElementById('depositAmount').value);
	var interestRate = parseFloat(document.getElementById('interestRate').value);
	var years = parseFloat(document.getElementById('years').value);

	var totalAmount = depositAmount * Math.pow(1 + (interestRate / 100), years);
	totalAmount = totalAmount.toFixed(2);

	document.getElementById('result').innerHTML = "Сумма через " + years + " год(а): " + totalAmount + " рублей";
});

document.getElementById('depositForm').addEventListener('submit', function(event) {
	event.preventDefault();

	var depositAmount = parseFloat(document.getElementById('depositAmount').value);
	var interestRate = parseFloat(document.getElementById('interestRate').value);
	var years = parseFloat(document.getElementById('years').value);

	var ctx = document.getElementById('chart').getContext('2d');
	var chart = new Chart(ctx, {
		 type: 'line',
		 data: {
			  labels: Array.from({ length: years }, (_, i) => i + 1),
			  datasets: [{
					label: 'Сумма вклада по годам',
					data: calculateDepositByYear(depositAmount, interestRate, years),
					backgroundColor: 'rgba(0, 123, 255, 0.2)',
					borderColor: 'rgba(0, 123, 255, 1)',
					borderWidth: 1
			  }]
		 },
		 options: {
			  scales: {
					yAxes: [{
						 ticks: {
							  beginAtZero: true
						 }
					}]
			  }
		 }
	});

	var totalAmount = calculateDepositTotal(depositAmount, interestRate, years);
	totalAmount = totalAmount.toFixed(2);

	document.getElementById('result').innerHTML = "Сумма через " + years + " год(а): " + totalAmount + " рублей";
});

function calculateDepositByYear(depositAmount, interestRate, years) {
	var depositByYear = [];
	for (var i = 1; i <= years; i++) {
		 depositByYear.push(depositAmount * Math.pow(1 + (interestRate / 100), i));
	}
	return depositByYear;
}

function calculateDepositTotal(depositAmount, interestRate, years) {
	return depositAmount * Math.pow(1 + (interestRate / 100), years);
}
