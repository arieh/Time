Time
========
This class provides a rails like syntax for stating times - such as 4..days().ago() - for creating dates. 

How to use
----------
### Time

The package contains 3 tools - Time - a generic class for creating dates. Usage is as follows:

    #JS
    var time = new Time(4);
    time.days().ago(); //4 days ago
    time.years().from_now(); //4 years from now

The class also accepts a second argument - a date. If supplied, it will use it as it's origin (see more at the Docs).
For changing the count, you can supply it as an argument for the range method - 
    
    #JS
    time.days(20).ago(); //20 days ago

The available ranges are:

 1. seconds
 2. minutes
 3. hours
 4. days
 5. weeks
 6. months
 7. years

Note that all rage methods return `Date` instances.

### Number.Time
The package adds the range methods to the Number prototype, like it works on rails. So you can do

    #JS
    4..days().from_now();
    20..months().ago();

*Notice the double dot notation - it is required so that JS will know you aren't using the decimal point*

### Date.time
Lastly, the package adds it's syntax to the date prototype. In order for it to work you must supply a counter for the range methods:

    #JS
    var d = new Date();

    d.days(3).ago(); //3 days from that date

    5..days().ago().weeks(3).from_now(); //3 weeks from 5 days ago






Options
---------

Events
-------

