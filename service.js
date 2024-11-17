// access api
const defaultapiKey = 'I24DBXT85LCQ72AP';
const url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=' + defaultapiKey;

// Retrieve correct data set
function retrieveData(json, time) {
      let data;
  		switch (time) {
			case "TIME_SERIES_DAILY":
				data = json["Time Series (Daily)"];
				break;
			case "TIME_SERIES_WEEKLY":
				data = json["Weekly Time Series"];
				break;
			case "TIME_SERIES_MONTHLY":
				data = json["Monthly Time Series"];
				break;
			default:
		}
    if (json.hasOwnProperty("Information"))
    {
      divContents.innerText = json["Information"];
      Data.replaceChildren();
      return;
    }
    if (json.hasOwnProperty("Error Message"))
    {
      divContents.innerText = json["Error Message"];
      Data.replaceChildren();
      return;
    }
    return data;
}

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

function getVisualData() {
    Data.replaceChildren();
    divContents.innerText = 'Data will appear here or in devloper console';

		const symbol = inpSymbol.value;

		const time = timeInterval.value;

	  let apiKey = inpApiKey.value;

	  if (apiKey == '')
		  apiKey = defaultapiKey;

	  const url = 'https://www.alphavantage.co/query?function=' + time + '&symbol=' + symbol + '&apikey=' + apiKey;
    const margin = 80;
    const width = 800;
    const height = 500;

    const svg = d3.select("#Data")
                  .append("svg")
                  .attr("width", width + 2*margin)
                  .attr("height", height + margin);
  
    fetch(url).then(response => response.json())
              .then((data) => {

		let stockValues = retrieveData(data, time);
		
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
          let minYear = d3.min(dates); 
      
          const xScale = d3.scaleTime()
                     .domain([minYear, maxYear])
                     .range([0, width]);
      
          const xAxis = d3.axisBottom(xScale);
      
          svg.append("g")
             .attr("id", "x-axis")
             .attr("transform", `translate(${margin}, ${height})`)
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
      
          // Volume axis
          let maxVol = d3.max(volume);
          let minVol = d3.min(volume);
  
          const y2Scale = d3.scaleLinear()
                           .domain([minVol, maxVol])
                           .range([0, height]);
      
          let volScale = volume.map(volume => y2Scale(volume));
          y2Scale.range([height, 0])
      
          const y2Axis = d3.axisRight(y2Scale);
          svg.append("g")
                 .attr("id", "y-axis")
                 .attr("transform", `translate(${width + margin}, 0)`)
                 .call(y2Axis);
      
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
            
          // Draw the "Volume" line
          svg.append("path")
              .datum(volScale)
              .attr("d", line)
              .attr("transform", "translate(80, 0)")
              .attr("fill", "none")
              .attr("stroke", "purple")
              .attr("stroke-width", 1.5);
    }).catch((error) => console.error(error));
}

// Retrieve specific data
function getWrittenData() {

		Data.replaceChildren();
    divContents.innerText = 'Data will appear here or in devloper console';

		const symbol = inpSymbol.value;

		const time = timeInterval.value;

		let apiKey = inpApiKey.value;

		if (apiKey == '')
			apiKey = defaultapiKey;

		const url = 'https://www.alphavantage.co/query?function=' + time + '&symbol=' + symbol + '&apikey=' + apiKey;
  
      requestFile( url );
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

          //divContents.innerText = response;
        	console.log( 'json', json );
          json = JSON.parse(response);
		      let data = retrieveData(json, timeInterval.value);
          // list data    
          for (const item in data)
          {
            const open = data[item]["1. open"];
            const high = data[item]["2. high"];
            const low = data[item]["3. low"];
            const close = data[item]["4. close"];
            const volume = data[item]["5. volume"];
            
            const fragment = createBacklogTask(`<div class="stock"><p>Date: ${item}</p><p>Values: Open - ${open}, Close - ${close}, High - ${high}, Low - ${low}, Volume - ${volume},</p></div>`);
            Data.appendChild(fragment);
          }
      }
}