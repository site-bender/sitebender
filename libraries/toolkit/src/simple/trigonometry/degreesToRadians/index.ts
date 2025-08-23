/**
 * Converts degrees to radians
 * 
 * Transforms an angle measured in degrees to its equivalent in radians
 * using the formula: radians = degrees × (π/180). This conversion is
 * essential for trigonometric functions which typically expect radians.
 * Returns NaN for invalid inputs.
 * 
 * @param degrees - Angle in degrees to convert
 * @returns Angle in radians, or NaN if invalid
 * @example
 * ```typescript
 * // Common angles
 * degreesToRadians(0)
 * // 0
 * 
 * degreesToRadians(90)
 * // 1.5707... (π/2)
 * 
 * degreesToRadians(180)
 * // 3.1415... (π)
 * 
 * degreesToRadians(270)
 * // 4.7123... (3π/2)
 * 
 * degreesToRadians(360)
 * // 6.2831... (2π)
 * 
 * // 45 degrees (π/4)
 * degreesToRadians(45)
 * // 0.7853...
 * 
 * // Negative angles
 * degreesToRadians(-90)
 * // -1.5707...
 * 
 * degreesToRadians(-180)
 * // -3.1415...
 * 
 * // Decimal degrees
 * degreesToRadians(30.5)
 * // 0.5323...
 * 
 * degreesToRadians(1)
 * // 0.0174...
 * 
 * // Large angles
 * degreesToRadians(720)
 * // 12.566... (4π)
 * 
 * // Invalid inputs return NaN
 * degreesToRadians(null)
 * // NaN
 * 
 * degreesToRadians(undefined)
 * // NaN
 * 
 * degreesToRadians("45")
 * // NaN
 * 
 * // Practical examples
 * 
 * // Converting for Math trigonometric functions
 * const angle = 60
 * const radians = degreesToRadians(angle)
 * Math.sin(radians)
 * // 0.866... (sin(60°) = √3/2)
 * 
 * // Rotation calculations
 * const rotationDegrees = 45
 * const rotationRadians = degreesToRadians(rotationDegrees)
 * // Use rotationRadians for canvas transforms
 * 
 * // Geographic calculations
 * const latitude = 40.7128  // New York latitude in degrees
 * const latRadians = degreesToRadians(latitude)
 * // 0.7107... radians
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns NaN for invalid inputs
 */
const degreesToRadians = (
	degrees: number | null | undefined
): number => {
	if (degrees == null || typeof degrees !== 'number') {
		return NaN
	}
	
	return degrees * (Math.PI / 180)
}

export default degreesToRadians