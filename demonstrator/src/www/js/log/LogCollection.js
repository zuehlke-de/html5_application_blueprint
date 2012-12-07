define([
    'BlipModel'
], function (BlipModel) {
    var LogCollection = Backbone.Collection.extend({
        model : BlipModel
    });

    return LogCollection;
});