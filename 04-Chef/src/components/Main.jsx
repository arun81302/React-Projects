import { useState } from "react"
import { getRecipeFromMistral } from "../ai"
import Recipe from "./Recipe"


export default function Main(){
    const [ingredientArr,setIngredientArr]=useState([])
    const [recipeShows,setRecipeshows]=useState("")
    const list=ingredientArr.map(value=>(
        <li key={value}>{value}</li>
    ))

    function handleClick(formData){
       
        const newIngredient=formData.get('ingredients')
        setIngredientArr(prev=>[...prev,newIngredient])
    }
    async function getRecipe(){
        const recipeData=await getRecipeFromMistral(ingredientArr) 
        setRecipeshows(recipeData)

    }

    return(
        <main className="mt-2 mb-2">
            <form action={handleClick} className=" flex justify-center pt-5 pb-5 gap-4">
                <input 
                
                className="border border-gray-300 rounded-md ml-2 px-3 py-2 grow max-w-150"
                aria-label="add ingredient"
                type="text"
                placeholder="e.g. oregano"
                name="ingredients"
                />
                <button
                className="border border-gray-300 rounded-md px-3 py-2 mr-2 tex bg-[#141413] text-[#FAFAF8]"
                >+Add ingredient</button>

            </form>

            

            <div className=" max-w-190 mx-auto px-2">
                <h1 className="text-3xl font-bold">{ingredientArr.length?"Ingreidents on Hand":""}</h1>
                    <ul className="max-w-150 mt-5 ml-5 list-disc text-xl font-light">
                {list}
                    </ul>
            </div>
            
            {ingredientArr.length>3?
            <div className="max-w-190 w- mx-auto rounded-md mt-4 p-4  flex justify-between items-center bg-[#cecdc8]">
                <div className="flex flex-col">
                    <h2 className="text-2xl font-semibold">Ready for a recipe?</h2>
                    <p className="text-taupe-600 font-light mt-3">Generate a racipe from your list of ingredients</p>
                </div>
                <button onClick={getRecipe} className="bg-orange-400 w-30 py-2 text-white font-semibold rounded-md cursor-pointer hover:bg-amber-600">Get a recipe</button>

            </div>
            : null    
        }
            {/* {recipeShows?<h2>Here is your data</h2>:} */}
            {recipeShows ? <Recipe data={recipeShows} /> : null}
            

            
                

        </main>
    )
}