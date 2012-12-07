define("BlipModel", function () {
    var BlipModel = Backbone.Model.extend({

        id: undefined,

        mobileNr: undefined,

        confirmed : undefined,

        latitude : undefined,

        longitude : undefined,

        initialize : function () {

        }

    });

    return BlipModel;
});