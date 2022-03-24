import { useState, useEffect, useCallback } from "react";

const fetchCurrentWeather = (locationName) => {
    return fetch(
        `https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWB-94279C62-C53E-418E-AB86-911169CFE5AF&locationName=${locationName}`
    )
        .then((res) => res.json())
        .then((data) => {
            const locationData = data.records.location[0];
            // 把 weatherElement 加到新物件
            //濕度、溫度、風
            const weatherElements = locationData.weatherElement.reduce(
                (neededElements, item) => {
                    if (["WDSD", "TEMP", "HUMD"].includes(item.elementName)) {
                        neededElements[item.elementName] = item.elementValue;
                    }
                    return neededElements;
                },
                {}
            );
            return {
                observationTime: locationData.time.obsTime,
                locationName: locationData.locationName,
                temperature: weatherElements.TEMP,
                windSpeed: weatherElements.WDSD,
                humid: weatherElements.HUMD,
            };
        });
};

const fetchWeatherForecast = (cityName) => {
    return fetch(
        `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-94279C62-C53E-418E-AB86-911169CFE5AF&locationName=${cityName}`
    )
        .then((res) => res.json())
        .then((data) => {
            const locationData = data.records.location[0];
            const weatherElements = locationData.weatherElement.reduce(
                (neededElements, item) => {
                    // 天氣現象、降雨機率、舒適度
                    if (["Wx", "PoP", "CI"].includes(item.elementName)) {
                        neededElements[item.elementName] =
                            item.time[0].parameter;
                    }
                    return neededElements;
                },
                {}
            );
            return {
                description: weatherElements.Wx.parameterName,
                weatherCode: weatherElements.Wx.parameterValue,
                rainPossibility: weatherElements.PoP.parameterName,
                comfortability: weatherElements.CI.parameterName,
            };
        });
};

const useWeatherApi = (currentLocation) => {
    const { locationName, cityName } = currentLocation;
    const [weatherElement, setweatherElement] = useState({
        observationTime: new Date(),
        humid: 0,
        temperature: 0,
        windSpeed: 0,
        description: "",
        weatherCode: 0,
        rainPossibility: 0,
        comfortability: "",
        isLoading: true,
    });
    const fetchData = useCallback(() => {
        const fetchingData = async () => {
            const [currentWeather, WeatherForecast] = await Promise.all([
                fetchCurrentWeather(locationName),
                fetchWeatherForecast(cityName),
            ]);

            setweatherElement({
                ...currentWeather,
                ...WeatherForecast,
                isLoading: false,
            });
        };
        //點擊後 isLoading= true
        setweatherElement((preState) => ({
            ...preState,
            isLoading: true,
        }));
        fetchingData();
    }, [locationName, cityName]);
    //日夜

    // API
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return [weatherElement, fetchData];
};
export default useWeatherApi;
