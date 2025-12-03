import { useEffect, useState } from 'react';
import {
  getActiveParentsForStudent,
  getCurrentStudent,
  getParentLinkRequestsForStudent,
  respondParentLink,
  ParentLinkRequest,
} from '../api/links';

export function useStudentDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [student, setStudent] = useState<{ id: string; displayName: string; linkCode: string } | null>(null);
  const [requests, setRequests] = useState<ParentLinkRequest[]>([]);
  const [activeParents, setActiveParents] = useState<any[]>([]);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const stu = await getCurrentStudent();
      setStudent(stu);
      const [reqs, parents] = await Promise.all([
        getParentLinkRequestsForStudent(stu.id),
        getActiveParentsForStudent(stu.id),
      ]);
      setRequests(reqs);
      setActiveParents(parents);
    } catch (err: any) {
      setError(err?.message || 'Failed to load student dashboard.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const handleRespond = async (linkId: string, decision: 'approve' | 'reject') => {
    try {
      await respondParentLink(linkId, decision);
      await load();
    } catch (err: any) {
      setError(err?.message || 'Failed to update request.');
    }
  };

  return { loading, error, student, requests, activeParents, respond: handleRespond, reload: load };
}
