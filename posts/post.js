let queryParams = window.location.search;
let urlParams = new URLSearchParams(queryParams);
let postId = urlParams.get(`post-id`)

let mainWrapper = document.createElement(`div`)
mainWrapper.classList.add(`mainWrapper`)
document.querySelector('body').append(mainWrapper);

console.log(postId)
fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
.then(r => r.json())
.then(post => {
    console.log(post)
    let postsWrapper = document.createElement(`div`);
    postsWrapper.classList.add(`postWrapper`);
    mainWrapper.prepend(postsWrapper);


      let title = upCase(post.title);
      let body = upCase(post.body);
      let userId = post.userId;
      let postId = post.id;
      let postElement = document.createElement(`div`);
      postElement.classList.add(`postItem`);

// Get user ID to get apost authors info

      fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then((r) => r.json())
        .then((user) => {
          let name = document.createElement(`h2`);
          name.textContent = title;
          let main = document.createElement(`p`);
          for(i = 0; i < 10; i++){
              main.textContent += `${body}. `;
          }

          let otherPosts = document.createElement('a');
          otherPosts.textContent = `Other posts by the author`
          otherPosts.setAttribute(`href`, `../allPosts/allPosts.html?userId=${userId}`)

//link for user id to lead to user page

          let author = document.createElement(`a`);
          author.setAttribute(
            `href`,
            `../user/user.html?userId=${user.id}`
          );
          author.textContent = `Created by: ${user.name}`;
          let comms = document.createElement(`p`);
          comms.textContent = `Comments`;
          comms.classList.add(`comReveal`);
          postElement.append(name, author, otherPosts, comms, main);

// link for specific post

          name.addEventListener(`click`, (e) => {
            window
              .open(
                `./posts/post.html?post-id=${postId}`,
                "_blank"
              )
              .focus();
          });
          name.classList.add(`hyper`)
         
// fetch to display post comments

          fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
            .then((r) => r.json())
            .then((comments) => {
              let commentsWrapper = document.createElement(`div`);
              commentsWrapper.classList.add(`commentsWrapper`);
              postElement.append(commentsWrapper);
              commentsWrapper.setAttribute(`hidden`, `true`);

// reveal comments functionality

              comms.addEventListener(`click`, (e) => {
                commentsWrapper.toggleAttribute(`hidden`);
              });
              comms.classList.add(`hyper`)
              comments.map((comment) => {
                let commentItem = document.createElement(`div`);

                commentsWrapper.append(commentItem);
                let comTitle = document.createElement(`h3`);
                let comBody = document.createElement(`p`);
                let comEmail = document.createElement(`p`);
                comTitle.innerText = upCase(comment.name);
                comBody.innerText = upCase(comment.body) + ".";
                comEmail.innerText = `${comment.email}`;
                commentItem.append(comTitle, comEmail, comBody);
              });
            });
        });
      postsWrapper.prepend(postElement);

  });



//Capitalize first letter,
function upCase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  