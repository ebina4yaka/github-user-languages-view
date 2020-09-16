import React from 'react'
import { Cell, Pie, PieChart } from 'recharts'
import { LanguagePercentage } from '../models'

type Props = {
  userLanguages: LanguagePercentage[]
}

export default function UserLanguagesChart(props: Props): React.ReactElement {
  const { userLanguages } = props

  return (
    <PieChart id="userLanguages" width={200} height={200}>
      <Pie
        data={userLanguages}
        dataKey="percentage"
        nameKey="name"
        cx="50%"
        cy="50%"
      >
        {userLanguages.map((language) => (
          <Cell
            key={`cells-${language.name}`}
            fill={language.color}
            strokeWidth={0}
          />
        ))}
      </Pie>
    </PieChart>
  )
}
