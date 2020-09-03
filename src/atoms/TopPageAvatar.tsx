import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'

type Props = {
  avatarUrl: string
  name: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: theme.spacing(20),
      height: theme.spacing(20),
    },
  })
)

export default function TopPageAvatar(props: Props): React.ReactElement {
  const { avatarUrl, name } = props
  const classes = useStyles()

  return <Avatar alt={name} src={avatarUrl} className={classes.root} />
}
