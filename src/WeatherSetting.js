import React from "react";
import styled from "@emotion/styled";
import { useRef } from "react";
import { availableLocations } from "./utils";

const WeatherSettingWrapper = styled.div`
    position: relative;
    min-width: 360px;
    box-shadow: ${({ theme }) => theme.boxShadow};
    background-color: ${({ theme }) => theme.foregroundColor};
    box-sizing: border-box;
    padding: 20px;
`;

const Title = styled.div`
    font-size: 28px;
    color: ${({ theme }) => theme.titleColor};
    margin-bottom: 30px;
`;

const StyledLabel = styled.label`
    display: block;
    font-size: 16px;
    color: ${({ theme }) => theme.textColor};
    margin-bottom: 15px;
`;

const StyledInputList = styled.input`
    display: block;
    box-sizing: border-box;
    background: transparent;
    border: 1px solid ${({ theme }) => theme.textColor};
    outline: none;
    width: 100%;
    max-width: 100%;
    color: ${({ theme }) => theme.textColor};
    font-size: 16px;
    padding: 7px 10px;
    margin-bottom: 40px;
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    > button {
        display: flex;
        align-items: center;
        justify-content: center;
        white-space: nowrap;
        user-select: none;
        margin: 0;
        letter-spacing: 0.3px;
        line-height: 1;
        cursor: pointer;
        overflow: visible;
        text-transform: none;
        border: 1px solid transparent;
        background-color: transparent;
        height: 35px;
        width: 80px;
        border-radius: 5px;

        &:focus,
        &.focus {
            outline: 0;
            box-shadow: none;
        }

        &::-moz-focus-inner {
            padding: 0;
            border-style: none;
        }
    }
`;

const Back = styled.button`
    && {
        color: ${({ theme }) => theme.textColor};
        border-color: ${({ theme }) => theme.textColor};
    }
`;

const Save = styled.button`
    && {
        color: white;
        background-color: #40a9f3;
    }
`;
const StyledRadioGroup = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    position: relative;
    input {
        position: absolute;
        opacity: 0;
        z-index: -1;
        &:checked + label {
            background: #40a9f3;
            color: #fff;
        }
    }
    label {
        padding: 5px 0px;
        width: 50%;
        margin: 0;
        text-align: center;
        border-radius: 5px;
        color: ${({ theme }) => theme.textColor};
    }
`;
// const StyledRadio = styled.input``;
// 氣象站提供可查詢的所有縣市 fix : 這邊改成 utils 提供的 cityName
const locations = availableLocations.map((location) => location.cityName);

const WeatherSetting = ({
    cityName,
    setcurrentCity,
    setCurrentPage,
    setCurrentThemeSetting,
    currentThemeSetting,
}) => {
    const inputLocationRef = useRef(null);
    const handleSave = () => {
        // 值從輸入框來的
        const locationName = inputLocationRef.current.value;
        //輸入值包含 氣象站提供的地點
        if (locations.includes(locationName)) {
            // 設定目前的地點名
            setcurrentCity(locationName);
            //回到天氣卡頁面
            setCurrentPage("WeatherCard");
        } else {
            alert(`儲存失敗：您輸入的 ${locationName} 並非有效的地區`);
            return;
        }
    };
    const handleThemeSet = (e) => {
        setCurrentThemeSetting(e.target.value);
    };
    return (
        <WeatherSettingWrapper>
            <Title>設定</Title>
            <StyledLabel>主題設定</StyledLabel>
            <StyledRadioGroup>
                <StyledInputList
                    type="radio"
                    name="theme"
                    id="default"
                    onChange={handleThemeSet}
                    checked={currentThemeSetting === "on"}
                />
                <StyledLabel htmlFor="default">預設</StyledLabel>

                <StyledInputList
                    type="radio"
                    name="theme"
                    id="light"
                    value="day"
                    onChange={handleThemeSet}
                    checked={currentThemeSetting === "day"}
                />
                <StyledLabel htmlFor="light">淺色</StyledLabel>

                <StyledInputList
                    type="radio"
                    name="theme"
                    id="dark"
                    value="dark"
                    onChange={handleThemeSet}
                    checked={currentThemeSetting === "dark"}
                />
                <StyledLabel htmlFor="dark">暗黑</StyledLabel>
            </StyledRadioGroup>
            <StyledLabel htmlFor="location">地區</StyledLabel>
            <StyledInputList
                list="location-list"
                id="location"
                name="location"
                placeholder={"輸入縣市"}
                ref={inputLocationRef}
                defaultValue={cityName}
            />
            <datalist id="location-list">
                {/* 利用迴圈的方式跑出所有 option */}
                {locations.map((location) => (
                    <option value={location} key={location} />
                ))}
            </datalist>

            <ButtonGroup>
                <Back onClick={() => setCurrentPage("WeatherCard")}>返回</Back>
                <Save onClick={handleSave}>儲存</Save>
            </ButtonGroup>
        </WeatherSettingWrapper>
    );
};

export default WeatherSetting;
