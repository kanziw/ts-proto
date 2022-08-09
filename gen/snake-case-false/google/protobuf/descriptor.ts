/* eslint-disable */
export const protobufPackage = "google.protobuf";

/**
 * The protocol compiler can output a FileDescriptorSet containing the .proto
 * files it parses.
 */
export interface FileDescriptorSet {
  file: FileDescriptorProto[];
}

/** Describes a complete .proto file. */
export interface FileDescriptorProto {
  /** file name, relative to root of source tree */
  name: string;
  /** e.g. "foo", "foo.bar", etc. */
  package: string;
  /** Names of files imported by this file. */
  dependency: string[];
  /** Indexes of the public imported files in the dependency list above. */
  public_dependency: number[];
  /**
   * Indexes of the weak imported files in the dependency list.
   * For Google-internal migration only. Do not use.
   */
  weak_dependency: number[];
  /** All top-level definitions in this file. */
  message_type: DescriptorProto[];
  enum_type: EnumDescriptorProto[];
  service: ServiceDescriptorProto[];
  extension: FieldDescriptorProto[];
  options?: FileOptions;
  /**
   * This field contains optional information about the original source code.
   * You may safely remove this entire field without harming runtime
   * functionality of the descriptors -- the information is needed only by
   * development tools.
   */
  source_code_info?: SourceCodeInfo;
  /**
   * The syntax of the proto file.
   * The supported values are "proto2" and "proto3".
   */
  syntax: string;
}

/** Describes a message type. */
export interface DescriptorProto {
  name: string;
  field: FieldDescriptorProto[];
  extension: FieldDescriptorProto[];
  nested_type: DescriptorProto[];
  enum_type: EnumDescriptorProto[];
  extension_range: DescriptorProto_ExtensionRange[];
  oneof_decl: OneofDescriptorProto[];
  options?: MessageOptions;
  reserved_range: DescriptorProto_ReservedRange[];
  /**
   * Reserved field names, which may not be used by fields in the same message.
   * A given name may only be reserved once.
   */
  reserved_name: string[];
}

export interface DescriptorProto_ExtensionRange {
  /** Inclusive. */
  start: number;
  /** Exclusive. */
  end: number;
  options?: ExtensionRangeOptions;
}

/**
 * Range of reserved tag numbers. Reserved tag numbers may not be used by
 * fields or extension ranges in the same message. Reserved ranges may
 * not overlap.
 */
export interface DescriptorProto_ReservedRange {
  /** Inclusive. */
  start: number;
  /** Exclusive. */
  end: number;
}

export interface ExtensionRangeOptions {
  /** The parser stores options it doesn't recognize here. See above. */
  uninterpreted_option: UninterpretedOption[];
}

/** Describes a field within a message. */
export interface FieldDescriptorProto {
  name: string;
  number: number;
  label: FieldDescriptorProto_Label;
  /**
   * If type_name is set, this need not be set.  If both this and type_name
   * are set, this must be one of TYPE_ENUM, TYPE_MESSAGE or TYPE_GROUP.
   */
  type: FieldDescriptorProto_Type;
  /**
   * For message and enum types, this is the name of the type.  If the name
   * starts with a '.', it is fully-qualified.  Otherwise, C++-like scoping
   * rules are used to find the type (i.e. first the nested types within this
   * message are searched, then within the parent, on up to the root
   * namespace).
   */
  type_name: string;
  /**
   * For extensions, this is the name of the type being extended.  It is
   * resolved in the same manner as type_name.
   */
  extendee: string;
  /**
   * For numeric types, contains the original text representation of the value.
   * For booleans, "true" or "false".
   * For strings, contains the default text contents (not escaped in any way).
   * For bytes, contains the C escaped value.  All bytes >= 128 are escaped.
   * TODO(kenton):  Base-64 encode?
   */
  default_value: string;
  /**
   * If set, gives the index of a oneof in the containing type's oneof_decl
   * list.  This field is a member of that oneof.
   */
  oneof_index: number;
  /**
   * JSON name of this field. The value is set by protocol compiler. If the
   * user has set a "json_name" option on this field, that option's value
   * will be used. Otherwise, it's deduced from the field's name by converting
   * it to camelCase.
   */
  json_name: string;
  options?: FieldOptions;
  /**
   * If true, this is a proto3 "optional". When a proto3 field is optional, it
   * tracks presence regardless of field type.
   *
   * When proto3_optional is true, this field must be belong to a oneof to
   * signal to old proto3 clients that presence is tracked for this field. This
   * oneof is known as a "synthetic" oneof, and this field must be its sole
   * member (each proto3 optional field gets its own synthetic oneof). Synthetic
   * oneofs exist in the descriptor only, and do not generate any API. Synthetic
   * oneofs must be ordered after all "real" oneofs.
   *
   * For message fields, proto3_optional doesn't create any semantic change,
   * since non-repeated message fields always track presence. However it still
   * indicates the semantic detail of whether the user wrote "optional" or not.
   * This can be useful for round-tripping the .proto file. For consistency we
   * give message fields a synthetic oneof also, even though it is not required
   * to track presence. This is especially important because the parser can't
   * tell if a field is a message or an enum, so it must always create a
   * synthetic oneof.
   *
   * Proto2 optional fields do not set this flag, because they already indicate
   * optional with `LABEL_OPTIONAL`.
   */
  proto3_optional: boolean;
}

export enum FieldDescriptorProto_Type {
  /**
   * TYPE_DOUBLE - 0 is reserved for errors.
   * Order is weird for historical reasons.
   */
  TYPE_DOUBLE = "TYPE_DOUBLE",
  TYPE_FLOAT = "TYPE_FLOAT",
  /**
   * TYPE_INT64 - Not ZigZag encoded.  Negative numbers take 10 bytes.  Use TYPE_SINT64 if
   * negative values are likely.
   */
  TYPE_INT64 = "TYPE_INT64",
  TYPE_UINT64 = "TYPE_UINT64",
  /**
   * TYPE_INT32 - Not ZigZag encoded.  Negative numbers take 10 bytes.  Use TYPE_SINT32 if
   * negative values are likely.
   */
  TYPE_INT32 = "TYPE_INT32",
  TYPE_FIXED64 = "TYPE_FIXED64",
  TYPE_FIXED32 = "TYPE_FIXED32",
  TYPE_BOOL = "TYPE_BOOL",
  TYPE_STRING = "TYPE_STRING",
  /**
   * TYPE_GROUP - Tag-delimited aggregate.
   * Group type is deprecated and not supported in proto3. However, Proto3
   * implementations should still be able to parse the group wire format and
   * treat group fields as unknown fields.
   */
  TYPE_GROUP = "TYPE_GROUP",
  /** TYPE_MESSAGE - Length-delimited aggregate. */
  TYPE_MESSAGE = "TYPE_MESSAGE",
  /** TYPE_BYTES - New in version 2. */
  TYPE_BYTES = "TYPE_BYTES",
  TYPE_UINT32 = "TYPE_UINT32",
  TYPE_ENUM = "TYPE_ENUM",
  TYPE_SFIXED32 = "TYPE_SFIXED32",
  TYPE_SFIXED64 = "TYPE_SFIXED64",
  /** TYPE_SINT32 - Uses ZigZag encoding. */
  TYPE_SINT32 = "TYPE_SINT32",
  /** TYPE_SINT64 - Uses ZigZag encoding. */
  TYPE_SINT64 = "TYPE_SINT64",
}

export function fieldDescriptorProto_TypeFromJSON(
  object: any
): FieldDescriptorProto_Type {
  switch (object) {
    case 1:
    case "TYPE_DOUBLE":
      return FieldDescriptorProto_Type.TYPE_DOUBLE;
    case 2:
    case "TYPE_FLOAT":
      return FieldDescriptorProto_Type.TYPE_FLOAT;
    case 3:
    case "TYPE_INT64":
      return FieldDescriptorProto_Type.TYPE_INT64;
    case 4:
    case "TYPE_UINT64":
      return FieldDescriptorProto_Type.TYPE_UINT64;
    case 5:
    case "TYPE_INT32":
      return FieldDescriptorProto_Type.TYPE_INT32;
    case 6:
    case "TYPE_FIXED64":
      return FieldDescriptorProto_Type.TYPE_FIXED64;
    case 7:
    case "TYPE_FIXED32":
      return FieldDescriptorProto_Type.TYPE_FIXED32;
    case 8:
    case "TYPE_BOOL":
      return FieldDescriptorProto_Type.TYPE_BOOL;
    case 9:
    case "TYPE_STRING":
      return FieldDescriptorProto_Type.TYPE_STRING;
    case 10:
    case "TYPE_GROUP":
      return FieldDescriptorProto_Type.TYPE_GROUP;
    case 11:
    case "TYPE_MESSAGE":
      return FieldDescriptorProto_Type.TYPE_MESSAGE;
    case 12:
    case "TYPE_BYTES":
      return FieldDescriptorProto_Type.TYPE_BYTES;
    case 13:
    case "TYPE_UINT32":
      return FieldDescriptorProto_Type.TYPE_UINT32;
    case 14:
    case "TYPE_ENUM":
      return FieldDescriptorProto_Type.TYPE_ENUM;
    case 15:
    case "TYPE_SFIXED32":
      return FieldDescriptorProto_Type.TYPE_SFIXED32;
    case 16:
    case "TYPE_SFIXED64":
      return FieldDescriptorProto_Type.TYPE_SFIXED64;
    case 17:
    case "TYPE_SINT32":
      return FieldDescriptorProto_Type.TYPE_SINT32;
    case 18:
    case "TYPE_SINT64":
      return FieldDescriptorProto_Type.TYPE_SINT64;
    default:
      throw new globalThis.Error(
        "Unrecognized enum value " +
          object +
          " for enum FieldDescriptorProto_Type"
      );
  }
}

