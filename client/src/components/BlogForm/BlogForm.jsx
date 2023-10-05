import { useForm } from "react-hook-form";
import { Button, Card, Input, TextArea } from "../ui";
import { useBlog } from "../../context/BlogContext";

function BlogForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createBlog, errors: CreateBlogErrors } = useBlog();

  const onSubmit = handleSubmit(async (data) => {
    await createBlog(data);
  });

  return (
    <div className="px-10 pt-10">
      <Card>
        <form onSubmit={onSubmit}>
          {CreateBlogErrors &&
            CreateBlogErrors.map((error, i) => (
              <p className="text-red-500" key={i}>
                {error}
              </p>
            ))}
          <h1 className="text-2xl font-bold">Create Blog</h1>
          <Input
            placeholder="Enter your blog title..."
            {...register("title", {
              required: true,
            })}
          />
          {errors.title && <p className="text-red-500">Title is required</p>}
          <TextArea
            placeholder="Enter your blog description..."
            {...register("content", {
              required: true,
            })}
          />
          {errors.content && (
            <p className="text-red-500">Content is required</p>
          )}
          <Button className={`mt-2`}>Create Blog</Button>
        </form>
      </Card>
    </div>
  );
}

export default BlogForm;
