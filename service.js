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
const url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=1min&apikey=' + apiKey;

// Retrieve specific data
function getAlphaVantagedata() {

		const symbol = inpSymbol.value;

		const url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=' + symbol + '&interval=1min&apikey=' + apiKey;

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
			  divContents.innerText = response;

			  json = JSON.parse( response );

        console.log( 'json', json );
	}

}

// list data
var title = "STOCK ITEM";
var description = "We need some details";
var value = 1;

const fragment = createBacklogTask(`<div class="task"><h2>${title}</h2><p>Description: ${description}</p><q1>Value: ${value}</q1></div>`);

document.body.insertBefore(fragment, document.getElementsByClassName("List")[0]);