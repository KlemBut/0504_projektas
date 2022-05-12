let mainWrapper = document.createElement(`div`)
mainWrapper.classList.add(`mainWrapper`)
document.querySelector('body').append(mainWrapper);
// Fetch main post list
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

// Get user ID to get apost authors info

      fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then((r) => r.json())
        .then((user) => {
          let nameLink = document.createElement(`a`)
          let name = document.createElement(`h2`);
          let main = document.createElement(`p`);
          let author = document.createElement(`a`);
          let comms = document.createElement(`p`);

          name.textContent = title;
          main.textContent = body;
          author.textContent = `Created by: ${user.name}`;
          comms.textContent = `Comments`;
          
          comms.classList.add(`comReveal`);

//link for user id to lead to user page
          author.setAttribute(
            `href`,
            `./user/user.html?userId=${user.id}`
          );
          nameLink.setAttribute(`href`, `./posts/post.html?post-id=${postId}`)
          
          nameLink.append(name)
          postElement.append(nameLink, author, comms, main);

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
  });

//sidebar with album list

fetch(`https://jsonplaceholder.typicode.com/albums?_limit=11`)
  .then((r) => r.json())
  .then((albums) => {
      let albumsWrapper = document.createElement('div')
      
      albumsWrapper.classList.add(`albumsWrapper`)
      mainWrapper.append(albumsWrapper)
    albums.map((album) => {
      let albumItem = document.createElement('div');
      albumItem.classList.add(`albumItem`)
      albumsWrapper.append(albumItem)
      let albumTitle = document.createElement('h2');
      let albumTextWrapper = document.createElement('div')
      albumItem.append(albumTextWrapper)
      
      albumTitle.innerText = upCase(album.title)
      albumTextWrapper.append(albumTitle)

// link for specific album

      albumTitle.addEventListener(`click`, (e) => {
        window
          .open(
            `./album/album.html?album-id=${album.id}`,
            "_blank"
          )
          .focus();
      });
      albumTitle.classList.add(`hyper`)

// getting specific album id

      fetch(`https://jsonplaceholder.typicode.com/users/${album.userId}`)
        .then(r => r.json())
            .then(albumAuthor => {
                let authorName = document.createElement(`h4`)
                authorName.textContent = `Created by ${albumAuthor.name}`
                albumTextWrapper.append(authorName)

//thumbnail for the album

                fetch(`https://jsonplaceholder.typicode.com/albums/${album.id}/photos?_limit=1`)
                .then(r => r.json())
                    .then(pics=>{
                        pics.map(pic => {
                            console.log(pic);
                            let thumbnail = document.createElement(`img`)
                            thumbnail.setAttribute(`src`, `${pic.thumbnailUrl}`)
                            albumItem.append(thumbnail)
                        })
                    })
            })
    });
  });

//Capitalize first letter,
function upCase(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
