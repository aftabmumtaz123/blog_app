const express = require('express');
const router = express.Router();
const Post = require('../models/post')



router.get('/', async (req, res) => {
    try {
        // Define locals for rendering
        const locals = {
            title: "NodeJS Blog",
            description: "Simple Blog created with NodeJS, Express, MongoDB"
        };

        // Pagination setup
        const perPage = 10;
        const page = parseInt(req.query.page) || 1;

        // Fetch paginated data
        const data = await Post.aggregate([
            { $sort: { createdAt: -1 } }, // Sort by creation date (newest first)
            { $skip: (perPage * (page - 1)) }, // Skip the previous pages
            { $limit: perPage } // Limit to `perPage` items
        ]);

        // Count total posts
        const count = await Post.countDocuments();

        // Calculate next page
        const nextPage = page + 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);

        // Render the index view
        res.render('index', {
            locals,
            data,
            current: page,
            nextPage: hasNextPage ? nextPage : null
        });
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.get('/post/:id', async (req,res)=>{
    
    try {
        
        let slug = req.params.id;

        const data = await Post.findById({_id: slug})
        
        const locals = {
            title: data.title,
            description: "Simple Blog created with NodeJS, Express, MongoDB"
        }

        res.render('post',{locals,data})


    } catch (error) {
        console.log(error)
    }
})




router.post('/search', async (req,res)=>{
   
    try {
        const locals = {
            title: "Search",
            description: "Simple Blog created with NodeJS, Express, MongoDB"
        }
        
        let searchTerm = req.body.searchTerm;
        const searchNotSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "")

        const data = await Post.find({
            $or: [
                { title: {$regex: new RegExp(searchNotSpecialChar, 'i')} },
                { body: {$regex: new RegExp(searchNotSpecialChar, 'i')} }
            ]
        });
        res.render("search",{locals,data});

    } catch (error) {
        console.log(error)
    }
})



router.get('/about',(req,res)=>{
    res.render("about")
})

module.exports = router;

























// function insertPostData(){
//     Post.insertMany([
//         {
//             title: "Understanding JavaScript Closures",
//             body: "Closures allow functions to access variables from their outer scope even after the outer function has returned. This is a powerful feature in JavaScript for creating private variables and functional programming."
//         },
//         {
//             title: "Introduction to React Hooks",
//             body: "Hooks are functions in React that let you use state and other React features without writing a class. Examples include useState, useEffect, and useContext."
//         },
//         {
//             title: "Getting Started with Node.js",
//             body: "Node.js is a runtime environment for executing JavaScript code server-side. It's known for its non-blocking, event-driven architecture."
//         },
//         {
//             title: "CSS Grid Layout: A Complete Guide",
//             body: "CSS Grid is a layout system that provides a way to design web pages in rows and columns. It simplifies the creation of complex layouts compared to older methods."
//         },
//         {
//             title: "Exploring Python's Data Classes",
//             body: "Data classes in Python simplify the process of creating classes for storing data. They automatically generate methods like __init__, __repr__, and more."
//         },
//         {
//             title: "What is REST API?",
//             body: "A REST API is an architectural style for designing networked applications. It uses standard HTTP methods like GET, POST, PUT, and DELETE for communication."
//         },
//         {
//             title: "Introduction to TypeScript",
//             body: "TypeScript is a superset of JavaScript that adds static typing and other features. It helps catch errors early and improve code maintainability."
//         },
//         {
//             title: "Building a Full-Stack App with MERN",
//             body: "The MERN stack combines MongoDB, Express.js, React.js, and Node.js to build full-stack web applications efficiently."
//         },
//         {
//             title: "Understanding Asynchronous Programming",
//             body: "Asynchronous programming in JavaScript involves using callbacks, promises, and async/await to handle operations that take time, such as API calls or file I/O."
//         },
//         {
//             title: "Getting Started with Docker",
//             body: "Docker is a platform for creating, deploying, and managing containerized applications. It ensures consistency across different development environments."
//         }
//     ]);
    
// }
// insertPostData();
