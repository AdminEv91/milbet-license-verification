const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');

app.use(cors());

const licenses = {
  "abc123": {
    seal_id: "abc123",
    domain: "milbet.com",
    status: "ACTIVE",
    issued_at: "2025-05-24"
  }
};

app.get('/api/seal', (req, res) => {
  const { seal_id } = req.query;
  const data = licenses[seal_id];
  if (data) res.json(data);
  else res.status(404).json({ error: "Seal not found" });
});

app.get('/validate', (req, res) => {
  const { seal_id } = req.query;
  const data = licenses[seal_id];
  if (!data) {
    return res.status(404).send('<h1>Seal not found</h1>');
  }

  res.send(`
    <html><body style="font-family:sans-serif;text-align:center;padding:40px;">
      <h2>License Validation</h2>
      <p><strong>Domain:</strong> ${data.domain}</p>
      <p><strong>Status:</strong> <span style="color:green">${data.status}</span></p>
      <p><strong>Issued:</strong> ${data.issued_at}</p>
      <p>Verified by Milbet Licensing Authority</p>
    </body></html>
  `);
});

app.listen(PORT, () => console.log("Server running on port " + PORT));

