import { walk } from "https://deno.land/std@0.203.0/fs/walk.ts";
import { join, relative, dirname } from "https://deno.land/std@0.203.0/path/mod.ts";

const typesRoot = "lib/types/Thing";

for await (const entry of walk(typesRoot, {
  includeDirs: false,
  exts: [".ts"]
})) {
  // Skip non-index files
  if (!entry.name.endsWith("index.ts")) {
    continue;
  }

  const typeFilePath = entry.path;

  // Extract the path from Thing onwards: Thing/CreativeWork/Book
  const thingPath = typeFilePath.replace("lib/types/", "").replace("/index.ts", "");

  // Calculate how many levels deep we are from lib/types/
  const pathSegments = typeFilePath.split("/");
	const componentName = `${pathSegments.at(-2)}Component`;
  const libIndex = pathSegments.indexOf("lib");
  const levelsDeep = pathSegments.length - libIndex - 1; // -1 for the filename itself

  // Create the relative path back to lib
  const upLevels = "../".repeat(levelsDeep);

  // Build the component path
  const componentPath = `${upLevels}components/${thingPath}/index.tsx`;
	const importLine = `import ${componentName} from "${componentPath}"`;

	console.log(componentName);
  console.log(typeFilePath);
  console.log(importLine);
  console.log(); // blank line
}
