export type AppConfig = {
    aiMode: "mock";
};

export function parseEnv(
    env: Record<string, string | undefined>,
): AppConfig {
    const aiMode = env.AI_MODE ?? "mock";

    if (aiMode !== "mock") {
        throw new Error(
            'Invalid AI_MODE. Only "mock" is supported right now.',
        );
    }

    return { aiMode };
}