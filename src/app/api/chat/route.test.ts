import { beforeEach, expect, test, vi } from "vitest";
import { POST } from "./route";

const { mockGetUser } = vi.hoisted(() => ({
    mockGetUser: vi.fn(),
}));

vi.mock("@/lib/supabase/server", () => ({
    createClient: async () => ({
        auth: {
            getUser: mockGetUser,
        },
    }),
}));

beforeEach(() => {
    mockGetUser.mockReset();
    mockGetUser.mockResolvedValue({
        data: {
            user: {
                id: "test-customer",
                is_anonymous: true,
            },
        },
        error: null,
    });
});

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


test("returns the requested shop's FAQ answer", async () => {
    const request = new Request("http://localhost/api/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            shopId: "classic-closet",
            message: "Do you offer fittings?",
        }),
    });

    const response = await POST(request);

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
        text:
            "Demo reply from Classic Closet: " +
            "We offer walk-in fittings during shop opening hours.",
        mode: "mock",
    });
});

test("rejects a request without a signed-in user", async () => {
    mockGetUser.mockResolvedValueOnce({
        data: { user: null },
        error: null,
    });

    const request = new Request("http://localhost/api/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            shopId: "classic-closet",
            message: "Do you offer fittings?",
        }),
    });

    const response = await POST(request);

    expect(response.status).toBe(401);
    expect(await response.json()).toEqual({
        error: "Please sign in before sending a message.",
    });
});