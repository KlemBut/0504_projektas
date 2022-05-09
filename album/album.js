let queryParams = window.location.search;
let urlParams = new URLSearchParams(queryParams);
let albumId = urlParams.get(`album-id`)


// import PhotoSwipeLightbox from 'photoswipe/lightbox';
// import 'photoswipe/style.css';

// const lightbox = new PhotoSwipeLightbox({
//   gallery: '#my-gallery',
//   children: 'a',
//   pswpModule: () => import('photoswipe')
// });
// lightbox.init();

fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}`)

    .then(r => r.json())
        .then(album => {
            console.log(album)
            let albumTitle = document.createElement('h2');
      
            albumTitle.innerText = upCase(album.title)
            document.querySelector('body').append(albumTitle)
            fetch(`https://jsonplaceholder.typicode.com/users/${album.userId}`)
                .then(r => r.json())
                    .then(albumAuthor => {
                        let authorName = document.createElement(`h4`)
                        authorName.textContent = `Created by ${albumAuthor.name}`
                        document.querySelector('body').append(authorName)
                        authorName.addEventListener(`click`, (e) => {
                            window
                              .open(
                                `/JS/0504_projektas/user/user.html?userId=${album.userId}`,
                                "_blank"
                              )
                              .focus();
                        })
                    fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos?_limit=11`)
                    
                    .then(r => r.json())
                    
                        .then(photos => {
                           photos.map(photo => {
                               console.log(photo.url)
                               const image = document.createElement('img');
                               image.setAttribute(`src`, `${photo.url}`)
                            document.querySelector(`body`).append(image)
                            })
                            
                        })    
                    })
    })
    
function upCase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
          