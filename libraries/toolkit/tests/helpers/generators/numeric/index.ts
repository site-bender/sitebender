import * as fc from "npm:fast-check@3"

/**
 * Custom numeric generators for property-based testing
 */

/**
 * Generates valid numbers excluding NaN and Infinity
 */
export const finiteNumber = () =>
	fc.float({
		noNaN: true,
		min: Math.fround(-1e10),
		max: Math.fround(1e10),
	})

/**
 * Generates numbers that could be null or undefined
 */
export const nullableNumber = () =>
	fc.oneof(
		fc.constant(null),
		fc.constant(undefined),
		finiteNumber(),
	)

/**
 * Generates edge case numbers
 */
export const edgeCaseNumber = () =>
	fc.oneof(
		fc.constant(0),
		fc.constant(-0),
		fc.constant(NaN),
		fc.constant(Infinity),
		fc.constant(-Infinity),
		fc.constant(Number.MIN_VALUE),
		fc.constant(Number.MAX_VALUE),
		fc.constant(Number.EPSILON),
	)

/**
 * Generates safe integers
 */
export const safeInteger = () =>
	fc.integer({
		min: Number.MIN_SAFE_INTEGER,
		max: Number.MAX_SAFE_INTEGER,
	})

/**
 * Generates positive numbers
 */
export const positiveNumber = () =>
	fc.float({
		min: Math.fround(0.00001),
		max: Math.fround(1e10),
		noNaN: true,
	})

/**
 * Generates negative numbers
 */
export const negativeNumber = () =>
	fc.float({
		min: Math.fround(-1e10),
		max: Math.fround(-0.00001),
		noNaN: true,
	})
