const baseURL = `https://api.github.com/`;

// select DOM elements
const form = document.querySelector('form');
const inputSearch = form.querySelector('.search');
const usersList = document.querySelector('.users');
const alertBox = document.querySelector('.alert');
const clearBtn=document.querySelector('.clear-btn');
const searchBtn=document.querySelector('.search-btn');
const loading=document.querySelector('.loading');

// hide alert box
const hideAlertBox = (e) => {
    alertBox.style.display = 'none';
};
// search users
const searchUsers = async (e) => {
  e.preventDefault();
  const searchText = inputSearch?.value?.trim();
   // stop request to api if there is no text
  if (searchText === '') {
    alertBox.style.display = 'flex';
    setTimeout(() => {
      hideAlertBox();
    }, 2000);
    return;
  }

  try {
    loading.style.display='block';
    const response = await fetch(`${baseURL}search/users?q=${searchText}`);
    const data = await response.json();
    const users = data.items;
    if (users.length) {
      generateUsersListHtml(users);
    } else {
      usersList.innerHTML = `<h2>Not found user with this search text please try other queries</h2>`;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading.style.display='none';
    clearBtn.style.display='block';
    inputSearch.value = '';
  }
};

//generat users in html page
const generateUsersListHtml = (users) => {
  usersList.innerHTML = users
    .map(
      (user) => `<li>
    <img src="${user.avatar_url}">
    <h3>${user.login}</h3>
        <a href="single-page.html?query=${user.login}">More</a>
    </li>`
    )
    .join('');
};

searchBtn.addEventListener('click', searchUsers);
inputSearch.addEventListener('keypress', hideAlertBox);
//clear button
clearBtn.addEventListener('click',function(){
    usersList.style.display='none';
    clearBtn.style.display='none';
})
