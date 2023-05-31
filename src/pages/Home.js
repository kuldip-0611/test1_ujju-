import React from 'react'
import Box from '@mui/material/Box'
import Navbar from '../components/Navbar'
import { Button } from '@mui/material'
import { styled } from '@mui/system'
import { Modal, TextField } from '@mui/material'
import EditModal from '../components/EditModel'


const DashboardChart = () => {

    // create function for edit delete and add post and pass it to the table component as a prop and then call it in the table component

    let url = 'https://jsonplaceholder.typicode.com/posts'

    const [posts, setPosts] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [title, setTitle] = React.useState('')
    const [body, setBody] = React.useState('')
    const [userId, setUserId] = React.useState('')
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };


    React.useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setPosts(data)
                setLoading(false)
            })
    }, [])

    const addPost = (title, body, userId) => {
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                body: body,
                userId: userId
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(response => response.json())
            .then(data => setPosts([...posts, data]))

        console.log(posts)
    }

    const deletePost = (id) => {
        fetch(`${url}/${id}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => setPosts(posts.filter(post => post.id !== id)))
    }

    const editPost = (id , title , body ) => {
        fetch(`${url}/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                title: title,
                body: body,
                userId: 1
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(response => response.json())
            .then(data => setPosts(posts.map(post => post.id === id ? data : post)))
    }

    return (
        <>
            <Navbar />
            <Box height={64 + 'px'} />
            <Box sx={{ display: 'flex' }}>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 3, width: { sm: 'calc(100% - 240px)' } }}
                >
                    {/* create add post form  */}

                    <form onSubmit={(e) => {
                        e.preventDefault()
                        addPost(title, body, userId)
                    }}>
                        <input type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                        <input type="text" placeholder="body" value={body} onChange={(e) => setBody(e.target.value)} />
                        <input type="text" placeholder="userId" value={userId} onChange={(e) => setUserId(e.target.value)} />
                        <button type="submit">Add Post</button>
                    </form>

                    
                    {
                        loading ? <h1>Loading...</h1> :
                            <table border="1">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Title</th>
                                        <th>Body</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        posts.map(post => (
                                            <tr key={post.id}>
                                                <td>{post.id}</td>
                                                <td>{post.title}</td>
                                                <td>{post.body}</td>
                                                <td>
                                                <Button onClick={handleOpen} variant="contained" color="primary">
                                                    Edit
                                                </Button>
                                                <EditModal
                                                    open={open}
                                                    handleClose={handleClose}
                                                    post={post}
                                                    handleUpdate={editPost}
                                                />
                                                    <button onClick={() => deletePost(post.id)}>Delete</button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>    
                            </table>
                    }
                </Box>
                
            </Box>
        </>
    )
}

export default DashboardChart