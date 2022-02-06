import React from "react"
import Helmet from "react-helmet"

import { graphql, useStaticQuery } from "gatsby"

interface MetaProperties {
	title?: string
	description?: string
	slug?: string
}

interface SiteMetadata {
	title: string
	description: string
	siteUrl: string
	twitter: string
}

const Meta = ({ title, slug, description }: MetaProperties) => {
	const site: SiteMetadata = useStaticQuery(
		graphql`
			query {
				site {
					siteMetadata {
						title
						description
						siteUrl
						twitter
					}
				}
			}
		`
	).site.siteMetadata

	const pageTitle: string = title ? `${title} << ${site.title}` : site.title
	const pageDescription: string = description || site.description
	const pageUrl: string = slug ? `${site.siteUrl}/${slug}/` : site.siteUrl

	const links = {
		canonical: pageUrl,
	}

	const metaNames = {
		// Google
		"description": pageDescription,
		// Twitter
		"twitter:card": "summary",
		"twitter:site": site.twitter,
		"twitter:creator": site.twitter,
		"twitter:title": pageTitle,
		"twitter:description": pageDescription,
	}

	const metaProperties = {
		// Open Graph
		"og:title": pageTitle,
		"og:type": "article",
		"og:url": pageUrl,
		"og:description": pageDescription,
		"og:site_name": site.title,
	}

	return (
		<Helmet>
			<meta key="charSet" charSet="utf-8" />
			<meta key="httpEquiv" httpEquiv="x-ua-compatible" content="ie=edge" />
			<meta
				key="viewport"
				name="viewport"
				content="width=device-width, initial-scale=1, shrink-to-fit=no"
			/>

			<title key="title">{pageTitle}</title>
			{propertiesOf(links).map(([key, value]) => (
				<link key={key} rel={key} href={value} />
			))}
			{propertiesOf(metaNames).map(([key, value]) => (
				<meta key={key} name={key} content={value} />
			))}
			{propertiesOf(metaProperties).map(([key, value]) => (
				<meta key={key} property={key} content={value} />
			))}
		</Helmet>
	)
}

const propertiesOf = (object) =>
	Object.getOwnPropertyNames(object)
		.map((prop) => [prop, object[prop]])
		// filter out pairs with undefined values
		.filter(([key, value]) => value)

export default Meta
