require([
    "esri/core/promiseUtils",
    "esri/identity/OAuthInfo",
    "esri/identity/IdentityManager",
    "esri/layers/FeatureLayer"
], function (promiseUtils, OAuthInfo, esriId, FeatureLayer) {

    const info = new OAuthInfo({
        appId: "W4kXv59v7lprJzUj",
        portalUrl: "http://cobecconsulting.maps.arcgis.com",
        flowtype: "auto",
        popup: false
    });

    esriId.registerOAuthInfos([info]);

    esriId.getCredential(info.portalUrl + "/sharing");

    esriId.checkSignInStatus(info.portalUrl + "/sharing")
        .then(() => {
            document.getElementById("appPanel").style.display = "block";
    });

    const listLayer = new FeatureLayer({
        //AGOL portal item ID
        portalItem: {
          id: "e0e2d6c68a2243b797ab2fd177567d4c"
        },
        refreshInterval: 0.1,
        //if no layerId provided, defaults to first layer in service
        //layerId: 0
        popupEnabled: true,
        outFields: ["*"]
    });
    
})