import React from 'react'
import AboutUsView from './aboutUsView';
import { TeamMember } from './aboutUsTypes';

const aboutUsPresenter = () => {

      
      const teamMembers: TeamMember[] = [
        {
          name: "Namn Namnsson",
          role: "Frontend Developer",
          email: "Namn@kth.se",
          github: "username",
          linkedin: "username",
        },
        {
          name: "Namn Namnsson",
          role: "Backend Developer",
          email: "erik@kth.se",
          github: "username",
          linkedin: "username",
        },
        {
          name: "Namn Namnsson",
          role: "Frontend Developer",
          email: "Namn@kth.se",
          github: "username",
          linkedin: "username",
        },
        {
          name: "Namn Namnsson",
          role: "Backend Developer",
          email: "Namn@kth.se",
          github: "username",
          linkedin: "username",
        },
      ];

  return (
    <AboutUsView teamMembers={teamMembers}/>
  )
}

export default aboutUsPresenter