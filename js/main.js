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
    "esri/layers/ElevationLayer",
    "esri/widgets/Home"
], function (promiseUtils, OAuthInfo, esriId, Map, SceneView, FeatureLayer, SimpleRenderer, Query, Basemap, TileLayer, ElevationLayer, Home) {

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

    //tracon layer symbology
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

    //local tower layer symbology
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

    //remote tower layer symbology
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

    const homeBtn = new Home({
        view: view
    });

    // Add the home button to the top left corner of the view
    view.ui.add(homeBtn, "top-right");

    // add the clear selection button the view
    view.ui.add("clear-selection", "top-right");
    document
      .getElementById("clear-selection")
      .addEventListener("click", () => {
        traconLayer.definitionExpression = "1=1";
        ltLayer.definitionExpression = "1=0";
        rtLayer.definitionExpression = "1=0";
        view.goTo({
            center: [-98.5795, 39.8283],
            zoom: 5
        })
    });

    view.on("click", (event) => {
        clearMap();
        traconHitTest(event);
    });

    function traconHitTest(screenPoint) {
        view
            .hitTest(screenPoint)
            .then((response) => {
                const graphicsHit = response.results?.filter(
                    (hitResult) => hitResult.type ==="graphic" && hitResult.graphic.layer === traconLayer
                );
                if (graphicsHit?.length > 0) {
                    let featureSet = [];
                    graphicsHit.forEach((graphicsHit) => {
                        const objectIds = graphicsHit.graphic.attributes["objectid"];
                        featureSet.push(objectIds)
                    });
                    filterTraconRelated(featureSet);
                }
            });
    }

    function filterTraconRelated(objectIds) {
        //run layer filtering if at least one tracon was selected
        if(objectIds.length > 0) {
            let globalidSet = [];
            let gidExp;
         
            //get selected objectids as a comma list and pass into sql expression
            let oidString = objectIds.join(", ");
            let oidExp = "objectid IN (" + oidString + ")";
            
            //set definition expression on tracon layer using generated sql expression
            traconLayer.definitionExpression = oidExp;

            //query out the selected features to get the globalid
            traconLayer
                .queryFeatures({
                where: oidExp,
                outFields: ["globalid"]
                })
                .then((feature) => {
                    //for each feature that was selected, pull the global id from attributes and push to array
                    for (let f of feature.features) {
                        let fGlobalId = f.attributes.globalid
                        globalidSet.push("'" + fGlobalId + "'");
                    }
                
                    //stringify the globalidSet array separated with commas
                    let gidString = globalidSet.join(", ");
                    
                    //sql expression to filter lt and rt layers
                    gidExp = "parentglobalid IN (" + gidString + ")";

                    //set definitionExpression to match towers to selected tracon
                    ltLayer.definitionExpression = gidExp;
                    rtLayer.definitionExpression = gidExp;

                    var ltExtent = ltLayer.queryExtent().then((results) => {
                        return results.extent
                    });
                    var rtExtent = rtLayer.queryExtent().then((results) => {
                        return results.extent
                    });

                    console.log(ltExtent, rtExtent)
                    //use extent union() method to combine the lt and rt extents for max extent
                    //use extent expand() method to enlarge the union extent
                    //this will pull the points away from the edge of the extent
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