/**
 * main file for the HTML5 application blueprint demonstrator app
 */
$(function () {

    /*
     * Models
     */
    var BlipModel = Backbone.Model.extend();
    var LogList = Backbone.Collection.extend({
        model : BlipModel
    })

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

    var LogItemView = Backbone.View.extend({

        tagName : "li",

        template : _.template($('#log-item').html()),

        render : function (eventName) {
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        }
    });

    var LogView = Backbone.View.extend({
        tagName : "div",

        initialize : function () {
            this.model.bind('remove', this.render, this);
        },

        render : function () {
            if (this.model.length) {
                var ul = $("<ul></ul>");
                _.each(this.model.models, function (logItem) {
                    $(ul).append(new LogItemView({model: logItem}).render().el);
                }, this);
                $(this.el).html(ul);
            } else {
                $(this.el).html("All gone!");
            }
            return this;
        }
    });

    var MapView = Backbone.View.extend({

        tagName : "div",

        render : function () {
            $(this.el).html("Dies ist die MapView");
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

            this.logList = new LogList([
                { "contact" : { "id" : 1, "name" : "Zaphod Beeblebrox"}, "datetime" : "01.01.2016" },
                { "contact" : { "id" : 2, "name" : "Trillian McMillian"}, "datetime" : "01.01.2015" },
                { "contact" : { "id" : 3, "name" : "Arthur Dent"}, "datetime" : "01.01.2014" },
                { "contact" : { "id" : 4, "name" : "Ford Prefect"}, "datetime" : "01.01.2013" },
                { "contact" : { "id" : 5, "name" : "Wowbagger, the infinitely prolonged"}, "datetime" : "01.01.2012" }
            ]);

            this.headerView = new HeaderView();
            this.logView = new LogView({model: this.logList});
            this.mapView = new MapView();
            this.timelineView = new TimelineView();

            $('#header').html(this.headerView.render().el);
            $('#log').html(this.logView.render().el);
            $('#map').html(this.mapView.render().el);
            $('#timeline').html(this.timelineView.render().el);
        }
    });

    var app = new AppRouter();
    Backbone.history.start();
    var popper = setInterval(function () {
        if (app.logList.length) {
            app.logList.pop();
        } else {
            clearInterval(popper);
        }
    }, 1000);
});