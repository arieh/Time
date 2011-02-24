/*
---
description:

license: MIT-style

authors:
- Arieh Glazer

requires:
- core/1.2.4 : [Class, Class.Extras, Element]

provides: [Number.Time]

...
*/

/*!
Copyright (c) 2011 Arieh Glazer

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE
*/
;(function($){

var Number.Time = this.Number.Time = new Class({
     Implements : [Options,Events]
     , options :{
     }
     , element : null
     , elements : null
     , events : null
     , generated : false
     , attached : false
     , initialize : function initialize(el,opts){
          this.setOptions(opts);
          this.element = $(el);
          this.elements = {};
          this.events = {

          };

          this.generate();
          this.attach();
     }
     , generate : function generate(){

          this.generated = true;
     }
     , attach : function attach(){
          if (!this.generated) this.generate();


          this.attached = true;
     }
     , dettach : function dettach(){

          if (this.generated){
              Object.each(this.elements,function(el){
                  el.destroy();
              });
          }

          this.generated = false;
          this.attached = false;
     }
});

}).apply(this,[document.id]);  
