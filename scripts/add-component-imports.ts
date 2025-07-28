import { walk } from "https://deno.land/std@0.203.0/fs/walk.ts";

const typesRoot = "lib/types/Thing";

// Check for --dry-run flag
const isDryRun = Deno.args.includes('--dry-run');

if (isDryRun) {
  console.log("🧪 DRY RUN MODE - No files will be modified\n");
} else {
  console.log("✍️  WRITE MODE - Files will be modified\n");
}

for await (const entry of walk(typesRoot, {
  includeDirs: false,
  exts: [".ts"]
})) {
  if (!entry.name.endsWith("index.ts")) {
    continue;
  }

  const typeFilePath = entry.path;

  // Calculate import path (your existing logic)
  const thingPath = typeFilePath.replace("lib/types/", "").replace("/index.ts", "");
  const pathSegments = typeFilePath.split("/");
  const libIndex = pathSegments.indexOf("lib");
  const levelsDeep = pathSegments.length - libIndex - 1;
  const upLevels = "../".repeat(levelsDeep);
  const componentPath = `${upLevels}components/${thingPath}/index.tsx`;

  // Extract component name from path (e.g., "DanceEvent" from "Thing/Event/DanceEvent")
  const componentName = thingPath.split("/").pop() + "Component";
  const importLine = `import ${componentName} from "${componentPath}"`;

  try {
    // Read the file
    const content = await Deno.readTextFile(typeFilePath);
    const lines = content.split('\n');

    // Find the export interface line
    const exportInterfaceIndex = lines.findIndex(line =>
      line.trim().startsWith('export interface')
    );

    if (exportInterfaceIndex === -1) {
      console.log(`❌ No export interface found in ${typeFilePath}`);
      continue;
    }

    // Check if import already exists
    if (content.includes(importLine)) {
      console.log(`⏭️  Import already exists in ${typeFilePath}`);
      continue;
    }

    if (isDryRun) {
      console.log(`📝 WOULD UPDATE: ${typeFilePath}`);
      console.log(`   Add import: ${importLine}`);
      console.log(`   Before line ${exportInterfaceIndex + 1}: ${lines[exportInterfaceIndex].trim()}`);
      console.log();
    } else {
      // Insert import line and blank line before export interface
      lines.splice(exportInterfaceIndex, 0, importLine, '');

      // Write back to file
      const newContent = lines.join('\n');
      await Deno.writeTextFile(typeFilePath, newContent);

      console.log(`✅ Updated ${typeFilePath}`);
    }

  } catch (error) {
    console.error(`❌ Error processing ${typeFilePath}:`, error);
  }
}
