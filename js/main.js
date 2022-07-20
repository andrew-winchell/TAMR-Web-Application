require([
    "esri/core/promiseUtils",
    "esri/identity/OAuthInfo",
    "esri/identity/IdentityManager",
    "esri/Map",
    "esri/views/SceneView",
    "esri/layers/FeatureLayer",
    "esri/renderers/SimpleRenderer"
], function (promiseUtils, OAuthInfo, esriId, Map, SceneView, FeatureLayer, SimpleRenderer) {

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
        layerId: 0,
        popupEnable: true, 
        outfields: ["*"],
        renderer: traconRender
    });

    const ltLayer = new FeatureLayer({
        portalItem: {
            id: "383ab9e4787c4f8db81bd54988142db0"
        },
        layerId: 1,
        popupEnable: true, 
        outfields: ["*"]
    });

    const rtLayer = new FeatureLayer({
        portalItem: {
            id: "383ab9e4787c4f8db81bd54988142db0"
        },
        layerId: 2,
        popupEnable: true, 
        outfields: ["*"]
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
    });

    view.on("click", (event) => {
        view.hitTest(event.screenPoint).then((response) => {
            var graphics = response.results;
            graphics.forEach((graphic) => {
                console.log(graphic);
            });
        });
    });

})