export function fieldDescriptorProto_TypeToJSON(
  object: FieldDescriptorProto_Type
): string {
  switch (object) {
    case FieldDescriptorProto_Type.TYPE_DOUBLE:
      return "TYPE_DOUBLE";
    case FieldDescriptorProto_Type.TYPE_FLOAT:
      return "TYPE_FLOAT";
    case FieldDescriptorProto_Type.TYPE_INT64:
      return "TYPE_INT64";
    case FieldDescriptorProto_Type.TYPE_UINT64:
      return "TYPE_UINT64";
    case FieldDescriptorProto_Type.TYPE_INT32:
      return "TYPE_INT32";
    case FieldDescriptorProto_Type.TYPE_FIXED64:
      return "TYPE_FIXED64";
    case FieldDescriptorProto_Type.TYPE_FIXED32:
      return "TYPE_FIXED32";
    case FieldDescriptorProto_Type.TYPE_BOOL:
      return "TYPE_BOOL";
    case FieldDescriptorProto_Type.TYPE_STRING:
      return "TYPE_STRING";
    case FieldDescriptorProto_Type.TYPE_GROUP:
      return "TYPE_GROUP";
    case FieldDescriptorProto_Type.TYPE_MESSAGE:
      return "TYPE_MESSAGE";
    case FieldDescriptorProto_Type.TYPE_BYTES:
      return "TYPE_BYTES";
    case FieldDescriptorProto_Type.TYPE_UINT32:
      return "TYPE_UINT32";
    case FieldDescriptorProto_Type.TYPE_ENUM:
      return "TYPE_ENUM";
    case FieldDescriptorProto_Type.TYPE_SFIXED32:
      return "TYPE_SFIXED32";
    case FieldDescriptorProto_Type.TYPE_SFIXED64:
      return "TYPE_SFIXED64";
    case FieldDescriptorProto_Type.TYPE_SINT32:
      return "TYPE_SINT32";
    case FieldDescriptorProto_Type.TYPE_SINT64:
      return "TYPE_SINT64";
    default:
      throw new globalThis.Error(
        "Unrecognized enum value " +
          object +
          " for enum FieldDescriptorProto_Type"
      );
  }
}

export enum FieldDescriptorProto_Label {
  /** LABEL_OPTIONAL - 0 is reserved for errors */
  LABEL_OPTIONAL = "LABEL_OPTIONAL",
  LABEL_REQUIRED = "LABEL_REQUIRED",
  LABEL_REPEATED = "LABEL_REPEATED",
}

export function fieldDescriptorProto_LabelFromJSON(
  object: any
): FieldDescriptorProto_Label {
  switch (object) {
    case 1:
    case "LABEL_OPTIONAL":
      return FieldDescriptorProto_Label.LABEL_OPTIONAL;
    case 2:
    case "LABEL_REQUIRED":
      return FieldDescriptorProto_Label.LABEL_REQUIRED;
    case 3:
    case "LABEL_REPEATED":
      return FieldDescriptorProto_Label.LABEL_REPEATED;
    default:
      throw new globalThis.Error(
        "Unrecognized enum value " +
          object +
          " for enum FieldDescriptorProto_Label"
      );
  }
}

export function fieldDescriptorProto_LabelToJSON(
  object: FieldDescriptorProto_Label
): string {
  switch (object) {
    case FieldDescriptorProto_Label.LABEL_OPTIONAL:
      return "LABEL_OPTIONAL";
    case FieldDescriptorProto_Label.LABEL_REQUIRED:
      return "LABEL_REQUIRED";
    case FieldDescriptorProto_Label.LABEL_REPEATED:
      return "LABEL_REPEATED";
    default:
      throw new globalThis.Error(
        "Unrecognized enum value " +
          object +
          " for enum FieldDescriptorProto_Label"
      );
  }
}

/** Describes a oneof. */
export interface OneofDescriptorProto {
  name: string;
  options?: OneofOptions;
}

/** Describes an enum type. */
export interface EnumDescriptorProto {
  name: string;
  value: EnumValueDescriptorProto[];
  options?: EnumOptions;
  /**
   * Range of reserved numeric values. Reserved numeric values may not be used
   * by enum values in the same enum declaration. Reserved ranges may not
   * overlap.
   */
  reserved_range: EnumDescriptorProto_EnumReservedRange[];
  /**
   * Reserved enum value names, which may not be reused. A given name may only
   * be reserved once.
   */
  reserved_name: string[];
}

/**
 * Range of reserved numeric values. Reserved values may not be used by
 * entries in the same enum. Reserved ranges may not overlap.
 *
 * Note that this is distinct from DescriptorProto.ReservedRange in that it
 * is inclusive such that it can appropriately represent the entire int32
 * domain.
 */
export interface EnumDescriptorProto_EnumReservedRange {
  /** Inclusive. */
  start: number;
  /** Inclusive. */
  end: number;
}

/** Describes a value within an enum. */
export interface EnumValueDescriptorProto {
  name: string;
  number: number;
  options?: EnumValueOptions;
}

/** Describes a service. */
export interface ServiceDescriptorProto {
  name: string;
  method: MethodDescriptorProto[];
  options?: ServiceOptions;
}

/** Describes a method of a service. */
export interface MethodDescriptorProto {
  name: string;
  /**
   * Input and output type names.  These are resolved in the same way as
   * FieldDescriptorProto.type_name, but must refer to a message type.
   */
  input_type: string;
  output_type: string;
  options?: MethodOptions;
  /** Identifies if client streams multiple client messages */
  client_streaming: boolean;
  /** Identifies if server streams multiple server messages */
  server_streaming: boolean;
}

export interface FileOptions {
  /**
   * Sets the Java package where classes generated from this .proto will be
   * placed.  By default, the proto package is used, but this is often
   * inappropriate because proto packages do not normally start with backwards
   * domain names.
   */
  java_package: string;
  /**
   * Controls the name of the wrapper Java class generated for the .proto file.
   * That class will always contain the .proto file's getDescriptor() method as
   * well as any top-level extensions defined in the .proto file.
   * If java_multiple_files is disabled, then all the other classes from the
   * .proto file will be nested inside the single wrapper outer class.
   */
  java_outer_classname: string;
  /**
   * If enabled, then the Java code generator will generate a separate .java
   * file for each top-level message, enum, and service defined in the .proto
   * file.  Thus, these types will *not* be nested inside the wrapper class
   * named by java_outer_classname.  However, the wrapper class will still be
   * generated to contain the file's getDescriptor() method as well as any
   * top-level extensions defined in the file.
   */
  java_multiple_files: boolean;
  /**
   * This option does nothing.
   *
   * @deprecated
   */
  java_generate_equals_and_hash: boolean;
  /**
   * If set true, then the Java2 code generator will generate code that
   * throws an exception whenever an attempt is made to assign a non-UTF-8
   * byte sequence to a string field.
   * Message reflection will do the same.
   * However, an extension field still accepts non-UTF-8 byte sequences.
   * This option has no effect on when used with the lite runtime.
   */
  java_string_check_utf8: boolean;
  optimize_for: FileOptions_OptimizeMode;
  /**
   * Sets the Go package where structs generated from this .proto will be
   * placed. If omitted, the Go package will be derived from the following:
   *   - The basename of the package import path, if provided.
   *   - Otherwise, the package statement in the .proto file, if present.
   *   - Otherwise, the basename of the .proto file, without extension.
   */
  go_package: string;
  /**
   * Should generic services be generated in each language?  "Generic" services
   * are not specific to any particular RPC system.  They are generated by the
   * main code generators in each language (without additional plugins).
   * Generic services were the only kind of service generation supported by
   * early versions of google.protobuf.
   *
   * Generic services are now considered deprecated in favor of using plugins
   * that generate code specific to your particular RPC system.  Therefore,
   * these default to false.  Old code which depends on generic services should
   * explicitly set them to true.
   */
  cc_generic_services: boolean;
  java_generic_services: boolean;
  py_generic_services: boolean;
  php_generic_services: boolean;
  /**
   * Is this file deprecated?
   * Depending on the target platform, this can emit Deprecated annotations
   * for everything in the file, or it will be completely ignored; in the very
   * least, this is a formalization for deprecating files.
   */
  deprecated: boolean;
  /**
   * Enables the use of arenas for the proto messages in this file. This applies
   * only to generated classes for C++.
   */
  cc_enable_arenas: boolean;
  /**
   * Sets the objective c class prefix which is prepended to all objective c
   * generated classes from this .proto. There is no default.
   */
  objc_class_prefix: string;
  /** Namespace for generated classes; defaults to the package. */
  csharp_namespace: string;
  /**
   * By default Swift generators will take the proto package and CamelCase it
   * replacing '.' with underscore and use that to prefix the types/symbols
   * defined. When this options is provided, they will use this value instead
   * to prefix the types/symbols defined.
   */
  swift_prefix: string;
  /**
   * Sets the php class prefix which is prepended to all php generated classes
   * from this .proto. Default is empty.
   */
  php_class_prefix: string;
  /**
   * Use this option to change the namespace of php generated classes. Default
   * is empty. When this option is empty, the package name will be used for
   * determining the namespace.
   */
  php_namespace: string;
  /**
   * Use this option to change the namespace of php generated metadata classes.
   * Default is empty. When this option is empty, the proto file name will be
   * used for determining the namespace.
   */
  php_metadata_namespace: string;
  /**
   * Use this option to change the package of ruby generated classes. Default
   * is empty. When this option is not set, the package name will be used for
   * determining the ruby package.
   */
  ruby_package: string;
  /**
   * The parser stores options it doesn't recognize here.
   * See the documentation for the "Options" section above.
   */
  uninterpreted_option: UninterpretedOption[];
}

/** Generated classes can be optimized for speed or code size. */
export enum FileOptions_OptimizeMode {
  /** SPEED - Generate complete code for parsing, serialization, */
  SPEED = "SPEED",
  /** CODE_SIZE - etc. */
  CODE_SIZE = "CODE_SIZE",
  /** LITE_RUNTIME - Generate code using MessageLite and the lite runtime. */
  LITE_RUNTIME = "LITE_RUNTIME",
}

