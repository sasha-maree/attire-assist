"use client";

import { createClient } from "./client";

let pendingSignIn: Promise<void> | null = null;

async function prepareSession(): Promise<void> {
    const supabase = createClient();

    const { data, error } = await supabase.auth.getSession();

    if (error) {
        throw error;
    }

    if (data.session) {
        return;
    }

    const { error: signInError } =
        await supabase.auth.signInAnonymously();

    if (signInError) {
        throw signInError;
    }
}

export function ensureCustomerSession(): Promise<void> {
    if (!pendingSignIn) {
        pendingSignIn = prepareSession().finally(() => {
            pendingSignIn = null;
        });
    }

    return pendingSignIn;
}