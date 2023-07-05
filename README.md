# Buffer issue

Reproduces an issue with RemixJS and [otel-cf-workers](https://github.com/evanderkoogh/otel-cf-workers).

## Steps to reproduce

1.  Install dependencies
    ```shell
    npm install
    ```

1.  Build the app
    ```shell
    npm run build
    ```

1.  Start the app
    ```shell
    npm run start
    ```

If the issue is successfully reproduced, you'll see an error that looks like this.

```
service core:user:remix-cloudflare-workers: Uncaught ReferenceError: Buffer is not defined
```
