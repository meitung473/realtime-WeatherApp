import React from "react";
import styled from "@emotion/styled";
import { useRef } from "react";
import { availableLocations } from "../../utils";

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

// ??????????????????????????????????????? fix : ???????????? utils ????????? cityName
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
        // ?????????????????????
        const locationName = inputLocationRef.current.value;
        //??????????????? ????????????????????????
        if (locations.includes(locationName)) {
            // ????????????????????????
            setcurrentCity(locationName);
            //?????????????????????
            setCurrentPage("WeatherCard");
        } else {
            alert(`??????????????????????????? ${locationName} ?????????????????????`);
            return;
        }
    };
    const handleThemeSet = (e) => {
        setCurrentThemeSetting(e.target.value);
    };
    return (
        <WeatherSettingWrapper>
            <Title>??????</Title>
            <StyledLabel>????????????</StyledLabel>
            <StyledRadioGroup>
                <StyledInputList
                    type="radio"
                    name="theme"
                    id="default"
                    onChange={handleThemeSet}
                    checked={currentThemeSetting === "on"}
                />
                <StyledLabel htmlFor="default">??????</StyledLabel>
                <StyledInputList
                    type="radio"
                    name="theme"
                    id="light"
                    value="day"
                    onChange={handleThemeSet}
                    checked={currentThemeSetting === "day"}
                />
                <StyledLabel htmlFor="light">??????</StyledLabel>

                <StyledInputList
                    type="radio"
                    name="theme"
                    id="dark"
                    value="dark"
                    onChange={handleThemeSet}
                    checked={currentThemeSetting === "dark"}
                />
                <StyledLabel htmlFor="dark">??????</StyledLabel>
            </StyledRadioGroup>
            <StyledLabel htmlFor="location">??????</StyledLabel>
            <StyledInputList
                list="location-list"
                id="location"
                name="location"
                placeholder={"????????????"}
                ref={inputLocationRef}
                defaultValue={cityName}
            />
            <datalist id="location-list">
                {/* ????????????????????????????????? option */}
                {locations.map((location) => (
                    <option value={location} key={location} />
                ))}
            </datalist>

            <ButtonGroup>
                <Back onClick={() => setCurrentPage("WeatherCard")}>??????</Back>
                <Save onClick={handleSave}>??????</Save>
            </ButtonGroup>
        </WeatherSettingWrapper>
    );
};

export default WeatherSetting;
