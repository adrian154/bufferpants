# bufferio

bufferio is an extremely simple interface for reading and writing sequential binary data in NodeJS. 

bufferio does *not* implement a serialization protocol for structured data, though you could definitely use it to implement such functionality.

# Example

```js
// create a length prefixed string
const builder = new BufferBuilder();
const myStr = Buffer.from("Goodbye, cruel world.", "utf-8");
builder.writeUInt32LE(myStr.length);
builder.writeBuffer(myStr);
const buf = builder.build();

// read the string back
const reader = new BufferReader(buf);
const length = reader.readUInt32LE();
const str = reader.readBuffer(length).toString("utf-8");
console.log(str);
```

# BufferReader

BufferReader provides numerous methods for reading integer types of all shapes and sizes from a buffer, automatically moving to the next position after an integer is read.

## Constructor

```new BufferedReader(buffer)```

## Properties

* `reader.buffer`: the buffer to read data from
* `reader.position`: the position of the reader within the buffer

## Methods

**BE** = big-endian, **LE** = little-endian

* `readBigInt64BE()`
* `readBigInt64LE()`
* `readBigUInt64BE()`
* `readBigUInt64LE()`
* `readDoubleBE()`
* `readDoubleLE()`
* `readFloatBE()`
* `readFloatLE()`
* `readInt8()`
* `readInt16BE()`
* `readInt16LE()`
* `readInt32BE()`
* `readInt32LE()`
* `readUInt8()`
* `readUInt16BE()`
* `readUInt16LE()`
* `readUInt32BE()`
* `readUInt32LE()`
* `readBuffer(length)`
    * The returned buffer directly references the original buffer, so any operations on the result of `reader.readBuffer()` will propagate back to the original buffer. You may need to make a copy of the returned buffer.
* `seek(position)`
    * Move the reader to a certain offset within the buffer. Throws an error if the requested position is beyond the end of the buffer. Prefer this method to manually setting the `position` property.

# BufferBuilder

BufferBuilder provides numerous methods for writing integer types of all shapes and sizes, which are automatically appended to the final buffer.

## Constructor

```new BufferBuilder()```

## Properties

* `builder.buffers`: the array of buffers that will be joined together when `.build()` is called

## Methods

**BE** = big-endian, **LE** = little-endian

* `writeBigInt64BE()`
* `writeBigInt64LE()`
* `writeBigUInt64BE()`
* `writeBigUInt64LE()`
* `writeDoubleBE()`
* `writeDoubleLE()`
* `writeFloatBE()`
* `writeFloatLE()`
* `writeInt8()`
* `writeInt16BE()`
* `writeInt16LE()`
* `writeInt32BE()`
* `writeInt32LE()`
* `writeUInt8()`
* `writeUInt16BE()`
* `writeUInt16LE()`
* `writeUInt32BE()`
* `writeUInt32LE()`
* `writeBuffer(buffer)`
* `build()`
    * Returns the buffer built by the write methods.