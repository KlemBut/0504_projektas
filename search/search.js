let queryParams = document.location.search;
let urlParams = new URLSearchParams(queryParams);
let searchParams = urlParams.get(`search`)

let mainWrapper = document.createElement(`div`);
mainWrapper.classList.add(`mainWrapper`);
document.querySelector(`header`).after(mainWrapper);

fetch(`https://jsonplaceholder.typicode.com/users?username=${searchParams}`)
.then(r => r.json())
.then(users => {
    if (users.length > 0){
        users.map(user => {
            console.log(user)
            let userItem = document.createElement("div");
            let userLink = document.createElement("a")
            let name = document.createElement("h3");
            let username = document.createElement("h4");
            let email = document.createElement("a")
            let profilePic = document.createElement("img")

            userLink.setAttribute(`href`, `../user/user.html?userId=${user.id}`)
            email.setAttribute(`href`, `mailto: ${user.email}`)
            profilePic.setAttribute(`src`, `../userImg.png`)
            userItem.classList.add(`userWrapper`)

            name.innerText = user.name;
            username.innerText = user.username;
            email.innerText = user.email

            mainWrapper.prepend(userItem);
            userLink.append(name, profilePic, username)
            userItem.append(userLink, email)
        })
    } else {
        fetch(`https://jsonplaceholder.typicode.com/users?name=${searchParams}`)
        .then(r => r.json())
        .then(userByName => {
            if (userByName.length > 0){
                userByName.map(user => {
                    let userItem = document.createElement("div");
                    let name = document.createElement("h3");
                    let username = document.createElement("h4");
                    let email = document.createElement("a")
                    let profilePic = document.createElement("img")

                    email.setAttribute(`href`, `${user.email}`)
                    profilePic.setAttribute(`src`, `../userImg.png`)
                    userItem.classList.add(`userWrapper`)

                    name.innerText = user.name;
                    username.innerText = user.username;
                    email.innerText = user.email

                    mainWrapper.prepend(userItem);
                    userItem.append(name, profilePic, username, email)
                })
            } else {
                fetch(`https://jsonplaceholder.typicode.com/users?email=${searchParams}`)
                .then(r => r.json())
                .then(userByEmail => {
                    console.log(userByEmail)
                    if (userByEmail.length > 0) {
                        userByEmail.map( user => {
                            let userItem = document.createElement("div");
                            let name = document.createElement("h3");
                            let username = document.createElement("h4");
                            let email = document.createElement("a")
                            let profilePic = document.createElement("img")

                            email.setAttribute(`href`, `${user.email}`)
                            profilePic.setAttribute(`src`, `../userImg.png`)
                            userItem.classList.add(`userWrapper`)

                            name.innerText = user.name;
                            username.innerText = user.username;
                            email.innerText = user.email

                            mainWrapper.prepend(userItem);
                            userItem.append(name, profilePic, username, email)                            
                        })
                    } 
                    else {
                            let userItem = document.createElement("div");
                            let notFound = document.createElement("h2");

                            notFound.textContent = `User not found`

                            mainWrapper.prepend(userItem);
                            userItem.append(notFound)
                    }
                })
            }
        })
    }
})