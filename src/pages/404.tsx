import * as React from "react"

import Site from "../components/site"
import Map from "../components/map"
import { Link } from "gatsby"

const FourOhFour = () => (
	<Site title="404" description="There's nothing here." slug="404">
		<p>
			There isn't anything on this site except <Link to="/">the main page</Link>—maybe you're
			looking for that one?
		</p>
	</Site>
)

export default FourOhFour
