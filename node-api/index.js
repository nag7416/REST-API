const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require('./noderest.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const app = express();
const port = 3000;

app.listen(port, () => {
    console.log('running');
})

app.get('/api/v3/videos', async (req, res) => {
    try {
      const snapshot = await admin.firestore().collection('videos').get();
      const data = snapshot.docs.map(doc => doc.data());
      res.json(data);
    } catch (error) {
      console.error('Error getting data:', error);
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  });