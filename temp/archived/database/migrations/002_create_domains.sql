CREATE DOMAIN "URL" AS VARCHAR(8192)
CHECK (
	VALUE ~ '^(https?|ftp):\/\/[^\s\/$.?#].[^\s]*$'
);

CREATE DOMAIN "EmailAddress" AS VARCHAR(254)
CHECK (
	VALUE ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
);
