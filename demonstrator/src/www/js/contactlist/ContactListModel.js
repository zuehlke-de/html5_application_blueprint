define([], function () {

    var CONTACT_COLLECTION_URL = 'contacts.json'

    var ContactListModel = Backbone.Model.extend({
        url: CONTACT_COLLECTION_URL,

        getContacts: function(){
            var contacts = this.get('contacts');
            return contacts;
        },

        getCoordinates: function() {

            var contacts = this.get('contacts');
            var coordinateMap = _.map(contacts, function (contact) {
                var position = contact.position;
                var lat = position.latitudeE6/1000000;
                var lng = position.longitudeE6/1000000;
                return {lat:lat, lng:lng}
            });

            return coordinateMap;
        }
    })

    return ContactListModel;
});