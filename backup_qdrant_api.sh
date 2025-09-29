#!/bin/bash
# Backup Qdrant collections using REST API

TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="qdrant_backup_${TIMESTAMP}"

echo "Creating backup directory: $BACKUP_DIR"
mkdir -p "$BACKUP_DIR"

# Get list of collections
echo "Fetching collection list..."
curl -s http://localhost:6333/collections | jq -r '.result.collections[].name' > "$BACKUP_DIR/collections.txt"

echo "Backing up collections:"
while IFS= read -r collection; do
    echo "  - Backing up: $collection"

    # Get collection info
    curl -s "http://localhost:6333/collections/$collection" > "$BACKUP_DIR/${collection}_info.json"

    # Scroll through all points in the collection
    offset=""
    page=0

    > "$BACKUP_DIR/${collection}_points.json"
    echo "[" >> "$BACKUP_DIR/${collection}_points.json"

    first=true
    while true; do
        if [ -z "$offset" ]; then
            response=$(curl -s -X POST "http://localhost:6333/collections/$collection/points/scroll" \
                -H "Content-Type: application/json" \
                -d '{"limit": 100, "with_payload": true, "with_vector": true}')
        else
            response=$(curl -s -X POST "http://localhost:6333/collections/$collection/points/scroll" \
                -H "Content-Type: application/json" \
                -d "{\"offset\": \"$offset\", \"limit\": 100, \"with_payload\": true, \"with_vector\": true}")
        fi

        points=$(echo "$response" | jq '.result.points')
        new_offset=$(echo "$response" | jq -r '.result.next_page_offset')

        if [ "$points" != "[]" ] && [ "$points" != "null" ]; then
            if [ "$first" = false ]; then
                echo "," >> "$BACKUP_DIR/${collection}_points.json"
            fi
            echo "$points" | jq -c '.[]' | sed 's/^/  /' | paste -sd ',' >> "$BACKUP_DIR/${collection}_points.json"
            first=false
        fi

        if [ "$new_offset" = "null" ]; then
            break
        fi
        offset=$new_offset
        ((page++))
    done

    echo "]" >> "$BACKUP_DIR/${collection}_points.json"

    # Count points
    point_count=$(jq '. | length' "$BACKUP_DIR/${collection}_points.json")
    echo "    ✓ Backed up $point_count points"
done < "$BACKUP_DIR/collections.txt"

# Create manifest
echo "{
  \"timestamp\": \"$TIMESTAMP\",
  \"collections\": $(cat "$BACKUP_DIR/collections.txt" | jq -R . | jq -s .),
  \"backup_dir\": \"$BACKUP_DIR\"
}" > "$BACKUP_DIR/manifest.json"

echo ""
echo "========================================="
echo "✅ Backup complete!"
echo "Location: $BACKUP_DIR"
echo "Collections backed up: $(wc -l < "$BACKUP_DIR/collections.txt")"
echo "========================================="