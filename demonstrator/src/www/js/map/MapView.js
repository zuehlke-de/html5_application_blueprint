define([], function () {

    var MapView = Backbone.View.extend({

        initialize: function(opts) {
            _.bindAll(this, 'render');
            this.posts = opts.posts;
            this.posts.on('change', this.render);
            this.posts.on('add', this.render);
            this.posts.on('remove', this.render);
            this.posts.on('reset', this.render);
            //this.render();

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
            var coordinates = this.posts.getCoordinates();
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