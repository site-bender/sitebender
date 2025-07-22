const pathsData = JSON.parse(Deno.readTextFileSync('paths-complete.json'));
const result = {};

// Helper function to extract types from a path
function extractTypesFromPath(path) {
    // Remove /TypeName/index.ts from end to get inheritance chain
    const pathWithoutFile = path.replace(/\/[^/]+\/index\.ts$/, '');
    return pathWithoutFile.split('/');
}

// Helper function to calculate relative path using common prefix logic
function calculateRelativePath(fromLocation, toLocation) {
    // Get the directory path of target (remove /TypeName/index.ts)
    const toPath = toLocation.replace(/\/[^/]+\/index\.ts$/, '');
    const toSegments = toPath.split('/');
    
    // Get the directory path of source (remove /TypeName/index.ts)
    const fromPath = fromLocation.replace(/\/[^/]+\/index\.ts$/, '');
    const fromSegments = fromPath.split('/');
    
    // Find common prefix
    let commonLength = 0;
    for (let i = 0; i < Math.min(fromSegments.length, toSegments.length); i++) {
        if (fromSegments[i] === toSegments[i]) {
            commonLength++;
        } else {
            break;
        }
    }
    
    // Calculate relative path
    const upLevels = fromSegments.length - commonLength;
    const downPath = toSegments.slice(commonLength);
    
    let relativePath = '../'.repeat(upLevels);
    if (downPath.length > 0) {
        relativePath += downPath.join('/') + '/';
    }
    relativePath += 'index.ts';
    
    return relativePath;
}

for (const [typeName, typeData] of Object.entries(pathsData)) {
    if (typeData.imports) {
        // Already has imports (single inheritance), copy as-is
        result[typeName] = typeData;
    } else {
        // Multiple inheritance - need to calculate imports
        const allTypes = new Set();
        
        // Add types from primary location
        const locationTypes = extractTypesFromPath(typeData.location);
        locationTypes.forEach(type => allTypes.add(type));
        
        // Add types from all reExports
        for (const reExportPath of typeData.reExports) {
            const reExportTypes = extractTypesFromPath(reExportPath);
            reExportTypes.forEach(type => allTypes.add(type));
        }
        
        // Remove the current type from the set (don't import self)
        allTypes.delete(typeName);
        
        // Generate imports
        const imports = [];
        for (const ancestorType of allTypes) {
            // Look up the primary location of this ancestor type
            if (pathsData[ancestorType]) {
                const ancestorLocation = pathsData[ancestorType].location;
                const relativePath = calculateRelativePath(typeData.location, ancestorLocation);
                
                if (ancestorType === 'Thing') {
                    imports.push(`import type Thing from "${relativePath}"`);
                } else {
                    imports.push(`import type { ${ancestorType}Props } from "${relativePath}"`);
                }
            }
        }
        
        // Sort imports for consistency (Thing first, then alphabetical)
        imports.sort((a, b) => {
            if (a.includes('Thing from')) return -1;
            if (b.includes('Thing from')) return 1;
            return a.localeCompare(b);
        });
        
        result[typeName] = {
            location: typeData.location,
            reExports: typeData.reExports,
            imports: imports
        };
    }
}

Deno.writeTextFileSync('paths-final.json', JSON.stringify(result, null, 2));
console.log(`Generated final paths with ${Object.keys(result).length} types`);
console.log(`All types now have imports arrays`);
