// Initialisation de la carte
var map = L.map('map').setView([46.519, 6.632], 13);

// Fond de carte OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Icônes personnalisées
var HopitalIcon = L.icon({
  iconUrl: 'Icones/Hopital.png',
  iconSize: [25, 30],
  iconAnchor: [12, 30],
  popupAnchor: [0, -30]
});

var MedecinIcon = L.icon({
  iconUrl: 'Icones/Médecin.png',
  iconSize: [25, 30],
  iconAnchor: [12, 30],
  popupAnchor: [0, -30]
});

var PharmacieIcon = L.icon({
  iconUrl: 'Icones/Pharmacie.png',
  iconSize: [25, 30],
  iconAnchor: [12, 30],
  popupAnchor: [0, -30]
});

// Fonction générique pour ajouter une couche GeoJSON
function addLayer(layerData, color, icon) {
  return L.geoJSON(layerData, {
    style: function () {
      return {
        color: color,
        weight: 1,
        opacity: 1,
        fillOpacity: 0.5
      };
    },

    pointToLayer: function (feature, latlng) {
      return L.marker(latlng, { icon: icon });
    },

    onEachFeature: function (feature, layer) {
      if (feature.properties) {
        let popupContent = "<strong>" + (feature.properties.nom || "Sans nom") + "</strong>";
        layer.bindPopup(popupContent);
      }
    }
  });
}

// Création des couches
var HopitalLayer = addLayer(Hopital, '#28a745', HopitalIcon);
var MedecinLayer = addLayer(Medecin, '#007bff', MedecinIcon);
var PharmacieLayer = addLayer(Pharmacie, '#8B4513', PharmacieIcon);

// Ajout des couches à la carte
HopitalLayer.addTo(map);
MedecinLayer.addTo(map);
PharmacieLayer.addTo(map);

// Contrôle des couches
var overlayMaps = {
  "Hôpitaux": HopitalLayer,
  "Médecins": MedecinLayer,
  "Pharmacies": PharmacieLayer
};

L.control.layers(null, overlayMaps).addTo(map);