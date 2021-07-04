import * as React from "react"

const style = require("./description.module.css")

interface DescriptionProperties {
	className: string
	html: string
}

const Description = ({ className, html }: DescriptionProperties) => {
	// TODO add node name and maybe use its color?
	const classNames: string[] = [ className, style.textbox]
	if (!html) classNames.push(style.empty)
	return (
	<div
		className={classNames.join(" ")}
		dangerouslySetInnerHTML={{ __html: html }}
	></div>
)}

export default Description
