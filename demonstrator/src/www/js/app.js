require([
    'contactlist/ContactListView',
    'contactlist/ContactCollection',
    'contactlist/ContactListModel',
    'map/MapView',
    'BlipModel'
], function (LogView, ContactCollection, ContactCollectionModel, MapView) {

    window.Map = Backbone.Model.extend({})

    /*
     * Views
     */
    var HeaderView = Backbone.View.extend({
        tagName : "div",

        render : function () {
            $(this.el).html("Dies ist die HeaderView");
            return this;
        }
    });



    var TimelineView = Backbone.View.extend({
        tagName : "div",

        render : function () {
            $(this.el).html("Dies ist die TimelineView");
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

            var contactCollection = new ContactCollection();

            var contacts = new ContactCollectionModel();
            contacts.on('change', function () {
                var contactCollectionModels = contacts.getContacts();
                contactCollection.reset(contactCollectionModels);
            });

            contacts.fetch();
            this.headerView = new HeaderView();
            this.logView = new LogView({collection: contactCollection});

            this.mapView = new MapView({
                el: $('#map'),
                posts: contacts
            });

            this.mapView.render();

            this.timelineView = new TimelineView();

            $('#header').html(this.headerView.render().el);
            $('#log').html(this.logView.render().el);
            //$('#map').html(this.mapView.render().el);
            $('#timeline').html(this.timelineView.render().el);
        }
    });

    var app = new AppRouter();
    Backbone.history.start();
});