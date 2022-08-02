/* eslint-disable */
export const protobufPackage = "services.echo.v1";

export interface EchoRequest {
  msg: string;
  long_message: string;
}

export interface EchoResponse {
  want_to_camel_case: string;
}

function createBaseEchoRequest(): EchoRequest {
  return { msg: "", long_message: "" };
}

export const EchoRequest = {
  fromJSON(object: any): EchoRequest {
    return {
      msg: isSet(object.msg) ? String(object.msg) : "",
      long_message: isSet(object.long) ? String(object.long) : "",
    };
  },

  toJSON(message: EchoRequest): unknown {
    const obj: any = {};
    message.msg !== undefined && (obj.msg = message.msg);
    message.long_message !== undefined && (obj.long = message.long_message);
    return obj;
  },
};

function createBaseEchoResponse(): EchoResponse {
  return { want_to_camel_case: "" };
}

export const EchoResponse = {
  fromJSON(object: any): EchoResponse {
    return {
      want_to_camel_case: isSet(object.wantToCamelCase)
        ? String(object.wantToCamelCase)
        : "",
    };
  },

  toJSON(message: EchoResponse): unknown {
    const obj: any = {};
    message.want_to_camel_case !== undefined &&
      (obj.wantToCamelCase = message.want_to_camel_case);
    return obj;
  },
};

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
