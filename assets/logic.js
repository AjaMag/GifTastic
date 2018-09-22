let aArr = ['cat', 'dog', 'Nikki Minaj', 'ocean', 'game of thrones', 'pizza']
let grab = ""

$(document).ready(function (event) {
    makeButtons()
})

function makeButtons () {
    $('#aButtons').empty() 
    for(let i = 0; i < aArr.length; i++) {
        let title = aArr[i]
        $('#aButtons').append(`
        <button id="btn${title}" onclick="getPics('${title}')">${title}</button>
        `);
    }
} 

//add a new button
$('.btn').click(function(event) {
    event.preventDefault()
    let newAnimal = $('#animalIn').val()
    aArr.push(newAnimal)
    makeButtons()
    $('#animalIn').val(' ');
})

function getPics(grab) {
    $('.picDiv').empty()
    let picNum = 10
    $.get('https://api.giphy.com/v1/gifs/search?q='+grab+'&api_key=hRWpPL0Ek1e2DSnIKfjanfxNVCKgz3nk&limit=25')
    .then(function (r) {
        for(let i = 0; i < picNum; i++) {
            let rating = (r.data[i].rating)
            if(rating === 'g' || rating === 'pg' || rating === 'pg-13') {
                let still = (r.data[i].images.original_still.url)
                let clip = (r.data[i].images.original.url)
                $('.picDiv').append(`
                <img id="moving${i}" class="clip" src="${clip}" onclick="changeGif('still', ${i})">
                <img id="still${i}" class="still" src="${still}" onclick="changeGif('clip', ${i})">
                <h4>Rating: ${rating}</h4>
                `);
                $('.still').css("display", "none")
        }
            else {
                picNum++
            }
        
        }
    
    })
    .catch(function (e) {
        console.log(e)
        });
};

function changeGif(type, id) {
    console.log(type)
    console.log(`'#pic${id}'`)
        if(type === 'still') {
            $(`#moving${id}`).css("display", "none")
            $(`#still${id}`).css("display", "initial")
        }
        else {
            $(`#still${id}`).css("display", "none")
            $(`#moving${id}`).css("display", "initial")
        }

}