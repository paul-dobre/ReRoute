import React from "react";
import config from '@arcgis/core/config';
import ArcGISMap from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Graphic from '@arcgis/core/Graphic';
import { solve } from '@arcgis/core/rest/route';
import RouteParameters from '@arcgis/core/rest/support/RouteParameters';
import FeatureSet from '@arcgis/core/rest/support/FeatureSet';



const MapTest = () => {

    config.apiKey = "AAPK3c3f7569a5364ebf989232a728f5cbbbD0PGCXGZqbFvXv3e1oUb76gUENrlq1_yhMDPKhunJRKWbLKb2OdXPodGKWPO3UkL";

    const routeURL = 'https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World'

    const map = new ArcGISMap({
        basemap: "navigation-night"
    });

    const view = new MapView({
        map,
        container: 'viewDiv',
        center: [-114, 51],
        zoom: 8
    });

    view.when(() => {
        console.log('view ready');
    });

    view.on('click', ({ mapPoint}) =>{
        if (!view.graphics.length) {
            view.graphics.add(addGraphic('origin', mapPoint));
        }
        else if (view.graphics.length === 1) {
            view.graphics.add(addGraphic('destination', mapPoint));
        }
        else {
            view.graphics.removeAll();
            view.graphics.add(addGraphic('origin', mapPoint));
        }
    })

    const addGraphic = (type, geometry) => {
        const graphic = new Graphic({
            geometry,
            symbol: {
                type: 'simple-marker',
                color: (type === 'origin') ? 'blue' : 'red',
                size: '10px'
            }
        });
        return graphic;
    };
    return (
    
        <div id="viewDiv" className={`flex md:flex-row flex-col w-[1000px] h-[800px] justify-center`}></div>
      );

};

export default MapTest;