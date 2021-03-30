const Header = (props) => {
  return (
    <div >
      <h2 style ={{color:"black"}} ><b>{props.title}</b></h2>
    </div>
  )
}

Header.defaultProps = {
  title: 'E CAR ACCESSORIES',
}

export default Header
