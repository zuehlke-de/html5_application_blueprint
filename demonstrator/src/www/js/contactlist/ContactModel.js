define('contactlist/ContactModel', function () {
    var ContactModel = Backbone.Model.extend({
        defaults : {
            id: null,
            mobileNr: null,
            confirmed : null,
            latitude : null,
            longitude : null,
            blipzTimestamp : null
        }
    });

    return ContactModel;
});