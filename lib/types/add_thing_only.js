const pathsData = JSON.parse(Deno.readTextFileSync('paths-complete.json'));
const result = {};
const typesNeedingMoreImports = [];

for (const [typeName, typeData] of Object.entries(pathsData)) {
    if (typeData.imports) {
        // Single inheritance - copy unchanged
        result[typeName] = typeData;
    } else {
        // Multiple inheritance - add only Thing import
        const location = typeData.location;
        
        // Count how many levels to go up to reach Thing
        // Remove /TypeName/index.ts to get directory path
        const dirPath = location.replace(/\/[^/]+\/index\.ts$/, '');
        const segments = dirPath.split('/');
        const levelsUp = segments.length;
        const thingPath = '../'.repeat(levelsUp) + 'index.ts';
        
        result[typeName] = {
            location: typeData.location,
            reExports: typeData.reExports,
            imports: [
                `import type Thing from "${thingPath}"`
            ]
        };
        
        // Add to list of types needing more imports
        typesNeedingMoreImports.push(typeName);
    }
}

Deno.writeTextFileSync('paths-final.json', JSON.stringify(result, null, 2));
Deno.writeTextFileSync('types-needing-imports.txt', typesNeedingMoreImports.join('\n'));

console.log(`Processed ${Object.keys(result).length} types`);
console.log(`Single inheritance (unchanged): ${Object.keys(result).filter(k => !typesNeedingMoreImports.includes(k)).length}`);
console.log(`Multiple inheritance (Thing import added): ${typesNeedingMoreImports.length}`);
console.log(`List of types needing more imports saved to types-needing-imports.txt`);
