let queryParams = window.location.search;
let urlParams = new URLSearchParams(queryParams);
let userId = urlParams.get(`userId`)

let mainWrapper = document.createElement(`div`);
mainWrapper.classList.add(`mainWrapper`);
document.querySelector(`header`).after(mainWrapper);

//authors main info card

fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
  .then((r) => r.json())
  .then((users) => {
    let userItem = document.createElement("div");
    let addressItem = document.createElement("div");
    let contactsItem = document.createElement("div");
    userItem.classList.add(`userWrapper`);
    addressItem.classList.add(`addressWrapper`);
    contactsItem.classList.add(`contactsWrapper`);
    mainWrapper.prepend(userItem);

    let name = document.createElement("h3");
    let username = document.createElement("h4");
    let profilePic = document.createElement("img")
    profilePic.setAttribute(`src`, `./userImg.png`)

    name.innerText = users.name;
    username.innerText = users.username;
    
    addressItem.innerHTML = `<h4>Address:</h4>
                                        <ul>
                                        <li>${users.address.street}</li>
                                        <li>${users.address.suite}</li>
                                        <li>${users.address.city}</li>
                                        <li>${users.address.zipcode}</li>
                                        </ul>`;
    contactsItem.innerHTML = `<h4>Contacts:</h4>
                                        <ul>
                                        <li>Email: <a href="${users.email}">${users.email}</a></li>
                                        <li>Phone: <a href="${users.phone}">${users.phone}</a></li>
                                        <li>Web adress: <a href="${users.website}">${users.website}</a></li>
                                        <li>Company: "${users.company.name}"</li>
                                        </ul>`;
    console.log(users);

    addressItem.addEventListener(`click`, (e) => {
      window.open(
          `https://google.com/maps/search/${users.address.geo.lat} ${users.address.geo.lng} `,
          "_blank"
        ).focus();
    });

    userItem.append(name, profilePic ,username, addressItem, contactsItem);

//fetch to get posts for specific user

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
    
// fetch to get link to user created albums

        fetch(`https://jsonplaceholder.typicode.com/users/${userId}/albums`)
          .then((r) => r.json())
          .then((albums) => {
              let albumWrapper = document.createElement('div');
              albumWrapper.classList.add(`albumWrapper`)
              document.querySelector('.mainWrapper').append(albumWrapper)
              // .append(albumWrapper);
              albums.map(album => {
                  console.log(album)
                  let albumName = document.createElement('a');
                  albumName.setAttribute(`href`, `../album/album.html?album-id=${album.id}`)
                  albumName.textContent = upCase(album.title)
                  albumName.style = `display:block;`
                  albumWrapper.append(albumName)
      
              })
          })
      });
  });


function upCase(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
