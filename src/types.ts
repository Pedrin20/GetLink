export interface Link {
  id: string
  title: string
  url: string
  description?: string
  userId: string
  createdAt?: any
}

export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
  themeColor: string;
  createdAt: any;

}

export type LinkInput = Omit<Link, 'id' | 'createdAt'>