export function fileOptions_OptimizeModeFromJSON(
  object: any
): FileOptions_OptimizeMode {
  switch (object) {
    case 1:
    case "SPEED":
      return FileOptions_OptimizeMode.SPEED;
    case 2:
    case "CODE_SIZE":
      return FileOptions_OptimizeMode.CODE_SIZE;
    case 3:
    case "LITE_RUNTIME":
      return FileOptions_OptimizeMode.LITE_RUNTIME;
    default:
      throw new globalThis.Error(
        "Unrecognized enum value " +
          object +
          " for enum FileOptions_OptimizeMode"
      );
  }
}

export function fileOptions_OptimizeModeToJSON(
  object: FileOptions_OptimizeMode
): string {
  switch (object) {
    case FileOptions_OptimizeMode.SPEED:
      return "SPEED";
    case FileOptions_OptimizeMode.CODE_SIZE:
      return "CODE_SIZE";
    case FileOptions_OptimizeMode.LITE_RUNTIME:
      return "LITE_RUNTIME";
    default:
      throw new globalThis.Error(
        "Unrecognized enum value " +
          object +
          " for enum FileOptions_OptimizeMode"
      );
  }
}

export interface MessageOptions {
  /**
   * Set true to use the old proto1 MessageSet wire format for extensions.
   * This is provided for backwards-compatibility with the MessageSet wire
   * format.  You should not use this for any other reason:  It's less
   * efficient, has fewer features, and is more complicated.
   *
   * The message must be defined exactly as follows:
   *   message Foo {
   *     option message_set_wire_format = true;
   *     extensions 4 to max;
   *   }
   * Note that the message cannot have any defined fields; MessageSets only
   * have extensions.
   *
   * All extensions of your type must be singular messages; e.g. they cannot
   * be int32s, enums, or repeated messages.
   *
   * Because this is an option, the above two restrictions are not enforced by
   * the protocol compiler.
   */
  message_set_wire_format: boolean;
  /**
   * Disables the generation of the standard "descriptor()" accessor, which can
   * conflict with a field of the same name.  This is meant to make migration
   * from proto1 easier; new code should avoid fields named "descriptor".
   */
  no_standard_descriptor_accessor: boolean;
  /**
   * Is this message deprecated?
   * Depending on the target platform, this can emit Deprecated annotations
   * for the message, or it will be completely ignored; in the very least,
   * this is a formalization for deprecating messages.
   */
  deprecated: boolean;
  /**
   * Whether the message is an automatically generated map entry type for the
   * maps field.
   *
   * For maps fields:
   *     map<KeyType, ValueType> map_field = 1;
   * The parsed descriptor looks like:
   *     message MapFieldEntry {
   *         option map_entry = true;
   *         optional KeyType key = 1;
   *         optional ValueType value = 2;
   *     }
   *     repeated MapFieldEntry map_field = 1;
   *
   * Implementations may choose not to generate the map_entry=true message, but
   * use a native map in the target language to hold the keys and values.
   * The reflection APIs in such implementations still need to work as
   * if the field is a repeated message field.
   *
   * NOTE: Do not set the option in .proto files. Always use the maps syntax
   * instead. The option should only be implicitly set by the proto compiler
   * parser.
   */
  map_entry: boolean;
  /** The parser stores options it doesn't recognize here. See above. */
  uninterpreted_option: UninterpretedOption[];
}

export interface FieldOptions {
  /**
   * The ctype option instructs the C++ code generator to use a different
   * representation of the field than it normally would.  See the specific
   * options below.  This option is not yet implemented in the open source
   * release -- sorry, we'll try to include it in a future version!
   */
  ctype: FieldOptions_CType;
  /**
   * The packed option can be enabled for repeated primitive fields to enable
   * a more efficient representation on the wire. Rather than repeatedly
   * writing the tag and type for each element, the entire array is encoded as
   * a single length-delimited blob. In proto3, only explicit setting it to
   * false will avoid using packed encoding.
   */
  packed: boolean;
  /**
   * The jstype option determines the JavaScript type used for values of the
   * field.  The option is permitted only for 64 bit integral and fixed types
   * (int64, uint64, sint64, fixed64, sfixed64).  A field with jstype JS_STRING
   * is represented as JavaScript string, which avoids loss of precision that
   * can happen when a large value is converted to a floating point JavaScript.
   * Specifying JS_NUMBER for the jstype causes the generated JavaScript code to
   * use the JavaScript "number" type.  The behavior of the default option
   * JS_NORMAL is implementation dependent.
   *
   * This option is an enum to permit additional types to be added, e.g.
   * goog.math.Integer.
   */
  jstype: FieldOptions_JSType;
  /**
   * Should this field be parsed lazily?  Lazy applies only to message-type
   * fields.  It means that when the outer message is initially parsed, the
   * inner message's contents will not be parsed but instead stored in encoded
   * form.  The inner message will actually be parsed when it is first accessed.
   *
   * This is only a hint.  Implementations are free to choose whether to use
   * eager or lazy parsing regardless of the value of this option.  However,
   * setting this option true suggests that the protocol author believes that
   * using lazy parsing on this field is worth the additional bookkeeping
   * overhead typically needed to implement it.
   *
   * This option does not affect the public interface of any generated code;
   * all method signatures remain the same.  Furthermore, thread-safety of the
   * interface is not affected by this option; const methods remain safe to
   * call from multiple threads concurrently, while non-const methods continue
   * to require exclusive access.
   *
   *
   * Note that implementations may choose not to check required fields within
   * a lazy sub-message.  That is, calling IsInitialized() on the outer message
   * may return true even if the inner message has missing required fields.
   * This is necessary because otherwise the inner message would have to be
   * parsed in order to perform the check, defeating the purpose of lazy
   * parsing.  An implementation which chooses not to check required fields
   * must be consistent about it.  That is, for any particular sub-message, the
   * implementation must either *always* check its required fields, or *never*
   * check its required fields, regardless of whether or not the message has
   * been parsed.
   */
  lazy: boolean;
  /**
   * Is this field deprecated?
   * Depending on the target platform, this can emit Deprecated annotations
   * for accessors, or it will be completely ignored; in the very least, this
   * is a formalization for deprecating fields.
   */
  deprecated: boolean;
  /** For Google-internal migration only. Do not use. */
  weak: boolean;
  /** The parser stores options it doesn't recognize here. See above. */
  uninterpreted_option: UninterpretedOption[];
}

export enum FieldOptions_CType {
  /** STRING - Default mode. */
  STRING = "STRING",
  CORD = "CORD",
  STRING_PIECE = "STRING_PIECE",
}

export function fieldOptions_CTypeFromJSON(object: any): FieldOptions_CType {
  switch (object) {
    case 0:
    case "STRING":
      return FieldOptions_CType.STRING;
    case 1:
    case "CORD":
      return FieldOptions_CType.CORD;
    case 2:
    case "STRING_PIECE":
      return FieldOptions_CType.STRING_PIECE;
    default:
      throw new globalThis.Error(
        "Unrecognized enum value " + object + " for enum FieldOptions_CType"
      );
  }
}

export function fieldOptions_CTypeToJSON(object: FieldOptions_CType): string {
  switch (object) {
    case FieldOptions_CType.STRING:
      return "STRING";
    case FieldOptions_CType.CORD:
      return "CORD";
    case FieldOptions_CType.STRING_PIECE:
      return "STRING_PIECE";
    default:
      throw new globalThis.Error(
        "Unrecognized enum value " + object + " for enum FieldOptions_CType"
      );
  }
}

export enum FieldOptions_JSType {
  /** JS_NORMAL - Use the default type. */
  JS_NORMAL = "JS_NORMAL",
  /** JS_STRING - Use JavaScript strings. */
  JS_STRING = "JS_STRING",
  /** JS_NUMBER - Use JavaScript numbers. */
  JS_NUMBER = "JS_NUMBER",
}

export function fieldOptions_JSTypeFromJSON(object: any): FieldOptions_JSType {
  switch (object) {
    case 0:
    case "JS_NORMAL":
      return FieldOptions_JSType.JS_NORMAL;
    case 1:
    case "JS_STRING":
      return FieldOptions_JSType.JS_STRING;
    case 2:
    case "JS_NUMBER":
      return FieldOptions_JSType.JS_NUMBER;
    default:
      throw new globalThis.Error(
        "Unrecognized enum value " + object + " for enum FieldOptions_JSType"
      );
  }
}

export function fieldOptions_JSTypeToJSON(object: FieldOptions_JSType): string {
  switch (object) {
    case FieldOptions_JSType.JS_NORMAL:
      return "JS_NORMAL";
    case FieldOptions_JSType.JS_STRING:
      return "JS_STRING";
    case FieldOptions_JSType.JS_NUMBER:
      return "JS_NUMBER";
    default:
      throw new globalThis.Error(
        "Unrecognized enum value " + object + " for enum FieldOptions_JSType"
      );
  }
}

export interface OneofOptions {
  /** The parser stores options it doesn't recognize here. See above. */
  uninterpreted_option: UninterpretedOption[];
}

export interface EnumOptions {
  /**
   * Set this option to true to allow mapping different tag names to the same
   * value.
   */
  allow_alias: boolean;
  /**
   * Is this enum deprecated?
   * Depending on the target platform, this can emit Deprecated annotations
   * for the enum, or it will be completely ignored; in the very least, this
   * is a formalization for deprecating enums.
   */
  deprecated: boolean;
  /** The parser stores options it doesn't recognize here. See above. */
  uninterpreted_option: UninterpretedOption[];
}

export interface EnumValueOptions {
  /**
   * Is this enum value deprecated?
   * Depending on the target platform, this can emit Deprecated annotations
   * for the enum value, or it will be completely ignored; in the very least,
   * this is a formalization for deprecating enum values.
   */
  deprecated: boolean;
  /** The parser stores options it doesn't recognize here. See above. */
  uninterpreted_option: UninterpretedOption[];
}

