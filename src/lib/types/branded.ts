// Branded types for type-safe primitives

declare const brand: unique symbol;

export type Brand<T, B> = T & { [brand]: B };

// Domain-specific branded types
export type UserId = Brand<string, 'UserId'>;
export type PostId = Brand<string, 'PostId'>;
export type Email = Brand<string, 'Email'>;
export type JWT = Brand<string, 'JWT'>;
export type Timestamp = Brand<number, 'Timestamp'>;
export type UUID = Brand<string, 'UUID'>;
export type Slug = Brand<string, 'Slug'>;
export type Url = Brand<string, 'Url'>;

