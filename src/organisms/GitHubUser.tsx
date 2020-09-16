import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core'
import TopPageAvatar from '../atoms/TopPageAvatar'
import UserName from '../atoms/UserName'

type Props = {
  userName: string
}

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

export default function GithubUser(props: Props): React.ReactElement {
  const { userName } = props
  const classes = useStyles()
  const [githubUser, setGithubUser] = useState<GithubUser>(initGithubUser())
  useEffect(() => {
    fetch(`https://api.github.com/users/${userName}`)
      .then((response) => response.json())
      .then((jsonResponse: GithubUser) => {
        setGithubUser(jsonResponse)
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
