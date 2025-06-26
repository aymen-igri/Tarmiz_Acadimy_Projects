let request = new XMLHttpRequest();
request.open('GET', 'https://jsonplaceholder.typicode.com/users');
request.send();
request.onload = ()=> {
    if (200 <= request.status < 300){
        let users = JSON.parse(request.response);
        for (let user of users){
            document.getElementById('users').innerHTML += `<div class="user" id="${user.id}">
            <h4 class="username">${user.username}</h4>
            <h6 class="name">${user.name}</h6>
        </div>`
        }
    }
}

document.getElementById('users').addEventListener("click",(e)=>{
    const userClicked = e.target.closest('.user');
    
    let request = new XMLHttpRequest();
    request.open('GET', `https://jsonplaceholder.typicode.com/posts?userId=${userClicked.id}`);
    request.send();
    request.onload = ()=> {
        if (200 <= request.status < 300){
            document.getElementById('posts').innerHTML = ''; // Clear previous posts
            let posts = JSON.parse(request.response);
            for (let post of posts){
                document.getElementById('posts').innerHTML += `<div class="post" id="${post.id}">
            <h2 class="title">${post.title}</h2>
            <p class="body">${post.body}</p>
        </div>`
            }
        }
    }
})