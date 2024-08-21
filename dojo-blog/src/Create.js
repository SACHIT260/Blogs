import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create=()=>{

        const [title,setTitle]=useState();
        const [body,setBody]=useState();
        const [author,setAuthor]=useState();
        const [isPending,setIsPending]=useState(false);
        const history=useNavigate();

const handleSubmit=(e)=>{
    e.preventDefault();
    const blog={title,body,author};
    // console.log(blog);
    fetch('https://blogs-nx1t.onrender.com/blogs',{
        method:'POST',
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(blog)
    }).then(()=>{
        console.log('new blog added');
        setIsPending(false);
        history('/')
    })
}



    return (
        <div className="create">
            <h2>Add a new Blog</h2>
            <form onSubmit={handleSubmit}>
                <label >Blog title:</label>
                    <input type="text"
                    required
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                     />
                <label >Blog Body:</label>
                <textarea required
                value={body}
                onChange={(e)=>setBody(e.target.value)}
                ></textarea>
                <label >Blog Author</label>
                <input type="text"
                required
                value={author}
                onChange={(e)=>setAuthor(e.target.value)}
                >

                </input>
                {!isPending &&<button>Add Blog</button>}
                {isPending &&<button>Adding Blog...</button>}

                {/* <p>{title}</p> */}
            </form>
        </div>
    );
}
export default Create;
