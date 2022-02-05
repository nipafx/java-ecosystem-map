module.exports = {
	siteMetadata: {
		title: `Java Ecosystem Map`,
		description: `A visualization of core concepts of the Java ecosystem`,
		siteUrl: `https://javamap.dev`,
		author: `Nicolai Parlog <nicolai@nipafx.dev>`,
		twitter: `@nipafx`,
	},
	plugins: [
		`gatsby-plugin-react-helmet`,
		`gatsby-plugin-image`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `images`,
				path: `${__dirname}/src/images`,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `nodes`,
				path: `${__dirname}/content/nodes`,
			},
		},
		`gatsby-transformer-remark`,
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `Java Ecosystem Map`,
				short_name: `java-map`,
				start_url: `/`,
				background_color: `#101010`,
				theme_color: `#436e90`,
				display: `minimal-ui`,
				icon: `src/images/duke.png`,
			},
		},
	],
}
