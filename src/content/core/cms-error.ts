export type CmsErrorCode =
  | "CONFIGURATION_ERROR"
  | "NETWORK_ERROR"
  | "TIMEOUT"
  | "UPSTREAM_ERROR"
  | "INVALID_RESPONSE";

export class CmsError extends Error {
  constructor(
    message: string,
    public readonly code: CmsErrorCode,
    public readonly status?: number,
  ) {
    super(message);
    this.name = "CmsError";
  }
}
