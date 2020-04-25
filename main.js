function loadRecipes() {    

    fetch(`http://localhost:3001/recipes`, {
        method: 'GET',
        body: JSON.stringify(),
        headers: {
          "Content-Type": "application/json",
        }
    })
    .then(response => response.json())
    .then(data => {
        data.map(recipe => {

            let recipeDetailContainer = 'recipe-detail-'+recipe.uuid

            let recipeIngredients = recipe.ingredients
            const recipeDirections = recipe.directions

            $('.pageContent').append(`
                <div class='recipe'>
                    <div class='recipe-header'>
                        <div class='postDate'>${recipe.postDate}</div>
                        <div class='recipe-title'><h3>${recipe.title}</h3></div>
                    </div>
                    <div class='recipe-headline'>
                        <div class='recipe-description'>
                            <h4>${recipe.description}</h4>
                            <button id=${recipe.uuid} class='view-recipe'>TRY IT</button>
                        </div>
                        <div class='recipe-image'><img src='public/${recipe.images.small}'></div>
                    </div>
                    <div class='recipe-details-prev'>
                        <div class='servings'>${recipe.servings} servings /</div>
                        <div class='prepTime'>/ Prep Time: ${recipe.prepTime} minutes /</div>
                        <div class='cookTime'>/ Cook Time: ${recipe.cookTime} minutes</div>
                    </div>
                    <div id='recipe-detail'> 
                        <div id=${recipeDetailContainer} class='recipe-detail hidden'><b><i>INGREDIENTS:</b></i><br><br></div>
                    </div>
                    <div class='last-edited'>Last Edited: ${recipe.editDate}</div>
                </div>
            `)
            recipeIngredients.map(ingredient => {
                $(`#${recipeDetailContainer}`).append(
                    `<div id=${ingredient.uuid} class="ingredient">${ingredient.amount} ${ingredient.measurement} ${ingredient.name}</div>`
                )
            })
            recipeDirections.map(direction => {
                if (!direction.optional) {
                    $(`#${recipeDetailContainer}`).append(
                        `<br><div class="direction">${direction.instructions}</div>`
                    )
                }
                else {
                    $(`#${recipeDetailContainer}`).append(
                        `<br><div class="direction"><b>(optional)</b> ${direction.instructions}</div>`
                    )
                }
            })
        })
    })
    loadSpecials()
}

function loadSpecials() {

    fetch(`http://localhost:3001/specials`, {
        method: 'GET',
        body: JSON.stringify(),
        headers: {
          "Content-Type": "application/json",
        }
    })
    .then(response => response.json())
    .then(data => {
        data.map(special => {
            let specialItem = special.ingredientId
            console.log(specialItem)
            $(`#${specialItem}`).append(`<div class="special"><b>${special.title}</b> (${special.type}): ${special.text}</div>`)
        })  
    })
    .then(viewRecipe())
}

function viewRecipe() {
    $(document).on('click', '.view-recipe', function(e) {
        let recipeId = $(this).attr('id')
        console.log(recipeId)
        $(`#recipe-detail-`+recipeId).toggleClass('hidden')
    })
}

loadRecipes()

