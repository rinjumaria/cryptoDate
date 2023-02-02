import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export function formatDate(date: string) {
  const formattedDate =new Date( Date.parse(date));
 return formattedDate.toDateString();
}  

const CoinPage = () => {
  const {state} = useLocation();
const {symbol,high,low,volume,quoteVolume,percentChange,updatedAt} = state;

console.log("symbol"+symbol);


  return (
    <div>
       <div className="coin">
         <h1> Name: {symbol}</h1>
         <h3> Highest Rate: {high}</h3>
         <h3> Lowest Rate: {low}</h3>
         <h3> Volume: {volume}</h3>
         <h3> Quote Volume: {quoteVolume}</h3>
         <h3> Percentage Change: {percentChange}%</h3>
         <h3> Last Updated: {formatDate(updatedAt)}</h3>
        </div>
    </div>
  )
}

export default CoinPage
