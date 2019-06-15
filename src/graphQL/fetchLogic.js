import axios from 'axios'
import { GET_ISSUES_OF_REPOSITORY } from './queries'

export const axiosGitHubGraphQL = axios.create({
  baseURL: `https://api.github.com/graphql`,
  headers: {
    Authorization: `bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`
  }
})

export const getIssuesOfRepository = (path, cursor ) => {
  const [organization, repository] = path.split('/')

  return axiosGitHubGraphQL.post('', {
    query: GET_ISSUES_OF_REPOSITORY,
    variables: { organization, repository, cursor }
  })
}

export const addStarToRepository = repositoryId => {
	return axiosGitHubGraphQL.post('', {
		query: ADD_STAR,
		variables: { repositoryId }
	})
}

export const resolveIssuesQuery = (queryResult, cursor) => state => {
	const { data, errors } = queryResult.data

	if (!cursor) {
		return {
			organization: data.organization,
			errors
		}
	}

	const { edges: oldIssues } = state.organization.repository.issues
	const { edges: newIssues } = data.organization.repository.issues 
	const updatedIssues = [...oldIssues, ...newIssues]

	return {
		organization: {
			...data.organization,
			repository: {
				...data.organization.repository,
				issues: {
					...data.organization.repository.issues,
					edges: updatedIssues
				}
			}
		},
		errors
	}
}