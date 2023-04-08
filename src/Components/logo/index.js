import { Link } from "react-router-dom"

const Logo = () => {
      return (
            <Link to="/" className="rounded-full overflow-hidden w-10 mx-1 mr-2">
                  <img src="../../logo.png" alt="anh dai dien"/>
            </Link>
      )
}
export default Logo