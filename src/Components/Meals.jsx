// importing context api
import { useGlobalContext } from "../Context"
import { BsHandThumbsUp } from 'react-icons/bs'
import ReactLoading from 'react-loading'

const Meals = () => {

    // Destructuring the meals data 
    const { meals, isLoading, showMeal, addToFavorites } = useGlobalContext()

    const type = 'spinningBubbles'
    const color = 'black'

    if (isLoading) {
        return (
            <>
                <section className="section">
                    <ReactLoading color={color} type={type} />
                    <p className="loading-text">Loading</p>
                </section>
            </>
        )
    }

    if (meals.length < 1) {
        return <section className="section">
            <ReactLoading color={color} type={type} />
            <p className="not-found">No meals matched your search term. Please try again</p>
        </section>
    }
    return (
        <>
            <section className="section-center">
                {
                    meals.map(singleMeal => {
                        // creating an object
                        const { idMeal, strMeal: title, strMealThumb: image } = singleMeal

                        return (
                            <>
                                <article key={idMeal} className="single-meal">
                                    {/* the reason to setup arrow function: if we don't create an arrow function, */}
                                    {/* then the function showMeal() will call itself  */}
                                    <img src={image} height='300px' className="img" onClick={() => showMeal(idMeal)} />
                                    <footer>
                                        <h5>{title}</h5>
                                        <button className="like-btn" onClick={() => addToFavorites(idMeal)}><BsHandThumbsUp /></button>
                                    </footer>
                                </article>

                            </>
                        )
                    })
                }
            </section>
        </>
    )
}

export default Meals