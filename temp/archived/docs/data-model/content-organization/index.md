# Content Organization

How we structure and categorize content, including hierarchical relationships and tagging systems.

## Philosophy

**Flexible Hierarchy**: Content organization supports both structured hierarchies and flexible cross-cutting categorization through tags and relationships.

## Hierarchical Structure

### Tree Relationships

Content can be organized in parent-child hierarchies using self-referencing foreign keys:

```sql
-- Posts can have parent posts (for threading, series, etc.)
ALTER TABLE posts ADD COLUMN parent_id UUID 
  REFERENCES posts(id) ON DELETE CASCADE;

-- Categories form a hierarchy
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  parent_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  depth INTEGER NOT NULL DEFAULT 0,
  path LTREE,  -- Materialized path for efficient queries
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

**Materialized Paths**: Using PostgreSQL's `LTREE` extension for efficient hierarchy queries:

```sql
-- Enable ltree extension
CREATE EXTENSION IF NOT EXISTS ltree;

-- Automatically maintain path on insert/update
CREATE OR REPLACE FUNCTION update_category_path()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.parent_id IS NULL THEN
    NEW.path = NEW.slug::ltree;
    NEW.depth = 0;
  ELSE
    SELECT path || NEW.slug::ltree, depth + 1
    INTO NEW.path, NEW.depth
    FROM categories 
    WHERE id = NEW.parent_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

### Content Collections

Group related content without strict hierarchy:

```sql
CREATE TABLE collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  type collection_type NOT NULL,  -- 'series', 'bundle', 'playlist', etc.
  is_public BOOLEAN NOT NULL DEFAULT false,
  owner_id UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Many-to-many relationship with ordering
CREATE TABLE collection_items (
  collection_id UUID NOT NULL REFERENCES collections(id) ON DELETE CASCADE,
  content_id UUID NOT NULL,  -- Can reference multiple content types
  content_type TEXT NOT NULL,  -- 'post', 'page', 'media', etc.
  sort_order INTEGER NOT NULL DEFAULT 0,
  added_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (collection_id, content_id, content_type)
);
```

## Tagging System

### Flexible Categorization

Tags provide flexible, non-hierarchical categorization:

```sql
CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  color TEXT,  -- Hex color for UI
  usage_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Many-to-many content tagging
CREATE TABLE content_tags (
  content_id UUID NOT NULL,
  content_type TEXT NOT NULL,
  tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  tagged_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  tagged_by UUID REFERENCES users(id),
  PRIMARY KEY (content_id, content_type, tag_id)
);
```

### Tag Management

Automatic tag statistics and cleanup:

```sql
-- Update tag usage counts
CREATE OR REPLACE FUNCTION update_tag_usage()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE tags SET usage_count = usage_count + 1 WHERE id = NEW.tag_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE tags SET usage_count = usage_count - 1 WHERE id = OLD.tag_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tag_usage_trigger
  AFTER INSERT OR DELETE ON content_tags
  FOR EACH ROW EXECUTE FUNCTION update_tag_usage();
```

## Content Relationships

### Cross-References

Content can reference other content:

```sql
CREATE TABLE content_references (
  source_id UUID NOT NULL,
  source_type TEXT NOT NULL,
  target_id UUID NOT NULL,
  target_type TEXT NOT NULL,
  relationship_type reference_type NOT NULL,  -- 'related', 'prerequisite', 'follow_up'
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (source_id, source_type, target_id, target_type)
);
```

### Content Linking

Bidirectional relationships with automatic maintenance:

```sql
-- Automatically create reverse relationships
CREATE OR REPLACE FUNCTION maintain_content_relationships()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    -- Create reverse relationship if it doesn't exist
    INSERT INTO content_references (
      source_id, source_type, target_id, target_type, relationship_type
    ) VALUES (
      NEW.target_id, NEW.target_type, NEW.source_id, NEW.source_type, 'related'
    ) ON CONFLICT DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

## Generated TypeScript Organization

The type system captures organizational structure:

```typescript
// Auto-generated from schema
interface ContentHierarchy {
  id: string;
  parentId?: string;
  children: ContentHierarchy[];
  path: string[];  // Materialized path as array
  depth: number;
}

