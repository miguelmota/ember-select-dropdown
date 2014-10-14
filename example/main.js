App = Ember.Application.create();

App.Router.map(function() {
  this.resource('index', { path: '/' }, function() {});
});

App.IndexController = Ember.ObjectController.extend({
  items: [
    {name: 'Tacos', id: 1},
    {name: 'Burritos', id: 2}
  ],
  currentItem: function() {
    return this.get('items')[1];
  }.property()
});
