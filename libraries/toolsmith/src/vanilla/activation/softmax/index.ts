import isNumber from "../../validation/isNumber/index.ts"
import _normalize from "./_normalize/index.ts"
import _shiftAndExp from "./_shiftAndExp/index.ts"
import isNotEmpty from "../../array/isNotEmpty/index.ts"
import hasLength from "../../array/hasLength/index.ts"
import all from "../../array/all/index.ts"
import max from "../../array/max/index.ts"
import map from "../../array/map/index.ts"
import sum from "../../math/sum/index.ts"

//++ Softmax activation for multi-class probability distribution
export default function softmax(
	numbers: Array<number> | null | undefined,
): Array<number> {
	if (isNotEmpty(numbers) && all(isNumber)(numbers as Array<number>)) {
		if (hasLength(1)(numbers)) {
			return [1]
		}

		const maximumValue = max(numbers) as number

		const exponentialValues = map(_shiftAndExp(maximumValue))(numbers)

		const sumOfExponentialValues = sum(exponentialValues)

		return map(_normalize(sumOfExponentialValues))(exponentialValues)
	}

	return []
}

//?? [EXAMPLE] `softmax([1, 2, 3])    // [0.0900..., 0.2447..., 0.6652...] (sums to 1)`
//?? [EXAMPLE] `softmax([0, 0, 0])    // [0.333..., 0.333..., 0.333...] (equal)`
//?? [EXAMPLE] `softmax([10, 0, 0])   // [0.9999..., 0.00002..., 0.00002...]`
//?? [EXAMPLE] `softmax([])     // []`
//?? [EXAMPLE] `softmax(null)   // []`
//?? [EXAMPLE] `softmax([5])    // [1] (single element)`
/*??
 | [EXAMPLE]
 | ```ts
 | // Neural network output layer
 | const logits = [2.1, 0.5, -1.2, 3.8]  // Raw scores
 | const probabilities = softmax(logits)
 | // [0.1849..., 0.0372..., 0.0068..., 0.7709...]
 | ```
 |
 | [EXAMPLE]
 | ```ts
 | // Multi-class classification
 | const classify = (scores: Array<number>) => {
 |   const probs = softmax(scores)
 |   const maxIndex = probs.indexOf(Math.max(...probs))
 |   return { class: maxIndex, confidence: probs[maxIndex] }
 | }
 | ```
 */
