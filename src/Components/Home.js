import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import Countries from './Countries';
import 'react-chartjs-2';

export default function Home() {

    let [totalCases, setCases] = useState(0);
    let [totalRecovered, setRecoveredCases] = useState(0);
    let [totalDeaths, setDeaths] = useState(0);
    let [UserCountry, setUserCountry] = useState("World Wide Corona Report");

    const GetData = () => {
        let country = document.getElementById('Input_CountryName').value;

        if (country.trim().length != 0) {
            axios.get('https://covid19.mathdro.id/api/countries/' + country, { crossdomain: true })
                .then(function (response) {
                    setCases(response.data.confirmed.value);
                    setRecoveredCases(response.data.recovered.value);
                    setDeaths(response.data.deaths.value);
                    setUserCountry("COVID 19 Report Of "+country);
                }).catch()
        }
        else {
            axios.get('https://covid19.mathdro.id/api/countries/' + UserCountry, { crossdomain: true })
                .then(function (response) {
                    setCases(response.data.confirmed.value);
                    setRecoveredCases(response.data.recovered.value);
                    setDeaths(response.data.deaths.value);
                }).catch()
        }
    }

    function FormatCases(num, digits) {
        const lookup = [
            { value: 1, symbol: "" },
            { value: 1e3, symbol: "k" },
            { value: 1e6, symbol: "M" },
            { value: 1e9, symbol: "G" },
            { value: 1e12, symbol: "T" },
            { value: 1e15, symbol: "P" },
            { value: 1e18, symbol: "E" }
        ];
        const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
        var item = lookup.slice().reverse().find(function (item) {
            return num >= item.value;
        });
        return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
    }

    return (
        <div>
            <h1 className={'tc tw mt'} style={{ textTransform: 'uppercase' }}>{UserCountry}</h1>
            {/* <input type={'text'} id={'Input_CountryName'} onChange={GetData} /> */}

            <div className={'center'}>
                <div className="flex-container">
                    <div><h1>Total Cases: {FormatCases(totalCases)}</h1></div>
                    <div><h1>Recovered: {FormatCases(totalRecovered)}</h1></div>
                    <div><h1>Deaths: {FormatCases(totalDeaths)}</h1></div>
                </div>
            </div>

            <div className={'container'}>
                <div className={'center mt-10'}>
                    <select id={'Input_CountryName'} onChange={GetData}>
                        <Countries />
                    </select>
                </div>
            </div>
        </div>
    )
}
