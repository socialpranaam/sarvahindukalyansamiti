import React from 'react'
import ContactCard from '../components/Contact/ContactCard'
import ContactForm from '../components/Contact/ContactForm'
import ContactHero from '../components/Contact/ContactHero'


const ContactUs = () => {
  return (
    <div>
      <ContactHero/>     
      <ContactForm/>  
      <ContactCard/>   
    </div>
  )
}

export default ContactUs
