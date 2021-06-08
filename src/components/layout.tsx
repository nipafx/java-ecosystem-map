import * as React from "react"

import "./layout.css"
import { Link } from "gatsby"

interface LayoutProperties {
	children: any
}

const Layout = ({ children }: LayoutProperties) => {
	return (
		<>
			<header
				style={{
					background: `rebeccapurple`,
					marginBottom: `1.45rem`,
				}}
			>
				<div
					style={{
						margin: `0 auto`,
						maxWidth: 960,
						padding: `1.45rem 1.0875rem`,
					}}
				>
					<h1 style={{ margin: 0 }}>
						<Link
							to="/"
							style={{
								color: `white`,
								textDecoration: `none`,
							}}
						>
							{"Java Ecosystem Map"}
						</Link>
					</h1>
				</div>
			</header>
			<div
				style={{
					margin: `0 auto`,
					maxWidth: 960,
					padding: `0 1.0875rem 1.45rem`,
				}}
			>
				<main>{children}</main>
				<footer
					style={{
						marginTop: `2rem`,
					}}
				>
					© {new Date().getFullYear()}, Built with
					{` `}
					<a href="https://www.gatsbyjs.com">Gatsby</a>
				</footer>
			</div>
		</>
	)
}

export default Layout
