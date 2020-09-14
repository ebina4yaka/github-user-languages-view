/* eslint-disable react/no-unused-prop-types */
import React from 'react'
import { makeStyles } from '@material-ui/core'
import { Cell, Pie, PieChart } from 'recharts'
import { LanguagePercentage } from '../models'

type Props = {
  userLanguages: LanguagePercentage[]
}

type CustomizedLabelProps = {
  cx: number
  cy: number
  midAngle: number
  innerRadius: number
  outerRadius: number
  percent: number
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

export default function UserLanguagesChart(props: Props): React.ReactElement {
  const { userLanguages } = props
  const classes = useStyles()

  const RADIAN = Math.PI / 180
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: CustomizedLabelProps) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  return (
    <div className={classes.root}>
      <PieChart id="userLanguages" width={730} height={250}>
        <Pie
          data={userLanguages}
          dataKey="percentage"
          nameKey="name"
          cx="50%"
          cy="50%"
          /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
          // @ts-ignore
          label={renderCustomizedLabel}
        >
          {userLanguages.map((language) => (
            <Cell key={`cells-${language.name}`} fill={language.color} />
          ))}
        </Pie>
      </PieChart>
    </div>
  )
}
