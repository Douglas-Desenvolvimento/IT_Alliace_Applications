const express = require('express');
const router = express.Router();

// Dados de exemplo
const services = [
    {
        serviceName: "TrustScore",
        data: [
            {
                reqid: '123',
                phone: '123456789',
                date_time: '2022-01-01',
                status: 'success',
                siteid: '5020'
            },
            {
                reqid: '456',
                phone: '987654321',
                date_time: '2022-02-01',
                status: 'success',
                siteid: '5030'
            },
            {
                reqid: '789',
                phone: '555555555',
                date_time: '2022-03-01',
                status: 'success',
                siteid: '5020'
            },
            {
                reqid: '012',
                phone: '111111111',
                date_time: '2022-04-01',
                status: 'success',
                siteid: '5040'
            }
        ]
    },
    {
        serviceName: "PreFill",
        data: [
            {
                reqid: '456',
                phone: '987654321',
                date_time: '2022-02-01',
                status: 'success',
                siteid: '5030'
            },
            {
                reqid: '789',
                phone: '555555555',
                date_time: '2022-03-01',
                status: 'success',
                siteid: '5020'
            },
            {
                reqid: '012',
                phone: '111111111',
                date_time: '2022-04-01',
                status: 'success',
                siteid: '5040'
            },
            {
                reqid: '123',
                phone: '123456789',
                date_time: '2022-01-01',
                status: 'success',
                siteid: '5020'
            }
        ]
        
    },
    {
        serviceName: "Verify",
        data: [
            {
                reqid: '789',
                phone: '555555555',
                date_time: '2022-03-01',
                status: 'success',
                siteid: '5020'
            },
            {
                reqid: '012',
                phone: '111111111',
                date_time: '2022-04-01',
                status: 'success',
                siteid: '5040'
            },
            {
                reqid: '123',
                phone: '123456789',
                date_time: '2022-01-01',
                status: 'success',
                siteid: '5020'
            },
            {
                reqid: '456',
                phone: '987654321',
                date_time: '2022-02-01',
                status: 'success',
                siteid: '5030'
            }
        ]
    },
    {
        serviceName: "Authentication",
        data: [
            {
                reqid: '012',
                phone: '111111111',
                date_time: '2022-04-01',
                status: 'success',
                siteid: '5040'
            },
            {
                reqid: '123',
                phone: '123456789',
                date_time: '2022-01-01',
                status: 'success',
                siteid: '5020'
            },
            {
                reqid: '456',
                phone: '987654321',
                date_time: '2022-02-01',
                status: 'success',
                siteid: '5030'
            },
            {
                reqid: '789',
                phone: '555555555',
                date_time: '2022-03-01',
                status: 'success',
                siteid: '5020'
            }
        ]
    },
    // Os outros serviços seguem o mesmo formato
];

// Rota para obter todos os serviços ou filtrar por serviceName
router.get('/', (req, res) => {
    const { serviceName } = req.query;
    if (serviceName) {
        const service = services.find(service => service.serviceName === serviceName);
        if (service) {
            res.json(service.data.map(entry => entry.siteid));
        } else {
            res.status(404).json({ error: 'Serviço não encontrado' });
        }
    } else {
        res.json(services);
    }
});

// Rota para filtrar os serviços por siteid no corpo da solicitação
router.post('/siteid', (req, res) => {
    const { siteid } = req.body;
    if (!siteid) {
        return res.status(400).json({ error: 'O campo siteid é obrigatório no corpo da solicitação' });
    }
    const filteredServices = services.filter(service => {
        return service.data.some(entry => entry.siteid === siteid);
    });
    const responseData = filteredServices.map(service => ({
        serviceName: service.serviceName,
        data: service.data.filter(entry => entry.siteid === siteid)
    }));
    res.json(responseData);
});

module.exports = router;
