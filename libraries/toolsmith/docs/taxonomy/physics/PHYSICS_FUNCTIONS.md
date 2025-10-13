# Physics Functions

**Location**: `src/physics/`
**Functions**: 8
**Status**: Cataloged
**Created**: 2025-10-07

---

## Function List

### acceleration

- **Current**: `(velocity: number | null | undefined) => (time: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: Calculates acceleration using formula: a = Δv / Δt; returns NaN on invalid input or zero time
- **Target**: `(velocity: number) => (time: number) => Result<PhysicsError, number>`

### force

- **Current**: `(mass: number | null | undefined) => (acceleration: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: Calculates force using Newton's second law: F = ma; returns NaN on invalid input
- **Target**: `(mass: number) => (acceleration: number) => Result<PhysicsError, number>`

### frequency

- **Current**: `(period: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input or zero period)
- **Description**: Calculates frequency from period: f = 1 / T; returns NaN on invalid input or zero period
- **Target**: `(period: number) => Result<PhysicsError, number>`

### kineticEnergy

- **Current**: `(mass: number | null | undefined) => (velocity: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: Calculates kinetic energy: KE = ½mv²; returns NaN on invalid input or negative mass
- **Target**: `(mass: number) => (velocity: number) => Result<PhysicsError, number>`

### momentum

- **Current**: `(mass: number | null | undefined) => (velocity: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: Calculates momentum: p = mv; returns NaN on invalid input
- **Target**: `(mass: number) => (velocity: number) => Result<PhysicsError, number>`

### potentialEnergy

- **Current**: `(mass: number | null | undefined) => (height: number | null | undefined) => (gravity: number = 9.81) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: Calculates gravitational potential energy: PE = mgh; default gravity is 9.81 m/s²; returns NaN on invalid input
- **Target**: `(mass: number) => (height: number) => (gravity: number) => Result<PhysicsError, number>`

### velocity

- **Current**: `(distance: number | null | undefined) => (time: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input or zero time)
- **Description**: Calculates velocity: v = d / t; returns NaN on invalid input or zero time
- **Target**: `(distance: number) => (time: number) => Result<PhysicsError, number>`

### wavelength

- **Current**: `(velocity: number | null | undefined) => (frequency: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input or zero frequency)
- **Description**: Calculates wavelength: λ = v / f; returns NaN on invalid input or zero frequency
- **Target**: `(velocity: number) => (frequency: number) => Result<PhysicsError, number>`

---

## Migration Notes

Physics functions will be converted to Result-returning functions. The monadic versions will:

1. Return `ok(value)` when calculation succeeds
2. Return `error(PhysicsError)` for division by zero, negative mass, or invalid inputs
3. Maintain currying for all multi-parameter functions

## Notes

Missing functions to consider: power, work, impulse, centripetal acceleration, angular velocity, torque, pressure.
