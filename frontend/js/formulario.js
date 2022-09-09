const $ = (element) => document.getElementById(element)
sessionStorage.setItem('url', 'http://localhost:3031')

window.onload = async () => {
console.log('formulario.js success');
let query = new URLSearchParams(location.search);
if (query.has('id')) {
   $('botonEdit').hidden = false
    try {
        let response = await fetch(sessionStorage.getItem('url') + '/api/movies/' + query.get('id'))
        let pelicula = await response.json()
        let movie = pelicula.data
        
        $('title').value = movie.title
        $('rating').value = movie.rating
        $('awards').value =movie.awards
        $('release_date').value = moment(movie.release_date).format('YYYY-MM-DD')
        $('length').value= movie.length
        
    } catch (error) {
        console.log(error);
    }

  $('form').addEventListener('submit', async (e) =>{
    e.preventDefault()
    let body = {
        title : $('title').value,
        rating : $('rating').value,
        awards : $('awards').value,
        release_date : $('release_date').value,
        length : $('length').value
    }
    try {
        let response = await fetch(`${sessionStorage.getItem('url')}/api/movies/update/${query.get('id')}`,{
            method : 'PUT',
            body : JSON.stringify(body),
            headers : {
                'Content-Type' : 'application/json'
            }
        })
        let result = await response.json()
        console.log(result);
    } catch (error) {
        console.log(error);
    }
    })
   
}else{
    $('botonCreate').hidden = false
    $('form').addEventListener('submit', async (e) =>{
    e.preventDefault()
    let body = {
        title : $('title').value,
        rating : $('rating').value,
        awards : $('awards').value,
        release_date : $('release_date').value,
        length : $('length').value
    }
    try {
        let response = await fetch(`${sessionStorage.getItem('url')}/api/movies/create`,{
            method : 'POST',
            body : JSON.stringify(body),
            headers : {
                'Content-Type' : 'application/json'
            }
        })
        let result = await response.json()
        console.log(result);

    } catch (error) {
        console.log(error);
    }
    })
  }
  }

  /*
  $('botonBorrar').hidden = false
    $('botonBorrar')?.addEventListener('submit', async (e) =>{
      e.preventDefault()
      try {
          let response = await fetch(`${sessionStorage.getItem('url')}/api/movies/delete/${query.get('id')}`, {
              method: "DELETE",
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  id : pelicula.data.id
              })
          })
          let result= await response.json()
          console.log(result);
      } catch (error) {
          console.log(error)
      }
  })
  */
