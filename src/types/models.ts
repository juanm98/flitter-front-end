/* ---------===== custom props ====--------- */



/* ---------===== auth models =====--------- */

export interface Profile {
  name: string;
  photo?: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  name: string;
  email: string;
  profile: { id: number };
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  id: number;
  title: string;
  photo: string;
  desc: string;
  user: User;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface AllPosts {
  totalPosts: number;
  posts: Post[];
}
