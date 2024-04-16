import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

const Acquisitions = () => {
  useEffect(() => {
    (async function() {
      const data = [
        { year: 2010, count: 10 },
        { year: 2011, count: 20 },
        { year: 2012, count: 15 },
        { year: 2013, count: 25 },
        { year: 2014, count: 22 },
        { year: 2015, count: 30 },
        { year: 2016, count: 28 },
      ];
    
      new Chart(
        document.getElementById('acquisitionsChart'),
        {
          type: 'line',
          data: {
            labels: data.map(row => row.year),
            datasets: [
              {
                label: 'Acquisitions by year',
                data: data.map(row => row.count)
              }
            ]
          }
        }
      );
    })();
  }, []); // Este array vazio significa que este efeito só será executado uma vez, após a montagem inicial

  return (
    <div>
      
      <canvas sm={6} id="acquisitionsChart"></canvas>
    </div>
  );
}

export default Acquisitions;
