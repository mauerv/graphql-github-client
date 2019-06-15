import React from 'react'

import IssueItem from './IssueItem'

export default ({ issues }) => (
	<ul>
		{issues.map(issue => 
			<IssueItem issue={issue.node} key={issue.node.id}/> 
		)}
	</ul>
)