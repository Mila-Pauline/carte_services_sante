var map = L.map('map').setView([46.5197, 6.6323], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19
}).addTo(map);

fetch('services.csv')
  .then(response => response.text())
  .then(text => {
    const rows = text.split('\n').slice(1);
    rows.forEach(row => {
      const [nom, lat, lon, adresse, type] = row.split(',');

      if (!lat || !lon) return;

      L.marker([parseFloat(lat), parseFloat(lon)])
        .addTo(map)
        .bindPopup(`<b>${nom}</b><br>${adresse}<br>${type}`);
    });
  });
fetch('Secteur_Lausanne.geojson')
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      style: {
        color: 'red',
        weight: 3,
        fillOpacity: 0
      }
    }).addTo(map);

 // Zoom automatique sur le polygone
    map.fitBounds(polygone.getBounds());
  })
  .catch(err => console.error("Erreur chargement GeoJSON :", err));
