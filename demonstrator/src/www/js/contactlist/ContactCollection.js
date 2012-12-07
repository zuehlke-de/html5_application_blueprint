define('contactlist/ContactCollection', [
    'contactlist/ContactModel'
], function (ContactModel) {
    var ContactCollection = Backbone.Collection.extend({
        model : ContactModel,

        getCoordinates: function() {
            var coordinateMap = _.map(this.models, function (contact) {
                var position = contact.get('position');
                var lat = contact.get('latitude');
                var lng = contact.get('longitude');
                return {lat:lat, lng:lng}
            });

            return coordinateMap;
        }
    });

    return ContactCollection;
});