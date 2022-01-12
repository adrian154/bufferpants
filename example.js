const {BufferBuilder, BufferReader} = require("./index.js");

// create a length prefixed string
const builder = new BufferBuilder();
const myStr = Buffer.from("Goodbye, cruel world.", "utf-8");
builder.writeUInt32LE(myStr.length)
       .writeBuffer(myStr);
const buf = builder.build();

// read the string back
const reader = new BufferReader(buf);
const length = reader.readUInt32LE();
const str = reader.readBuffer(length).toString("utf-8");
console.log(str);