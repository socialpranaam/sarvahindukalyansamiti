import React from 'react'
import AboutHero from '../components/AboutHero/AboutHero'
import AboutMission from '../components/AboutMission/AboutMission'
import Team from '../components/AboutTeam/Team'
import AboutCard from '../components/AboutCard/AboutCard'


const AboutUs = () => {
  return (
    <div>
      {/* <AboutHero/> */}
      <AboutMission/>
      <Team/>
      <AboutCard/>
    </div>
  )
}

export default AboutUs
