require([
    "esri/core/promiseUtils",
    "esri/identity/OAuthInfo",
    "esri/identity/IdentityManager",
    "esri/WebMap",
    "esri/views/MapView",
    "esri/layers/FeatureLayer"
], function (promiseUtils, OAuthInfo, esriId, WebMap, MapView, FeatureLayer) {

    //OAuth certification to access secure AGOL content
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

    const map = new WebMap({
        portalItem: {
            id: "8c6b38f29a654b08bc4a31059984dc50"
        }
    });

    const view = new MapView({
        container: "appPanel",
        map: map,
    })
})