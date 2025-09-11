import React from 'react'
import AboutHero from '../components/AboutHero/AboutHero'
import DonationOption from '../components/Donation/DonationOption'
import QRDonation from '../components/Donation/QRDonation'

const Donation = () => {
  return (
    <div>
      {/* <AboutHero/> */}
      <DonationOption/>
      <QRDonation/>
    </div>
  )
}

export default Donation
