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
})