export interface ServiceOptions {
  /**
   * Is this service deprecated?
   * Depending on the target platform, this can emit Deprecated annotations
   * for the service, or it will be completely ignored; in the very least,
   * this is a formalization for deprecating services.
   */
  deprecated: boolean;
  /** The parser stores options it doesn't recognize here. See above. */
  uninterpreted_option: UninterpretedOption[];
}

export interface MethodOptions {
  /**
   * Is this method deprecated?
   * Depending on the target platform, this can emit Deprecated annotations
   * for the method, or it will be completely ignored; in the very least,
   * this is a formalization for deprecating methods.
   */
  deprecated: boolean;
  idempotency_level: MethodOptions_IdempotencyLevel;
  /** The parser stores options it doesn't recognize here. See above. */
  uninterpreted_option: UninterpretedOption[];
}

/**
 * Is this method side-effect-free (or safe in HTTP parlance), or idempotent,
 * or neither? HTTP based RPC implementation may choose GET verb for safe
 * methods, and PUT verb for idempotent methods instead of the default POST.
 */
export enum MethodOptions_IdempotencyLevel {
  IDEMPOTENCY_UNKNOWN = "IDEMPOTENCY_UNKNOWN",
  /** NO_SIDE_EFFECTS - implies idempotent */
  NO_SIDE_EFFECTS = "NO_SIDE_EFFECTS",
  /** IDEMPOTENT - idempotent, but may have side effects */
  IDEMPOTENT = "IDEMPOTENT",
}

export function methodOptions_IdempotencyLevelFromJSON(
  object: any
): MethodOptions_IdempotencyLevel {
  switch (object) {
    case 0:
    case "IDEMPOTENCY_UNKNOWN":
      return MethodOptions_IdempotencyLevel.IDEMPOTENCY_UNKNOWN;
    case 1:
    case "NO_SIDE_EFFECTS":
      return MethodOptions_IdempotencyLevel.NO_SIDE_EFFECTS;
    case 2:
    case "IDEMPOTENT":
      return MethodOptions_IdempotencyLevel.IDEMPOTENT;
    default:
      throw new globalThis.Error(
        "Unrecognized enum value " +
          object +
          " for enum MethodOptions_IdempotencyLevel"
      );
  }
}

export function methodOptions_IdempotencyLevelToJSON(
  object: MethodOptions_IdempotencyLevel
): string {
  switch (object) {
    case MethodOptions_IdempotencyLevel.IDEMPOTENCY_UNKNOWN:
      return "IDEMPOTENCY_UNKNOWN";
    case MethodOptions_IdempotencyLevel.NO_SIDE_EFFECTS:
      return "NO_SIDE_EFFECTS";
    case MethodOptions_IdempotencyLevel.IDEMPOTENT:
      return "IDEMPOTENT";
    default:
      throw new globalThis.Error(
        "Unrecognized enum value " +
          object +
          " for enum MethodOptions_IdempotencyLevel"
      );
  }
}

/**
 * A message representing a option the parser does not recognize. This only
 * appears in options protos created by the compiler::Parser class.
 * DescriptorPool resolves these when building Descriptor objects. Therefore,
 * options protos in descriptor objects (e.g. returned by Descriptor::options(),
 * or produced by Descriptor::CopyTo()) will never have UninterpretedOptions
 * in them.
 */
export interface UninterpretedOption {
  name: UninterpretedOption_NamePart[];
  /**
   * The value of the uninterpreted option, in whatever type the tokenizer
   * identified it as during parsing. Exactly one of these should be set.
   */
  identifier_value: string;
  positive_int_value: string;
  negative_int_value: string;
  double_value: number;
  string_value: Uint8Array;
  aggregate_value: string;
}

/**
 * The name of the uninterpreted option.  Each string represents a segment in
 * a dot-separated name.  is_extension is true iff a segment represents an
 * extension (denoted with parentheses in options specs in .proto files).
 * E.g.,{ ["foo", false], ["bar.baz", true], ["qux", false] } represents
 * "foo.(bar.baz).qux".
 */
export interface UninterpretedOption_NamePart {
  name_part: string;
  is_extension: boolean;
}

/**
 * Encapsulates information about the original source file from which a
 * FileDescriptorProto was generated.
 */
export interface SourceCodeInfo {
  /**
   * A Location identifies a piece of source code in a .proto file which
   * corresponds to a particular definition.  This information is intended
   * to be useful to IDEs, code indexers, documentation generators, and similar
   * tools.
   *
   * For example, say we have a file like:
   *   message Foo {
   *     optional string foo = 1;
   *   }
   * Let's look at just the field definition:
   *   optional string foo = 1;
   *   ^       ^^     ^^  ^  ^^^
   *   a       bc     de  f  ghi
   * We have the following locations:
   *   span   path               represents
   *   [a,i)  [ 4, 0, 2, 0 ]     The whole field definition.
   *   [a,b)  [ 4, 0, 2, 0, 4 ]  The label (optional).
   *   [c,d)  [ 4, 0, 2, 0, 5 ]  The type (string).
   *   [e,f)  [ 4, 0, 2, 0, 1 ]  The name (foo).
   *   [g,h)  [ 4, 0, 2, 0, 3 ]  The number (1).
   *
   * Notes:
   * - A location may refer to a repeated field itself (i.e. not to any
   *   particular index within it).  This is used whenever a set of elements are
   *   logically enclosed in a single code segment.  For example, an entire
   *   extend block (possibly containing multiple extension definitions) will
   *   have an outer location whose path refers to the "extensions" repeated
   *   field without an index.
   * - Multiple locations may have the same path.  This happens when a single
   *   logical declaration is spread out across multiple places.  The most
   *   obvious example is the "extend" block again -- there may be multiple
   *   extend blocks in the same scope, each of which will have the same path.
   * - A location's span is not always a subset of its parent's span.  For
   *   example, the "extendee" of an extension declaration appears at the
   *   beginning of the "extend" block and is shared by all extensions within
   *   the block.
   * - Just because a location's span is a subset of some other location's span
   *   does not mean that it is a descendant.  For example, a "group" defines
   *   both a type and a field in a single declaration.  Thus, the locations
   *   corresponding to the type and field and their components will overlap.
   * - Code which tries to interpret locations should probably be designed to
   *   ignore those that it doesn't understand, as more types of locations could
   *   be recorded in the future.
   */
  location: SourceCodeInfo_Location[];
}

export interface SourceCodeInfo_Location {
  /**
   * Identifies which part of the FileDescriptorProto was defined at this
   * location.
   *
   * Each element is a field number or an index.  They form a path from
   * the root FileDescriptorProto to the place where the definition.  For
   * example, this path:
   *   [ 4, 3, 2, 7, 1 ]
   * refers to:
   *   file.message_type(3)  // 4, 3
   *       .field(7)         // 2, 7
   *       .name()           // 1
   * This is because FileDescriptorProto.message_type has field number 4:
   *   repeated DescriptorProto message_type = 4;
   * and DescriptorProto.field has field number 2:
   *   repeated FieldDescriptorProto field = 2;
   * and FieldDescriptorProto.name has field number 1:
   *   optional string name = 1;
   *
   * Thus, the above path gives the location of a field name.  If we removed
   * the last element:
   *   [ 4, 3, 2, 7 ]
   * this path refers to the whole field declaration (from the beginning
   * of the label to the terminating semicolon).
   */
  path: number[];
  /**
   * Always has exactly three or four elements: start line, start column,
   * end line (optional, otherwise assumed same as start line), end column.
   * These are packed into a single field for efficiency.  Note that line
   * and column numbers are zero-based -- typically you will want to add
   * 1 to each before displaying to a user.
   */
  span: number[];
  /**
   * If this SourceCodeInfo represents a complete declaration, these are any
   * comments appearing before and after the declaration which appear to be
   * attached to the declaration.
   *
   * A series of line comments appearing on consecutive lines, with no other
   * tokens appearing on those lines, will be treated as a single comment.
   *
   * leading_detached_comments will keep paragraphs of comments that appear
   * before (but not connected to) the current element. Each paragraph,
   * separated by empty lines, will be one comment element in the repeated
   * field.
   *
   * Only the comment content is provided; comment markers (e.g. //) are
   * stripped out.  For block comments, leading whitespace and an asterisk
   * will be stripped from the beginning of each line other than the first.
   * Newlines are included in the output.
   *
   * Examples:
   *
   *   optional int32 foo = 1;  // Comment attached to foo.
   *   // Comment attached to bar.
   *   optional int32 bar = 2;
   *
   *   optional string baz = 3;
   *   // Comment attached to baz.
   *   // Another line attached to baz.
   *
   *   // Comment attached to qux.
   *   //
   *   // Another line attached to qux.
   *   optional double qux = 4;
   *
   *   // Detached comment for corge. This is not leading or trailing comments
   *   // to qux or corge because there are blank lines separating it from
   *   // both.
   *
   *   // Detached comment for corge paragraph 2.
   *
   *   optional string corge = 5;
   *   /* Block comment attached
   *    * to corge.  Leading asterisks
   *    * will be removed. * /
   *   /* Block comment attached to
   *    * grault. * /
   *   optional int32 grault = 6;
   *
   *   // ignored detached comments.
   */
  leading_comments: string;
  trailing_comments: string;
  leading_detached_comments: string[];
}

/**
 * Describes the relationship between generated code and its original source
 * file. A GeneratedCodeInfo message is associated with only one generated
 * source file, but may contain references to different source .proto files.
 */
export interface GeneratedCodeInfo {
  /**
   * An Annotation connects some span of text in generated code to an element
   * of its generating .proto file.
   */
  annotation: GeneratedCodeInfo_Annotation[];
}

export interface GeneratedCodeInfo_Annotation {
  /**
   * Identifies the element in the original source .proto file. This field
   * is formatted the same as SourceCodeInfo.Location.path.
   */
  path: number[];
  /** Identifies the filesystem path to the original source .proto. */
  source_file: string;
  /**
   * Identifies the starting offset in bytes in the generated code
   * that relates to the identified object.
   */
  begin: number;
  /**
   * Identifies the ending offset in bytes in the generated code that
   * relates to the identified offset. The end offset should be one past
   * the last relevant byte (so the length of the text = end - begin).
   */
  end: number;
}

