---
title: JavaScript Data Buffer
date: 2018-12-15 04:51:00 Z
description: Buffers are typically used when processing data is slower than the rate
  at which it is received.
layout: page-article
---

Buffers are typically used when processing data is slower than the rate at which it is received.

## Not to be confused with...

Node.js implements a [`Buffer`](https://nodejs.org/api/buffer.html) for the purpose of working with binary streams.

JavaScript implements an [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) which is a fixed size raw binary data buffer to be used with typed arrays.

## My DataBuffer

```js
class DataBuffer extends EventEmitter {
    constructor (options={}) {
        super();
        const {
            size = 10,
        } = options;
        this.buffer = [];
        this.size = size;
    }

    insert(data) {
        this.buffer.push(data);
        if (this.buffer.length >= this.size) {
            this.flush();
        }
    }

    flush() {
        const result = this.buffer;
        this.emit('flush', result)
        this.buffer = [];
        return result;
    }
}
```

## Usage

```js
const dataBuffer = DataBuffer({ size: 5 });
dataBuffer.on('flush', console.log);

dataBuffer.insert('one');
dataBuffer.insert('two');
dataBuffer.insert('three');
dataBuffer.insert('four');
dataBuffer.insert('five');
// 'flush' is emitted with ['one', 'two', 'three', 'four', 'five']

dataBuffer.insert('six');
dataBuffer.insert('seven');
dataBuffer.flush();
// => ['six', 'seven']
// 'flush' is emitted with ['six', 'seven']
```