import React from 'react'

import ReactionItem from './ReactionItem'

export default ({ reactions }) => (
	<ul>
		{reactions.map(reaction => 
			<ReactionItem reaction={reaction.node} key={reaction.node.id}/>
		)}
	</ul>
)