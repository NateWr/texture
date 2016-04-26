'use strict';

var XMLExporter = require('substance/model/XMLExporter');
var UnsupportedNodeConverter = require('./nodes/UnsupportedNodeConverter');

var converters = require('./nodes');
converters = converters.slice(0);
converters.push(UnsupportedNodeConverter);

function JATSExporter() {
  JATSExporter.super.call(this, {
    converters: converters,
    containerId: 'main'
  });
}

JATSExporter.Prototype = function() {
  this.exportDocument = function(doc) {
    this.state.doc = doc;

    var articleEl = this.convertNode(doc.get('article'));
    return articleEl.outerHTML;
  };

  this.convertNodes = function(nodes) {
    var els = [];
    var converter = this;
    if (nodes._isArrayIterator) {
      while(nodes.hasNext()) {
        els.push(converter.convertNode(nodes.next()));
      }
    } else {
      nodes.forEach(function(node) {
        els.push(converter.convertNode(node));
      });
    }
    return els;
  };
};

XMLExporter.extend(JATSExporter);

module.exports = JATSExporter;
