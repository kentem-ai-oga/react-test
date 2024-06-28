import "@testing-library/jest-dom";
import { afterAll, afterEach, beforeAll } from "vitest";
import { server } from "./src/mocks/node.ts";

// テストの前にサーバーを起動
beforeAll(() => server.listen());

// 各テスト後にサーバーのリクエストハンドラをリセット
afterEach(() => server.resetHandlers());

// テストの後にサーバーを停止
afterAll(() => server.close());
