(async () => {
  const sealDiv = document.getElementById("custom-seal");
  const sealId = sealDiv.dataset.sealId;

  try {
    const res = await fetch(`https://milbet-verify.onrender.com/api/seal?seal_id=${sealId}`);
    const data = await res.json();

    if (!data || !data.status) {
      sealDiv.innerHTML = '<p style="color:red">Invalid Seal</p>';
      return;
    }

    sealDiv.innerHTML = `
      <div style="border: 1px solid #ccc; padding: 10px; width: 250px; text-align: center; border-radius: 5px; font-family: sans-serif;">
        <img src="https://milbet-verify.onrender.com/assets/seal.png" alt="Seal" style="width: 64px;">
        <p style="margin: 10px 0 5px; font-weight: bold;">${data.domain}</p>
        <p>Status: <span style="color: ${data.status === 'ACTIVE' ? 'green' : 'red'}">${data.status}</span></p>
        <a href="https://milbet-verify.onrender.com/validate?seal_id=${sealId}" target="_blank" style="font-size: 12px; color: #1e90ff">View Details</a>
      </div>
    `;
  } catch (e) {
    sealDiv.innerHTML = '<p style="color:red">Error loading seal</p>';
  }
})();