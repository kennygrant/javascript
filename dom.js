// Package DOM provides functions to replace the use of jquery in 1.4KB of js - Ajax, Selectors, Event binding, ShowHide
// See http://youmightnotneedjquery.com/ for more if required
// Version 1.0
var DOM = (function() {
return {
  // Apply a function on document ready
  Ready:function(f) {
    if (document.readyState != 'loading'){
      f();
    } else {
      document.addEventListener('DOMContentLoaded', f);
    }
  },
  
  // Return true if any element match selector
  Exists:function(s) {
    return (document.querySelector(s) !== null);
  },

  // Return an array of elements matching selector
  All:function(s) {
    return document.querySelectorAll(s);
  },
  
  // Return the first in the array of elements matching selector - may return nil
  First:function(s) {
    return document.querySelectorAll(s)[0];
  },
  
  // Return an array of nearest elements matching selector, as children, siblings or parents of selector
  Nearest:function(el,s) {
    // Find children
    var nearest = el.querySelectorAll(s);
    if (nearest.length > 0) {
      return nearest;
    }
    
    // Find siblings
    nearest = Array.prototype.filter.call(el.parentNode.children, function(child){
      return child !== el;
    });
    if (nearest.length > 0) {
      return nearest;
    }
    
    // Find elements two parents up
    if (el.parentNode.parentNode !== undefined) {
      nearest = Array.prototype.filter.call(el.parentNode.parentNode.children, function(child){
        return child !== el;
      });
    }
  
    // Give up and return any matches
    return document.querySelectorAll(s);
  },
  
  // Apply a function to elements matching selector
  Each:function(s,f) {
    var a = DOM.All(s);
    for (i = 0; i < a.length; ++i) {
      f(a[i],i);
    }
  },
  
  // Apply a function to elements matching selector
  ForEach:function(a,f) {
    Array.prototype.forEach.call(a,f);
  },
  
  
  // Hide elements matching selector
  Hide:function(s) {
    DOM.Each(s,function(el,i){
      el.style.display = 'none';
    });
  },
  
  // Show elements matching selector
  Show:function(s) {
    DOM.Each(s,function(el,i){
      el.style.display = '';
    });
  },
  
  ShowHide:function(s) {
    DOM.Each(s,function(el,i){
      if (el.style.display != 'none') {
          el.Hide();
      } else {
         el.Show();
      }
    });
  },
  
  // Attach event handlers to all matches for a selector 
  On:function(s,b,f) {
    DOM.Each(s,function(el,i){
      el.addEventListener(b, f);
    });
  },
  
  // Ajax - Send the data d to url u
  Post:function(u,d) {
    var request = new XMLHttpRequest();
    request.open('POST', u, true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.send(d);
  },
  
  // Ajax - Get the data from url u, fs for success, ff for failures
  Get:function(u,fs,fe) {
    var request = new XMLHttpRequest();
    request.open('GET', u, true);
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        fs(request);
      } else {
        fe();
      }
    };
    request.onerror = fe;
    request.send();
    }
      
  };
    
}());