class BufferBuilder {

    constructor() {
        this.buffers = [];
    }

    build() {
        return Buffer.concat(this.buffers);
    }

    // this is the *perfect* usecase for allocUnsafe!
    writeBigInt64BE(value)  { const buf = Buffer.allocUnsafe(8); buf.writeBigInt64BE(value); this.buffers.push(value); }
    writeBigInt64LE(value)  { const buf = Buffer.allocUnsafe(8); buf.writeBigInt64LE(value); this.buffers.push(value); }
    writeBigUInt64BE(value) { const buf = Buffer.allocUnsafe(8); buf.writeBigUInt64BE(value); this.buffers.push(value); }
    writeBigUInt64LE(value) { const buf = Buffer.allocUnsafe(8); buf.writeBigUInt64LE(value); this.buffers.push(value); }
    writeDoubleBE(value)    { const buf = Buffer.allocUnsafe(8); buf.writeDoubleBE(value); this.buffers.push(value); }
    writeDoubleLE(value)    { const buf = Buffer.allocUnsafe(8); buf.writeDoubleLE(value); this.buffers.push(value); }
    writeFloatBE(value)     { const buf = Buffer.allocUnsafe(4); buf.writeFloatBE(value); this.buffers.push(value); }
    writeFloatLE(value)     { const buf = Buffer.allocUnsafe(4); buf.writeFloatLE(value); this.buffers.push(value); }
    writeInt8(value)        { const buf = Buffer.allocUnsafe(1); buf.writeInt8(value); this.buffers.push(value); }
    writeInt16BE(value)     { const buf = Buffer.allocUnsafe(2); buf.writeInt16BE(value); this.buffers.push(value); }
    writeInt16LE(value)     { const buf = Buffer.allocUnsafe(2); buf.writeInt16LE(value); this.buffers.push(value); }
    writeInt32BE(value)     { const buf = Buffer.allocUnsafe(4); buf.writeInt32BE(value); this.buffers.push(value); }
    writeInt32LE(value)     { const buf = Buffer.allocUnsafe(4); buf.writeInt32LE(value); this.buffers.push(value); }
    writeUInt8(value)       { const buf = Buffer.allocUnsafe(1); buf.writeUInt8(value); this.buffers.push(value); }
    writeUInt16BE(value)    { const buf = Buffer.allocUnsafe(2); buf.writeUInt16BE(value); this.buffers.push(value); }
    writeUInt16LE(value)    { const buf = Buffer.allocUnsafe(2); buf.writeUInt16LE(value); this.buffers.push(value); }
    writeUInt32BE(value)    { const buf = Buffer.allocUnsafe(4); buf.writeUInt32BE(value); this.buffers.push(value); }
    writeUInt32LE(value)    { const buf = Buffer.allocUnsafe(4); buf.writeUInt32LE(value); this.buffers.push(value); }
    writeBuffer(buffer)     { if(!Buffer.isBuffer(buffer)) throw new Error("Not a buffer"); this.buffers.push(buffer); }

}

class BufferReader {

    constructor(buffer) {
        this.buffer = buffer;
        this.position = 0;
    }

    move(increment) {
        if(increment + this.position > this.buffer.length) {
            throw new Error("Not enough bytes available!");
        }
        const before = this.position;
        this.position += increment;
        return before;
    }

    readBigInt64BE()   { return this.buffer.readBigInt64BE(this.move(8)); }
	readBigInt64LE()   { return this.buffer.readBigInt64LE(this.move(8)); }
	readBigUInt64BE()  { return this.buffer.readBigUInt64BE(this.move(8)); }
	readBigUInt64LE()  { return this.buffer.readBigUInt64LE(this.move(8)); }
	readDoubleBE()     { return this.buffer.readDoubleBE(this.move(8)); }
	readDoubleLE()     { return this.buffer.readDoubleLE(this.move(8)); }
	readFloatBE()      { return this.buffer.readFloatBE(this.move(4)); }
	readFloatLE()      { return this.buffer.readFloatLE(this.move(4)); }
	readInt8()         { return this.buffer.readInt8(this.move(1)); }
	readInt16BE()      { return this.buffer.readInt16BE(this.move(2)); }
	readInt16LE()      { return this.buffer.readInt16LE(this.move(2)); }
	readInt32BE()      { return this.buffer.readInt32BE(this.move(4)); }
	readInt32LE()      { return this.buffer.readInt32LE(this.move(4)); }
	readUInt8()        { return this.buffer.readUInt8(this.move(1)); }
	readUInt16BE()     { return this.buffer.readUInt16BE(this.move(2)); }
	readUInt16LE()     { return this.buffer.readUInt16LE(this.move(2)); }
	readUInt32BE()     { return this.buffer.readUInt32BE(this.move(4)); }
	readUInt32LE()     { return this.buffer.readUInt32LE(this.move(4)); }
    readBuffer(length) { return this.buffer.slice(this.move(length), this.position); }
}

module.exports = {BufferBuilder, BufferReader};