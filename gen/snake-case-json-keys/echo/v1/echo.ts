/* eslint-disable */
export const protobufPackage = "services.echo.v1";

export interface EchoRequest {
  msg: string;
  longMessage: string;
  wantToCamelCase: string;
}

export interface EchoResponse {}

function createBaseEchoRequest(): EchoRequest {
  return { msg: "", longMessage: "", wantToCamelCase: "" };
}

export const EchoRequest = {
  fromJSON(object: any): EchoRequest {
    return {
      msg: isSet(object.msg) ? String(object.msg) : "",
      longMessage: isSet(object.long) ? String(object.long) : "",
      wantToCamelCase: isSet(object.wantToCamelCase)
        ? String(object.wantToCamelCase)
        : "",
    };
  },

  toJSON(message: EchoRequest): unknown {
    const obj: any = {};
    message.msg !== undefined && (obj.msg = message.msg);
    message.longMessage !== undefined && (obj.long = message.longMessage);
    message.wantToCamelCase !== undefined &&
      (obj.wantToCamelCase = message.wantToCamelCase);
    return obj;
  },
};

function createBaseEchoResponse(): EchoResponse {
  return {};
}

export const EchoResponse = {
  fromJSON(_: any): EchoResponse {
    return {};
  },

  toJSON(_: EchoResponse): unknown {
    const obj: any = {};
    return obj;
  },
};

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
