# NodeJs Training

The following sample codes are created

- `process.nextTick()` & `setImmediate()` understanding - utils/executionSequence.js
- **Promise Library** `blueBird` use to avoid callback hell - utils/fileRead.js
- **Batching** - executing expensive operation once by queuing concurrent requests - utils/batching.js
- **AES GCM Encryption & Decryption** with Key generated from a passphrase using **PBKDF2** - utils/cryptoUtil.js
- **Worker Process Pool** creation and use - utils/processPool/runProcessPool.js
- **Express** - index.js
- **REST** APIs
- **Logging** with `winston`
- **Centralized Error Handling** for **REST** APIs using error handling middleware and `express-async-errors`
- **Static Content** hosting & publishing
- **Unit Test** with `jest`
- **Integration Test** with `jest` & `supertest`
- **Postgres DB Connection Pool** with `pg-promise`
- **Dependency Injection** of db pool
- **Externalizing db password** in environment variable and `config`
- **Externalizong db host, port, max connection etc.** in environment specific `config` files
- Use of `helmet` for security and `compression` for performance