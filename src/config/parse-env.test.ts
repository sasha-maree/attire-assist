import { expect, test } from "vitest";
import { parseEnv } from "./parse-env";

test("defaults to mock mode when AI_MODE is missing", () => {
    expect(parseEnv({})).toEqual({ aiMode: "mock" });
});

test("accepts an explicit mock mode", () => {
    expect(parseEnv({ AI_MODE: "mock" })).toEqual({ aiMode: "mock" });
});

test("rejects unsupported AI modes", () => {
    expect(() => parseEnv({ AI_MODE: "gemini" })).toThrow(
        'Invalid AI_MODE. Only "mock" is supported right now.',
    );
});