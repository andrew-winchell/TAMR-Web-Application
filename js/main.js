require([
    "esri/core/promiseUtils",
    "esri/identity/OAuthInfo",
    "esri/identity/IdentityManager",
    "esri/Map",
    "esri/views/SceneView",
    "esri/layers/FeatureLayer",
    "esri/layers/GraphicsLayer",
    "esri/widget/Sketch/SketchViewModel",
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
        zoom: 6,
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