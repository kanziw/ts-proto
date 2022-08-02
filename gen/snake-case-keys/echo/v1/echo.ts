/* eslint-disable */
export const protobufPackage = "services.echo.v1";

export interface EchoRequest {
  msg: string;
  longMessage: string;
}

export interface EchoResponse {
  wantToCamelCase: string;
}

function createBaseEchoRequest(): EchoRequest {
  return { msg: "", longMessage: "" };
}

export const EchoRequest = {
  fromJSON(object: any): EchoRequest {
    return {
      msg: isSet(object.msg) ? String(object.msg) : "",
      longMessage: isSet(object.long_message)
        ? String(object.long_message)
        : "",
    };
  },

  toJSON(message: EchoRequest): unknown {
    const obj: any = {};
    message.msg !== undefined && (obj.msg = message.msg);
    message.longMessage !== undefined &&
      (obj.long_message = message.longMessage);
    return obj;
  },
};

function createBaseEchoResponse(): EchoResponse {
  return { wantToCamelCase: "" };
}

export const EchoResponse = {
  fromJSON(object: any): EchoResponse {
    return {
      wantToCamelCase: isSet(object.want_to_camel_case)
        ? String(object.want_to_camel_case)
        : "",
    };
  },

  toJSON(message: EchoResponse): unknown {
    const obj: any = {};
    message.wantToCamelCase !== undefined &&
      (obj.want_to_camel_case = message.wantToCamelCase);
    return obj;
  },
};

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
