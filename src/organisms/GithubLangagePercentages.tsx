import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core'

type LanguagePercentage = {
  language: string
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

export default function GithubLanguagePercentages(): React.ReactElement {
  const classes = useStyles()
  const wasm = import('../../wasm/pkg/wasm_nextjs_test')
  const [githubRepos, setGithubRepos] = useState(Array<LanguagePercentage>())
  useEffect(() => {
    wasm.then((mod) => {
      mod
        .getGithubUserLangagePercentages('ebina4yaka')
        .then((data: LanguagePercentage[]) => {
          setGithubRepos(data)
        })
    })
  }, [])
  return (
    <div className={classes.root}>
      {githubRepos.map((data: LanguagePercentage) => {
        return (
          <div key={data.language} className={classes.card}>
            {`${data.language} ${data.percentage}%`}
          </div>
        )
      })}
    </div>
  )
}
