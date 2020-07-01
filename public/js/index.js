const apiEndpoint = 'http://localhost:8080/edit'

const editRecipe = async ({ name, ingredients, directions, recipeId }) => {
    try {
        const res = await axios({
            method: 'PUT',
            url: `${apiEndpoint}/${recipeId}`,
            data: {
                name,
                ingredients,
                directions,
                recipeId
            }
        });

        // console.log(res);
        if (res.data.status === 'success') {
            window.setTimeout(() => {
                alert('Recipe successfully deleted!');
                location.assign('/');
            }, 1500);
        }
    } catch (err) {
        alert(err.response.data.message);
    }
};

// Dom Element
const editForm = document.getElementById('form--edit-recipe');

// Delegation
if (editForm)
    editForm.addEventListener('submit', e => {
        e.preventDefault();

        const name = document.getElementById('edit-form-name').value;
        const ingredients = document.getElementById('edit-form-ingredients').value;
        const directions = document.getElementById('edit-form-directions').value;
        const recipeId = document.getElementById('edit-form-id').value;

        // const { recipeId } = e.target.dataset;

        editRecipe(name, ingredients, directions, recipeId);

        console.log({ name, ingredients, directions, recipeId });
    });