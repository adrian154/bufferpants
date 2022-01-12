class BufferBuilder {

    constructor() {
        this.buffers = [];
    }

    build() {
        return Buffer.concat(this.buffers);
    }

    // this is the *perfect* usecase for allocUnsafe!
    writeBigInt64BE(value)  { const buf = Buffer.allocUnsafe(8); buf.writeBigInt64BE(value); this.buffers.push(buf); return this; }
    writeBigInt64LE(value)  { const buf = Buffer.allocUnsafe(8); buf.writeBigInt64LE(value); this.buffers.push(buf); return this; }
    writeBigUInt64BE(value) { const buf = Buffer.allocUnsafe(8); buf.writeBigUInt64BE(value); this.buffers.push(buf); return this; }
    writeBigUInt64LE(value) { const buf = Buffer.allocUnsafe(8); buf.writeBigUInt64LE(value); this.buffers.push(buf); return this; }
    writeDoubleBE(value)    { const buf = Buffer.allocUnsafe(8); buf.writeDoubleBE(value); this.buffers.push(buf); return this; }
    writeDoubleLE(value)    { const buf = Buffer.allocUnsafe(8); buf.writeDoubleLE(value); this.buffers.push(buf); return this; }
    writeFloatBE(value)     { const buf = Buffer.allocUnsafe(4); buf.writeFloatBE(value); this.buffers.push(buf); return this; }
    writeFloatLE(value)     { const buf = Buffer.allocUnsafe(4); buf.writeFloatLE(value); this.buffers.push(buf); return this; }
    writeInt8(value)        { const buf = Buffer.allocUnsafe(1); buf.writeInt8(value); this.buffers.push(buf); return this; }
    writeInt16BE(value)     { const buf = Buffer.allocUnsafe(2); buf.writeInt16BE(value); this.buffers.push(buf); return this; }
    writeInt16LE(value)     { const buf = Buffer.allocUnsafe(2); buf.writeInt16LE(value); this.buffers.push(buf); return this; }
    writeInt32BE(value)     { const buf = Buffer.allocUnsafe(4); buf.writeInt32BE(value); this.buffers.push(buf); return this; }
    writeInt32LE(value)     { const buf = Buffer.allocUnsafe(4); buf.writeInt32LE(value); this.buffers.push(buf); return this; }
    writeUInt8(value)       { const buf = Buffer.allocUnsafe(1); buf.writeUInt8(value); this.buffers.push(buf); return this; }
    writeUInt16BE(value)    { const buf = Buffer.allocUnsafe(2); buf.writeUInt16BE(value); this.buffers.push(buf); return this; }
    writeUInt16LE(value)    { const buf = Buffer.allocUnsafe(2); buf.writeUInt16LE(value); this.buffers.push(buf); return this; }
    writeUInt32BE(value)    { const buf = Buffer.allocUnsafe(4); buf.writeUInt32BE(value); this.buffers.push(buf); return this; }
    writeUInt32LE(value)    { const buf = Buffer.allocUnsafe(4); buf.writeUInt32LE(value); this.buffers.push(buf); return this; }
    writeBuffer(buffer)     { if(!Buffer.isBuffer(buffer)) throw new Error("Not a buffer"); this.buffers.push(buffer); return this; }

}

class BufferReader {

    constructor(buffer) {
        this.buffer = buffer;
        this.position = 0;
    }

    seek(position) {
        if(position > this.buffer.length) {
            throw new Error("Can't seek to position beyond end of buffer.");
        }
        this.position = position;
    }

    move(increment) {
        const before = this.position;
        this.seek(this.position + increment);
        return before;
    }

    end() {
        return this.position == this.buffer.length;
    }

    readBigInt64BE(offset)  { return this.buffer.readBigInt64BE(offset ?? this.move(8)); }
	readBigInt64LE(offset)  { return this.buffer.readBigInt64LE(offset ?? this.move(8)); }
	readBigUInt64BE(offset) { return this.buffer.readBigUInt64BE(offset ?? this.move(8)); }
	readBigUInt64LE(offset) { return this.buffer.readBigUInt64LE(offset ?? this.move(8)); }
	readDoubleBE(offset)    { return this.buffer.readDoubleBE(offset ?? this.move(8)); }
	readDoubleLE(offset)    { return this.buffer.readDoubleLE(offset ?? this.move(8)); }
	readFloatBE(offset)     { return this.buffer.readFloatBE(offset ?? this.move(4)); }
	readFloatLE(offset)     { return this.buffer.readFloatLE(offset ?? this.move(4)); }
	readInt8(offset)        { return this.buffer.readInt8(offset ?? this.move(1)); }
	readInt16BE(offset)     { return this.buffer.readInt16BE(offset ?? this.move(2)); }
	readInt16LE(offset)     { return this.buffer.readInt16LE(offset ?? this.move(2)); }
	readInt32BE(offset)     { return this.buffer.readInt32BE(offset ?? this.move(4)); }
	readInt32LE(offset)     { return this.buffer.readInt32LE(offset ?? this.move(4)); }
	readUInt8(offset)       { return this.buffer.readUInt8(offset ?? this.move(1)); }
	readUInt16BE(offset)    { return this.buffer.readUInt16BE(offset ?? this.move(2)); }
	readUInt16LE(offset)    { return this.buffer.readUInt16LE(offset ?? this.move(2)); }
	readUInt32BE(offset)    { return this.buffer.readUInt32BE(offset ?? this.move(4)); }
    readUInt32LE(offset)    { return this.buffer.readUInt32LE(offset ?? this.move(4)); }
    readBuffer(length, offset) { return this.buffer.slice(offset ?? this.move(length), this.position); }

}

module.exports = {BufferBuilder, BufferReader};