import { useEffect, useState } from "react";
import { getUserProfileByUid, getUserProfileByUsername } from "../services/userService";
import type { UserProfile } from "../types";

export function useUserProfile( uid?: string, username?: string ) {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


   useEffect(() => {
    async function fetch() {
      if (!uid && !username) {
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);

      try {
        let data: UserProfile | null = null;

        if (uid) {
          data = await getUserProfileByUid(uid);
        } else if (username) {
          data = await getUserProfileByUsername(username);
        }
        setProfile(data);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Erro desconhecido ao carregar perfil';
        setError(message);
      } finally {
        setLoading(false);
      }
    }


    fetch();
  }, [uid, username]);

  return { profile, loading, error };
}