function parseInheritancePaths() {
    const filePath = './inheritance-paths.txt';
    const content = Deno.readTextFileSync(filePath);
    const lines = content.trim().split('\n');

    // Parse each line to extract inheritance chains
    const inheritanceMap = new Map<string, string[][]>();

    lines.forEach((line) => {  // Fixed: added parentheses around 'line'
        if (line.trim() === '') return;

        const parts = line.split(' < ');
        const leafType = parts[0].trim();
        const chain = parts.map(p => p.trim());

        if (!inheritanceMap.has(leafType)) {
            inheritanceMap.set(leafType, []);
        }
        inheritanceMap.get(leafType)!.push(chain);
    });

    // FIRST PASS: Build the location map by examining actual file structure
    const typeLocations: Record<string, { location: string; reExports: string[] }> = {};

    // Get all type folders
    const findCommand = new Deno.Command("find", {
        args: ["../types/Thing", "-type", "d", "-name", "*"],
        stdout: "piped"
    });

    const output = findCommand.outputSync();
    const folders = new TextDecoder().decode(output.stdout).trim().split('\n');

    for (const folder of folders) {
        if (!folder || folder === '../types/Thing') continue;

        // Extract the type name from the folder path
        const pathParts = folder.replace('../types/', '').split('/');
        const typeName = pathParts[pathParts.length - 1];

        // Check if this folder has an index.ts file
        try {
            Deno.statSync(`${folder}/index.ts`);
            const location = folder.replace('../types/', '') + '/index.ts';

            if (!typeLocations[typeName]) {
                typeLocations[typeName] = { location, reExports: [] };
            } else {
                // This is a re-export location
                typeLocations[typeName].reExports.push(location);
            }
        } catch {
            // No index.ts file in this folder
        }
    }

    // SECOND PASS: Calculate imports for each type
    const result: Record<string, any> = {};

    for (const [typeName, chains] of inheritanceMap) {
        if (!typeLocations[typeName]) continue;

        // Collect all unique ancestors (excluding the type itself and Thing)
        const ancestors = new Set<string>();

        chains.forEach(chain => {
            for (let i = 1; i < chain.length; i++) {
                const ancestor = chain[i];
                if (ancestor !== 'Thing') {
                    ancestors.add(ancestor);
                }
            }
        });

        if (ancestors.size === 0) {
            // This type only inherits from Thing, no Props imports needed
            result[typeName] = {
                location: typeLocations[typeName].location,
                reExports: typeLocations[typeName].reExports,
                imports: []
            };
            continue;
        }

        // Calculate import statements
        const imports: string[] = [];
        const currentLocation = typeLocations[typeName].location;
        const currentPath = currentLocation.split('/').slice(0, -1); // Remove index.ts

        for (const ancestor of ancestors) {
            if (!typeLocations[ancestor]) continue;

            const ancestorLocation = typeLocations[ancestor].location;
            const ancestorPath = ancestorLocation.split('/').slice(0, -1); // Remove index.ts

            // Calculate relative path
            const relativePath = calculateRelativeImportPath(currentPath, ancestorPath);
            imports.push(`import { ${ancestor}Props } from '${relativePath}/index.ts'`);
        }

        result[typeName] = {
            location: currentLocation,
            reExports: typeLocations[typeName].reExports,
            imports: imports
        };
    }

    return result;
}

function calculateRelativeImportPath(fromPath: string[], toPath: string[]): string {
    // Find common ancestor
    let commonIndex = 0;
    while (commonIndex < fromPath.length && commonIndex < toPath.length &&
           fromPath[commonIndex] === toPath[commonIndex]) {
        commonIndex++;
    }

    // Calculate how many levels to go up
    const levelsUp = fromPath.length - commonIndex;

    // Build relative path
    let relativePath = '';
    for (let i = 0; i < levelsUp; i++) {
        relativePath += '../';
    }

    // Add the path down to target
    for (let i = commonIndex; i < toPath.length; i++) {
        relativePath += toPath[i] + '/';
    }

    // Remove trailing slash
    return relativePath.slice(0, -1) || '.';
}

// Run the script
try {
    const result = parseInheritancePaths();

    // Write the result to a JSON file
    const outputPath = './inheritance-types.json';
    Deno.writeTextFileSync(outputPath, JSON.stringify(result, null, 2));

    console.log(`Generated inheritance types for ${Object.keys(result).length} types`);
    console.log(`Output written to: ${outputPath}`);

    // Show the Drug example
    if (result.Drug) {
        console.log('\nDrug example:');
        console.log(JSON.stringify(result.Drug, null, 2));
    }

} catch (error) {
    console.error('Error:', error.message);
}
