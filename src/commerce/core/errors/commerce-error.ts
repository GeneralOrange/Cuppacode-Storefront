export type CommerceErrorCode =
  | "CONFIGURATION_ERROR"
  | "NETWORK_ERROR"
  | "NOT_FOUND"
  | "VALIDATION_ERROR"
  | "UNKNOWN_ERROR";

export class CommerceError extends Error {
  constructor(
    message: string,
    public readonly code: CommerceErrorCode,
    public readonly status?: number,
  ) {
    super(message);
    this.name = "CommerceError";
  }
}
