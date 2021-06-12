import * as jspb from 'google-protobuf'



export class Problem extends jspb.Message {
  getId(): string;
  setId(value: string): Problem;

  getBody(): string;
  setBody(value: string): Problem;

  getImage(): string;
  setImage(value: string): Problem;

  getSolution(): number;
  setSolution(value: number): Problem;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Problem.AsObject;
  static toObject(includeInstance: boolean, msg: Problem): Problem.AsObject;
  static serializeBinaryToWriter(message: Problem, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Problem;
  static deserializeBinaryFromReader(message: Problem, reader: jspb.BinaryReader): Problem;
}

export namespace Problem {
  export type AsObject = {
    id: string,
    body: string,
    image: string,
    solution: number,
  }
}

export class ProblemStream extends jspb.Message {
  getType(): ProblemStream.Type;
  setType(value: ProblemStream.Type): ProblemStream;

  getInitial(): ProblemStream.Initial | undefined;
  setInitial(value?: ProblemStream.Initial): ProblemStream;
  hasInitial(): boolean;
  clearInitial(): ProblemStream;

  getUpdate(): ProblemStream.Update | undefined;
  setUpdate(value?: ProblemStream.Update): ProblemStream;
  hasUpdate(): boolean;
  clearUpdate(): ProblemStream;

  getDelete(): ProblemStream.Delete | undefined;
  setDelete(value?: ProblemStream.Delete): ProblemStream;
  hasDelete(): boolean;
  clearDelete(): ProblemStream;

  getSwap(): ProblemStream.Swap | undefined;
  setSwap(value?: ProblemStream.Swap): ProblemStream;
  hasSwap(): boolean;
  clearSwap(): ProblemStream;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ProblemStream.AsObject;
  static toObject(includeInstance: boolean, msg: ProblemStream): ProblemStream.AsObject;
  static serializeBinaryToWriter(message: ProblemStream, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ProblemStream;
  static deserializeBinaryFromReader(message: ProblemStream, reader: jspb.BinaryReader): ProblemStream;
}

export namespace ProblemStream {
  export type AsObject = {
    type: ProblemStream.Type,
    initial?: ProblemStream.Initial.AsObject,
    update?: ProblemStream.Update.AsObject,
    pb_delete?: ProblemStream.Delete.AsObject,
    swap?: ProblemStream.Swap.AsObject,
  }

  export class Initial extends jspb.Message {
    getProblem(): Problem | undefined;
    setProblem(value?: Problem): Initial;
    hasProblem(): boolean;
    clearProblem(): Initial;

    getAt(): number;
    setAt(value: number): Initial;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Initial.AsObject;
    static toObject(includeInstance: boolean, msg: Initial): Initial.AsObject;
    static serializeBinaryToWriter(message: Initial, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Initial;
    static deserializeBinaryFromReader(message: Initial, reader: jspb.BinaryReader): Initial;
  }

  export namespace Initial {
    export type AsObject = {
      problem?: Problem.AsObject,
      at: number,
    }
  }


  export class Update extends jspb.Message {
    getProblem(): Problem | undefined;
    setProblem(value?: Problem): Update;
    hasProblem(): boolean;
    clearProblem(): Update;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Update.AsObject;
    static toObject(includeInstance: boolean, msg: Update): Update.AsObject;
    static serializeBinaryToWriter(message: Update, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Update;
    static deserializeBinaryFromReader(message: Update, reader: jspb.BinaryReader): Update;
  }

  export namespace Update {
    export type AsObject = {
      problem?: Problem.AsObject,
    }
  }


  export class Delete extends jspb.Message {
    getId(): string;
    setId(value: string): Delete;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Delete.AsObject;
    static toObject(includeInstance: boolean, msg: Delete): Delete.AsObject;
    static serializeBinaryToWriter(message: Delete, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Delete;
    static deserializeBinaryFromReader(message: Delete, reader: jspb.BinaryReader): Delete;
  }

  export namespace Delete {
    export type AsObject = {
      id: string,
    }
  }


  export class Swap extends jspb.Message {
    getA(): string;
    setA(value: string): Swap;

    getB(): string;
    setB(value: string): Swap;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Swap.AsObject;
    static toObject(includeInstance: boolean, msg: Swap): Swap.AsObject;
    static serializeBinaryToWriter(message: Swap, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Swap;
    static deserializeBinaryFromReader(message: Swap, reader: jspb.BinaryReader): Swap;
  }

  export namespace Swap {
    export type AsObject = {
      a: string,
      b: string,
    }
  }


  export enum Type { 
    K_INITIAL = 0,
    K_UPDATE = 1,
    K_DELETE = 2,
    K_SWAP = 3,
  }
}

