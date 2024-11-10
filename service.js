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

// access api
const apiKey = 'I24DBXT85LCQ72AP';
const url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=' + apiKey;

// Retrieve specific data
function getAlphaVantagedata() {

		document.getElementsByClassName("List").replaceChildren();

		const symbol = inpSymbol.value;

		const url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + symbol + '&apikey=' + apiKey;

		requestFile( url );

	}

requestFile( url );

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

			  json = JSON.parse( response );
        json = JSON.parse(`{
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
        }}}`); // Test data if api not working

			let fragments = [];
      
			for (const category in json)
			{
				if (category == "Meta Data")
					continue;
          
				for (const item in json[category])
				{
					for (const key in item)
					{

					}
           		 	const fragment = createBacklogTask(`<div class="stock"><h2>${category}</h2><p>Date: ${item}</p><p>Values: ${JSON.stringify(json[category][item])}</p></div>`);
					fragments.push(fragment);
					document.body.insertBefore(fragment, document.getElementsByClassName("List")[0]);
				}
			  }
			  /*Object.entries(json).forEach(([key, value]) => {
				console.log(`${key}: ${value}`);
			  });*/

        console.log( 'json', json );
	}

}

// list data
/*var title = "STOCK ITEM";
var description = "We need some details";
var value = 1;

const fragment = createBacklogTask(`<div class="task"><h2>${title}</h2><p>Description: ${description}</p><q1>Value: ${value}</q1></div>`);

document.body.insertBefore(fragment, document.getElementsByClassName("List")[0]);*/