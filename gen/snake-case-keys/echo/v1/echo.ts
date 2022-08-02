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

  fromPartial<I extends Exact<DeepPartial<EchoRequest>, I>>(
    object: I
  ): EchoRequest {
    const message = createBaseEchoRequest();
    message.msg = object.msg ?? "";
    message.longMessage = object.longMessage ?? "";
    return message;
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

  fromPartial<I extends Exact<DeepPartial<EchoResponse>, I>>(
    object: I
  ): EchoResponse {
    const message = createBaseEchoResponse();
    message.wantToCamelCase = object.wantToCamelCase ?? "";
    return message;
  },
};

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<
        Exclude<keyof I, KeysOfUnion<P>>,
        never
      >;

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
