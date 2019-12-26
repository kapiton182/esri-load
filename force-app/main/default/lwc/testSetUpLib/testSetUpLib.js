/* eslint-disable no-undef */
/* eslint-disable @lwc/lwc/no-async-operation */
/* eslint-disable no-console */
import { LightningElement } from "lwc";
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import leaflet from '@salesforce/resourceUrl/leafletfull';


export default class TestSetUpLib extends LightningElement {
  mapl;

  renderedCallback() {
    setTimeout(() => {
      try {
        // let srcElem = this.template.querySelector(".src");
        // let script = document.createElement("script");
        // script.src = "https://unpkg.com/leaflet@1.5.1/dist/leaflet.js";

        // srcElem.appendChild(script);

        // let link = document.createElement("link"); 
        // link.href = "https://unpkg.com/leaflet@1.5.1/dist/leaflet.css";
        // link.rel = "stylesheet";

        // srcElem.appendChild(link);
        loadStyle(this, leaflet + '/leaflet.css');
        loadScript(this, leaflet + '/leaflet.js');
      } catch (e) {
        console.log(e);
      }
      setTimeout(() => {
        let srcElem = this.template.querySelector(".src");

        let script2 = document.createElement("script");
        script2.src =
          "https://unpkg.com/esri-leaflet@2.3.2/dist/esri-leaflet.js";

        srcElem.appendChild(script2);

        setTimeout(() => {
          let srcElem = this.template.querySelector(".src");

          let script3 = document.createElement("script");
          script3.src =
            "https://unpkg.com/esri-leaflet-geocoder@2.3.2/dist/esri-leaflet-geocoder.js";
          let link2 = document.createElement("link");
          link2.href =
            "https://unpkg.com/esri-leaflet-geocoder@2.3.2/dist/esri-leaflet-geocoder.css";
          link2.rel = "stylesheet";
          srcElem.appendChild(link2);

          srcElem.appendChild(script3);
          setTimeout(() => {
            let mapElem = this.template.querySelector(".map");
            this.mapl = L.map(mapElem).setView([40.91, -96.63], 4);

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
              attribution:
                '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(this.mapl);

            let searchControl = L.esri.Geocoding.geosearch().addTo(this.mapl);

            let results = L.layerGroup().addTo(this.mapl);

            searchControl.on("results", function (data) {
              results.clearLayers();
              for (let i = data.results.length - 1; i >= 0; i--) {
                results.addLayer(L.marker(data.results[i].latlng));
              }
            });
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  }
}