function createBaseFileDescriptorSet(): FileDescriptorSet {
  return { file: [] };
}

export const FileDescriptorSet = {
  fromJSON(object: any): FileDescriptorSet {
    return {
      file: Array.isArray(object?.file)
        ? object.file.map((e: any) => FileDescriptorProto.fromJSON(e))
        : [],
    };
  },

  toJSON(message: FileDescriptorSet): unknown {
    const obj: any = {};
    if (message.file) {
      obj.file = message.file.map((e) =>
        e ? FileDescriptorProto.toJSON(e) : undefined
      );
    } else {
      obj.file = [];
    }
    return obj;
  },
};

function createBaseFileDescriptorProto(): FileDescriptorProto {
  return {
    name: "",
    package: "",
    dependency: [],
    public_dependency: [],
    weak_dependency: [],
    message_type: [],
    enum_type: [],
    service: [],
    extension: [],
    options: undefined,
    source_code_info: undefined,
    syntax: "",
  };
}

export const FileDescriptorProto = {
  fromJSON(object: any): FileDescriptorProto {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      package: isSet(object.package) ? String(object.package) : "",
      dependency: Array.isArray(object?.dependency)
        ? object.dependency.map((e: any) => String(e))
        : [],
      public_dependency: Array.isArray(object?.public_dependency)
        ? object.public_dependency.map((e: any) => Number(e))
        : [],
      weak_dependency: Array.isArray(object?.weak_dependency)
        ? object.weak_dependency.map((e: any) => Number(e))
        : [],
      message_type: Array.isArray(object?.message_type)
        ? object.message_type.map((e: any) => DescriptorProto.fromJSON(e))
        : [],
      enum_type: Array.isArray(object?.enum_type)
        ? object.enum_type.map((e: any) => EnumDescriptorProto.fromJSON(e))
        : [],
      service: Array.isArray(object?.service)
        ? object.service.map((e: any) => ServiceDescriptorProto.fromJSON(e))
        : [],
      extension: Array.isArray(object?.extension)
        ? object.extension.map((e: any) => FieldDescriptorProto.fromJSON(e))
        : [],
      options: isSet(object.options)
        ? FileOptions.fromJSON(object.options)
        : undefined,
      source_code_info: isSet(object.source_code_info)
        ? SourceCodeInfo.fromJSON(object.source_code_info)
        : undefined,
      syntax: isSet(object.syntax) ? String(object.syntax) : "",
    };
  },

  toJSON(message: FileDescriptorProto): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.package !== undefined && (obj.package = message.package);
    if (message.dependency) {
      obj.dependency = message.dependency.map((e) => e);
    } else {
      obj.dependency = [];
    }
    if (message.public_dependency) {
      obj.public_dependency = message.public_dependency.map((e) =>
        Math.round(e)
      );
    } else {
      obj.public_dependency = [];
    }
    if (message.weak_dependency) {
      obj.weak_dependency = message.weak_dependency.map((e) => Math.round(e));
    } else {
      obj.weak_dependency = [];
    }
    if (message.message_type) {
      obj.message_type = message.message_type.map((e) =>
        e ? DescriptorProto.toJSON(e) : undefined
      );
    } else {
      obj.message_type = [];
    }
    if (message.enum_type) {
      obj.enum_type = message.enum_type.map((e) =>
        e ? EnumDescriptorProto.toJSON(e) : undefined
      );
    } else {
      obj.enum_type = [];
    }
    if (message.service) {
      obj.service = message.service.map((e) =>
        e ? ServiceDescriptorProto.toJSON(e) : undefined
      );
    } else {
      obj.service = [];
    }
    if (message.extension) {
      obj.extension = message.extension.map((e) =>
        e ? FieldDescriptorProto.toJSON(e) : undefined
      );
    } else {
      obj.extension = [];
    }
    message.options !== undefined &&
      (obj.options = message.options
        ? FileOptions.toJSON(message.options)
        : undefined);
    message.source_code_info !== undefined &&
      (obj.source_code_info = message.source_code_info
        ? SourceCodeInfo.toJSON(message.source_code_info)
        : undefined);
    message.syntax !== undefined && (obj.syntax = message.syntax);
    return obj;
  },
};

function createBaseDescriptorProto(): DescriptorProto {
  return {
    name: "",
    field: [],
    extension: [],
    nested_type: [],
    enum_type: [],
    extension_range: [],
    oneof_decl: [],
    options: undefined,
    reserved_range: [],
    reserved_name: [],
  };
}

export const DescriptorProto = {
  fromJSON(object: any): DescriptorProto {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      field: Array.isArray(object?.field)
        ? object.field.map((e: any) => FieldDescriptorProto.fromJSON(e))
        : [],
      extension: Array.isArray(object?.extension)
        ? object.extension.map((e: any) => FieldDescriptorProto.fromJSON(e))
        : [],
      nested_type: Array.isArray(object?.nested_type)
        ? object.nested_type.map((e: any) => DescriptorProto.fromJSON(e))
        : [],
      enum_type: Array.isArray(object?.enum_type)
        ? object.enum_type.map((e: any) => EnumDescriptorProto.fromJSON(e))
        : [],
      extension_range: Array.isArray(object?.extension_range)
        ? object.extension_range.map((e: any) =>
            DescriptorProto_ExtensionRange.fromJSON(e)
          )
        : [],
      oneof_decl: Array.isArray(object?.oneof_decl)
        ? object.oneof_decl.map((e: any) => OneofDescriptorProto.fromJSON(e))
        : [],
      options: isSet(object.options)
        ? MessageOptions.fromJSON(object.options)
        : undefined,
      reserved_range: Array.isArray(object?.reserved_range)
        ? object.reserved_range.map((e: any) =>
            DescriptorProto_ReservedRange.fromJSON(e)
          )
        : [],
      reserved_name: Array.isArray(object?.reserved_name)
        ? object.reserved_name.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: DescriptorProto): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    if (message.field) {
      obj.field = message.field.map((e) =>
        e ? FieldDescriptorProto.toJSON(e) : undefined
      );
    } else {
      obj.field = [];
    }
    if (message.extension) {
      obj.extension = message.extension.map((e) =>
        e ? FieldDescriptorProto.toJSON(e) : undefined
      );
    } else {
      obj.extension = [];
    }
    if (message.nested_type) {
      obj.nested_type = message.nested_type.map((e) =>
        e ? DescriptorProto.toJSON(e) : undefined
      );
    } else {
      obj.nested_type = [];
    }
    if (message.enum_type) {
      obj.enum_type = message.enum_type.map((e) =>
        e ? EnumDescriptorProto.toJSON(e) : undefined
      );
    } else {
      obj.enum_type = [];
    }
    if (message.extension_range) {
      obj.extension_range = message.extension_range.map((e) =>
        e ? DescriptorProto_ExtensionRange.toJSON(e) : undefined
      );
    } else {
      obj.extension_range = [];
    }
    if (message.oneof_decl) {
      obj.oneof_decl = message.oneof_decl.map((e) =>
        e ? OneofDescriptorProto.toJSON(e) : undefined
      );
    } else {
      obj.oneof_decl = [];
    }
    message.options !== undefined &&
      (obj.options = message.options
        ? MessageOptions.toJSON(message.options)
        : undefined);
    if (message.reserved_range) {
      obj.reserved_range = message.reserved_range.map((e) =>
        e ? DescriptorProto_ReservedRange.toJSON(e) : undefined
      );
    } else {
      obj.reserved_range = [];
    }
    if (message.reserved_name) {
      obj.reserved_name = message.reserved_name.map((e) => e);
    } else {
      obj.reserved_name = [];
    }
    return obj;
  },
};

function createBaseDescriptorProto_ExtensionRange(): DescriptorProto_ExtensionRange {
  return { start: 0, end: 0, options: undefined };
}

export const DescriptorProto_ExtensionRange = {
  fromJSON(object: any): DescriptorProto_ExtensionRange {
    return {
      start: isSet(object.start) ? Number(object.start) : 0,
      end: isSet(object.end) ? Number(object.end) : 0,
      options: isSet(object.options)
        ? ExtensionRangeOptions.fromJSON(object.options)
        : undefined,
    };
  },

  toJSON(message: DescriptorProto_ExtensionRange): unknown {
    const obj: any = {};
    message.start !== undefined && (obj.start = Math.round(message.start));
    message.end !== undefined && (obj.end = Math.round(message.end));
    message.options !== undefined &&
      (obj.options = message.options
        ? ExtensionRangeOptions.toJSON(message.options)
        : undefined);
    return obj;
  },
};

function createBaseDescriptorProto_ReservedRange(): DescriptorProto_ReservedRange {
  return { start: 0, end: 0 };
}

export const DescriptorProto_ReservedRange = {
  fromJSON(object: any): DescriptorProto_ReservedRange {
    return {
      start: isSet(object.start) ? Number(object.start) : 0,
      end: isSet(object.end) ? Number(object.end) : 0,
    };
  },

  toJSON(message: DescriptorProto_ReservedRange): unknown {
    const obj: any = {};
    message.start !== undefined && (obj.start = Math.round(message.start));
    message.end !== undefined && (obj.end = Math.round(message.end));
    return obj;
  },
};

function createBaseExtensionRangeOptions(): ExtensionRangeOptions {
  return { uninterpreted_option: [] };
}

export const ExtensionRangeOptions = {
  fromJSON(object: any): ExtensionRangeOptions {
    return {
      uninterpreted_option: Array.isArray(object?.uninterpreted_option)
        ? object.uninterpreted_option.map((e: any) =>
            UninterpretedOption.fromJSON(e)
          )
        : [],
    };
  },

  toJSON(message: ExtensionRangeOptions): unknown {
    const obj: any = {};
    if (message.uninterpreted_option) {
      obj.uninterpreted_option = message.uninterpreted_option.map((e) =>
        e ? UninterpretedOption.toJSON(e) : undefined
      );
    } else {
      obj.uninterpreted_option = [];
    }
    return obj;
  },
};

