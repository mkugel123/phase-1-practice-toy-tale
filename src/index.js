let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  const cardsDiv = document.querySelector('#toy-collection')

  function createCard(toy){
    const card = document.createElement('div')
    card.className = 'card'
    card.innerHTML = 
      `<h2>${toy.name}</h2>
      <img src='${toy.image}' class='toy-avatar'/>
      <p>
        <span class = likes>${toy.likes}</span> Likes
      </p>
      <button class='like-btn' id='${toy.id}'>Like ❤️</button>`
    cardsDiv.appendChild(card)
    card.lastChild.addEventListener('click', () => {
      toy.likes += 1
      card.querySelector('span').textContent = toy.likes
      patchLike(toy)
    })
  }
  
    const newToyBtn = document.querySelector('.add-toy-form')
    
    newToyBtn.addEventListener('submit', handleSubmit)
      
    function handleSubmit(e) {
      e.preventDefault();
      let toyObj = {
        name: e.target.name.value,
        image: e.target.image.value,
        likes: 0,
      }
      createCard(toyObj)
      postNewToy(toyObj)

    }

    
    function getAllToys () {
      fetch('http://localhost:3000/toys')
      .then(response => response.json())
      .then((data) => {
        const toyObjects = data
        toyObjects.forEach((toy) =>{
        createCard(toy)
        })
      })
    }

    function postNewToy(toyObj) {
      fetch('http://localhost:3000/toys', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(toyObj)
      })
    }

    function patchLike(toy){
      fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: 'PATCH',
        headers:
        {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
    
        body: JSON.stringify(toy)
      })
    }

    getAllToys()


  });







