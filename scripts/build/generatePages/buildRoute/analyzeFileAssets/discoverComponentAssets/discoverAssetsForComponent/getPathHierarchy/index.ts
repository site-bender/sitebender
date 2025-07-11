import { join, relative, SEPARATOR } from "jsr:@std/path"

export default function getPathHierarchy(
	componentPath: string,
	componentsRoot: string,
): Array<string> {
	const relativePath = relative(componentsRoot, componentPath)
	const pathParts = relativePath.split(SEPARATOR)

	return pathParts.reduce(
		(hierarchy: Array<string>, _part: string, index: number) => [
			...hierarchy,
			join(componentsRoot, ...pathParts.slice(0, index + 1)),
		],
		[] as Array<string>,
	)
}
