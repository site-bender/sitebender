import type { Generator, ShrinkTree } from "../../../../types/index.ts"

type RecordGenerators<T extends Record<string, unknown>> = {
	readonly [K in keyof T]: Generator<T[K]>
}

//++ Shrink individual record properties
export default function _shrinkRecordProperties<
	T extends Record<string, unknown>,
>(
	generators: RecordGenerators<T>,
): (
	value: T,
) => (keys: ReadonlyArray<keyof T>) => ReadonlyArray<ShrinkTree<T>> {
	return function shrinkWithValue(value: T) {
		return function shrinkWithKeys(
			keys: ReadonlyArray<keyof T>,
		): ReadonlyArray<ShrinkTree<T>> {
			return shrinkRecursive(0, [])

			function shrinkRecursive(
				index: number,
				accumulated: ReadonlyArray<ShrinkTree<T>>,
			): ReadonlyArray<ShrinkTree<T>> {
				if (index >= keys.length) {
					return accumulated
				}

				const key = keys[index]
				const gen = generators[key]
				const propShrinks = gen.shrink(value[key])
				const childShrinks = propShrinks.children()

				const currentShrinks = childShrinks.map(
					function mapChildShrink(childShrink) {
						return {
							value: { ...value, [key]: childShrink.value },
							children: function getChildren() {
								const furtherShrinks = gen.shrink(childShrink.value).children()
								return furtherShrinks.map(
									function mapFurtherShrink(furtherShrink) {
										return {
											value: { ...value, [key]: furtherShrink.value },
											children: function getNoChildren() {
												return []
											},
										}
									},
								)
							},
						}
					},
				)

				return shrinkRecursive(index + 1, [...accumulated, ...currentShrinks])
			}
		}
	}
}
