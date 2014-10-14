App.SelectDropdownComponent = Ember.Component.extend({
  tagName: 'div',
  attributeBindings: [
    'content',
    'optionValuePath',
    'optionLabelPath',
    'value',
    'selection',
    'class',
    'label',
    'labelPlaceholder'
  ],

  originalLabel: null,

  init: function() {
    this._super();
    this.set('originalLabel', this.get('label'));
  },

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

  pristine: true,

  showPlaceholder: function() {
    return this.get('opened') || this.get('pristine');
  }.property('value', 'content', 'opened', 'close'),

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

  updateLabel: function() {
    this.set('selection', this.get('content').reduce(function(acc, o, i) {
      if (o.value === this.get('value')) {
        this.set('label', o[this.get('originalLabel').replace(/content\./, '')]);
        acc = o;
      }
      return acc;
    }.bind(this), this.get('selection')));
  }.observes('value', 'selection', 'content'),

  actions: {
    select: function(o) {
      this.set('selection', o);
      this.set('value', o.value);
      this.set('pristine', false);
    },
    open: function() {
      this.open();
    }
  }
});
