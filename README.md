# math

The math library contains a collection of mathematical equations either written or collected to make my life easier.

## Installation

`npm install --save @danehansen/math`

## Usage

As a module:

    import * as math from '@danehansen/math';

    var r = math.random(1, 100, true);

In your browser:

    <script src='danehansen-math.min.js'></script>
    <script>
      var math = window.danehansen.math;
      var r = math.random(1, 100, true);
    </script>

## Methods

* __average__(...args):Number  
Accepts either an unlimited quantity of numbers or an array of numbers and returns the total.
* __ceil__(num:Number, increment:Number = 1):Number  
Rounds a number up to the nearest increment.
* __circleIntersection__(centerA:Point, radiusA:Number, centerB:Point, radiusB:Number):Number  
Returns an array of the two points at which 2 circles intersect, if they intersect.
* __ease__(current:Number, dest:Number, speed:Number = 0.05):Number  
Eases a number towards the destination by a factor of speed. Great for making a display object follow a mouse cursor or some other moving target.
* __easeProp__(targ:Object, key:String, dest:Number, speed:Number = 0.05)  
Brings the object’s provided property (targ[key]) towards the destination by a factor of speed. Great for making a display object follow a mouse cursor or some other moving target.
* __euclid__(a:int, b:int):int  
Returns the greatest common divisor of two integers.
* __floor__(num:Number, increment:Number = 1):Number  
Rounds a number down to the nearest increment.
* __intLength__(num:uint):uint  
Returns the number of decimals in an integer.
* __luhn__(num:uint):Boolean  
Returns whether or not an integer meets the Luhn validation.
* __modulo__(num:Number, limit:Number):Number  
Similar to the modulo (%) operator, but rather than mirroring at 0, it continues past 0. For example, -1%4=-1, but modulo(-1, 4)=3. Great for when you decrement a value below 0 and need the functionality to wrap, like an image gallery.
* __primes__(limit:Number):Array  
Returns an array of all prime numbers between 0 and limit.
* __random__(limitA:Number, limitB:Number = 0, round:Boolean = false, choke:int = 1):Number  
Returns a random number between limit1 and limit2. Optionally, it will be rounded. The choke... tough one to explain. It is a representation of how to make the random number favor towards the middle of the two limits. There is a difference between Math.random()*2, and Math.random()+Math.random(), and this argument builds upon that. If you covered a square with 100 points all with random x and y positions, leaving the natural factor would result in scattered points like until a section of a starry night. With natural bumped up to 2 or higher, it would look more like a shotgun blast.
* __randomChoice__(array:* = [-1,1], choke:int = 1):*  
Returns a random value from the provided array or list. The default is [-1,1] for instances when you need to randomly determine if something should be left or right, up or down.
* __relativePercentage__(start:Number, end:Number, current:Number):Number  
Returns the position of current in reference to a scale between start and end. Example: relativePercentage(2,4,3) returns 0.5.
* __round__(num:Number, increment:Number):Number  
Returns a number rounded by the increment, rather than by 1.
* __shuffle__(array:Number, duplicate:Boolean = false):Array  
Shuffles the provided array or list. If duplicate is set to true, the original list is left alone and the shuffled list is returned on a new array. Note: when shuffling a NodeList, always set duplicate to true as a NodeList does not shuffle well.
* __sortAscending__(a:Number, b:Number):Number  
Returns the difference between the a and b, meant to pass into the Array.sort method as an alternate to the default alphabetical.
* __sortDescending__(a:Number, b:Number):Number  
Returns the reversed difference between a and b, meant to pass into the Array.sort method as an alternate to the default alphabetical.
* __splitUint__(num:int):Array  
Returns an array representing each digit of an integer.
* __toDegrees__(radians:Number, offset:Boolean = false):Number  
Converts an angle in radians to degrees. By default, just returns an angle of the same amount measured in degrees, but when set to true will also account for offsetting by 1/4 turn.
* __toRadians__(degrees:Number, offset:Boolean = false):Number  
Converts an angle in degrees to radians. By default, just returns an angle of the same amount measured in radians, but when set to true will also account for offsetting by 1/4 turn.
* __total__(array:*):Number  
Calculates the total in an array or list of values. Truthy values will also be totaled as 1s and falsey values as 0s.
