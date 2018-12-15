---
title: MongoDB Auditing using Change Streams
date: 2018-12-15 02:44:00 Z
description: Versioning documents in MongoDB by listening to changes using the change
  streams listener. It's ideal for audit logs or auditing.
layout: page-article
---

If you are using [MongoDB Enterprise](https://www.mongodb.com/products/mongodb-enterprise-advanced), then consider the native audit feature available to you.

> *MongoDB Enterprise includes an auditing capability for mongod and mongos instances. The auditing facility allows administrators and users to track system activity for deployments with multiple users and applications.*
>
> *[https://docs.mongodb.com/manual/core/auditing](https://docs.mongodb.com/manual/core/auditing/)*

Yes, [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) issues Enterprise instances.

If you do not use MongoDB Enterprise, then you can implement auditing using [change streams](https://docs.mongodb.com/manual/changeStreams/).

```js
// When updating a document, store the whole document, not just the changes.
// Makes lookup and restoration easy but storage usage increases.
const watchOptions = {
    fullDocument: 'updateLookup',
};

// When updating a document, store the differences, not the whole document.
// Improves storage usage but makes lookup and restoration harder.
const watchOptions = {};

// Watch all collections for changes
const changeStream = db.watch(watchOptions);

// Watch a single collection for changes
const changeStream = db.collection('...').watch(watchOptions);

// See https://docs.mongodb.com/manual/reference/change-events for a full list
// of operation types.
// We are only watching document related changes.
const auditOperationTypes = new Set(['insert', 'replace', 'update', 'delete']);
function handleChange(event) {
    if (event.ns.coll !== 'audit' && auditOperationTypes.has(event.operationType)) {
        db.collection('audit').insertOne({
            model: event.ns.coll,
            operation: event.operationType,
            // If it's a delete, then fullDocument is undefined use the
            // documentKey instead, which is { _id: ... }
            document: event.fullDocument || event.documentKey,
            // If it's an update and we are not storing the full document,
            // then store the updateDescription.
            // Otherwise, default to undefined.
            updateDescription: !event.fullDocument && event.updateDescription || undefined,
        });
    }
}

changeStream.on('change', handleChange);
```