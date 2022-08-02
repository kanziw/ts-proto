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
      long_message: isSet(object.long_message)
        ? String(object.long_message)
        : "",
    };
  },

  toJSON(message: EchoRequest): unknown {
    const obj: any = {};
    message.msg !== undefined && (obj.msg = message.msg);
    message.long_message !== undefined &&
      (obj.long_message = message.long_message);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EchoRequest>, I>>(
    object: I
  ): EchoRequest {
    const message = createBaseEchoRequest();
    message.msg = object.msg ?? "";
    message.long_message = object.long_message ?? "";
    return message;
  },
};

function createBaseEchoResponse(): EchoResponse {
  return { want_to_camel_case: "" };
}

export const EchoResponse = {
  fromJSON(object: any): EchoResponse {
    return {
      want_to_camel_case: isSet(object.want_to_camel_case)
        ? String(object.want_to_camel_case)
        : "",
    };
  },

  toJSON(message: EchoResponse): unknown {
    const obj: any = {};
    message.want_to_camel_case !== undefined &&
      (obj.want_to_camel_case = message.want_to_camel_case);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EchoResponse>, I>>(
    object: I
  ): EchoResponse {
    const message = createBaseEchoResponse();
    message.want_to_camel_case = object.want_to_camel_case ?? "";
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
