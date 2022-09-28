import { errorMsg, httpCode } from "../const";
export default function throwError(
  error: any = errorMsg.INTERNAL_SERVER_ERROR,
  code: number = httpCode.INTERNAL_SERVER_ERROR,
  details: any = ""
) {
  throw new CustomError(error, code, details);
}

export class CustomError extends Error {
  constructor(error: any, public code?: number, public details?: any) {
    super(error?.message ?? error);
    if (error instanceof Error) {
      this.stack = error.stack;
      this.name = error.name;
    }
  }
}
