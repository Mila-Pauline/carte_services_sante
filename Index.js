// Initialisation de la carte
var map = L.map('map').setView([46.519, 6.632], 13);

// Fond de carte OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Définir des icônes personnalisées pour chaque type de zone
var PharmacieIcon = L.icon({
  iconUrl: 'Icones/Pharmacie.png',
  iconSize: [15, 20], 
  iconAnchor: [14, 40], 
  popupAnchor: [0, -40]
});

var MedecinIcon = L.icon({
  iconUrl: 'Icones/Medecin.png',
  iconSize: [15, 20],
  iconAnchor: [14, 40],
  popupAnchor: [0, -40]
});

var UrgenceIcon = L.icon({
  iconUrl: 'Icones/Urgence.png', 
  iconSize: [15, 20],
  iconAnchor: [14, 40],
  popupAnchor: [0, -40]
});

// Fonction pour ajouter une couche GeoJSON et configurer les popups
function addLayer(layerData, color, icon) {
  return L.geoJSON( layerData, {
   style: function() {
     return {
     color: color,
     weight: 1,
     opacity: 1,
     fillOpacity: 0.5,
  };
},

pointToLayer: function(feature, latlng) {
  return L.marker(latlng, { icon: icon }); // Utilise l'icône personnalisée
},

onEachFeature: function(feature, layer) {
  layer.on('click', function() {
  console.log("Clicked on feature:", feature); // Log pour vérifier le contenu de la feature

// Fonction pour mettre à jour le panneau latéral (infoBox)
    updateInfoBox(feature);
   });
  }
 });
}

// Fonction pour mettre à jour le panneau latéral
function updateInfoBox(feature) {
  var infoBox = document.getElementById('infoBox');

// Extraire les informations des propriétés du GeoJSON
  var Nom = feature.properties.Nom || 'Nom non disponible';
  var Description = feature.properties.Description || 'Description non disponible';
  var Adresse = feature.properties.Adresse || 'Adresse non disponible';
  var Horaire = feature.properties.Horaire || 'Horaire non disponible';

// Construire dynamiquement le contenu du panneau
  var infoContent = "<h3>" + Nom + "</h3>";
  infoContent += "<p><b>Description:</b> " + Description+ "</p>";
  infoContent += "<p><b>Adresse:</b> " + Adresse + "</p>";
  infoContent += "<p><b>Horaire:</b> " + Horaire + "</p>";


// Mettre à jour l'infoBox dans la sidebar
  infoBox.innerHTML = infoContent;
}

// Définir les couches de chaque zone
var PharmacieLayer = addLayer(Pharmacie, '#8B4513', PharmacieIcon);  // Pharmacie - Rouge
var MedecinLayer = addLayer(Medecin, '#007bff', MedecinIcon);  // Medecin - Bleu
var UrgenceLayer = addLayer(Urgence, '#28a745', UrgenceIcon) ;  // Urgence - Vert

// Ajouter toutes les couches au démarrage
map.addLayer(PharmacieLayer);
map.addLayer(MedecinLayer);
map.addLayer(UrgenceLayer);

// Ajouter la fonctionnalité de sélection dans le menu
document.getElementById('zone-select').addEventListener('change', function(e) {
  var value = e.target.value;

if (value === 'Pharmacie') {
    map.addLayer(PharmacieLayer);
    map.removeLayer(MedecinLayer);
    map.removeLayer(UrgenceLayer);
 } else if (value === 'Medecin') {
    map.addLayer(MedecinLayer);
    map.removeLayer(PharmacieLayer);
    map.removeLayer(UrgenceLayer);
 } else if (value === 'Urgence') {
    map.addLayer(UrgenceLayer);
    map.removeLayer(PharmacieLayer);
    map.removeLayer(MedecinLayer);
 } else {
    map.removeLayer(PharmacieLayer);
    map.removeLayer(MedecinLayer);
    map.removeLayer(UrgenceLayer);
  }
});