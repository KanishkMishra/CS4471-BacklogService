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
					divContents.innerText = 'Looks like you have reached the 25 request limit on this API, please get a new API or subscribe to any of the premium plans at https://www.alphavantage.co/premium/ to instantly remove all daily rate limits.';
					return;
				}
				if (category == "Error Message")
				{
					divContents.innerText = 'Looks like you have used an Invalid API or Stock Symbol';
					return;
				}
          
				for (const item in json[category])
				{
					for (const key in item)
					{
		
					}
					const fragment = createBacklogTask(`<div class="stock"><h2>${category}</h2><p>Date: ${item}</p><p>Values: ${JSON.stringify(json[category][item])}</p></div>`);
					List.appendChild(fragment);
				}
			}
}

// Retrieve specific data
function getAlphaVantagedata() {

		List.replaceChildren();
    	divContents.innerText = 'Data will appear here or in devloper console';

		const symbol = inpSymbol.value;

		const time = timeInterval.value;

		let apiKey = inpApiKey.value;

		if (apiKey == '')
			apiKey = defaultapiKey;

		const url = 'https://www.alphavantage.co/query?function=' + time + '&symbol=' + symbol + '&apikey=' + apiKey;

    // get test data set
		if (apiKey == 'TEST')
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
		} else {
		requestFile( url );
		}
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

          json = JSON.parse(response);
		  
		  //divContents.innerText = response;
		  console.log( 'json', json );


		      writtenData(json);
			
	}

}