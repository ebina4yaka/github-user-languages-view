import React, { useEffect, useState } from 'react'
import UserLanguagesChart from '../molecules/UserLanguagesChart'
import LanguagesText from '../atoms/LanguagesText'
import { LanguagePercentage } from '../models'

export default function GithubLanguagesPercentage(): React.ReactElement {
  const wasm = import('../../wasm/pkg/view_github_profile')
  const [userLanguages, setUserLanguages] = useState(
    Array<LanguagePercentage>()
  )
  useEffect(() => {
    wasm.then((mod) => {
      mod
        .getGithubUserLangagesPercentage('ebina4yaka', 'css,html,dockerfile')
        .then((data: LanguagePercentage[]) => {
          setUserLanguages(data)
        })
    })
  }, [])
  return (
    <>
      <UserLanguagesChart userLanguages={userLanguages} />
      <LanguagesText userLanguages={userLanguages} />
    </>
  )
}
