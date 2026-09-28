import { expect, test } from "vitest";
import { createChatReply } from "./conversation-service";

test("creates a mock reply for the requested shop", async () => {
    const reply = await createChatReply("classic-closet");

    expect(reply).not.toBeNull();
    expect(reply?.mode).toBe("mock");
    expect(reply?.text).toContain("Classic Closet");
    expect(reply?.text).toContain("Kandy");
    expect(reply?.text).not.toContain("Velvet Rentals");
});

test("returns null for an unknown shop", async () => {
    const reply = await createChatReply("unknown-shop");

    expect(reply).toBeNull();
});