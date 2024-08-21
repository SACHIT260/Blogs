


import { useNavigate, useParams } from 'react-router-dom';
import useFetch from './useFetch';

const BlogDetails = () => {
    const { id } = useParams();
    console.log(id);
    
    const { data: blog, error, isPending } = useFetch(`https://blogs-nx1t.onrender.com/blogs/${id}`);
    const navigate = useNavigate();

    const handleClick = () => {
        fetch(`https://blogs-nx1t.onrender.com/blogs/${id}`, {
            method: 'DELETE'
        })
        .then(res => {
            if (res.ok) {
                navigate('/');
            } else {
                throw new Error('Failed to delete the blog');
            }
        })
        .catch(err => console.error(err));
    };

    console.log('Blog ID:', id);
    console.log('Loading:', isPending);
    console.log('Error:', error);
    console.log('Blog Data:', blog);

    return (
        <div className="blog-details">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {blog && (
                <article>
                    <h2>{blog.title}</h2>
                    <p>Written by {blog.author}</p>
                    <div>{blog.body}</div>
                    <button onClick={handleClick}>Delete</button>
                </article>
            )}
        </div>
    );
};

export default BlogDetails;
