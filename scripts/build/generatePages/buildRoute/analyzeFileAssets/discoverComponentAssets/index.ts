import { join } from "jsr:@std/path"

import discoverAssetsForComponent from "./discoverAssetsForComponent/index.ts"

export default async function discoverComponentAssets(
	componentPaths: Array<string>,
): Promise<Array<string>> {
	const componentsRoot = join(Deno.cwd(), "src", "components")

	const assetArrays = await Promise.all(
		componentPaths.map((componentPath: string) =>
			discoverAssetsForComponent(componentPath, componentsRoot)
		),
	)

	const allAssets = assetArrays.flat()

	// Remove duplicates and sort
	return Array.from(new Set(allAssets)).sort()
}
