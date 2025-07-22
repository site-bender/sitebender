const pathsData = JSON.parse(Deno.readTextFileSync('paths-complete.json'));
const result = {};

// Helper function to extract types from a path
function extractTypesFromPath(path) {
    const pathWithoutFile = path.replace(/\/[^/]+\/index\.ts$/, '');
    return pathWithoutFile.split('/');
}

// Helper function to calculate relative path
function calculateRelativePath(fromLocation, toLocation) {
    // Get directory paths (remove TypeName/index.ts)
    const fromPath = fromLocation.replace(/\/[^/]+\/index\.ts$/, '');
    const toPath = toLocation.replace(/\/[^/]+\/index\.ts$/, '');
    
    const fromSegments = fromPath.split('/');
    const toSegments = toPath.split('/');
    
    // Find common prefix length
    let commonLength = 0;
    for (let i = 0; i < Math.min(fromSegments.length, toSegments.length); i++) {
        if (fromSegments[i] === toSegments[i]) {
            commonLength++;
        } else {
            break;
        }
    }
    
    // Calculate how many levels to go up from source
    const upLevels = fromSegments.length - commonLength;
    
    // Calculate path down to target
    const downSegments = toSegments.slice(commonLength);
    
    // Build relative path
    let relativePath = '../'.repeat(upLevels);
    if (downSegments.length > 0) {
        relativePath += downSegments.join('/') + '/';
    }
    relativePath += 'index.ts';
    
    return relativePath;
}

for (const [typeName, typeData] of Object.entries(pathsData)) {
    if (typeData.imports) {
        // Already has imports (single inheritance), copy as-is
        result[typeName] = typeData;
    } else {
        // Multiple inheritance - calculate imports
        const allTypes = new Set();
        
        // Add types from primary location
        const locationTypes = extractTypesFromPath(typeData.location);
        locationTypes.forEach(type => allTypes.add(type));
        
        // Add types from reExports
        for (const reExportPath of typeData.reExports) {
            const reExportTypes = extractTypesFromPath(reExportPath);
            reExportTypes.forEach(type => allTypes.add(type));
        }
        
        // Remove current type
        allTypes.delete(typeName);
        
        // Generate imports
        const imports = [];
        for (const ancestorType of allTypes) {
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
        
        // Sort: Thing first, then alphabetical
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
console.log(`Fixed final paths with ${Object.keys(result).length} types`);
