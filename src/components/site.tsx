import * as React from "react"

import Meta from "./meta"

import "../global.css"

const layout = require("../container.module.css")
const style = require("./site.module.css")

interface LayoutProperties {
	title: string
	description?: string
	slug?: string
	children: any
}

const Site = ({ title, description, slug, children }: LayoutProperties) => {
	return (
		<div className={style.site}>
			<Meta title={title} description={description} slug={slug} />
			<header className={layout.container}>
				<h1>{title}</h1>
			</header>
			<main className={layout.container}>{children}</main>
			<footer className={layout.container}>
				<span>
					<a href="https://creativecommons.org/licenses/by-nc/4.0/legalcode">
						CC BY-NC 4.0
					</a>
					{" // Built by "}
					<a href="https://nipafx.dev">Nicolai Parlog</a>
					{" with "}
					<a href="https://www.gatsbyjs.com">Gatsby</a>
				</span>
			</footer>
		</div>
	)
}

export default Site
