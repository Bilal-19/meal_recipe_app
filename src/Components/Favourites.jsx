import { useGlobalContext } from "../Context"

const Favourites = () => {
    const { favorites, showMeal, removeFromFavorites } = useGlobalContext()
    console.log(favorites)
    return (
        <>
            <section className="favorites">
                <div className="favorites-content">
                    <h5>Favorites</h5>
                    <div className="favorites-container">
                        {favorites.map(
                            (item) => {
                                const { idMeal, strMealThumb: image } = item
                                return (
                                    <>
                                        <div key={idMeal} className="favorite-item">
                                            <img src={image} className="favorites-img img" onClick={() => showMeal(idMeal, true)} />
                                            <button className="remove-btn" onClick={() => removeFromFavorites(idMeal)}>Remove</button>
                                        </div>
                                    </>
                                )

                            }
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Favourites