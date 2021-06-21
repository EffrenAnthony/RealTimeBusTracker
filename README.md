# Real Time Bus Tracker
## Description:
This project show the bustops near by fetching an API from [mbta.com](mbta.com) and show it on the map using [mapbox.com](mapbox.com) API. Also in this project you will see another functionalities like put your own markers into the map, remove them and run an animation to go through each one of them. Finally there is a last funcitonality that allows you to search a place in the map inside an input and move to that point inside the map. 
> Important: "Search a Place" function is only abailable in development mode running in your local environment
## How to run:

Clone this repo in your local environment usin

```bash
git clone https://github.com/EffrenAnthony/RealTimeBusTracker.git
```

> Important: Change API keys on the  `mapanimation.js` file for your owns to let others test this project in production. Thank you!

Go to the root of your project and open the `index.html` file in your browser.

### Intrucctions:

- If you changed your API key of mapanimation and if you're in your local project, write a place where you want to place your marker and press on "search"
- If you want to add an static marker dragg the marker to whe point and click on it, then click on add marker.
- To change from light map to dark map, change the switch to dark or light mode.
- To delete an static marker, click on that marker and press on "remove"
- To move through all you custom markers press on "Run my route"
- To move through a bustops markers, press on "Move through bus stops"

## APIs
Enter to this URLs to read the official documentation for the APIs used in this project and to get your own APIs keys
- [https://www.mapbox.com/](https://www.mapbox.com/)
- [https://positionstack.com/](https://positionstack.com/)
- [https://new.mta.info/developers](https://new.mta.info/developers)

## Roadmap of future improvements:

Some of the next functionalities that I would like to implement in this project are:

- Show bustops in every place visited
- Show autocomplete on input to search place
- Draw routes between markers
- Draw routes by Car - Plane or Bus

## Licence
[MIT](https://choosealicense.com/licenses/mit/)
> To read more about the Licence, please, click on the link above 

### Back to portfolio

<a href="https://effrenanthony.github.io/bustracker/index.html">Back to profolio</a>