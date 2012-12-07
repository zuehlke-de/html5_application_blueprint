define([], function () {
    var LogItemView = Backbone.View.extend({
        tagName : "li",
        template : _.template($('#log-item').html()),

        render : function (eventName) {
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        }
    });

    return LogItemView;
});