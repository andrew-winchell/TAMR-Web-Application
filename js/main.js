require([
    "esri/core/promiseUtils",
    "esri/identity/OAuthInfo",
    "esri/identity/IdentityManager",
    "esri/Map",
    "esri/views/SceneView",
    "esri/layers/FeatureLayer",
    "esri/layers/GraphicsLayer",
    "esri/widgets/Sketch/SketchViewModel",
    "esri/Graphic",
    "esri/geometry/geometryEngineAsync"
], function (promiseUtils, OAuthInfo, esriId, Map, SceneView, FeatureLayer, GraphicsLayer, SketchViewModel, Graphic, geometryEngineAsync) {

    //OAuth certification to access secure AGOL content
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

    const traconLayer = new FeatureLayer({
        portalItem: {
            id: "383ab9e4787c4f8db81bd54988142db0"
        },
        layerId: 0,
        popupEnable: true, 
        outfields: ["*"]
    })

    const ltLayer = new FeatureLayer({
        portalItem: {
            id: "383ab9e4787c4f8db81bd54988142db0"
        },
        layerId: 1,
        popupEnable: true, 
        outfields: ["*"]
    })

    const rtLayer = new FeatureLayer({
        portalItem: {
            id: "383ab9e4787c4f8db81bd54988142db0"
        },
        layerId: 2,
        popupEnable: true, 
        outfields: ["*"]
    })

    const attendeesTable = new FeatureLayer({
        portalItem: {
            id: "383ab9e4787c4f8db81bd54988142db0"
        },
        layerId: 3,
        popupEnable: true, 
        outfields: ["*"]
    })

    const traconTCWTable = new FeatureLayer({
        portalItem: {
            id: "383ab9e4787c4f8db81bd54988142db0"
        },
        layerId: 4,
        popupEnable: true, 
        outfields: ["*"]
    })

    const dasiTable = new FeatureLayer({
        portalItem: {
            id: "383ab9e4787c4f8db81bd54988142db0"
        },
        layerId: 5,
        popupEnable: true, 
        outfields: ["*"]
    })

    const traconTMUTable = new FeatureLayer({
        portalItem: {
            id: "383ab9e4787c4f8db81bd54988142db0"
        },
        layerId: 6,
        popupEnable: true, 
        outfields: ["*"]
    })

    const ltTDWTable = new FeatureLayer({
        portalItem: {
            id: "383ab9e4787c4f8db81bd54988142db0"
        },
        layerId: 7,
        popupEnable: true, 
        outfields: ["*"]
    })

    const rtTDWTable = new FeatureLayer({
        portalItem: {
            id: "383ab9e4787c4f8db81bd54988142db0"
        },
        layerId: 8,
        popupEnable: true, 
        outfields: ["*"]
    })

    const rackTable = new FeatureLayer({
        portalItem: {
            id: "383ab9e4787c4f8db81bd54988142db0"
        },
        layerId: 9,
        popupEnable: true, 
        outfields: ["*"]
    })

    const radarTable = new FeatureLayer({
        portalItem: {
            id: "383ab9e4787c4f8db81bd54988142db0"
        },
        layerId: 10,
        popupEnable: true, 
        outfields: ["*"]
    })

    const map = new Map({
        basemap: "gray-vector",
        layers: [traconLayer]
    });

    const view = new SceneView({
        container: "viewDiv",
        map: map,
        center: [-98.5795, 39.8283],
        zoom: 5,
        popup: {
          autoOpenEnabled: true
        }
    })
    
    //add ui elements
    view.ui.add("select-by-rectangle", "top-left");
    view.ui.add("clear-selection", "top-left");

    const polygonGraphicsLayer = new GraphicsLayer();
    map.add(polygonGraphicsLayer);

})