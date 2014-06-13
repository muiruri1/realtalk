/**
 * jQuery "splendid textchange" plugin
 * http://benalpert.com/2013/06/18/a-near-perfect-oninput-shim-for-ie-8-and-9.html
 *
 * (c) 2013 Ben Alpert, released under the MIT license
 */

!function(e){var t=document.createElement("input"),n="oninput"in t&&(!("documentMode"in document)||document.documentMode>9),o=function(e){return"INPUT"===e.nodeName&&("text"===e.type||"password"===e.type)},u=null,c=null,r=null,a={get:function(){return r.get.call(this)},set:function(e){c=e,r.set.call(this,e)}},l=function(e){u=e,c=e.value,r=Object.getOwnPropertyDescriptor(e.constructor.prototype,"value"),Object.defineProperty(u,"value",a),u.attachEvent("onpropertychange",g)},i=function(){u&&(delete u.value,u.detachEvent("onpropertychange",g),u=null,c=null,r=null)},g=function(t){if("value"===t.propertyName){var n=t.srcElement.value;n!==c&&(c=n,e(u).trigger("textchange"))}};n?e(document).on("input",function(t){"TEXTAREA"!==t.target.nodeName&&e(t.target).trigger("textchange")}):e(document).on("focusin",function(e){o(e.target)&&(i(),l(e.target))}).on("focusout",function(){i()}).on("selectionchange keyup keydown",function(){u&&u.value!==c&&(c=u.value,e(u).trigger("textchange"))})}(jQuery);