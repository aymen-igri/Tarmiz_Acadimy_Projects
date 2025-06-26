function loadUsers(){
    return new Promise((resolve)=>{
        fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => {
        if (200 <= users .status < 300){
            for (let user of users){
                document.getElementById('users').innerHTML += `<div class="user" id="${user.id}">
                <h4 class="username">${user.username}</h4>
                <h6 class="name">${user.name}</h6>
                </div>`
                }
        }
        resolve();
    })
    })
    
}

function loadPosts(userID){
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userID}`)
        .then(response => response.json())
        .then(posts => {
            if (200 <= posts.status < 300){
            document.getElementById('posts').innerHTML = ''; // Clear previous posts
            for (let post of posts){
                document.getElementById('posts').innerHTML += `<div class="post" id="${post.id}">
            <h2 class="title">${post.title}</h2>
            <p class="body">${post.body}</p>
            </div>`
            }
        }
    })
}

document.getElementById('users').addEventListener("click",(e)=>{
        const userClicked = e.target.closest('.user');
        if(userClicked){
            loadPosts(userClicked.id)
        }
    })


loadUsers().then(()=>{
    loadPosts(1);
})

