import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

// Endpoint to fetch station data
router.get('/stations', async (req, res) => {
    try {
        const response = await fetch('https://transport.integration.sl.se/v1/sites');
        if (!response.ok) {
            throw new Error(`SL API responded with status: ${response.status}`);
        }
        const data = await response.json();

        if (!data || !Array.isArray(data)) {
            throw new Error('Invalid data format received from SL API');
        }

        res.json(data);
    } catch (error) {
        console.error('Error fetching stations:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to calculate travel time between two stations
router.get('/travel', async (req, res) => {
    const { origin, destination } = req.query;

    if (!origin || !destination) {
        return res.status(400).json({ error: 'Both origin and destination are required.' });
    }

    try {
        const response = await fetch(`https://transport.integration.sl.se/v1/sites/${origin}/departures`);
        if (!response.ok) {
            throw new Error(`SL API responded with status: ${response.status}`);
        }

        const data = await response.json();

        if (!data) {
            throw new Error('No travel data received from SL API');
        }

        // Assuming we filter or process the travel data here to calculate the time
        const filteredData = data.filter(
            (item) => item.siteId === destination // Example: Adjust this condition based on actual API data structure
        );

        res.json(filteredData);
    } catch (error) {
        console.error('Error fetching travel data:', error.message);
        res.status(500).json({ error: error.message });
    }
});

export default router;
