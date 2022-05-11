let mainWrapper = document.createElement('div');
mainWrapper.classList.add(`mainWrapper`)
document.querySelector(`body`).append(mainWrapper)


fetch(`https://jsonplaceholder.typicode.com/albums`)
.then(r => r.json())
.then(albums => {
    // console.log(albums)
    albums.map(album => {
        console.log(album);
        let singleAlbum = document.createElement('div')
        let albumName = document.createElement('h2');

        singleAlbum.classList.add(`albumItem`)

        albumName.textContent = album.title

        mainWrapper.append(singleAlbum)
        
        fetch(`https://jsonplaceholder.typicode.com/users/${album.userId}`)
        .then(r => r.json())
        .then(author => {
            let authorName = document.createElement(`h4`)
            authorName.textContent = author.name
            
            fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${album.id}`)
            .then(r => r.json())
            .then(albumPictures => {
                console.log(albumPictures[0].url)
                let image = document.createElement(`img`)
                image.setAttribute(`src`, `${albumPictures[0].url}`)
                singleAlbum.append(albumName, authorName, image)
            })
        })
    })
})