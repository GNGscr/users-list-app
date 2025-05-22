import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {

  // set up graph properties
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: 'Number of Users per Country',
        data: Object.values(data),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#FF9F40',
          '#FFCD56',
          '#4B77BE',
          '#F39C12',
          '#1ABC9C',
          '#E74C3C'
        ],
        hoverOffset: 4
      }
    ]
  };

  // extra graph properties
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Users by Country',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const country = tooltipItem.label;
            const count = tooltipItem.raw;
            return `${country}: ${count} users`;
          }
        }
      }
    }
  };

  return <Pie data={chartData} options={options} />;
};

export default PieChart;