interface TaggedContent {
  id: string;
  type: ContentType;
  tags: Tag[];
  categories: Category[];
  collections: Collection[];
  references: ContentReference[];
}

// Organizational query methods
class ContentRepository {
  async findByCategory(categoryPath: string): Promise<Content[]> {
    // Uses ltree path matching
    return await this.query(`
      SELECT c.* FROM content c
      JOIN categories cat ON c.category_id = cat.id
      WHERE cat.path ~ $1::lquery
    `, [categoryPath]);
  }
  
  async findRelatedContent(contentId: string): Promise<Content[]> {
    // Finds content through tags, categories, and explicit references
    return await this.query(`
      SELECT DISTINCT target.* FROM content target
      WHERE target.id IN (
        -- Same tags
        SELECT ct2.content_id FROM content_tags ct1
        JOIN content_tags ct2 ON ct1.tag_id = ct2.tag_id
        WHERE ct1.content_id = $1 AND ct2.content_id != $1
        
        UNION
        
        -- Explicit references  
        SELECT cr.target_id FROM content_references cr
        WHERE cr.source_id = $1
      )
    `, [contentId]);
  }
}
```

## Organization Patterns

### Content Types

Different content types have different organizational needs:

```sql
-- Blog posts: chronological + categorical
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  published_at TIMESTAMPTZ,
  category_id UUID REFERENCES categories(id),
  series_id UUID REFERENCES collections(id),
  -- ...other fields
);

-- Documentation: hierarchical structure
CREATE TABLE docs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  parent_id UUID REFERENCES docs(id),
  sort_order INTEGER NOT NULL DEFAULT 0,
  path LTREE NOT NULL,
  -- ...other fields
);
```

### Navigation Generation

Automatic navigation structure from content organization:

```sql
-- Generate breadcrumb navigation
CREATE OR REPLACE FUNCTION get_breadcrumbs(content_path LTREE)
RETURNS TABLE(id UUID, title TEXT, slug TEXT, depth INTEGER) AS $$
BEGIN
  RETURN QUERY
  SELECT c.id, c.title, c.slug, nlevel(c.path) as depth
  FROM categories c
  WHERE c.path @> content_path
  ORDER BY c.depth;
END;
$$ LANGUAGE plpgsql;
```

## Search Integration

### Full-Text Search

Content organization enhances search relevance:

```sql
-- Search with organizational boost
CREATE OR REPLACE FUNCTION search_content(query_text TEXT)
RETURNS TABLE(content_id UUID, relevance REAL) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    c.id,
    ts_rank(
      setweight(to_tsvector(c.title), 'A') ||
      setweight(to_tsvector(c.content), 'B') ||
      setweight(to_tsvector(string_agg(t.name, ' ')), 'C'),
      plainto_tsquery(query_text)
    ) as relevance
  FROM content c
  LEFT JOIN content_tags ct ON c.id = ct.content_id
  LEFT JOIN tags t ON ct.tag_id = t.id
  GROUP BY c.id, c.title, c.content
  ORDER BY relevance DESC;
END;
$$ LANGUAGE plpgsql;
```

### Faceted Search

Organization enables faceted search interfaces:

```typescript
interface SearchFacets {
  categories: Array<{ name: string; count: number; path: string }>;
  tags: Array<{ name: string; count: number; slug: string }>;
  contentTypes: Array<{ type: ContentType; count: number }>;
  dateRanges: Array<{ range: string; count: number }>;
}
```

> **📖 Related Documentation**  
> - **[Data Integrity](../data-integrity/index.md)** - Constraints that ensure valid organization
> - **[Activity Tracking](../activity-tracking/index.md)** - How organizational changes are logged
> - **[User Identity](../user-identity/index.md)** - User-specific content organization
