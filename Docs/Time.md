Class: Time {#Time}
==========================================

Time Method: constructor {#Time:constructor}
---------------------------------
### Syntax:

	var time = new Time(num[,date]);

### Arguments:
 1. num - `Number` - a counter for the class reference
 2. date - `Date` - optional - a point of origin to count the ranges from. Default is current date


Time Method: Ranges {#Time:Ranges}
------------------------

The range setters set the current range type you want to use. 
The Time class supplies 7 range setters you can specify from the origin date:

 1. seconds
 2. minutes
 3. hours
 4. days
 5. weeks
 6. months
 7. years

### Syntax:

    time.days([number]);
    time.weeks([number]);
    //etc...

### Arguments:
 
 1. number -`Number` - optional - if supplied will be used as the range counter

Time Method: from_now {#Time:from_now}
------------------------------------
Returns a new date in the future, using the previously supplied paramaters

### Syntax

    var time = new Time(20);
    time.days().from_now();//20 days from now

    time.weeks().from_now();//20 weeks from now


Time Method: ago {#Time:ago}
------------------------------------
Return a new date in the past, using the previously supplied paramaters 

### Syntax

    var time = new Time(20);
    time.days().ago(); //20 days ago
    time.years().ago(); //20 years ago


Class: Number.Time {#Number.Time}
--------------------------------
This is an extension to the Number prototype. It adds all the various range methods, which act as Time constructor.
So you can now do:

    4..days().from_now(); 
    2000..minutes().ago();

Class: Date.Time {#Date.Time}
------------------------------
This is an extension to the Date prototype. It adds all the various range methods, which act as Time constructors.
Note that you should use the range method's argument to set a range counter

### Syntax
    
    var d = new Date();

    d.days(4).from_now();

    d.weeks(2).ago();

