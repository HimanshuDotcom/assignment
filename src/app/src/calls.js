export const getTodos =  () => {
    return fetch(`http://localhost:8000/todos/`)
    .then(res => res.json())
    .then(data => data)
    .catch(err => err) 
}

export const addTodo = (task) => {

    fetch(`http://localhost:8000/todos/`, {
      method :'POST',
      headers : {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({'name' : task})
    })
    .then(res => res.json())
    .then(data => {
      console.log('Success' , data)
    })
    .catch(error => {
      console.error('Error:', error)
    })

 }
