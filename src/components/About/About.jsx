import React from 'react';
import "./About.css";

function About() {

  const trailLink = "https://www.alltrails.com/trail/canada/ontario/la-cloche-silhouette-trail";
  const allTrailsLink = "https://www.alltrails.com/";

  return (
    <div className="about"> 
      <div className="site-info">
        <h2>About This App</h2>
        <p>Find LaCloche provides access to a database containing crowdsourced images and reviews for all 34 campsites along the <a target="blank" href={trailLink}>La Cloche Silhouette Trail</a>.</p>
        <p>Inspired by <a target="blank" href={allTrailsLink}>AllTrails</a>, this app serves as a guide to inform future backpackers of the topography and conditions of their reserved campsite.</p>
        <p>For more information or additional inquiries, email us at findlacloche@gmail.com</p>
      </div>
    </div>
  );
}

export default About;