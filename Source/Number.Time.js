/*
---
description: Rails Time syntax provider for mootools

license: MIT-style

authors:
- Arieh Glazer

requires:
- core/1.2.4 : [Class, Object]

provides: [Time, Number.Time, Date.Time]

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
    ,'months'  : false
    ,'years'   : 1000 * 60 * 60 * 24 * 365
};

function subs(n1, n2){
    return n1-n2;    
}

function add(n1,n2){
    return n1+n2;
}

var Time = this.Time = new Class({
    number : 0
    , state : 'seconds'
    , date  : null
    , initialize : function initialize(num, date){
      this.number = num;    
      this.date = date;
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
       var date = this.date || new Date
           , time = +date
           , i
           ,day = date.getDate()
           , month = date.getMonth()
           , year = date.getFullYear();

        switch(this.state){
            case  'seconds':
            case  'minutes':
            case  'hours':
            case  'days':
            case  'weeks':
              for (i=0;i<this.number; i++){
                 time = action(time,states[this.state]);
              }
              return new Date(time); 
              break;
            case 'months':
                month = action(month,this.number);
                if (month > 11){
                    date.setMonth(month % 11);
                    date.setFullYear(action(year,Math.floor(month / 11)));
                }else if (month < 0){
                    date.setMonth(month*-1 % 11);
                    date.setFullYear(action(year,Math.floor(month*-1 /11)));
                }else{
                    date.setMonth(month);
                }
                return date; 
                break;
            case 'years':
                date.setFullYear(action(year,this.number));
                break;
        }
       
    }
    , from_now : function from_now(){
        return this.calculate(add);
    }
    , ago : function ago(){
        return this.calculate(subs);
    }
});

Object.each(states,function(value,action){
    Number.implement(action, function(){
        this.time = new Time(this);
        return this.time[action]();
    });

    Date.implement(action, function(num){
        this.time = new Time(num || 0,this);
        return this.time[action]();
    });
});

}).apply(this,[document.id]);  
