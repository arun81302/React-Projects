

export default function Article(prop) {
    const {key,img,title,country,link,date,text}=prop
    return (
        <div className="article-container">
            <img src={img.src} alt={img.alt} />
            <div className="text-content">
                <div className="inner-text-content">
                    <div className="location">
                        <img src="marker.png" alt="marker icon" />
                        <p>{country}</p>
                        <a href={link}>View on Google Maps</a>
                    </div>
                    <div className="title">{title}</div>
                    <div className="date">{date}</div>
                    <div className="text">
                      {text}
                    </div>
                </div>
            </div>
            
        </div>
        
    )
}