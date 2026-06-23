export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  techStack: string[];
  images: string[];
  githubUrl: string;
  liveUrl: string;
  category: string;
  featured: boolean;
  order: number;
  createdAt: number;
  updatedAt: number;
}

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  photoURL: string;
  role: "client" | "admin";
  createdAt: number;
}

export interface Conversation {
  id: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  projectType: string;
  budget: string;
  description: string;
  status: "new" | "in_progress" | "completed" | "archived";
  lastMessage: string;
  lastMessageAt: number;
  unreadCount: number;
  createdAt: number;
  updatedAt: number;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: "client" | "admin";
  text: string;
  files: MessageFile[];
  createdAt: number;
}

export interface MessageFile {
  url: string;
  type: "image" | "video";
  name: string;
}

export interface Terms {
  id: string;
  content: string;
  version: number;
  updatedAt: number;
  publishedAt: number;
}
