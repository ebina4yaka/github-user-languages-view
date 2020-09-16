import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core'
import TopPageAvatar from '../atoms/TopPageAvatar'
import UserName from '../atoms/UserName'

type GithubUser = {
  avatar_url: string
  name: string
  html_url: string
}

function initGithubUser(): GithubUser {
  return {
    avatar_url: '',
    name: '',
    html_url: '',
  }
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'flex-start',
  },
  userName: {
    marginTop: '0.8em',
  },
})

export default function GithubUser(): React.ReactElement {
  const classes = useStyles()
  const wasm = import('../../wasm/pkg/view_github_profile')
  const [githubUser, setGithubUser] = useState<GithubUser>(initGithubUser())
  useEffect(() => {
    wasm.then((mod) => {
      mod.getGithubUser('ebina4yaka').then((data: GithubUser) => {
        setGithubUser(data)
      })
    })
  }, [])
  return (
    <div className={classes.root}>
      <TopPageAvatar avatarUrl={githubUser.avatar_url} name={githubUser.name} />
      <div className={classes.userName}>
        <UserName name={githubUser.name} />
      </div>
    </div>
  )
}
