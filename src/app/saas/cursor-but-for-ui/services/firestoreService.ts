import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  type Unsubscribe,
} from 'firebase/firestore';
import { db } from './firebase';
import { Project } from '../types';

const projectsCol = (uid: string) => collection(db, 'users', uid, 'projects');

export const firestoreService = {
  /** Subscribe to real-time project updates. Returns unsubscribe fn. */
  subscribeProjects(uid: string, callback: (projects: Project[]) => void): Unsubscribe {
    const q = query(projectsCol(uid), orderBy('lastModified', 'desc'));
    return onSnapshot(q, (snap) => {
      const projects: Project[] = snap.docs.map((d) => ({
        ...(d.data() as Project),
        id: d.id,
      }));
      callback(projects);
    });
  },

  /** Save (create or update) a project */
  async saveProject(uid: string, project: Project): Promise<void> {
    const ref = doc(db, 'users', uid, 'projects', project.id);
    await setDoc(ref, {
      ...project,
      lastModified: Date.now(),
    });
  },

  /** Save all projects at once (bulk) */
  async saveAllProjects(uid: string, projects: Project[]): Promise<void> {
    const promises = projects.map((p) => this.saveProject(uid, p));
    await Promise.all(promises);
  },

  /** Delete a project */
  async deleteProject(uid: string, projectId: string): Promise<void> {
    await deleteDoc(doc(db, 'users', uid, 'projects', projectId));
  },

  /** Load all projects once (non-realtime) */
  async loadProjects(uid: string): Promise<Project[]> {
    const q = query(projectsCol(uid), orderBy('lastModified', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({
      ...(d.data() as Project),
      id: d.id,
    }));
  },
};
