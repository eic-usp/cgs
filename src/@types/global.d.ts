export {}

declare global {
    export interface ErrorCause {
        code: string;
        values?: unknown[];
    }
}