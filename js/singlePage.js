const baseURL='https://api.github.com/users/';

//select DOM Element
const pageLocation=window.location.href.split('=')[1];
const information=document.querySelector('.user-information');
const userPhoto=document.querySelector('.user-photo');
const userInformation=document.querySelector('.information');
const loading=document.querySelector('.loading');
const hireable=document.querySelector('.hireable');
const userFollowing=document.querySelector('.followers-box');
const userProjectBox=document.querySelector('.project');

//get users
const getUser= async ()=>{
try {
    loading.style.display='block';
    const response= await fetch(`${baseURL}${pageLocation}`);
    const data= await response.json();
    generateUserListHtml(data);
} catch (error) {
    console.log(error);
}finally{
    loading.style.display='none';
}
};

//get user git project
const getUserProject= async ()=>{
        const secondResponse= await fetch(`https://api.github.com/users/${pageLocation}/repos?per_page=5&sort=created:asc`);
        const userProject= await secondResponse.json();
        generateUserProject(userProject);
    };
 
//generate user photo and information
const generateUserListHtml=(user)=>{
    information.style.display='grid'
    userFollowing.style.display='block';
    //user photo and name
    userPhoto.innerHTML=`<img src="${user?.avatar_url}">
    <p>${user.name <1? "" :user?.name}</p>
    <p>${user.location <1? "" :user?.location}</p>`;

    //user information
    userInformation.innerHTML=`<span>${user.bio<1?"":'Bio:'}</span>
    <p>${user.bio<1?"":user?.bio}</p>
    <a href="${user.html_url<1?"":user.html_url}">Visit Github Page</a>
    <p>${user.login<1? "":'Login:'+ user?.login}</p>
    <p>${user.company<1?"":'Company:'+user?.company}</p>`
    
    //user hireable
    if(user.hireable=== true){
        hireable.classList.add('checkmark');
    }else{
        hireable.classList.add('times');
    }
    //user followers and following
    userFollowing.innerHTML=`<span>Followers:${user.followers}</span><span>Following:${user.following
    }</span><span>Public Repos:${user.public_repos
    }</span><span>Poblic Gists:${user.public_gists}</span>`
};

//generat user git project
const generateUserProject=(projects)=>{
    for(let project of projects){
        const projectBox=document.createElement('div');
        projectBox.innerHTML=`<a href="${project.clone_url}">${project.name}</a>`;
        userProjectBox.appendChild(projectBox);
    }
};


getUser();
getUserProject();
