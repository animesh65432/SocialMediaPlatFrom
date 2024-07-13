import { Response } from "express";

function SucessResponse(
  res: Response,
  data: object,
  code: number,
  messages?: string
) {
  return res.status(code).json({
    sucess: true,
    data,
    messages,
  });
}
function RejectResponse(res: Response, messages: string, code: number) {
  return res.status(code).json({
    sucess: true,
    messages,
  });
}
export { SucessResponse, RejectResponse };
