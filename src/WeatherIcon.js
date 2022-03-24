import styled from "@emotion/styled";
import { useState, useEffect, useMemo } from "react";
import { ReactComponent as DayThunderstorm } from "./images/day-thunderstorm.svg";
import { ReactComponent as DayClear } from "./images/day-clear.svg";
import { ReactComponent as DayCloudyFog } from "./images/day-cloudy-fog.svg";
import { ReactComponent as DayCloudy } from "./images/day-cloudy.svg";
import { ReactComponent as DayFog } from "./images/day-fog.svg";
import { ReactComponent as DayPartiallyClearWithRain } from "./images/day-partially-clear-with-rain.svg";
import { ReactComponent as DaySnowing } from "./images/day-snowing.svg";
import { ReactComponent as NightThunderstorm } from "./images/night-thunderstorm.svg";
import { ReactComponent as NightClear } from "./images/night-clear.svg";
import { ReactComponent as NightCloudyFog } from "./images/night-cloudy-fog.svg";
import { ReactComponent as NightCloudy } from "./images/night-cloudy.svg";
import { ReactComponent as NightFog } from "./images/night-fog.svg";
import { ReactComponent as NightPartiallyClearWithRain } from "./images/night-partially-clear-with-rain.svg";
import { ReactComponent as NightSnowing } from "./images/night-snowing.svg";

const IconContainer = styled.div`
    flex-basis: 30%;

    svg {
        max-height: 110px;
    }
`;
//代碼對應的天氣種類
const weatherTypes = {
    isThunderstorm: [15, 16, 17, 18, 21, 22, 33, 34, 35, 36, 41],
    isClear: [1],
    isCloudyFog: [25, 26, 27, 28],
    isCloudy: [2, 3, 4, 5, 6, 7],
    isFog: [24],
    isPartiallyClearWithRain: [
        8, 9, 10, 11, 12, 13, 14, 19, 20, 29, 30, 31, 32, 38, 39,
    ],
    isSnowing: [23, 37, 42],
};
//針對白天黑夜，對應天氣種類 - 載入的 svg
const weatherIcons = {
    day: {
        isThunderstorm: <DayThunderstorm />,
        isClear: <DayClear />,
        isCloudyFog: <DayCloudyFog />,
        isCloudy: <DayCloudy />,
        isFog: <DayFog />,
        isPartiallyClearWithRain: <DayPartiallyClearWithRain />,
        isSnowing: <DaySnowing />,
    },
    night: {
        isThunderstorm: <NightThunderstorm />,
        isClear: <NightClear />,
        isCloudyFog: <NightCloudyFog />,
        isCloudy: <NightCloudy />,
        isFog: <NightFog />,
        isPartiallyClearWithRain: <NightPartiallyClearWithRain />,
        isSnowing: <NightSnowing />,
    },
};

//轉換 code => type
const weatherCode2Type = (weatherCode) => {
    // 先把 weatherTypes 物件轉換成 [[key,value],[key,value]] 的陣列
    //[[isThunderstorm,[15, 16...]],[isClear,[1]]
    // weatherCodes 是一個陣列找到符合的 currentWeatherCode
    // 如果沒有就是空的，有的話會拿到 [isClrear,1] 這樣的格式
    //因為 icon 對應的是 tpye 解構只拿 weatherType
    // 如果沒抓到資料就是空的
    const [weatherType] =
        Object.entries(weatherTypes).find(([weatherType, weatherCodes]) =>
            weatherCodes.includes(Number(weatherCode))
        ) || [];

    console.log("weatherCode", weatherCode);
    console.log("weatherType", weatherType);
    return weatherType;
};

const WeatherIcon = ({ currentWeatherCode, moment }) => {
    const [currentWeatherIcon, setcurrentWeatherIcon] = useState("isClear");
    //把計算過的記起來
    const theWeatherIcon = useMemo(
        () => weatherCode2Type(currentWeatherCode),
        [currentWeatherCode]
    );
    useEffect(() => {
        setcurrentWeatherIcon(theWeatherIcon);
        console.log(theWeatherIcon);
    }, [theWeatherIcon]);

    return (
        <IconContainer>
            {weatherIcons[moment][currentWeatherIcon]}
        </IconContainer>
    );
};

export default WeatherIcon;
