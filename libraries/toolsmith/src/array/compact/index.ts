import isArray from "../../predicates/isArray/index.ts"

//++ Removes null and undefined values from an array
//++ NOTE: This is a plain function (single return path). Will be migrated to three-path pattern in Batch 22.
export default function compact<T>(
	array: Array<T | null | undefined> | null | undefined,
): Array<T> {
	if (!isArray(array)) {
		return []
	}

	//++ [EXCEPTION] Using native .filter() is explicitly allowed for performance in Toolsmith implementations
	return array.filter(function isItemDefined(
		item: T | null | undefined,
	): item is T {
		return item !== undefined && item !== null
	})
}
