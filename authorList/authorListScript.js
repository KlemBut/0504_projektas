let mainWrapper = document.createElement('div');
document.querySelector(`body`).append(mainWrapper)
fetch(`https://jsonplaceholder.typicode.com/users`)
.then(r => r.json())
.then(authorList =>{
    authorList.map(author => {
        console.log(author)
        let authorName = document.createElement('h2');
        let authorNameLink = document.createElement(`a`)
        authorNameLink.setAttribute(`href`,`../user/user.html?userId=${author.id}`)
        authorName.textContent = author.name;
        mainWrapper.append(authorNameLink)
        authorNameLink.append(authorName)
        fetch(`https://jsonplaceholder.typicode.com/user/${author.id}/posts`)
        .then(r => r.json())
        .then(authorPosts => {
            console.log(authorPosts.length)
            let postCount = document.createElement(`p`)
            postCount.textContent = `Post count (${authorPosts.length})`
            authorNameLink.after(postCount)
        })
    })

})