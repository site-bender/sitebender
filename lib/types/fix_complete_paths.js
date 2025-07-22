const originalPaths = JSON.parse(Deno.readTextFileSync('paths.json'));
const singleInheritancePaths = JSON.parse(Deno.readTextFileSync('paths-single.json'));

const result = {};

for (const [typeName, typeData] of Object.entries(originalPaths)) {
    if (typeData.reExports.length === 0) {
        // Single inheritance - use the version with imports from paths-single.json
        result[typeName] = singleInheritancePaths[typeName];
    } else {
        // Multiple inheritance - copy unchanged from original (no imports array)
        result[typeName] = {
            location: typeData.location,
            reExports: typeData.reExports
        };
    }
}

Deno.writeTextFileSync('paths-complete.json', JSON.stringify(result, null, 2));
console.log(`Complete file with ${Object.keys(result).length} types`);
console.log(`Single inheritance types (with imports): ${Object.keys(result).filter(k => result[k].imports).length}`);
console.log(`Multiple inheritance types (no imports): ${Object.keys(result).filter(k => !result[k].imports).length}`);
