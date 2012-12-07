define([
    'log/LogItemView'
], function (LogItemView) {
    var LogView = Backbone.View.extend({
        tagName : "div",

        initialize : function () {
            this.collection.bind('remove', this.render, this);
        },

        render : function () {
            if (this.collection.length) {
                var ul = $("<ul></ul>");
                _.each(this.collection.models, function (logItem) {
                    $(ul).append(new LogItemView({model: logItem}).render().el);
                }, this);
                $(this.el).html(ul);
            } else {
                $(this.el).html("All gone!");
            }
            return this;
        }
    });

    return LogView;
});