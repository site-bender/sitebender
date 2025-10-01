//++ Wraps a constructor function for use without 'new', converting a class constructor into a regular function
const construct = <T extends ReadonlyArray<unknown>, R>(
 	Constructor: new (...args: T) => R,
) =>
(...args: T): R => new Constructor(...args)


export default construct