function createBaseFieldDescriptorProto(): FieldDescriptorProto {
  return {
    name: "",
    number: 0,
    label: FieldDescriptorProto_Label.LABEL_OPTIONAL,
    type: FieldDescriptorProto_Type.TYPE_DOUBLE,
    type_name: "",
    extendee: "",
    default_value: "",
    oneof_index: 0,
    json_name: "",
    options: undefined,
    proto3_optional: false,
  };
}

export const FieldDescriptorProto = {
  fromJSON(object: any): FieldDescriptorProto {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      number: isSet(object.number) ? Number(object.number) : 0,
      label: isSet(object.label)
        ? fieldDescriptorProto_LabelFromJSON(object.label)
        : FieldDescriptorProto_Label.LABEL_OPTIONAL,
      type: isSet(object.type)
        ? fieldDescriptorProto_TypeFromJSON(object.type)
        : FieldDescriptorProto_Type.TYPE_DOUBLE,
      type_name: isSet(object.type_name) ? String(object.type_name) : "",
      extendee: isSet(object.extendee) ? String(object.extendee) : "",
      default_value: isSet(object.default_value)
        ? String(object.default_value)
        : "",
      oneof_index: isSet(object.oneof_index) ? Number(object.oneof_index) : 0,
      json_name: isSet(object.json_name) ? String(object.json_name) : "",
      options: isSet(object.options)
        ? FieldOptions.fromJSON(object.options)
        : undefined,
      proto3_optional: isSet(object.proto3_optional)
        ? Boolean(object.proto3_optional)
        : false,
    };
  },

  toJSON(message: FieldDescriptorProto): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.number !== undefined && (obj.number = Math.round(message.number));
    message.label !== undefined &&
      (obj.label = fieldDescriptorProto_LabelToJSON(message.label));
    message.type !== undefined &&
      (obj.type = fieldDescriptorProto_TypeToJSON(message.type));
    message.type_name !== undefined && (obj.type_name = message.type_name);
    message.extendee !== undefined && (obj.extendee = message.extendee);
    message.default_value !== undefined &&
      (obj.default_value = message.default_value);
    message.oneof_index !== undefined &&
      (obj.oneof_index = Math.round(message.oneof_index));
    message.json_name !== undefined && (obj.json_name = message.json_name);
    message.options !== undefined &&
      (obj.options = message.options
        ? FieldOptions.toJSON(message.options)
        : undefined);
    message.proto3_optional !== undefined &&
      (obj.proto3_optional = message.proto3_optional);
    return obj;
  },
};

function createBaseOneofDescriptorProto(): OneofDescriptorProto {
  return { name: "", options: undefined };
}

export const OneofDescriptorProto = {
  fromJSON(object: any): OneofDescriptorProto {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      options: isSet(object.options)
        ? OneofOptions.fromJSON(object.options)
        : undefined,
    };
  },

  toJSON(message: OneofDescriptorProto): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.options !== undefined &&
      (obj.options = message.options
        ? OneofOptions.toJSON(message.options)
        : undefined);
    return obj;
  },
};

function createBaseEnumDescriptorProto(): EnumDescriptorProto {
  return {
    name: "",
    value: [],
    options: undefined,
    reserved_range: [],
    reserved_name: [],
  };
}

export const EnumDescriptorProto = {
  fromJSON(object: any): EnumDescriptorProto {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      value: Array.isArray(object?.value)
        ? object.value.map((e: any) => EnumValueDescriptorProto.fromJSON(e))
        : [],
      options: isSet(object.options)
        ? EnumOptions.fromJSON(object.options)
        : undefined,
      reserved_range: Array.isArray(object?.reserved_range)
        ? object.reserved_range.map((e: any) =>
            EnumDescriptorProto_EnumReservedRange.fromJSON(e)
          )
        : [],
      reserved_name: Array.isArray(object?.reserved_name)
        ? object.reserved_name.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: EnumDescriptorProto): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    if (message.value) {
      obj.value = message.value.map((e) =>
        e ? EnumValueDescriptorProto.toJSON(e) : undefined
      );
    } else {
      obj.value = [];
    }
    message.options !== undefined &&
      (obj.options = message.options
        ? EnumOptions.toJSON(message.options)
        : undefined);
    if (message.reserved_range) {
      obj.reserved_range = message.reserved_range.map((e) =>
        e ? EnumDescriptorProto_EnumReservedRange.toJSON(e) : undefined
      );
    } else {
      obj.reserved_range = [];
    }
    if (message.reserved_name) {
      obj.reserved_name = message.reserved_name.map((e) => e);
    } else {
      obj.reserved_name = [];
    }
    return obj;
  },
};

function createBaseEnumDescriptorProto_EnumReservedRange(): EnumDescriptorProto_EnumReservedRange {
  return { start: 0, end: 0 };
}

export const EnumDescriptorProto_EnumReservedRange = {
  fromJSON(object: any): EnumDescriptorProto_EnumReservedRange {
    return {
      start: isSet(object.start) ? Number(object.start) : 0,
      end: isSet(object.end) ? Number(object.end) : 0,
    };
  },

  toJSON(message: EnumDescriptorProto_EnumReservedRange): unknown {
    const obj: any = {};
    message.start !== undefined && (obj.start = Math.round(message.start));
    message.end !== undefined && (obj.end = Math.round(message.end));
    return obj;
  },
};

function createBaseEnumValueDescriptorProto(): EnumValueDescriptorProto {
  return { name: "", number: 0, options: undefined };
}

export const EnumValueDescriptorProto = {
  fromJSON(object: any): EnumValueDescriptorProto {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      number: isSet(object.number) ? Number(object.number) : 0,
      options: isSet(object.options)
        ? EnumValueOptions.fromJSON(object.options)
        : undefined,
    };
  },

  toJSON(message: EnumValueDescriptorProto): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.number !== undefined && (obj.number = Math.round(message.number));
    message.options !== undefined &&
      (obj.options = message.options
        ? EnumValueOptions.toJSON(message.options)
        : undefined);
    return obj;
  },
};

function createBaseServiceDescriptorProto(): ServiceDescriptorProto {
  return { name: "", method: [], options: undefined };
}

export const ServiceDescriptorProto = {
  fromJSON(object: any): ServiceDescriptorProto {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      method: Array.isArray(object?.method)
        ? object.method.map((e: any) => MethodDescriptorProto.fromJSON(e))
        : [],
      options: isSet(object.options)
        ? ServiceOptions.fromJSON(object.options)
        : undefined,
    };
  },

  toJSON(message: ServiceDescriptorProto): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    if (message.method) {
      obj.method = message.method.map((e) =>
        e ? MethodDescriptorProto.toJSON(e) : undefined
      );
    } else {
      obj.method = [];
    }
    message.options !== undefined &&
      (obj.options = message.options
        ? ServiceOptions.toJSON(message.options)
        : undefined);
    return obj;
  },
};

function createBaseMethodDescriptorProto(): MethodDescriptorProto {
  return {
    name: "",
    input_type: "",
    output_type: "",
    options: undefined,
    client_streaming: false,
    server_streaming: false,
  };
}

export const MethodDescriptorProto = {
  fromJSON(object: any): MethodDescriptorProto {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      input_type: isSet(object.input_type) ? String(object.input_type) : "",
      output_type: isSet(object.output_type) ? String(object.output_type) : "",
      options: isSet(object.options)
        ? MethodOptions.fromJSON(object.options)
        : undefined,
      client_streaming: isSet(object.client_streaming)
        ? Boolean(object.client_streaming)
        : false,
      server_streaming: isSet(object.server_streaming)
        ? Boolean(object.server_streaming)
        : false,
    };
  },

  toJSON(message: MethodDescriptorProto): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.input_type !== undefined && (obj.input_type = message.input_type);
    message.output_type !== undefined &&
      (obj.output_type = message.output_type);
    message.options !== undefined &&
      (obj.options = message.options
        ? MethodOptions.toJSON(message.options)
        : undefined);
    message.client_streaming !== undefined &&
      (obj.client_streaming = message.client_streaming);
    message.server_streaming !== undefined &&
      (obj.server_streaming = message.server_streaming);
    return obj;
  },
};

function createBaseFileOptions(): FileOptions {
  return {
    java_package: "",
    java_outer_classname: "",
    java_multiple_files: false,
    java_generate_equals_and_hash: false,
    java_string_check_utf8: false,
    optimize_for: FileOptions_OptimizeMode.SPEED,
    go_package: "",
    cc_generic_services: false,
    java_generic_services: false,
    py_generic_services: false,
    php_generic_services: false,
    deprecated: false,
    cc_enable_arenas: false,
    objc_class_prefix: "",
    csharp_namespace: "",
    swift_prefix: "",
    php_class_prefix: "",
    php_namespace: "",
    php_metadata_namespace: "",
    ruby_package: "",
    uninterpreted_option: [],
  };
}

