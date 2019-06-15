import React from 'react'

import ReactionList from './ReactionList'

export default ({ issue }) => (
	<li>
		<a href={issue.url}>{issue.title}</a>
		<ReactionList reactions={issue.reactions.edges}/>
	</li>
)

