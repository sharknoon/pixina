//Importing Line class from the vue-chartjs wrapper
import { Line } from 'vue-chartjs'

//Exporting this so it can be used in other components
export default {
    extends: Line,
    data() {
        return {

            datacollection: {
                //Data to be represented on x-axis
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',],
                datasets: [
                    {
                        label: 'Josua Frank',
                        fill: false,

                        backgroundColor: 'rgba(247, 185, 36, 0.2)',
                        borderColor: 'gold',
                        borderWidth: 4,
                        pointBorderColor: 'gold',
                        pointBorderWidth: 5,
                        pointHoverRadius: 6,
                        pointHoverBackgroundColor: '#ffffff',
                        pointHoverBorderColor: 'gold',
                        pointHoverBorderWidth: 2,
                        pointRadius: 4,
                        pointHitRadius: 10,
                        data: [65, 59, 80, 81, 46, 55, 38, 59, 80,]
                    },
                    {
                        label: 'Marie-Rose Frank',
                        fill: false,

                        backgroundColor: 'rgba(247, 185, 36, 0.2)',
                        borderColor: 'silver',
                        borderWidth: 4,
                        pointBorderColor: 'silver',
                        pointBorderWidth: 5,
                        pointHoverRadius: 6,
                        pointHoverBackgroundColor: '#ffffff',
                        pointHoverBorderColor: 'silver',
                        pointHoverBorderWidth: 2,
                        pointRadius: 4,
                        pointHitRadius: 10,
                        data: [46, 55, 59, 80, 81, 38, 65, 59, 80,]
                    },
                    {
                        label: 'Midrène Guhl',
                        fill: false,

                        backgroundColor: 'rgba(247, 185, 36, 0.2)',
                        borderColor: '#F7B924',
                        borderWidth: 4,
                        pointBorderColor: '#F7B924',
                        pointBorderWidth: 5,
                        pointHoverRadius: 6,
                        pointHoverBackgroundColor: '#ffffff',
                        pointHoverBorderColor: '#F7B924',
                        pointHoverBorderWidth: 2,
                        pointRadius: 4,
                        pointHitRadius: 10,
                        data: [70,49,64,39,80,79,60,54,50]
                    },
                ]
            },
            //Chart.js options that controls the appearance of the chart
            options: {
                layout: {
                    padding: {
                        left: 0,
                        right: 8,
                        top: 0,
                        bottom: 0
                    }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            display: false,
                            beginAtZero: true
                        },
                        gridLines: {
                            display: false
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            display: false
                        },
                        gridLines: {
                            display: false
                        }
                    }]
                },
                legend: {
                    display: false
                },
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
    mounted() {
        //renderChart function renders the chart with the datacollection and options object.
        this.renderChart(this.datacollection, this.options)
    }
}