export const FileOptions = {
  fromJSON(object: any): FileOptions {
    return {
      java_package: isSet(object.java_package)
        ? String(object.java_package)
        : "",
      java_outer_classname: isSet(object.java_outer_classname)
        ? String(object.java_outer_classname)
        : "",
      java_multiple_files: isSet(object.java_multiple_files)
        ? Boolean(object.java_multiple_files)
        : false,
      java_generate_equals_and_hash: isSet(object.java_generate_equals_and_hash)
        ? Boolean(object.java_generate_equals_and_hash)
        : false,
      java_string_check_utf8: isSet(object.java_string_check_utf8)
        ? Boolean(object.java_string_check_utf8)
        : false,
      optimize_for: isSet(object.optimize_for)
        ? fileOptions_OptimizeModeFromJSON(object.optimize_for)
        : FileOptions_OptimizeMode.SPEED,
      go_package: isSet(object.go_package) ? String(object.go_package) : "",
      cc_generic_services: isSet(object.cc_generic_services)
        ? Boolean(object.cc_generic_services)
        : false,
      java_generic_services: isSet(object.java_generic_services)
        ? Boolean(object.java_generic_services)
        : false,
      py_generic_services: isSet(object.py_generic_services)
        ? Boolean(object.py_generic_services)
        : false,
      php_generic_services: isSet(object.php_generic_services)
        ? Boolean(object.php_generic_services)
        : false,
      deprecated: isSet(object.deprecated) ? Boolean(object.deprecated) : false,
      cc_enable_arenas: isSet(object.cc_enable_arenas)
        ? Boolean(object.cc_enable_arenas)
        : false,
      objc_class_prefix: isSet(object.objc_class_prefix)
        ? String(object.objc_class_prefix)
        : "",
      csharp_namespace: isSet(object.csharp_namespace)
        ? String(object.csharp_namespace)
        : "",
      swift_prefix: isSet(object.swift_prefix)
        ? String(object.swift_prefix)
        : "",
      php_class_prefix: isSet(object.php_class_prefix)
        ? String(object.php_class_prefix)
        : "",
      php_namespace: isSet(object.php_namespace)
        ? String(object.php_namespace)
        : "",
      php_metadata_namespace: isSet(object.php_metadata_namespace)
        ? String(object.php_metadata_namespace)
        : "",
      ruby_package: isSet(object.ruby_package)
        ? String(object.ruby_package)
        : "",
      uninterpreted_option: Array.isArray(object?.uninterpreted_option)
        ? object.uninterpreted_option.map((e: any) =>
            UninterpretedOption.fromJSON(e)
          )
        : [],
    };
  },

  toJSON(message: FileOptions): unknown {
    const obj: any = {};
    message.java_package !== undefined &&
      (obj.java_package = message.java_package);
    message.java_outer_classname !== undefined &&
      (obj.java_outer_classname = message.java_outer_classname);
    message.java_multiple_files !== undefined &&
      (obj.java_multiple_files = message.java_multiple_files);
    message.java_generate_equals_and_hash !== undefined &&
      (obj.java_generate_equals_and_hash =
        message.java_generate_equals_and_hash);
    message.java_string_check_utf8 !== undefined &&
      (obj.java_string_check_utf8 = message.java_string_check_utf8);
    message.optimize_for !== undefined &&
      (obj.optimize_for = fileOptions_OptimizeModeToJSON(message.optimize_for));
    message.go_package !== undefined && (obj.go_package = message.go_package);
    message.cc_generic_services !== undefined &&
      (obj.cc_generic_services = message.cc_generic_services);
    message.java_generic_services !== undefined &&
      (obj.java_generic_services = message.java_generic_services);
    message.py_generic_services !== undefined &&
      (obj.py_generic_services = message.py_generic_services);
    message.php_generic_services !== undefined &&
      (obj.php_generic_services = message.php_generic_services);
    message.deprecated !== undefined && (obj.deprecated = message.deprecated);
    message.cc_enable_arenas !== undefined &&
      (obj.cc_enable_arenas = message.cc_enable_arenas);
    message.objc_class_prefix !== undefined &&
      (obj.objc_class_prefix = message.objc_class_prefix);
    message.csharp_namespace !== undefined &&
      (obj.csharp_namespace = message.csharp_namespace);
    message.swift_prefix !== undefined &&
      (obj.swift_prefix = message.swift_prefix);
    message.php_class_prefix !== undefined &&
      (obj.php_class_prefix = message.php_class_prefix);
    message.php_namespace !== undefined &&
      (obj.php_namespace = message.php_namespace);
    message.php_metadata_namespace !== undefined &&
      (obj.php_metadata_namespace = message.php_metadata_namespace);
    message.ruby_package !== undefined &&
      (obj.ruby_package = message.ruby_package);
    if (message.uninterpreted_option) {
      obj.uninterpreted_option = message.uninterpreted_option.map((e) =>
        e ? UninterpretedOption.toJSON(e) : undefined
      );
    } else {
      obj.uninterpreted_option = [];
    }
    return obj;
  },
};

function createBaseMessageOptions(): MessageOptions {
  return {
    message_set_wire_format: false,
    no_standard_descriptor_accessor: false,
    deprecated: false,
    map_entry: false,
    uninterpreted_option: [],
  };
}

export const MessageOptions = {
  fromJSON(object: any): MessageOptions {
    return {
      message_set_wire_format: isSet(object.message_set_wire_format)
        ? Boolean(object.message_set_wire_format)
        : false,
      no_standard_descriptor_accessor: isSet(
        object.no_standard_descriptor_accessor
      )
        ? Boolean(object.no_standard_descriptor_accessor)
        : false,
      deprecated: isSet(object.deprecated) ? Boolean(object.deprecated) : false,
      map_entry: isSet(object.map_entry) ? Boolean(object.map_entry) : false,
      uninterpreted_option: Array.isArray(object?.uninterpreted_option)
        ? object.uninterpreted_option.map((e: any) =>
            UninterpretedOption.fromJSON(e)
          )
        : [],
    };
  },

  toJSON(message: MessageOptions): unknown {
    const obj: any = {};
    message.message_set_wire_format !== undefined &&
      (obj.message_set_wire_format = message.message_set_wire_format);
    message.no_standard_descriptor_accessor !== undefined &&
      (obj.no_standard_descriptor_accessor =
        message.no_standard_descriptor_accessor);
    message.deprecated !== undefined && (obj.deprecated = message.deprecated);
    message.map_entry !== undefined && (obj.map_entry = message.map_entry);
    if (message.uninterpreted_option) {
      obj.uninterpreted_option = message.uninterpreted_option.map((e) =>
        e ? UninterpretedOption.toJSON(e) : undefined
      );
    } else {
      obj.uninterpreted_option = [];
    }
    return obj;
  },
};

function createBaseFieldOptions(): FieldOptions {
  return {
    ctype: FieldOptions_CType.STRING,
    packed: false,
    jstype: FieldOptions_JSType.JS_NORMAL,
    lazy: false,
    deprecated: false,
    weak: false,
    uninterpreted_option: [],
  };
}

export const FieldOptions = {
  fromJSON(object: any): FieldOptions {
    return {
      ctype: isSet(object.ctype)
        ? fieldOptions_CTypeFromJSON(object.ctype)
        : FieldOptions_CType.STRING,
      packed: isSet(object.packed) ? Boolean(object.packed) : false,
      jstype: isSet(object.jstype)
        ? fieldOptions_JSTypeFromJSON(object.jstype)
        : FieldOptions_JSType.JS_NORMAL,
      lazy: isSet(object.lazy) ? Boolean(object.lazy) : false,
      deprecated: isSet(object.deprecated) ? Boolean(object.deprecated) : false,
      weak: isSet(object.weak) ? Boolean(object.weak) : false,
      uninterpreted_option: Array.isArray(object?.uninterpreted_option)
        ? object.uninterpreted_option.map((e: any) =>
            UninterpretedOption.fromJSON(e)
          )
        : [],
    };
  },

  toJSON(message: FieldOptions): unknown {
    const obj: any = {};
    message.ctype !== undefined &&
      (obj.ctype = fieldOptions_CTypeToJSON(message.ctype));
    message.packed !== undefined && (obj.packed = message.packed);
    message.jstype !== undefined &&
      (obj.jstype = fieldOptions_JSTypeToJSON(message.jstype));
    message.lazy !== undefined && (obj.lazy = message.lazy);
    message.deprecated !== undefined && (obj.deprecated = message.deprecated);
    message.weak !== undefined && (obj.weak = message.weak);
    if (message.uninterpreted_option) {
      obj.uninterpreted_option = message.uninterpreted_option.map((e) =>
        e ? UninterpretedOption.toJSON(e) : undefined
      );
    } else {
      obj.uninterpreted_option = [];
    }
    return obj;
  },
};

function createBaseOneofOptions(): OneofOptions {
  return { uninterpreted_option: [] };
}

export const OneofOptions = {
  fromJSON(object: any): OneofOptions {
    return {
      uninterpreted_option: Array.isArray(object?.uninterpreted_option)
        ? object.uninterpreted_option.map((e: any) =>
            UninterpretedOption.fromJSON(e)
          )
        : [],
    };
  },

  toJSON(message: OneofOptions): unknown {
    const obj: any = {};
    if (message.uninterpreted_option) {
      obj.uninterpreted_option = message.uninterpreted_option.map((e) =>
        e ? UninterpretedOption.toJSON(e) : undefined
      );
    } else {
      obj.uninterpreted_option = [];
    }
    return obj;
  },
};

function createBaseEnumOptions(): EnumOptions {
  return { allow_alias: false, deprecated: false, uninterpreted_option: [] };
}

export const EnumOptions = {
  fromJSON(object: any): EnumOptions {
    return {
      allow_alias: isSet(object.allow_alias)
        ? Boolean(object.allow_alias)
        : false,
      deprecated: isSet(object.deprecated) ? Boolean(object.deprecated) : false,
      uninterpreted_option: Array.isArray(object?.uninterpreted_option)
        ? object.uninterpreted_option.map((e: any) =>
            UninterpretedOption.fromJSON(e)
          )
        : [],
    };
  },

  toJSON(message: EnumOptions): unknown {
    const obj: any = {};
    message.allow_alias !== undefined &&
      (obj.allow_alias = message.allow_alias);
    message.deprecated !== undefined && (obj.deprecated = message.deprecated);
    if (message.uninterpreted_option) {
      obj.uninterpreted_option = message.uninterpreted_option.map((e) =>
        e ? UninterpretedOption.toJSON(e) : undefined
      );
    } else {
      obj.uninterpreted_option = [];
    }
    return obj;
  },
};

function createBaseEnumValueOptions(): EnumValueOptions {
  return { deprecated: false, uninterpreted_option: [] };
}

