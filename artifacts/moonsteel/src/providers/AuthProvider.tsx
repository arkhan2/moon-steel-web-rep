"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { createSupabaseBrowserClient, hasSupabaseEnv } from "@/lib/supabase/client";

type UserRole = "admin" | "user" | null;

type AuthContextValue = {
  session: Session | null;
  user: User | null;
  role: UserRole;
  isLoading: boolean;
  refreshProfileRole: (userId?: string | null) => Promise<UserRole>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

async function fetchRole(userId: string): Promise<UserRole> {
  if (!hasSupabaseEnv()) return null;
  const supabase = createSupabaseBrowserClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .maybeSingle();

  if (error) return null;
  if (data?.role === "admin" || data?.role === "user") return data.role;
  return null;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshProfileRole = async (userId?: string | null): Promise<UserRole> => {
    if (!userId) {
      setRole(null);
      return null;
    }
    const nextRole = await fetchRole(userId);
    setRole(nextRole);
    return nextRole;
  };

  useEffect(() => {
    if (!hasSupabaseEnv()) {
      setIsLoading(false);
      return;
    }

    const supabase = createSupabaseBrowserClient();

    let mounted = true;

    const boot = async () => {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;

      const nextSession = data.session ?? null;
      const nextUser = nextSession?.user ?? null;

      setSession(nextSession);
      setUser(nextUser);
      await refreshProfileRole(nextUser?.id ?? null);
      if (mounted) setIsLoading(false);
    };

    void boot();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      const nextUser = nextSession?.user ?? null;
      setSession(nextSession);
      setUser(nextUser);
      void refreshProfileRole(nextUser?.id ?? null);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      user,
      role,
      isLoading,
      refreshProfileRole,
    }),
    [session, user, role, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
