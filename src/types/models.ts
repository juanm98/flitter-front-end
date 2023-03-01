/* ---------===== custom props ====--------- */



/* ---------===== auth models =====--------- */

export interface Profile {
  id: number;

  name: string;
  photo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: number;

  name: string;
  email: string;
  profile: { id: number; photo?: string };
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

export interface Comment {
  id: number;
  content: string;
  user: {
      name: string;
      email: string;
      id: number;
      profile: {
          photo?: string;
      };
  };
  userId: number;
  postId: number;

  createdAt?: string;
  updatedAt?: string;
}

export interface AllPosts {
  totalPosts: number;
  posts: Post[];
}

export interface AllComments {
  totalComments: number;
  comments: Comment[];
}
