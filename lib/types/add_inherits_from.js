const pathsData = JSON.parse(Deno.readTextFileSync('paths-final.json'));
const typesNeedingImports = Deno.readTextFileSync('types-needing-imports.txt').trim().split('\n');

for (const typeName of typesNeedingImports) {
    if (pathsData[typeName]) {
        const typeData = pathsData[typeName];
        const allPaths = [];
        
        // Process location: split on "/", drop last 2 items
        const locationParts = typeData.location.split('/');
        locationParts.splice(-2); // Remove last 2 items
        allPaths.push(...locationParts);
        
        // Process each reExport: split on "/", drop last 2 items
        for (const reExportPath of typeData.reExports) {
            const reExportParts = reExportPath.split('/');
            reExportParts.splice(-2); // Remove last 2 items
            allPaths.push(...reExportParts);
        }
        
        // Eliminate duplicates
        const inheritedTypes = [...new Set(allPaths)];
        
        // Add inheritsFrom key
        pathsData[typeName].inheritsFrom = inheritedTypes;
    }
}

Deno.writeTextFileSync('paths-final.json', JSON.stringify(pathsData, null, 2));
console.log(`Added inheritsFrom to ${typesNeedingImports.length} types`);
