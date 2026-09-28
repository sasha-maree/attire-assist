import { expect, test } from "vitest";
import { POST } from "./route";

test("rejects a whitespace-only message", async () => {
    const request = new Request("http://localhost/api/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            shopId: "classic-closet",
            message: "   ",
        }),
    });

    const response = await POST(request);

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({
        error: "Provide a shop ID and a message of 1–1000 characters.",
    });
});

test("rejects malformed JSON", async () => {
    const request = new Request("http://localhost/api/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: "{",
    });

    const response = await POST(request);

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({
        error: "Invalid JSON.",
    });
});

test("returns 404 for an unknown shop", async () => {
    const request = new Request("http://localhost/api/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            shopId: "unknown-shop",
            message: "Hello",
        }),
    });

    const response = await POST(request);

    expect(response.status).toBe(404);
    expect(await response.json()).toEqual({
        error: "Shop not found.",
    });
});


// This checks the contract your frontend depends on: status 200, reply text for the requested shop, and mode: "mock".
test("returns a labelled mock reply for a valid request", async () => {
    const request = new Request("http://localhost/api/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            shopId: "classic-closet",
            message: "Hello",
        }),
    });

    const response = await POST(request);

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
        text: expect.stringContaining("Classic Closet"),
        mode: "mock",
    });
});