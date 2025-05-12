// need to render out the children, recives the children and renders

export default function Layout(props) {
  const {children} = props

  const header = (
    <header>
      <h1 className="text-gradient"> The Fitness Tracker </h1>
      <p><strong> The 30 simple Workouts Program </strong></p>
    </header>
  )

  const footer = (
    <footer>
      <p> Built by <a href="https://www.<my name>.netlify.app" 
      target="_blank">L Malik </a><br/> Styled with <a href="https://www.fantascss.smoljames.com"
      target="_blank"> FantaCSS</a></p>
    </footer>
  )
  
  return (
    <>
      {header}
      {children}
      {footer}
    </>
  )
}