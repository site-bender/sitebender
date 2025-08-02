// transform-types.ts
import { walk } from "https://deno.land/std@0.170.0/fs/walk.ts";
import { relative } from "https://deno.land/std@0.170.0/path/mod.ts";

interface TypeInfo {
  typeName: string;
  importPath?: string;
}

function printFileHeader(path: string) {
  console.log(`\n${'═'.repeat(80)}`);
  console.log(`║ ${path}`);
  console.log(`${'═'.repeat(80)}\n`);
}

async function transformFiles(dryRun = true) {
  const typesDir = "./lib/types/Thing";
  const filesToProcess: string[] = [];

  // Collect all index.ts files
  for await (const entry of walk(typesDir, {
    exts: [".ts"],
    includeDirs: false,
  })) {
    if (entry.name === "index.ts") {
      filesToProcess.push(entry.path);
    }
  }

  // Sort by deepest paths first (depth-first)
  filesToProcess.sort((a, b) => b.split("/").length - a.split("/").length);

  for (const filePath of filesToProcess) {
    const content = await Deno.readTextFile(filePath);
    const typeMatch = content.match(/export interface (\w+)Props {\s+["']@type["']\?:\s*["'](\w+)["']/);

    if (!typeMatch) {
      printFileHeader(`⏩ SKIPPED: ${filePath} (no props interface found)`);
      continue;
    }

    const [, propsName, currentType] = typeMatch;
    const typeName = filePath.split("/").slice(-2)[0];
    const newTypeName = `${typeName}Type`;
    let newContent = content;

    // Find child types
    const childTypes: TypeInfo[] = [];
    const dirPath = filePath.replace("/index.ts", "");
    
    try {
      for await (const dirEntry of Deno.readDir(dirPath)) {
        if (dirEntry.isDirectory) {
          childTypes.push({
            typeName: `${dirEntry.name}Type`,
            importPath: `./${dirEntry.name}/index.ts`
          });
        }
      }
    } catch (err) {
      if (!(err instanceof Deno.errors.NotFound)) throw err;
    }

    // 1. Add type definition
    if (!content.includes(`export type ${newTypeName}`)) {
      const typeDef = childTypes.length > 0
        ? `export type ${newTypeName} = "${typeName}" | ${childTypes.map(c => c.typeName).join(" | ")}`
        : `export type ${newTypeName} = "${typeName}"`;
      
      newContent = newContent.replace(
        /(export interface \w+Props {)/,
        `${typeDef}\n\n$1`
      );
    }

    // 2. Update props type reference
    newContent = newContent.replace(
      new RegExp(`(["']@type["']\\?:\\s*)["']${currentType}["']`),
      `$1${newTypeName}`
    );

    // 3. Add imports if needed
    if (childTypes.length > 0 && !content.includes(`import type { ${childTypes[0].typeName} }`)) {
      const imports = childTypes.map(c => 
        `import type { ${c.typeName} } from "${c.importPath}";`
      ).join("\n");
      newContent = imports + "\n\n" + newContent;
    }

    if (dryRun) {
      printFileHeader(filePath);
      console.log(newContent);
    } else {
      await Deno.writeTextFile(filePath, newContent);
      console.log(`✅ Updated ${filePath}`);
    }
  }
}

const dryRun = !Deno.args.includes("--apply");
console.log(`Running in ${dryRun ? "DRY RUN" : "APPLY"} mode`);
await transformFiles(dryRun);

if (dryRun) {
  console.log("\nTo apply these changes, run with --apply flag");
} else {
  console.log("\nAll files updated successfully!");
}