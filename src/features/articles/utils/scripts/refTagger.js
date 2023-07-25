var refTagger = {
    settings: {
        bibleVersion: "ESV",
        linksOpenNewWindow: false,			
        roundCorners: true,
        socialSharing: ["google"],
        customStyle : {
            heading: {
                backgroundColor : "#ffffff",
                color : "#000000",
            },
            body   : {
                color : "#1c1919",
            }
        }
    }
};
(function(d, t) {
    var n=d.querySelector("[nonce]");
    refTagger.settings.nonce = n && (n.nonce||n.getAttribute("nonce"));
    var g = d.createElement(t), s = d.getElementsByTagName(t)[0];
    g.src = "https://api.reftagger.com/v2/RefTagger.js";
    g.nonce = refTagger.settings.nonce;
    s.parentNode.insertBefore(g, s);
}(document, "script"));
