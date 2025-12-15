//Initialisation de la carte centrée sur Lausanne
var map = L.map('map').setView([46.519, 6.632], 13);

// Ajout du fond de carte OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Définir des icônes personnalisées pour chaque type de zone
var parcIcon = L.icon({
  iconUrl: 'Icones/Hopital.png',
  iconSize: [15, 20], 
  iconAnchor: [14, 40], 
  popupAnchor: [0, -40]
});

var reserveIcon = L.icon({
  iconUrl: 'Icones/Médecin.png',
  iconSize: [15, 20],
  iconAnchor: [14, 40],
  popupAnchor: [0, -40]
});

var foretIcon = L.icon({
  iconUrl: 'Icones/Pharmacie.png', 
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

// Définir les couches de chaque zone
var HopitalLayer = addLayer(parcs, '#28a745', parcIcon);  // Parcs - Vert
var MédecinLayer = addLayer(reserves, '#007bff', reserveIcon);  // Réserves marines - Bleu
var PharmacieLayer = addLayer(forets, '#8B4513', foretIcon) ;  // Forêts - Rouge