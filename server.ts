import * as fs from "node:fs";

import { createRequestHandler } from "@remix-run/express";
import { broadcastDevReady, installGlobals } from "@remix-run/node";
import chokidar from "chokidar";
import compression from "compression";
import express from "express";
import morgan from "morgan";
import sourceMapSupport from "source-map-support";
import mysql from 'mysql2/promise';

import {
    TodoItemData,
    deleteTodos,
    insertTodos,
    selectTodos,
    updateTodos,
} from './app/api/todos/index.ts';

sourceMapSupport.install();
installGlobals();

const BUILD_PATH = "./build/index.js";
let build = await import(BUILD_PATH);

const app = express();

app.use(compression());

// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable("x-powered-by");

// Remix fingerprints its assets so we can cache forever.
app.use(
    "/build",
    express.static("public/build", { immutable: true, maxAge: "1y" })
);

// Everything else (like favicon.ico) is cached for an hour. You may want to be
// more aggressive with this caching.
app.use(express.static("public", { maxAge: "1h" }));

app.use(morgan("tiny"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/todos', async (request, response) => {
    const connection = await mysql.createConnection(process.env.DATABASE_URL || '');
    const data = await selectTodos(connection).catch((error) => {
        console.error(error)
        response.status(500);
    });
    connection.end();
    response.send(data);
});

app.post('/api/todos', async (request, response) => {
    const connection = await mysql.createConnection(process.env.DATABASE_URL || '');
    const requestData: TodoItemData[] | Record<string, never> = request.body;
    if (!Array.isArray(requestData)) {
        console.error('Posted todo data is not iterable');
        return;
    }

    await insertTodos(connection, requestData).catch((error) => {
        console.error(error);
        response.status(500);
    });
    connection.end();
    response.send();
})

app.put('/api/todos', async (request, response) => {
    const connection = await mysql.createConnection(process.env.DATABASE_URL || '');
    const requestData: TodoItemData = request.body;
    await updateTodos(connection, requestData).catch((error) => {
        console.error(error);
        response.status(500);
    });
    connection.end();
    response.send();
})

app.delete('/api/todos', async (request, response) => {
    const connection = await mysql.createConnection(process.env.DATABASE_URL || '');
    const requestData: TodoItemData = request.body;
    if (!Array.isArray(requestData)) {
        console.error('Deleted todo data is not iterable');
        return;
    }

    await deleteTodos(connection, requestData).catch((error) => {
        console.error(error)
        response.status(500);
    });
    connection.end();
    response.send();
})

export const handler = process.env.NODE_ENV === "development"
    ? createDevRequestHandler()
    : createRequestHandler({
        build: await build,
        mode: process.env.NODE_ENV,
    })

app.all(
    "*",
    handler,
);

const port = process.env.PORT || 3000;
app.listen(port, async () => {
    console.log(`Express server listening on port ${port}`);

    if (process.env.NODE_ENV === "development") {
        broadcastDevReady(await build);
    }
});

function createDevRequestHandler() {
    const watcher = chokidar.watch(BUILD_PATH, { ignoreInitial: true });

    watcher.on("all", async () => {
        // 1. purge require cache && load updated server build
        const stat = fs.statSync(BUILD_PATH);
        build = import(BUILD_PATH + "?t=" + stat.mtimeMs);
        // 2. tell dev server that this app server is now ready
        broadcastDevReady(await build);
    });

    return async (req: any, res: any, next: any) => {
        try {
            return createRequestHandler({
                build: await build,
                mode: "development",
            })(req, res, next);
        } catch (error) {
            next(error);
        }
    };
}

