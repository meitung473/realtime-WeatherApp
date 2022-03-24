# 台灣好天氣 - 臺灣即時天氣 App  
根據 [從 Hooks 開始，讓你的網頁 React 起來](https://ithelp.ithome.com.tw/users/20103315/ironman/2668) 這系列文章製作而來的  


# 檔案架構
```
|- public
    |- appicon : PWA APP icons
    |- manifest.json : PWA 相關設定
|- src
    |- components : 組件
        |- WeatherCard
        |- WeatherIcon
        |- WeatherImage
        |- WeatherSetting
    |- data : 資料
        |- sunrise-sunset.json : 整理過的 2022-2023 年度日出日落 json 檔
        |- A-B0062-001.json : 2022-2023 年度日出日落 json 原始檔
        |- filewriter.js : 處理原始檔 => 整理檔的腳本
    |- images : 各式天氣圖片
    - WeatherApp.js 
    - App.js
    - index.js
    - service-worker.js 
    - serviceWorkerRegistration.js
    - utils.js : 查詢地點物件，對應不同 API 的查詢地點
    - useWeatherApi.js : Custom Hooks，定義 fetch 36 HR 預報與目前氣象狀況 API，回傳資料 & fetchData function  
```
# 功能
- 查詢台灣個別縣市目前天氣
- 切換不同主題
  - 預設 : 根據日落日出來顯示，日出為淺色；日落為暗黑  
  - 淺色  
  - 暗黑   
- 本地儲存上一次搜尋的縣市以及設定的主題
- 可下載至電腦桌面 或 安裝為手機應用程式(PWA)
# TODO
- [ ] 自動更新來源資料 (日出日落、可搜尋的觀測站別) 
- [ ] 氣象推播