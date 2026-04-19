export interface Logger {
  log: (message: any) => void;
  error: (message: any) => void;
}
export const noopLogger: Logger = {
  log: (_message: any): void => {},
  error: (_message: any): void => {}
};
