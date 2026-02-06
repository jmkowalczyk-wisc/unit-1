// Initialize function, called later when the document object model loads
function initialize(){
	citiesTable();
	ajaxGeoJSON();
};

// Function to create table of cities
function citiesTable(){
	// Defining array of objects for city names and populations
	var cityPop = [
		{city: 'Madison', population: 233209},
		{city: 'Milwaukee', population: 594833},
		{city: 'Green Bay', population: 104057},
		{city: 'Superior', population: 27244}
	];

	// Create a table element
	var table = document.createElement("table");

	// Add header row, append it to the table, and add column headers "City" and "Population"
	var headerRow = document.createElement("tr");
	table.appendChild(headerRow);
	headerRow.insertAdjacentHTML('beforeend', '<th>City</th><th>Population</th>');

	// For every object in cityPop, create a new row and add it to the table
	cityPop.forEach(function(cityObject){
		var rowHtml = '<tr><td>' + cityObject.city + '</td><td>' + cityObject.population + '</td></tr>';
		table.insertAdjacentHTML('beforeend', rowHtml);
	});

	// Adds a div with class "tableDiv" to the html body to contain the table
	document.body.insertAdjacentHTML('beforeend', '<div id="table"></div>');

	// Activity 4 - Adding a div to contain the GeoJSON data
	document.body.insertAdjacentHTML('beforeend', '<div id="a4geojson"></div>');

	// Append the table to the div "#table". In order for this to work, there must be a div with id "table" in the HTML file.
	document.querySelector("#table").appendChild(table);

	// Call the functions to add columns and events. They need to be called inside citiesTable() to be in the same scope as cityPop.
	addColumns(cityPop);
	addEvents();
};

// Function to add a City Size column
function addColumns(cityPop){
	// Select each table row tag and add new text to the end for City Size
	document.querySelectorAll("tr").forEach(function(row, i){
		// i is iterated for each row, add a header if i = 0, otherwise continue to determine city size
		if (i == 0){
			row.insertAdjacentHTML('beforeend', '<th>City Size</th>');
		} else {
			// Initialize citySize variable, then set its value based on each object's population value
			// index i-1 is used to match the cityPop array, since we use i = 0 in the forEach loop for the header row
			var citySize;
			if (cityPop[i-1].population < 100000){
				citySize = 'Small';
			} else if (cityPop[i-1].population < 500000){
				citySize = 'Medium';
			} else {
				citySize = 'Large';
			};
			// Add the citySize value to the end of the current row
			row.insertAdjacentHTML('beforeend', '<td>' + citySize + '</td>');
		};
	});	
};

function addEvents() {
	// Select the table object and add a mouseover event listener to change the text color to a random color
	document.querySelector("table").addEventListener("mouseover", function(){
		// Initialize color variable, the rest of the string is added in the following loop
		var color = "rgb(";
		// Generates a random number between 0-255 three times for R, G, and B values
		for (var i=0; i<3; i++){
			var random = Math.round(Math.random() * 255);
			color += random;
			// If not the last value, add a comma, else close the rgb() string
			if (i<2){
				color += ",";
			} else {
				color += ")";
		}};
		// Select the table and change its text color to the randomly generated color
		document.querySelector("table").style.color = color;
	});

	// Add a click event listener to the table to display an alert
	function clickme(){
		alert('Hey, you clicked me!');
	};

	// Select the table and add the click event listener with the clickme function
	document.querySelector("table").addEventListener("click", clickme)
};

	// Start Activity 4 - Debugging AJAX
function ajaxGeoJSON() {
	function debugCallback(response){
		document.querySelector("#a4geojson").insertAdjacentHTML('beforeend', 'GeoJSON data: ' + JSON.stringify(myData))
	};

	function debugAjax(){
		
		var myData;
		
		fetch("data/MegaCities.geojson")
			.then(function(response){
				debugCallback(response);
			})

		document.querySelector("#a4geojson").insertAdjacentHTML('beforeend', '<br>GeoJSON data:<br>' + JSON.stringify(myData))
	};

	document.querySelector("#a4geojson").insertAdjacentHTML('beforeend', 'GeoJSON data: ' + JSON.stringify(myData))
}


// Call the initialize function when the document loads
document.addEventListener('DOMContentLoaded', initialize);