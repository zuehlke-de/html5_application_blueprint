/**
 * Model zum Laden der Kontaktliste vom blipz Server.
 */
define('contactlist/ContactListModel', [
    'contactlist/ContactModel'
], function (ContactModel) {

    var CONTACT_COLLECTION_URL = 'contacts.json'

    var ContactListModel = Backbone.Model.extend({
        url: CONTACT_COLLECTION_URL,

        defaults : {
            timestamp : null,

            // array of blipz contacts
            contacts : null
        },

        getContacts: function(){
            var rawContacts = this.get('contacts'),
                contacts;

            contacts = _.map(rawContacts, function (rawContact) {
                contact = new ContactModel({
                    id : rawContact.id,
                    mobileNr : rawContact.mobileNr,
                    confirmed : rawContact.confirmed,
                    latitude : rawContact.position.latitudeE6 / 1000000,
                    longitude : rawContact.position.longitudeE6 / 1000000,
                    blipzTimestamp : rawContact.position.timestamp
                });

                return contact;
            });

            return contacts;
        }
    })

    return ContactListModel;
});