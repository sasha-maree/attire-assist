import { expect, test } from "vitest";
import { createMockReply } from "./mock-ai";

test("creates a labelled mock reply using the supplied shop", () => {
    const reply = createMockReply({
        id: "test-shop",
        name: "Evening Elegance",
        city: "Galle",
        description: "Fictional formalwear rentals.",
    });

    expect(reply.mode).toBe("mock");
    expect(reply.text).toContain("Evening Elegance");
    expect(reply.text).toContain("Galle");
    expect(reply.text).toContain("Fictional formalwear rentals.");
    expect(reply.text).toContain("Question answering is not connected yet.");
});