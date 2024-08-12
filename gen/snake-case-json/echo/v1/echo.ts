/* eslint-disable */
export const protobufPackage = "services.echo.v1";

export interface EchoRequest {
  msg: string;
  long_message: string;
  want_to_camel_case: string;
}

export interface EchoResponse {}

function createBaseEchoRequest(): EchoRequest {
  return { msg: "", long_message: "", want_to_camel_case: "" };
}

export const EchoRequest = {
  fromJSON(object: any): EchoRequest {
    return {
      msg: isSet(object.msg) ? String(object.msg) : "",
      long_message: isSet(object.long) ? String(object.long) : "",
      want_to_camel_case: isSet(object.wantToCamelCase)
        ? String(object.wantToCamelCase)
        : "",
    };
  },

  toJSON(message: EchoRequest): unknown {
    const obj: any = {};
    message.msg !== undefined && (obj.msg = message.msg);
    message.long_message !== undefined && (obj.long = message.long_message);
    message.want_to_camel_case !== undefined &&
      (obj.wantToCamelCase = message.want_to_camel_case);
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
