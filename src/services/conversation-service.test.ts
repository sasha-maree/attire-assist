import { expect, test } from "vitest";
import { createChatReply } from "./conversation-service";

test("answers the same question differently for each shop", async () => {
    const question = "Do you offer fittings?";

    const velvet = await createChatReply("velvet-rentals", question);
    const classic = await createChatReply("classic-closet", question);

    expect(velvet?.mode).toBe("mock");
    expect(velvet?.text).toContain("fittings by appointment");
    expect(velvet?.text).not.toContain("walk-in fittings");

    expect(classic?.mode).toBe("mock");
    expect(classic?.text).toContain("walk-in fittings");
    expect(classic?.text).not.toContain("fittings by appointment");
});

test("gives an honest fallback for an unknown question", async () => {
    const reply = await createChatReply(
        "classic-closet",
        "Do you offer free fittings?",
    );

    expect(reply?.mode).toBe("mock");
    expect(reply?.text).toContain("I don't have an answer");
    expect(reply?.text).toContain(
        "This demo has not sent them your message.",
    );
});

test("returns null for an unknown shop", async () => {
    const reply = await createChatReply(
        "unknown-shop",
        "Do you offer fittings?",
    );

    expect(reply).toBeNull();
});