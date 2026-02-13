import { User } from '../types';

const USERS_KEY = 'cursorui_users';
const SESSION_KEY = 'cursorui_session';

export const authService = {
  // Simulate network delay
  delay: (ms: number) => new Promise(resolve => setTimeout(resolve, ms)),

  async login(email: string): Promise<User> {
    await this.delay(800); // Fake network request
    
    // In a real app, we'd verify password. Here, we just check if user exists or auto-create for demo
    // For this specific requirement, we just need to bind storage to email.
    
    // Check if user exists in our "db"
    const usersRaw = localStorage.getItem(USERS_KEY);
    const users: User[] = usersRaw ? JSON.parse(usersRaw) : [];
    
    let user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!user) {
        throw new Error("User not found. Please sign up.");
    }

    // Set session
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    return user;
  },

  async signup(email: string, name: string): Promise<User> {
    await this.delay(1000);
    
    const usersRaw = localStorage.getItem(USERS_KEY);
    const users: User[] = usersRaw ? JSON.parse(usersRaw) : [];
    
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
        throw new Error("Email already registered.");
    }

    const newUser: User = {
        id: `user-${Date.now()}`,
        email,
        name
    };

    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    
    // Auto login after signup
    localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
    
    return newUser;
  },

  logout() {
    localStorage.removeItem(SESSION_KEY);
  },

  getCurrentUser(): User | null {
    const session = localStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
  }
};