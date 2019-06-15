import React, { Component } from 'react';

import { 
  getIssuesOfRepository,
  resolveIssuesQuery
} from './graphQL/fetchLogic'

import Organization from './components/Organization'

class App extends Component {
  state = {
    path: 'the-road-to-learn-react/the-road-to-learn-react',
    organization: null,
    errors: null,
  }

  componentDidMount() {
    this.onFetchFromGitHub(this.state.path)
  }

  onChange = e => this.setState({ path: e.target.value })

  onSubmit = e => {
    this.onFetchFromGitHub(this.state.path)
    e.preventDefault()
  }

  onFetchFromGitHub = (path, cursor) => {
    getIssuesOfRepository(path, cursor).then(queryResult =>
      this.setState(resolveIssuesQuery(queryResult, cursor))
    )
  }

  onFetchMoreIssues = () => {
    const { endCursor } = this.state.organization.repository.issues.pageInfo
    this.onFetchFromGitHub(this.state.path, endCursor)
  }

  onStarRepository = (repositoryId, viewerHasStarred) => {

  }

  render() {
    const { path, organization, errors } = this.state

    return (
      <div>
        <h1>React GraphQL GitHub Client</h1>
        <form onSubmit={this.onSubmit}>
          <label htmlFor='url'>
            Show open issues for https://github.com
          </label>
          <input
            id='url'
            type='text'
            value={path}
            onChange={this.onChange}
            style={{ width: '300px' }}
          />
          <button type='submit'>Search</button>
        </form>

        <hr />

        {organization ? (
          <Organization 
            organization={organization} errors={errors} 
            errors={errors}
            onFetchMoreIssues={this.onFetchMoreIssues}
            onStarRepository={this.onStarRepository}
          />  
        ) : (
          <p>No information yet...</p>
        )}
      </div>
    )
  }
}

export default App;
