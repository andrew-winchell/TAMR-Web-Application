require([
    "esri/core/promiseUtils",
    "esri/identity/OAuthInfo",
    "esri/identity/IdentityManager",
    "esri/Map",
    "esri/views/SceneView",
    "esri/layers/FeatureLayer",
    "esri/renderers/SimpleRenderer",
    "esri/rest/support/Query",
    "esri/Basemap",
    "esri/layers/TileLayer",
    "esri/layers/ElevationLayer"
], function (promiseUtils, OAuthInfo, esriId, Map, SceneView, FeatureLayer, SimpleRenderer, Query, Basemap, TileLayer, ElevationLayer) {

    //OAuth certification process to access secure AGOL content
    const info = new OAuthInfo({
        appId: "W4kXv59v7lprJzUj",
        portalUrl: "http://cobecconsulting.maps.arcgis.com",
        authNamespace: "portal_oauth_inline",
        flowtype: "auto",
        popup: false
    });
    esriId.registerOAuthInfos([info]);
    esriId.getCredential(info.portalUrl + "/sharing");
    esriId.checkSignInStatus(info.portalUrl + "/sharing")
        .then(() => {
            document.getElementById("appPanel").style.display = "block";
    });

    // Initialize variables
    let highlight, grid;

    //layer symbology
    const traconRender = {
        type: "simple",
        symbol: {
            type: "simple-marker",
            size: 8,
            color: "blue",
            outline: {
                width: 1,
                color: "gray"
            }
        }
    };

    const ltRender = {
        type: "simple",
        symbol: {
            type: "simple-marker",
            size: 6,
            color: "green",
            outline: {
                width: 1,
                color: "gray"
            }
        }
    };

    const rtRender = {
        type: "simple",
        symbol: {
            type: "simple-marker",
            size: 6,
            color: "red",
            outline: {
                width: 1,
                color: "gray"
            }
        }
    };

    //each layer in the TAMR dataset
    //11 layers total
    const traconLayer = new FeatureLayer({
        portalItem: {
            id: "383ab9e4787c4f8db81bd54988142db0"
        },
        elevationInfo: {
            mode: "relative-to-ground",
            offset: 3
        },
        layerId: 0,
        popupEnable: true, 
        outfields: ["*"],
        renderer: traconRender,
        definitionExpression: "1=1"
    });

    const ltLayer = new FeatureLayer({
        portalItem: {
            id: "383ab9e4787c4f8db81bd54988142db0"
        },
        elevationInfo: {
            mode: "relative-to-ground",
            offset: 3
        },
        layerId: 1,
        popupEnable: true, 
        outfields: ["*"],
        renderer: ltRender,
        definitionExpression: "1=0"
    });

    const rtLayer = new FeatureLayer({
        portalItem: {
            id: "383ab9e4787c4f8db81bd54988142db0"
        },
        elevationInfo: {
            mode: "relative-to-ground",
            offset: 3
        },
        layerId: 2,
        popupEnable: true, 
        outfields: ["*"],
        renderer: rtRender,
        definitionExpression: "1=0"
    });

    const attendeesTable = new FeatureLayer({
        portalItem: {
            id: "383ab9e4787c4f8db81bd54988142db0"
        },
        layerId: 3,
        popupEnable: true, 
        outfields: ["*"]
    });

    const traconTCWTable = new FeatureLayer({
        portalItem: {
            id: "383ab9e4787c4f8db81bd54988142db0"
        },
        layerId: 4,
        popupEnable: true, 
        outfields: ["*"]
    });

    const dasiTable = new FeatureLayer({
        portalItem: {
            id: "383ab9e4787c4f8db81bd54988142db0"
        },
        layerId: 5,
        popupEnable: true, 
        outfields: ["*"]
    });

    const traconTMUTable = new FeatureLayer({
        portalItem: {
            id: "383ab9e4787c4f8db81bd54988142db0"
        },
        layerId: 6,
        popupEnable: true, 
        outfields: ["*"]
    });

    const ltTDWTable = new FeatureLayer({
        portalItem: {
            id: "383ab9e4787c4f8db81bd54988142db0"
        },
        layerId: 7,
        popupEnable: true, 
        outfields: ["*"]
    });

    const rtTDWTable = new FeatureLayer({
        portalItem: {
            id: "383ab9e4787c4f8db81bd54988142db0"
        },
        layerId: 8,
        popupEnable: true, 
        outfields: ["*"]
    });

    const rackTable = new FeatureLayer({
        portalItem: {
            id: "383ab9e4787c4f8db81bd54988142db0"
        },
        layerId: 9,
        popupEnable: true, 
        outfields: ["*"]
    });

    const radarTable = new FeatureLayer({
        portalItem: {
            id: "383ab9e4787c4f8db81bd54988142db0"
        },
        layerId: 10,
        popupEnable: true, 
        outfields: ["*"]
    });

    //world topo basemap layer
    const basemap = new Basemap({
        baseLayers: [
            new TileLayer({
                url: "https://wtb.maptiles.arcgis.com/arcgis/rest/services/World_Topo_Base/MapServer"
            })
        ]
    })

    const map = new Map({
        ground: {
            layers: [
                new ElevationLayer({
                    url: "https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer"
                })
            ]
        },
        basemap: basemap,
        layers: [traconLayer, ltLayer, rtLayer]
    });

    const view = new SceneView({
        container: "viewDiv",
        map: map,
        center: [-98.5795, 39.8283],
        zoom: 5,
        popup: {
          autoOpenEnabled: true
        }
    });

    // add the clear selection button the view
    view.ui.add("clear-selection", "top-left");
    document
      .getElementById("clear-selection")
      .addEventListener("click", () => {
        traconLayer.definitionExpression = "1=1";
    });

    view.on("click", (event) => {
        clearMap();
        queryRelated(event);
    });

    function queryRelated(screenPoint) {
        view.hitTest(screenPoint)
            .then((response) => {
                const graphicsHit = response.results?.filter(
                    (hitResult) => hitResult.type ==="graphic" && hitResult.graphic.layer === traconLayer
                );
                if (graphicsHit?.length > 0) {
                    // do something with the traconLayer features returned from hittest
                    graphicsHit.forEach((graphicsHit) => {
                        const objectIds = graphicsHit.graphic.attributes["objectid"];
                        filterSelectedLayers(objectIds);
                    });
                }
            });
    }

    function filterSelectedLayers(objectId) {
        if(objectId > 0) {
            let sqlExp = "objectid = " + objectId;
            traconLayer.definitionExpression = sqlExp;
            const selectedFeature = traconLayer.queryFeatures({
                where: "objectid = " + objectId,
                outFields: ["*"]
            }).then((feature) => {
                console.log(feature[0]);
            });
        }        
    }

    function clearMap() {
        if (highlight) {
          highlight.remove();
        }
        if (grid) {
          grid.destroy();
        }
    }
})