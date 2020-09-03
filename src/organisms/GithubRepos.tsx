import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core'
import GitHubRepository from 'molecules/GithubRepository'

type GithubRepository = {
  id: number
  name: string
  full_name: string
  private: boolean
  html_url: string
  url: string
  language: string
  description: string
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'flex-start',
  },
})

export default function GithubRepos(): React.ReactElement {
  const classes = useStyles()
  const wasm = import('../../wasm/pkg/wasm_nextjs_test')
  const [githubRepos, setGithubRepos] = useState(Array<GithubRepository>())
  useEffect(() => {
    wasm.then((mod) => {
      mod.getGithubUserRepos('ebina4yaka').then((data: GithubRepository[]) => {
        setGithubRepos(data)
      })
    })
  }, [])
  return (
    <div className={classes.root}>
      {githubRepos.map((data: GithubRepository) => {
        return (
          <GitHubRepository
            key={data.id}
            name={data.name}
            language={data.language}
            description={data.description}
          />
        )
      })}
    </div>
  )
}
