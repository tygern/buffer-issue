import {getAssetFromKV} from "@cloudflare/kv-asset-handler";
import type {AppLoadContext} from "@remix-run/cloudflare";
import {createRequestHandler, logDevReady} from "@remix-run/cloudflare";
import * as build from "@remix-run/dev/server-build";
import __STATIC_CONTENT_MANIFEST from "__STATIC_CONTENT_MANIFEST";
import {instrument} from "@microlabs/otel-cf-workers";
import type {TraceConfig} from "@microlabs/otel-cf-workers/src/types";
import {ConsoleSpanExporter} from "@opentelemetry/sdk-trace-base";

const MANIFEST = JSON.parse(__STATIC_CONTENT_MANIFEST);
const handleRemixRequest = createRequestHandler(build, process.env.NODE_ENV);

if (build.dev) {
    logDevReady(build);
}

export const handler = {
    async fetch(
        request: Request,
        env: {
            __STATIC_CONTENT: Fetcher;
        },
        ctx: ExecutionContext
    ): Promise<Response> {
        try {
            const url = new URL(request.url);
            const ttl = url.pathname.startsWith("/build/")
                ? 60 * 60 * 24 * 365 // 1 year
                : 60 * 5; // 5 minutes
            return await getAssetFromKV(
                {
                    request,
                    waitUntil: ctx.waitUntil.bind(ctx),
                } as FetchEvent,
                {
                    ASSET_NAMESPACE: env.__STATIC_CONTENT,
                    ASSET_MANIFEST: MANIFEST,
                    cacheControl: {
                        browserTTL: ttl,
                        edgeTTL: ttl,
                    },
                }
            );
        } catch (error) {
            console.log('asset error')
            console.log(error)
        }

        try {
            const loadContext: AppLoadContext = {
                env,
            };
            return await handleRemixRequest(request, loadContext);
        } catch (error) {
            console.log('remix error')
            console.log(error);
            return new Response("An unexpected error occurred", {status: 500});
        }
    },
};

const config: TraceConfig = {
    exporter: new ConsoleSpanExporter(),
    service: {name: 'remix-otel-issue'}
}

export default instrument(handler, config)
