// Define the Post type
export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

// Define the state shape
export interface PostsState {
  posts: Post[];
  status: {
    fetch: {
      isPending: boolean;
      isError: boolean;
      isSuccess: boolean;
      error: string | null;
    };
    add: {
      isPending: boolean;
      isError: boolean;
      isSuccess: boolean;
      error: string | null;
    };
    update: {
      isPending: boolean;
      isError: boolean;
      isSuccess: boolean;
      error: string | null;
    };
    delete: {
      isPending: boolean;
      isError: boolean;
      isSuccess: boolean;
      error: string | null;
    };
  };
}
