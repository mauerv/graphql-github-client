import React from 'react'
import IssueList from './IssueList'

export default ({ 
	repository, 
	onFetchMoreIssues,
	onStarRepository
}) => (
	<div>
		<p>
			<strong>In Repository:</strong>
			<a href={repository.url}>{repository.name}</a>
		</p>

		<button
			type='button'
			onClick={() => 
				onStarRepository(repository.id, repository.viewerHasStarred)
			}
		>	
			{repository.stargazers.totalCount} 
			{repository.viewerHasStarred ? ' Unstar' : ' Star'}
		</button>
		<IssueList issues={repository.issues.edges} />
		<hr />
		{repository.issues.pageInfo.hasNextPage && (
			<button onClick={onFetchMoreIssues}>More</button>
		)}
	</div>
)