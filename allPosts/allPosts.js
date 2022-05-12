let queryParams = window.location.search;
let urlParams = new URLSearchParams(queryParams);
let userId = urlParams.get(`userId`)

let mainWrapper = document.createElement(`div`);
mainWrapper.classList.add(`mainWrapper`);
document.querySelector(`header`).after(mainWrapper);

if(userId){
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
          .then((r) => r.json())
          .then((posts) => {
            let postsWrapper = document.createElement(`div`);
            postsWrapper.classList.add(`postWrapper`);
            document.querySelector(`.mainWrapper`).append(postsWrapper);
        
            posts.map((post) => {
              let title = upCase(post.title);
              let body = upCase(post.body);
        
              let postId = post.id;
              let postElement = document.createElement(`div`);
              postElement.classList.add(`postItem`);
              postsWrapper.append(postElement);
              let name = document.createElement(`h2`);
              name.textContent = title;
              let main = document.createElement(`p`);
              main.textContent = body;
              postElement.append(name, main);
            });
        })
}
else{
    
    fetch(`https://jsonplaceholder.typicode.com/posts?_limit=11`)
    .then((res) => res.json())
    .then((posts) => {
    console.log(posts);
    let postsWrapper = document.createElement(`div`);
    postsWrapper.classList.add(`postWrapper`);
    mainWrapper.prepend(postsWrapper);

    posts.map((post) => {
        let title = upCase(post.title);
        let body = upCase(post.body);
        let userId = post.userId;
        let postId = post.id;
        let postElement = document.createElement(`div`);
        postElement.classList.add(`postItem`);
        let nameLink = document.createElement(`a`)
        let name = document.createElement(`h2`);
        let main = document.createElement(`p`);

        name.textContent = title;
        main.textContent = body;

        postsWrapper.append(postElement)
        nameLink.append(name)
        postElement.append(nameLink, main)
})
  })
}

    function upCase(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }