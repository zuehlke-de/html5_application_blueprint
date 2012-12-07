define('contactlist/ContactListView', [
    'log/LogItemView'
], function (LogItemView) {
    var LogView = Backbone.View.extend({
        tagName : "div",

        initialize : function () {
            this.collection.bind('reset', this.render, this);
            this.collection.bind('add', this.render, this);
            this.collection.bind('remove', this.render, this);
        },

        render : function () {
            if (this.collection.length) {
                var ul = $('<ul></ul>');
                _.each(this.collection.models, function (logItem) {
                    ul.append(new LogItemView({ model : logItem }).render().el);
                }, this);
                this.$el.html(ul);
            } else {
                this.$el.html('No contacts available');
            }
            return this;
        }
    });

    return LogView;
});