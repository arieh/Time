/**
 * @author Arieh
 */
;(function(){
var times = {
    seconds : 1000
    , minutes : this.seconds * 60
    , hours : this.minutes * 60
    , days : this.hours * 24
    , weeks : this.days * 7
    , years : this.days * 365    
};

TestCase({
   "test incermenting minutes": function(){
       var d = new Date();
       var n = new Number.Time(20);
       assertTrue(n.minutes().from_now() > d + times.minutes*20);
   } 
});    
})();
