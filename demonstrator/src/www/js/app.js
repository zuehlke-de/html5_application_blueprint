require([
    'contactlist/ContactListView',
    'contactlist/ContactCollection',
    'contactlist/ContactListModel',
    'map/MapView',
    'contactlist/ContactModel'
], function (ContactListView, ContactCollection, ContactCollectionModel, MapView) {

    window.Map = Backbone.Model.extend({})

    /*
     * Views
     */
    var HeaderView = Backbone.View.extend({
        render : function () {
            $(this.el).html("Dies ist die HeaderView");
            return this;
        }
    });



    /*
     * Router
     */
    var AppRouter = Backbone.Router.extend({
        routes: {
            "" : "home"
        },

        home : function () {

            var contacts = new ContactCollectionModel();
            var contactCollection = new ContactCollection();
            contacts.on('change', function () {
                var contactCollectionModels = contacts.getContacts();
                contactCollection.reset(contactCollectionModels);
            });
            contacts.fetch();

            var headerView = new HeaderView({
                el : $('#header')
            });
            var contactListView = new ContactListView({
                el : $('#log'),
                collection: contactCollection
            });
            var mapView = new MapView({
                el: $('#map'),
                contactCollection: contactCollection
            });

            headerView.render();
            mapView.render();
            contactListView.render();
        }
    });

    var app = new AppRouter();
    Backbone.history.start();
});