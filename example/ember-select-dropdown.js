App.SelectDropdownComponent = Ember.Component.extend({
  tagName: 'div',
  attributeBindings: [
    'content',
    'optionValuePath',
    'optionLabelPath',
    'value',
    'selection',
    'class'
    ],

  items: function() {
    function getProp(o, prop) {
      return o[this.get(prop).replace(/content\./, '')];
    }
    return Ember.$.map(this.get('content'), function(o, i) {
      if (this.get('optionLabelPath')) {
        o.label = getProp.call(this, o, 'optionLabelPath');
      }
      if (this.get('optionValuePath')) {
        o.value = getProp.call(this, o, 'optionValuePath');
      }

      o.isSelected = (o.value === this.get('value'));

      return o;
    }.bind(this));
  }.property('content', 'value', 'selection'),

  opened: false,

  open: function() {
    this.set('opened', true);
  },

  close: function() {
    this.set('opened', false);
  }.observes('value'),

  didInsertElement: function() {
    Ember.$('#' + this.get('elementId')).on('click', function(e) {
      if (!this.get('opened')) {
        this.open();
        e.stopPropagation();
      }
    }.bind(this));
    Ember.$(document).on('click', function() {
      this.close();
    }.bind(this));
  },

  actions: {
    select: function(o) {
      this.set('selection', o);
      this.set('value', o.value);
    },
    open: function() {
      this.open();
    }
  }
});
