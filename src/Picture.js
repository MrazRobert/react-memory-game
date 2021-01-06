
const Picture = ({picture, clickOnPicture}) => {
    const {id, name, image, type} = picture;

    return (
        <section className="image-container">
            <div>
                <img src={image} alt={name} />
            </div>
            <div 
                className={`cover cover-${type}`}
                onClick={() => clickOnPicture(id)}
            ></div>
        </section>
    )
}

export default Picture;