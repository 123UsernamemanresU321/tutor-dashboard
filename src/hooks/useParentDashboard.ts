import { useEffect, useState } from 'react';
import {
  getCurrentParent,
  getParentLinksForCurrentParent,
  requestParentLink,
  ParentLink,
} from '../api/links';

export function useParentDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [parent, setParent] = useState<{ id: string; fullName: string } | null>(null);
  const [links, setLinks] = useState<ParentLink[]>([]);
  const [success, setSuccess] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const p = await getCurrentParent();
      const l = await getParentLinksForCurrentParent();
      setParent(p);
      setLinks(l);
    } catch (err: any) {
      setError(err?.message || 'Failed to load parent dashboard.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const submitLinkCode = async (linkCode: string) => {
    setError(null);
    setSuccess(null);
    try {
      await requestParentLink(linkCode);
      setSuccess('Request sent. Your child will see it and can approve.');
      await load();
    } catch (err: any) {
      setError(err?.message || 'Failed to request link.');
    }
  };

  return { loading, error, parent, links, success, submitLinkCode, reload: load };
}
