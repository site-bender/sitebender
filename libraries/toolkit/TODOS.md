# Todo

1. Update the null and undefined functions in `libraries/toolkit/src/simple/validation/` to the following:
	a. `isNull` should return true if the value is strictly null, and false otherwise.
	b. `isUndefined` should return true if the value is strictly undefined, and false otherwise.
	c. `isNullish` should return true if the value is null or undefined, and false otherwise.
	d. `isNil` should be an alias for `isNullish`.
	e. There should be equivalent `isNotNull`, `isNotUndefined`, and `isNotNullish` functions. Maybe an `isNotNil` as well. Or an `isUndefined` that aliases `isNotUndefined`.

2. Everywhere in the code where "value" (or whatever the variable name is) uses `== null` or `!= null` or `=== null` or `!== null` or `=== undefined` or `!== undefined`, update the checks to use the new functions:
	- Replace `== null` with `isNullish(value)`
	- Replace `!= null` with `isNotNullish(value)`
	- Replace `=== null` with `isNull(value)`
	- Replace `!== null` with `isNotNull(value)`
	- Replace `=== undefined` with `isUndefined(value)`
	- Replace `!== undefined` with `isNotUndefined(value)`

3. Wherever there is a check for an empty array, use `isEmpty` from the toolkit's array functions.
4. Wherever there is a check for an empty object, use `isEmpty` from the toolkit's object functions.
5. Wherever there is a check for an empty string, use `isEmpty` from the toolkit's string functions.

Then fix the tests in `libraries/toolkit/tests` that break because of these changes.

Also: our `divide` currently returns a float, am I right? Shouldn't it return a tuple with the quotient and the remainder to be truly accurate? How can we have both? What would we call the two functions (I am loath to add a configuration object unless there's no other way).

Just for discussion: how could we add functions to do integration and differentiation? Is that doable?
