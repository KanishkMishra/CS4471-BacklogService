// access api
const defaultapiKey = 'I24DBXT85LCQ72AP';
const url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=' + defaultapiKey;

// Create backlog tasks
function createBacklogTask(htmlStr) {
    var frag = document.createDocumentFragment(),
        temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
    }
    return frag;
}

// display the json on screen in text
function writtenData(json) {
      // list data 
			for (const category in json)
			{
				if (category == "Meta Data")
					continue;
        if (category == "Information")
        {
				  divContents.innerText = 'Looks like you have reached the 25 request limit on this API, please get a new API or subscribe to any of the premium plans at https://www.alphavantage.co/premium/ to instantly remove all daily rate limits. ';
          return;
        }
          
				for (const item in json[category])
				{
					for (const key in item)
					{
		
					}
					const fragment = createBacklogTask(`<div class="stock"><h2>${category}</h2><p>Date: ${item}</p><p>Values: ${JSON.stringify(json[category][item])}</p></div>`);
					Data.appendChild(fragment);
				}
			}
}

function getVisualData() {
    Data.replaceChildren();
    divContents.innerText = 'Data will appear here or in devloper console';

		const symbol = inpSymbol.value;

		const time = timeInterval.value;

	  let apiKey = inpApiKey.value;

	  if (apiKey == '')
		  apiKey = defaultapiKey;

	  const url = 'https://www.alphavantage.co/query?function=' + time + '&symbol=' + symbol + '&apikey=' + apiKey;
    const width = 800;
    const height = 500;

    const svg = d3.select("#Data")
                  .append("svg")
                  .attr("width", width + 100)
                  .attr("height", height + 50);
    //const url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo";
    fetch(url).then(response => response.json())
              .then((data) => {

		let stockValues;
		
		switch (time) {
			case "TIME_SERIES_DAILY":
				stockValues = data["Time Series (Daily)"];
				break;
			case "TIME_SERIES_WEEKLY":
				stockValues = data["Weekly Time Series"];
				break;
			case "TIME_SERIES_MONTHLY":
				stockValues = data["Monthly Time Series"];
				break;
			default: 
		}
		
      //divContents.innerText = JSON.stringify(data);
          let dates = [];
      
      // values for that date
          let open = [];
          let high = [];
          let low = [];
          let close = [];
          let volume = [];
          for (const date in stockValues) {
            //divContents.innerText += date + " ";
            dates.push(new Date(date));
            
            open.push(+stockValues[date]["1. open"]);
            high.push(+stockValues[date]["2. high"]);
            low.push(+stockValues[date]["3. low"]);
            close.push(+stockValues[date]["4. close"]);
            volume.push(+stockValues[date]["5. volume"]);
          }
          
          // x axis
          let maxYear = d3.max(dates);
          //maxYear.setMonth(maxYear.getMonth() + 3);
          let minYear = d3.min(dates); 
      //divContents.innerText = dates;
      
          const xScale = d3.scaleTime()
                     .domain([minYear, maxYear])
                     .range([0, width]);
      
          const xAxis = d3.axisBottom(xScale);
      
          svg.append("g")
             .attr("id", "x-axis")
             .attr("transform", `translate(80, ${height})`)
             .call(xAxis);
          
          // y axis
          let maxValue = d3.max(high);
          let minValue = d3.min(low);
  
          const yScale = d3.scaleLinear()
                           .domain([minValue, maxValue])
                           .range([0, height]);
      
          let openScale = open.map(open => yScale(open));
          let highScale = high.map(high => yScale(high));
          let lowScale = low.map(low => yScale(low));
          let closeScale = close.map(close => yScale(close));
          yScale.range([height, 0])
      
          const yAxis = d3.axisLeft(yScale);
          svg.append("g")
             .attr("id", "y-axis")
             .attr("transform", "translate(80, 0)")
             .call(yAxis);
      
          // line function
          const line = d3.line()
              .x((d, i) => xScale(dates[i]))
              .y((d) => height - d);

          // Draw the "Open" line
          svg.append("path")
              .datum(openScale)
              .attr("d", line)
              .attr("transform", "translate(80, 0)")
              .attr("fill", "none")
              .attr("stroke", "Green")
              .attr("stroke-width", 1.5);
      
          // Draw the "High" line
          svg.append("path")
              .datum(highScale)
              .attr("d", line)
              .attr("transform", "translate(80, 0)")
              .attr("fill", "none")
              .attr("stroke", "steelblue")
              .attr("stroke-width", 1.5);
           
          // Draw the "Low" line
          svg.append("path")
              .datum(lowScale)
              .attr("d", line)
              .attr("transform", "translate(80, 0)")
              .attr("fill", "none")
              .attr("stroke", "skyblue")
              .attr("stroke-width", 1.5);
      
          // Draw the "High" line
          svg.append("path")
              .datum(closeScale)
              .attr("d", line)
              .attr("transform", "translate(80, 0)")
              .attr("fill", "none")
              .attr("stroke", "red")
              .attr("stroke-width", 1.5);
            

    }).catch((error) => console.error(error));
}

// Retrieve specific data
function getAlphaVantagedata() {

		Data.replaceChildren();
    divContents.innerText = 'Data will appear here or in devloper console';

		const symbol = inpSymbol.value;

		const time = timeInterval.value;

		let apiKey = inpApiKey.value;

		if (apiKey == '')
			apiKey = defaultapiKey;

		const url = 'https://www.alphavantage.co/query?function=' + time + '&symbol=' + symbol + '&apikey=' + apiKey;

    // get test data set
		/*if (apiKey == 'TEST')
    { 
			writtenData(JSON.parse(`{
			"Meta Data": {
				"1. Information": "Daily Prices (open, high, low, close) and Volumes",
				"2. Symbol": "IBM",
				"3. Last Refreshed": "2024-11-08",
				"4. Output Size": "Compact",
				"5. Time Zone": "US/Eastern"
			},
			"Time Series (Daily)": {
				"2024-11-08": {
					"1. open": "214.1600",
					"2. high": "216.7000",
					"3. low": "212.7809",
					"4. close": "213.7200",
					"5. volume": "3201038"
				}}}`)); // Test data set
    } else {*/
      requestFile( url );
    //}
	}

function requestFile( url ) {
    const xhr = new XMLHttpRequest();
		xhr.open( 'GET', url, true );
		xhr.onerror = function( xhr ) { console.log( 'error:', xhr  ); };
		xhr.onprogress = function( xhr ) { console.log( 'bytes loaded:', xhr.loaded  ); }; /// or something
		xhr.onload = callback;
		xhr.send( null );

	  function callback( xhr ) {

			  let response, json, lines;

			  response = xhr.target.response;

			  //json = JSON.parse( response );

//divContents.innerText = json;
        	console.log( 'json', json );
          json = JSON.parse(response);
		      writtenData(json);
	}
}