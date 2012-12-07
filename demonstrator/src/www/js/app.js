require([
    'log/LogView',
    'log/LogCollection'
], function (LogView, LogCollection) {


    var POST_API = '/api/v1/post/'

    window.Post = Backbone.Model.extend({
        url: POST_API
    })

    window.Posts = Backbone.Collection.extend({
        model: Post,
        url: POST_API,

        get_coordinates: function() {
            coords = _.map(this.models, function(post) {
                lat = post.attributes.lat;
                lng = post.attributes.lng;
                return {lat:lat, lng:lng}
            });
            return coords
        }
    })

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

    var MapView = Backbone.View.extend({

        initialize: function(opts) {
            _.bindAll(this, 'render');
            this.posts = opts.posts;
            this.posts.add()
            this.posts.on('change', this.render);
            this.render();
        },

        render: function() {
            var loc = new google.maps.LatLng('-34.397','150.644');
            var options = {
                zoom: 6,
                center: loc,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            // create map
            this.map = new google.maps.Map(this.el, options);

            // add a marker
            var marker = new google.maps.Marker({
                position: loc,
                map :this.map
            });

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

            this.logCollection = new LogCollection([
                { "contact" : { "id" : 1, "name" : "Zaphod Beeblebrox"}, "datetime" : "01.01.2016" },
                { "contact" : { "id" : 2, "name" : "Trillian McMillian"}, "datetime" : "01.01.2015" },
                { "contact" : { "id" : 3, "name" : "Arthur Dent"}, "datetime" : "01.01.2014" },
                { "contact" : { "id" : 4, "name" : "Ford Prefect"}, "datetime" : "01.01.2013" },
                { "contact" : { "id" : 5, "name" : "Wowbagger, the infinitely prolonged"}, "datetime" : "01.01.2012" }
            ]);

            this.headerView = new HeaderView();
            this.logView = new LogView({collection: this.logCollection});

            post = new Post();

            posts = new Posts();

            map = new Map({
                latitude: '-34.397',
                longitude: '150.644'
            });

            this.mapView = new MapView({
                el: $('#map'),
                model: map,
                posts: posts
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
    var popper = setInterval(function () {
        if (app.logCollection.length) {
            app.logCollection.pop();
        } else {
            clearInterval(popper);
        }
    }, 1000);
});