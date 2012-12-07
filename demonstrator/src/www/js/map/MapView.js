define('map/MapView', function () {

    var MapView = Backbone.View.extend({

        contactCollection : null,

        initialize: function(options) {
            _.bindAll(this, 'render');
            this.contactCollection = options.contactCollection;
            this.contactCollection.on('change', this.render);
            this.contactCollection.on('add', this.render);
            this.contactCollection.on('remove', this.render);
            this.contactCollection.on('reset', this.render);

            var loc = new google.maps.LatLng('50','10');
            var options = {
                zoom: 6,
                center: loc,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            // create map
            this.map = new google.maps.Map(this.el, options);
        },

        render: function() {
            var me = this;

            // add each marker
            var coordinates = this.contactCollection.getCoordinates();
            _.each(coordinates, function (coords){
                var loc = new google.maps.LatLng(coords.lat, coords.lng);
                var marker = new google.maps.Marker({
                    position: loc,
                    map: me.map
                });
            })
            return this;
        }
    });

    return MapView;
});