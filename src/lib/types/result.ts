// Result types for error handling without exceptions

import { Result, Ok, Err } from 'neverthrow';

export { Result, Ok, Err };

export type AsyncResult<T, E> = Promise<Result<T, E>>;

// Common error types
export type ParseError = 
  | 'INVALID_JSON' 
  | 'MISSING_FIELD' 
  | 'TYPE_MISMATCH'
  | 'VALIDATION_FAILED';

export type DbError =
  | 'NOT_FOUND'
  | 'DUPLICATE_ENTRY'
  | 'CONNECTION_ERROR'
  | 'CONSTRAINT_VIOLATION';

export type AuthError =
  | 'INVALID_CREDENTIALS'
  | 'SESSION_EXPIRED'
  | 'INSUFFICIENT_PERMISSIONS'
  | 'USER_NOT_FOUND';

export type ContentError =
  | 'CONTENT_NOT_FOUND'
  | 'INVALID_SLUG'
  | 'MALFORMED_FRONTMATTER';

export type FetchError<T extends string = string> = {
  code: T;
  message: string;
  cause?: unknown;
};

