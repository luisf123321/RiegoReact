import React, { Component, Fragment } from 'react';
import { Line } from 'react-chartjs-2';


export default function LineGraf() {
    const labels = ['ene','feb','marz','abrl','mayo','jun','julio']
        return(
            <Fragment>
                <Line 
                data={{
                    labels: labels,
                    datasets: [{
                    label: 'My First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]}}
                

                
                />
            </Fragment>
        )
    
}

