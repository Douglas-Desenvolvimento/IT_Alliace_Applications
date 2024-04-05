const express = require('express');
const router = express.Router();

const allservices = {
  "5020": [
   {
      "Total Requests": {
        "total_requests": 100,
        "period": "Dez/2023"
      },
      "TrusScore": {
        "total_requests": 150,
        "period": "Dez/2023"
      },
      "PreFill": {
        "total_requests": 200,
        "period": "Dez/2023"
      },
      "Verify": {
        "total_requests": 120,
        "period": "Dez/2023"
      },
      "Authentication": {
        "total_requests": 80,
        "period": "Dez/2023"
      }
    },
    {
      "Total Requests": {
        "total_requests": 100,
        "period": "Jan/2024"
      },
      "TrusScore": {
        "total_requests": 150,
        "period": "Jan/2024"
      },
      "PreFill": {
        "total_requests": 200,
        "period": "Jan/2024"
      },
      "Verify": {
        "total_requests": 120,
        "period": "Jan/2024"
      },
      "Authentication": {
        "total_requests": 80,
        "period": "Jan/2024"
      }
    },
    {
      "Total Requests": {
        "total_requests": 200,
        "period": "Feb/2024"
      },
      "TrusScore": {
        "total_requests": 250,
        "period": "Feb/2024"
      },
      "PreFill": {
        "total_requests": 300,
        "period": "Feb/2024"
      },
      "Verify": {
        "total_requests": 220,
        "period": "Feb/2024"
      },
      "Authentication": {
        "total_requests": 180,
        "period": "Feb/2024"
      }
    },
    {
      "Total Requests": {
        "total_requests": 96,
        "period": "Mar/2024"
      },
      "TrusScore": {
        "total_requests": 43,
        "period": "Mar/2024"
      },
      "PreFill": {
        "total_requests": 59,
        "period": "Mar/2024"
      },
      "Verify": {
        "total_requests": 66,
        "period": "Mar/2024"
      },
      "Authentication": {
        "total_requests": 168,
        "period": "Mar/2024"
      }
    }
  ],
  "5030": [
    {
      "Total Requests": {
        "total_requests": 100,
        "period": "Dez/2023"
      },
      "TrusScore": {
        "total_requests": 150,
        "period": "Dez/2023"
      },
      "PreFill": {
        "total_requests": 200,
        "period": "Dez/2023"
      },
      "Verify": {
        "total_requests": 120,
        "period": "Dez/2023"
      },
      "Authentication": {
        "total_requests": 80,
        "period": "Dez/2023"
      }
    },
    {
      "Total Requests": {
        "total_requests": 100,
        "period": "Jan/2024"
      },
      "TrusScore": {
        "total_requests": 150,
        "period": "Jan/2024"
      },
      "PreFill": {
        "total_requests": 200,
        "period": "Jan/2024"
      },
      "Verify": {
        "total_requests": 120,
        "period": "Jan/2024"
      },
      "Authentication": {
        "total_requests": 80,
        "period": "Jan/2024"
      }
    },
    {
      "Total Requests": {
        "total_requests": 200,
        "period": "Feb/2024"
      },
      "TrusScore": {
        "total_requests": 250,
        "period": "Feb/2024"
      },
      "PreFill": {
        "total_requests": 300,
        "period": "Feb/2024"
      },
      "Verify": {
        "total_requests": 220,
        "period": "Feb/2024"
      },
      "Authentication": {
        "total_requests": 180,
        "period": "Feb/2024"
      }
    },
    {
      "Total Requests": {
        "total_requests": 82,
        "period": "Mar/2024"
      },
      "TrusScore": {
        "total_requests": 98,
        "period": "Mar/2024"
      },
      "PreFill": {
        "total_requests": 173,
        "period": "Mar/2024"
      },
      "Verify": {
        "total_requests": 158,
        "period": "Mar/2024"
      },
      "Authentication": {
        "total_requests": 114,
        "period": "Mar/2024"
      }
    }
  ],
  "5040": [
    {
      "Total Requests": {
        "total_requests": 100,
        "period": "Dez/2023"
      },
      "TrusScore": {
        "total_requests": 150,
        "period": "Dez/2023"
      },
      "PreFill": {
        "total_requests": 200,
        "period": "Dez/2023"
      },
      "Verify": {
        "total_requests": 120,
        "period": "Dez/2023"
      },
      "Authentication": {
        "total_requests": 80,
        "period": "Dez/2023"
      }
    },
    {
      "Total Requests": {
        "total_requests": 100,
        "period": "Jan/2024"
      },
      "TrusScore": {
        "total_requests": 150,
        "period": "Jan/2024"
      },
      "PreFill": {
        "total_requests": 200,
        "period": "Jan/2024"
      },
      "Verify": {
        "total_requests": 120,
        "period": "Jan/2024"
      },
      "Authentication": {
        "total_requests": 80,
        "period": "Jan/2024"
      }
    },
    {
      "Total Requests": {
        "total_requests": 200,
        "period": "Feb/2024"
      },
      "TrusScore": {
        "total_requests": 250,
        "period": "Feb/2024"
      },
      "PreFill": {
        "total_requests": 300,
        "period": "Feb/2024"
      },
      "Verify": {
        "total_requests": 220,
        "period": "Feb/2024"
      },
      "Authentication": {
        "total_requests": 180,
        "period": "Feb/2024"
      }
    },
    {
      "Total Requests": {
        "total_requests": 187,
        "period": "Mar/2024"
      },
      "TrusScore": {
        "total_requests": 112,
        "period": "Mar/2024"
      },
      "PreFill": {
        "total_requests": 165,
        "period": "Mar/2024"
      },
      "Verify": {
        "total_requests": 95,
        "period": "Mar/2024"
      },
      "Authentication": {
        "total_requests": 120,
        "period": "Mar/2024"
      }
    }
  ],

  
};

router.get('/', (req, res) => {
  const { siteid, period } = req.query;

  if (siteid && allservices[siteid]) {
    // Verifica se o parâmetro de período foi fornecido
    if (period) {
      // Filtra os dados pelo período especificado
      const filteredData = allservices[siteid].filter(item => item["Total Requests"].period === period);
      res.json({ [siteid]: filteredData });
    } else {
      // Retorna todos os itens para o siteid fornecido
      res.json({ [siteid]: allservices[siteid] });
    }
  } else {
    // Se o siteid não for fornecido ou não existir, retorna o primeiro siteid com todos os dados
    const firstSiteId = Object.keys(allservices)[0];
    res.json({ [firstSiteId]: allservices[firstSiteId] });
  }
});



module.exports = {allservices, router};
