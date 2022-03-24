import styled from "@emotion/styled";
import { ThemeProvider } from "@emotion/react";
import { useState, useEffect, useMemo } from "react";
import { findLocation } from "./utils";
import sunriseAndSunsetData from "./data/sunrise-sunset.json";
import WeatherSetting from "./components/WeatherSetting";
import WeatherCard from "./components/WeatherCard";
import useWeatherApi from "./useWeatherApi";
//修正 sarfari 時間格式問題
import dayjs from "dayjs";
const theme = {
    light: {
        backgroundColor: "#ededed",
        foregroundColor: "#f9f9f9",
        boxShadow: "0 1px 3px 0 #999999",
        titleColor: "#212121",
        temperatureColor: "#757575",
        textColor: "#828282",
    },
    dark: {
        backgroundColor: "#1F2022",
        foregroundColor: "#121416",
        boxShadow:
            "0 1px 4px 0 rgba(12, 12, 13, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.15)",
        titleColor: "#f9f9fa",
        temperatureColor: "#dddddd",
        textColor: "#cccccc",
    },
};

const Container = styled.div`
    background-color: ${({ theme }) => theme.backgroundColor};
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const getMoment = (locationName) => {
    //找出符合的地區
    const location = sunriseAndSunsetData.find(
        (data) => data.locationName === locationName
    );

    //找不到的話則回傳 null
    if (!location) return null;
    // 取得當前時間
    const now = dayjs();

    //將當前時間以 "2022-03-23" 的時間格式呈現
    const nowDate = Intl.DateTimeFormat("zh-TW", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    })
        .format(now)
        .replace(/\//g, "-");
    //從該地區中找到對應的日期有時間再找到符合的時間
    const locationDate =
        location.time &&
        location.time.find((time) => time.dataTime === nowDate);

    //將日出日落以及當前時間轉成時間戳記（TimeStamp）
    const sunriseTimestamp = dayjs(
        `${locationDate.dataTime} ${locationDate.sunrise}`
    ).unix();
    const sunsetTimestamp = dayjs(
        `${locationDate.dataTime} ${locationDate.sunset}`
    ).unix();

    //目前的時間
    const nowTimeStamp = now.unix();

    //若當前時間介於日出和日落中間，則表示為白天，否則為晚上
    return sunriseTimestamp <= nowTimeStamp && nowTimeStamp <= sunsetTimestamp
        ? "day"
        : "night";
};
const WeatherApp = () => {
    //主題色，預設跟著日落日出設定
    const storageTheme = localStorage.getItem("ThemeSetting");
    const [currentTheme, setCurrentTheme] = useState("light");
    // 使用者自訂色彩，on 是按照 moment 來判斷
    const [currentThemeSetting, setCurrentThemeSetting] = useState(
        storageTheme || "on"
    );
    //在設定頁還是在卡片頁
    const [currentPage, setCurrentPage] = useState("WeatherCard");

    //儲存上一次的縣市名
    const storageCity = localStorage.getItem("cityName");

    //設定 locationName ，要把設定頁面的 input 存起來
    //上一次有的就是儲存值，沒有的話預設是 臺北市
    const [currentCity, setcurrentCity] = useState(storageCity || "臺北市");
    //Location 回傳的物件
    const currentLocation = findLocation(currentCity) || {};
    // 把縣市名傳給 custom hooks
    const [weatherElement, fetchData] = useWeatherApi(currentLocation);

    // getMoment 原本是用 utils 中的 sunriseCityName，這邊的參數改成縣市了
    const moment = useMemo(
        () => getMoment(currentLocation.sunriseCityName),
        [currentLocation.sunriseCityName]
    );
    useEffect(() => {
        if (currentThemeSetting === "on") {
            setCurrentTheme(moment === "day" ? "light" : "dark");
        } else {
            setCurrentTheme(currentThemeSetting === "day" ? "light" : "dark");
        }
        // 記得把 moment 放入 dependencies 中
    }, [moment, currentThemeSetting]);

    // 如果改變 currentCity 的值就存起來
    useEffect(() => {
        localStorage.setItem("cityName", currentCity);
        localStorage.setItem("ThemeSetting", currentThemeSetting);
    }, [currentCity, currentThemeSetting]);
    return (
        <ThemeProvider theme={theme[currentTheme]}>
            <Container>
                {/* 像換頁一樣  */}
                {currentPage === "WeatherCard" && (
                    <WeatherCard
                        cityName={currentLocation.cityName}
                        weatherElement={weatherElement}
                        moment={moment}
                        fetchData={fetchData}
                        setCurrentPage={setCurrentPage}
                    />
                )}
                {currentPage === "WeatherSetting" && (
                    <WeatherSetting
                        cityName={currentLocation.cityName}
                        setcurrentCity={setcurrentCity}
                        setCurrentPage={setCurrentPage}
                        setCurrentThemeSetting={setCurrentThemeSetting}
                        currentThemeSetting={currentThemeSetting}
                    />
                )}
            </Container>
        </ThemeProvider>
    );
};

export default WeatherApp;
