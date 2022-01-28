document.addEventListener('DOMContentLoaded', () => {
    const monsterContainer = document.getElementById('monster-container')
    const backButton = document.getElementById('back')
    const forwardButton = document.getElementById('forward')
    const formContainer = document.getElementById('create-monster')
    const form = document.createElement('form')
    const formButton = document.querySelector('form button')
    form.innerHTML = `<input id="name" placeholder="name...">
    <input id="age" placeholder="age...">
    <input id="description" placeholder="description...">
    <button>Create</button>`
    formContainer.appendChild(form)
    let page = 1

    const fetchMonsters = (requestedPage) => {
        debugger
        fetch(`http://localhost:3000/monsters/?_limit=50&_page=${requestedPage}`)
        .then(function (response) {
            return response.json();
        })
        .then(monsters => {
            monsters.forEach((monster) => {
                console.log(monster)
                debugger
                renderMonsters(monster)
            })
        })
    }
    fetchMonsters(page)

    const renderMonsters = (monster) => {
        debugger
        const div = document.createElement('div')
        const h2 = document.createElement('h2')
        const h4 = document.createElement('h4')
        const p = document.createElement('p')
        h2.textContent = monster.name
        h4.textContent = monster.age
        p.textContent = monster.description
        div.appendChild(h2)
        div.appendChild(h4)
        div.appendChild(p)
        monsterContainer.appendChild(div)
    }

    const previousPage = () => {
        if (page > 1) {
            monsterContainer.innerHTML = ''
            page--
            fetchMonsters(page)
        } else {
            alert(`Whoops! There's no monsters there!`)
        }
    }

    const nextPage = (e) => {
        monsterContainer.innerHTML = ''
        page++
        fetchMonsters(page)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        let monsterObj = {
            name: e.target.name.value,
            age: e.target.age.value,
            description: e.target.description.value,
          }
          if (e.target.name.value === '' || e.target.age.value === '' || e.target.description.value === '') {
            alert('Wait! Make sure you have entered a name and image URL!')
            form.reset()
          } else {
            postMonster(monsterObj)
            alert('Your monster has been added to our database!')
            form.reset()
          }
    }

    const postMonster = (monster) => {
        fetch('http://localhost:3000/monsters', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Accept: "application/json"
      },
      body:JSON.stringify(monster)
    })
    .then(res => res.json())
    .then(monster => console.log(monster))
  }

    form.addEventListener('submit', submitHandler)
    backButton.addEventListener('click', previousPage)
    forwardButton.addEventListener('click', nextPage)
})