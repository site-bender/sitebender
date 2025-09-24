import discoverAssetsInFolder from "./discoverAssetsInFolder/index.ts"
import getPathHierarchy from "./getPathHierarchy/index.ts"

export default async function discoverAssetsForComponent(
	componentPath: string,
	componentsRoot: string,
): Promise<Array<string>> {
	const hierarchy = getPathHierarchy(componentPath, componentsRoot)

	const assetArrays = await Promise.all(
		hierarchy.map((dirPath: any) =>
			discoverAssetsInFolder(dirPath, componentsRoot)
		),
	)

	return assetArrays.flat()
}
