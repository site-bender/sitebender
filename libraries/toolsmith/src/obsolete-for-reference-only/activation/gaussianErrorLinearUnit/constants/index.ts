import divide from "../../../math/divide/index.ts"
import squareRoot from "../../../math/squareRoot/index.ts"

//++ [GROUP] GELU approximation constants

//++ Scaling factor for GELU approximation: √(2/π) ≈ 0.7978845608
export const GELU_SCALING_FACTOR = squareRoot(divide(Math.PI)(2))

//++ Coefficient for cubic term in GELU approximation
export const GELU_COEFFICIENT = 0.044715

//++ [END]
