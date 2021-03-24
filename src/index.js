// write your code here
const url = 'http://localhost:3000/ramens'
const ramenMenu = document.querySelector('div#ramen-menu') //to render one ramen menu
const updateForm = document.querySelector('form#ramen-rating') //event listener to show the ramen detail


function renderOneRamenMenu(ramenObject){
   
        const img = document.createElement('img')
        img.src = ramenObject.image
        img.dataset.id = ramenObject.id
        ramenMenu.append(img)

}

function loadRamenMenu() {
    fetch(url)
    .then(response => response.json())
    .then(ramenArray => {
        ramenArray.forEach(ramenObject => renderOneRamenMenu(ramenObject))
        })     
}


ramenMenu.addEventListener('click', event => {
    
    const id = event.target.dataset.id
    
    fetch(`${url}/${id}`)
    .then(response => response.json())
    .then(oneRamenObject => {

    const detailImg = document.querySelector('img.detail-image')
    detailImg.src = oneRamenObject.image
    detailImg.alt = oneRamenObject.name

    const detailH2 = document.querySelector('h2.name')
    detailH2.textContent = oneRamenObject.name

    const detailH3 = document.querySelector('h3.restaurant')
    detailH3.textContent = oneRamenObject.restaurant

    const updateForm = document.querySelector('form#ramen-rating')
    updateForm.dataset.id = oneRamenObject.id
    updateForm[0].value = oneRamenObject.rating
    updateForm[1].value = oneRamenObject.comment
    
    })
    
    updateForm.addEventListener('submit', event => {
        event.preventDefault()
        const updatedValues = {
        rating: event.target.rating.value,
        comment: event.target.comment.value
    }
        
        fetch(`${url}/${event.target.dataset.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(updatedValues)
        })
        .then(response => response.json())
        .then(updatedRamenObject => {
            console.log(updatedRamenObject)

        })
       
    })

})

loadRamenMenu()