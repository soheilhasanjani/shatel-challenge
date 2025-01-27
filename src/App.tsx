import PostCard from "./components/post/post-card";
import useCreatePost from "./hooks/use-create-post";
import useDeletePost from "./hooks/use-delete-post";
import useGetPosts from "./hooks/use-get-posts";
import useUpdatePost from "./hooks/use-update-post";

function App() {
  const { data: posts } = useGetPosts();
  const { mutate: createPost } = useCreatePost();
  const { mutate: updatePost } = useUpdatePost();
  const { mutate: deletePost } = useDeletePost();

  return (
    <div className="container mx-auto">
      <button
        onClick={() => {
          createPost({
            body: "1000",
            title: "ttttt",
            userId: 1,
          }).then((rs) => {
            console.log(rs);
          });
        }}
      >
        create
      </button>
      <div className="grid grid-cols-12 gap-4">
        {posts.map((post) => {
          return (
            <div className="col-span-4" key={post.id}>
              <PostCard
                title={post.title}
                body={post.body}
                userId={post.userId}
                id={post.id}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
