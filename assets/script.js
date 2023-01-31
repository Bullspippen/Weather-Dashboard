let exampleResponse = [
    {
        "Version": 1,
        "Key": "55488",
        "Type": "City",
        "Rank": 21,
        "LocalizedName": "Toronto",
        "EnglishName": "Toronto",
        "PrimaryPostalCode": "M5H",
        "Region": {
            "ID": "NAM",
            "LocalizedName": "North America",
            "EnglishName": "North America"
        },
        "Country": {
            "ID": "CA",
            "LocalizedName": "Canada",
            "EnglishName": "Canada"
        },
        "AdministrativeArea": {
            "ID": "ON",
            "LocalizedName": "Ontario",
            "EnglishName": "Ontario",
            "Level": 1,
            "LocalizedType": "Province",
            "EnglishType": "Province",
            "CountryID": "CA"
        },
        "TimeZone": {
            "Code": "EST",
            "Name": "America/Toronto",
            "GmtOffset": -5,
            "IsDaylightSaving": false,
            "NextOffsetChange": "2023-03-12T07:00:00Z"
        },
        "GeoPosition": {
            "Latitude": 43.649,
            "Longitude": -79.38,
            "Elevation": {
                "Metric": {
                    "Value": 81,
                    "Unit": "m",
                    "UnitType": 5
                },
                "Imperial": {
                    "Value": 265,
                    "Unit": "ft",
                    "UnitType": 0
                }
            }
        },
        "IsAlias": false,
        "SupplementalAdminAreas": [
            {
                "Level": 2,
                "LocalizedName": "Toronto",
                "EnglishName": "Toronto"
            }
        ],
        "DataSets": [
            "AirQualityCurrentConditions",
            "AirQualityForecasts",
            "Alerts",
            "ForecastConfidence",
            "FutureRadar",
            "MinuteCast",
            "Radar"
        ]
    },
    {
        "Version": 1,
        "Key": "3392820",
        "Type": "City",
        "Rank": 85,
        "LocalizedName": "Toronto",
        "EnglishName": "Toronto",
        "PrimaryPostalCode": "C0A",
        "Region": {
            "ID": "NAM",
            "LocalizedName": "North America",
            "EnglishName": "North America"
        },
        "Country": {
            "ID": "CA",
            "LocalizedName": "Canada",
            "EnglishName": "Canada"
        },
        "AdministrativeArea": {
            "ID": "PE",
            "LocalizedName": "Prince Edward Island",
            "EnglishName": "Prince Edward Island",
            "Level": 1,
            "LocalizedType": "Province",
            "EnglishType": "Province",
            "CountryID": "CA"
        },
        "TimeZone": {
            "Code": "AST",
            "Name": "America/Halifax",
            "GmtOffset": -4,
            "IsDaylightSaving": false,
            "NextOffsetChange": "2023-03-12T06:00:00Z"
        },
        "GeoPosition": {
            "Latitude": 46.443,
            "Longitude": -63.376,
            "Elevation": {
                "Metric": {
                    "Value": 62,
                    "Unit": "m",
                    "UnitType": 5
                },
                "Imperial": {
                    "Value": 203,
                    "Unit": "ft",
                    "UnitType": 0
                }
            }
        },
        "IsAlias": false,
        "SupplementalAdminAreas": [
            {
                "Level": 2,
                "LocalizedName": "Queens",
                "EnglishName": "Queens"
            }
        ],
        "DataSets": [
            "AirQualityCurrentConditions",
            "AirQualityForecasts",
            "Alerts",
            "ForecastConfidence",
            "FutureRadar",
            "MinuteCast",
            "Radar"
        ]
    }
]

let api_key = "yoW7BrAbE8SKkAaZNkhu6Cd7oAhttmid";

let city;




function weatherSearch() {
    city = document.getElementById('chosenCity').value;

    let locationKeySearch = `http://dataservice.accuweather.com/locations/v1/cities/CA/search?q=${city}&apikey=${api_key}`

    fetchKey(locationKeySearch);
   

}

async function fetchKey(location) {
    let response = await fetch(location);
    
    if (response.status === 200) {
        let data = await response.json();
        let key = data[0].Key;

        let currentConditionSearch = `http://dataservice.accuweather.com/currentconditions/v1/${key}?&apikey=${api_key}`
        let forecastConditionSearch = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?&apikey=${api_key}`

        
        fetchCurrent(currentConditionSearch)
        fetchForecast(forecastConditionSearch)
    }
}


async function fetchCurrent(current) {
    console.log(current)
    let response = await fetch(current);
    
    console.log(response.status); // 200
    console.log(response.statusText); // OK
    
    
    if (response.status === 200) {
        let data = await response.json();

        console.log(data)

    }
}


async function fetchForecast(forecast) {
    console.log(forecast)
    let response = await fetch(forecast);
    
    console.log(response.status); // 200
    console.log(response.statusText); // OK
    
    
    if (response.status === 200) {
        let data = await response.json();

        console.log(data)

    }
}



//step 1
// get the forecast data using another fetch req -- completed but check
// create variables needed such as cityName, Temperatures, wind etc.
// assign the data from the json response to the variables
//console.log that you are getting the data
// start appending the data onto the html

//step 2
// start with styling 