export const EnumValueOptions = {
  fromJSON(object: any): EnumValueOptions {
    return {
      deprecated: isSet(object.deprecated) ? Boolean(object.deprecated) : false,
      uninterpreted_option: Array.isArray(object?.uninterpreted_option)
        ? object.uninterpreted_option.map((e: any) =>
            UninterpretedOption.fromJSON(e)
          )
        : [],
    };
  },

  toJSON(message: EnumValueOptions): unknown {
    const obj: any = {};
    message.deprecated !== undefined && (obj.deprecated = message.deprecated);
    if (message.uninterpreted_option) {
      obj.uninterpreted_option = message.uninterpreted_option.map((e) =>
        e ? UninterpretedOption.toJSON(e) : undefined
      );
    } else {
      obj.uninterpreted_option = [];
    }
    return obj;
  },
};

function createBaseServiceOptions(): ServiceOptions {
  return { deprecated: false, uninterpreted_option: [] };
}

export const ServiceOptions = {
  fromJSON(object: any): ServiceOptions {
    return {
      deprecated: isSet(object.deprecated) ? Boolean(object.deprecated) : false,
      uninterpreted_option: Array.isArray(object?.uninterpreted_option)
        ? object.uninterpreted_option.map((e: any) =>
            UninterpretedOption.fromJSON(e)
          )
        : [],
    };
  },

  toJSON(message: ServiceOptions): unknown {
    const obj: any = {};
    message.deprecated !== undefined && (obj.deprecated = message.deprecated);
    if (message.uninterpreted_option) {
      obj.uninterpreted_option = message.uninterpreted_option.map((e) =>
        e ? UninterpretedOption.toJSON(e) : undefined
      );
    } else {
      obj.uninterpreted_option = [];
    }
    return obj;
  },
};

function createBaseMethodOptions(): MethodOptions {
  return {
    deprecated: false,
    idempotency_level: MethodOptions_IdempotencyLevel.IDEMPOTENCY_UNKNOWN,
    uninterpreted_option: [],
  };
}

export const MethodOptions = {
  fromJSON(object: any): MethodOptions {
    return {
      deprecated: isSet(object.deprecated) ? Boolean(object.deprecated) : false,
      idempotency_level: isSet(object.idempotency_level)
        ? methodOptions_IdempotencyLevelFromJSON(object.idempotency_level)
        : MethodOptions_IdempotencyLevel.IDEMPOTENCY_UNKNOWN,
      uninterpreted_option: Array.isArray(object?.uninterpreted_option)
        ? object.uninterpreted_option.map((e: any) =>
            UninterpretedOption.fromJSON(e)
          )
        : [],
    };
  },

  toJSON(message: MethodOptions): unknown {
    const obj: any = {};
    message.deprecated !== undefined && (obj.deprecated = message.deprecated);
    message.idempotency_level !== undefined &&
      (obj.idempotency_level = methodOptions_IdempotencyLevelToJSON(
        message.idempotency_level
      ));
    if (message.uninterpreted_option) {
      obj.uninterpreted_option = message.uninterpreted_option.map((e) =>
        e ? UninterpretedOption.toJSON(e) : undefined
      );
    } else {
      obj.uninterpreted_option = [];
    }
    return obj;
  },
};

function createBaseUninterpretedOption(): UninterpretedOption {
  return {
    name: [],
    identifier_value: "",
    positive_int_value: "0",
    negative_int_value: "0",
    double_value: 0,
    string_value: new Uint8Array(),
    aggregate_value: "",
  };
}

export const UninterpretedOption = {
  fromJSON(object: any): UninterpretedOption {
    return {
      name: Array.isArray(object?.name)
        ? object.name.map((e: any) => UninterpretedOption_NamePart.fromJSON(e))
        : [],
      identifier_value: isSet(object.identifier_value)
        ? String(object.identifier_value)
        : "",
      positive_int_value: isSet(object.positive_int_value)
        ? String(object.positive_int_value)
        : "0",
      negative_int_value: isSet(object.negative_int_value)
        ? String(object.negative_int_value)
        : "0",
      double_value: isSet(object.double_value)
        ? Number(object.double_value)
        : 0,
      string_value: isSet(object.string_value)
        ? bytesFromBase64(object.string_value)
        : new Uint8Array(),
      aggregate_value: isSet(object.aggregate_value)
        ? String(object.aggregate_value)
        : "",
    };
  },

  toJSON(message: UninterpretedOption): unknown {
    const obj: any = {};
    if (message.name) {
      obj.name = message.name.map((e) =>
        e ? UninterpretedOption_NamePart.toJSON(e) : undefined
      );
    } else {
      obj.name = [];
    }
    message.identifier_value !== undefined &&
      (obj.identifier_value = message.identifier_value);
    message.positive_int_value !== undefined &&
      (obj.positive_int_value = message.positive_int_value);
    message.negative_int_value !== undefined &&
      (obj.negative_int_value = message.negative_int_value);
    message.double_value !== undefined &&
      (obj.double_value = message.double_value);
    message.string_value !== undefined &&
      (obj.string_value = base64FromBytes(
        message.string_value !== undefined
          ? message.string_value
          : new Uint8Array()
      ));
    message.aggregate_value !== undefined &&
      (obj.aggregate_value = message.aggregate_value);
    return obj;
  },
};

function createBaseUninterpretedOption_NamePart(): UninterpretedOption_NamePart {
  return { name_part: "", is_extension: false };
}

export const UninterpretedOption_NamePart = {
  fromJSON(object: any): UninterpretedOption_NamePart {
    return {
      name_part: isSet(object.name_part) ? String(object.name_part) : "",
      is_extension: isSet(object.is_extension)
        ? Boolean(object.is_extension)
        : false,
    };
  },

  toJSON(message: UninterpretedOption_NamePart): unknown {
    const obj: any = {};
    message.name_part !== undefined && (obj.name_part = message.name_part);
    message.is_extension !== undefined &&
      (obj.is_extension = message.is_extension);
    return obj;
  },
};

function createBaseSourceCodeInfo(): SourceCodeInfo {
  return { location: [] };
}

export const SourceCodeInfo = {
  fromJSON(object: any): SourceCodeInfo {
    return {
      location: Array.isArray(object?.location)
        ? object.location.map((e: any) => SourceCodeInfo_Location.fromJSON(e))
        : [],
    };
  },

  toJSON(message: SourceCodeInfo): unknown {
    const obj: any = {};
    if (message.location) {
      obj.location = message.location.map((e) =>
        e ? SourceCodeInfo_Location.toJSON(e) : undefined
      );
    } else {
      obj.location = [];
    }
    return obj;
  },
};

function createBaseSourceCodeInfo_Location(): SourceCodeInfo_Location {
  return {
    path: [],
    span: [],
    leading_comments: "",
    trailing_comments: "",
    leading_detached_comments: [],
  };
}

export const SourceCodeInfo_Location = {
  fromJSON(object: any): SourceCodeInfo_Location {
    return {
      path: Array.isArray(object?.path)
        ? object.path.map((e: any) => Number(e))
        : [],
      span: Array.isArray(object?.span)
        ? object.span.map((e: any) => Number(e))
        : [],
      leading_comments: isSet(object.leading_comments)
        ? String(object.leading_comments)
        : "",
      trailing_comments: isSet(object.trailing_comments)
        ? String(object.trailing_comments)
        : "",
      leading_detached_comments: Array.isArray(
        object?.leading_detached_comments
      )
        ? object.leading_detached_comments.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: SourceCodeInfo_Location): unknown {
    const obj: any = {};
    if (message.path) {
      obj.path = message.path.map((e) => Math.round(e));
    } else {
      obj.path = [];
    }
    if (message.span) {
      obj.span = message.span.map((e) => Math.round(e));
    } else {
      obj.span = [];
    }
    message.leading_comments !== undefined &&
      (obj.leading_comments = message.leading_comments);
    message.trailing_comments !== undefined &&
      (obj.trailing_comments = message.trailing_comments);
    if (message.leading_detached_comments) {
      obj.leading_detached_comments = message.leading_detached_comments.map(
        (e) => e
      );
    } else {
      obj.leading_detached_comments = [];
    }
    return obj;
  },
};

function createBaseGeneratedCodeInfo(): GeneratedCodeInfo {
  return { annotation: [] };
}

export const GeneratedCodeInfo = {
  fromJSON(object: any): GeneratedCodeInfo {
    return {
      annotation: Array.isArray(object?.annotation)
        ? object.annotation.map((e: any) =>
            GeneratedCodeInfo_Annotation.fromJSON(e)
          )
        : [],
    };
  },

  toJSON(message: GeneratedCodeInfo): unknown {
    const obj: any = {};
    if (message.annotation) {
      obj.annotation = message.annotation.map((e) =>
        e ? GeneratedCodeInfo_Annotation.toJSON(e) : undefined
      );
    } else {
      obj.annotation = [];
    }
    return obj;
  },
};

function createBaseGeneratedCodeInfo_Annotation(): GeneratedCodeInfo_Annotation {
  return { path: [], source_file: "", begin: 0, end: 0 };
}

export const GeneratedCodeInfo_Annotation = {
  fromJSON(object: any): GeneratedCodeInfo_Annotation {
    return {
      path: Array.isArray(object?.path)
        ? object.path.map((e: any) => Number(e))
        : [],
      source_file: isSet(object.source_file) ? String(object.source_file) : "",
      begin: isSet(object.begin) ? Number(object.begin) : 0,
      end: isSet(object.end) ? Number(object.end) : 0,
    };
  },

  toJSON(message: GeneratedCodeInfo_Annotation): unknown {
    const obj: any = {};
    if (message.path) {
      obj.path = message.path.map((e) => Math.round(e));
    } else {
      obj.path = [];
    }
    message.source_file !== undefined &&
      (obj.source_file = message.source_file);
    message.begin !== undefined && (obj.begin = Math.round(message.begin));
    message.end !== undefined && (obj.end = Math.round(message.end));
    return obj;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

function bytesFromBase64(b64: string): Uint8Array {
  if (globalThis.Buffer) {
    return Uint8Array.from(globalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = globalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (globalThis.Buffer) {
    return globalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(String.fromCharCode(byte));
    });
    return globalThis.btoa(bin.join(""));
  }
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
