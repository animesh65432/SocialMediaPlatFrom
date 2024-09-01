"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessResponse = SuccessResponse;
exports.RejectResponse = RejectResponse;
function SuccessResponse(res, data, code, messages) {
    return res.status(code).json({
        sucess: true,
        data: data,
        messages: messages,
    });
}
function RejectResponse(res, messages, code) {
    return res.status(code).json({
        sucess: false,
        messages: messages,
    });
}
