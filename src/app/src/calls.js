export const getTodos =  async () => {
    try {
    const res = await fetch(`http://localhost:8000/todos/`)
    const data = await res.json()
    return data
  } catch (err) {
    return err
  } 
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
