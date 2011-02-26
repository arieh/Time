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
var states = {
    'seconds'  : 1000
    ,'minutes' : 1000 * 60
    ,'hours'   : 1000 * 60 * 60
    ,'days'    : 1000 * 60 * 60 * 24
    ,'weeks'   : 1000 * 60 * 60 * 24 * 7
    ,'years'   : 1000 * 60 * 60 * 24 * 7 * 365
    ,'months'  : false
};

function subs(n1, n2){
    return n1-n2;    
}

function add(n1,n2){
    return n1+n2;
}

Number.Time = new Class({
    number : 0
    , months_count : [31,28,31,30,31,30,31,31,30,31,30,31]
    , state : 'seconds'
    , initialize : function initialize(num){
      this.number = num;    
      var $this = this;

      Object.each(states,function(value,name){
         $this[name] = function(num){
             if (num) this.number = num;
             $this.state=name; 
             return $this
         };
      });
    }
    , calculate : function calculate(action){
       var date = new Date, time = +date, i,day = date.getDate(), month = date.getMonth(), year = date.getFullYear(), diff

       if (this.state != 'months'){
            for (i=0;i<this.number; i++){
                time = action(time,states[this.state]);
            }
            return new Date(time);
       }else{
            diff = (action == subs) ? action(time,day*states['days'])
                                    : action(time,(this.months_count[month]-day)*states['days']);
            time = action (time,diff);
            month = action(month,1);

            for (i=0; i<this.number-2; i++){
                if (month>11 || month < 0){
                    year = (new Date(time+60*states['days'])).getFullYear()
                    month = 0;
                } 
                if (year % 4 == 0 && month==1) time = action(time,29*states['days']);
                else time = action(time,this.months_count[month]*states['days']);
                month = action(month,1);
            }

            if (action == subs) time = time + (this.months_count[month]-day)*states['days'] ;
            else time = time - day*states['days'];
            return new Date(time);
       }
    }
    , from_now : function from_now(){
        return this.calculate(add);
    }
    , ago : function ago(){
        return this.calculate(subs);
    }
});

}).apply(this,[document.id]);  
