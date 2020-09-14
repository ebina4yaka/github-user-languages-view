import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core'

type LanguagePercentage = {
  name: string
  percentage: number
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
  card: {
    margin: 5,
  },
})

export default function GithubLanguagesPercentage(): React.ReactElement {
  const classes = useStyles()
  const wasm = import('../../wasm/pkg/view_github_profile')
  const [githubRepos, setGithubRepos] = useState(Array<LanguagePercentage>())
  useEffect(() => {
    wasm.then((mod) => {
      mod
        .getGithubUserLangagesPercentage('ebina4yaka', 'css,html,dockerfile')
        .then((data: LanguagePercentage[]) => {
          setGithubRepos(data)
        })
    })
  }, [])
  return (
    <div className={classes.root}>
      {githubRepos.map((data: LanguagePercentage) => {
        return (
          <div key={data.name} className={classes.card}>
            {`${data.name} ${data.percentage}%`}
          </div>
        )
      })}
    </div>
  )
}
