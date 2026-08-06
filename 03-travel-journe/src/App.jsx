import Header from "./components/Header"
import Article from "./components/Article"
import data from "../data"
let allArticles=data.map(each=>{
  return <Article 
  key={each.id}
  img={each.img}
  title={each.title}
  country={each.country}
  link={each.googleMapsLink}
  date={each.dates}
  text={each.text}
  />
})
export default function App(){
  return (
    <div className="container">
      <Header />
      {allArticles}
      
    </div>
  )
}