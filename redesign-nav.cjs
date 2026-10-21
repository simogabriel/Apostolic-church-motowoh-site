const fs=require('fs');const root='motowoh-church/dist/';let html=fs.readFileSync(root+'index.html','utf8');
const header=`<header class="site-header">
  <a class="brand" href="#home"><img src="assets/logo.png" alt="The Apostolic Church Cameroon logo"><span>THE APOSTOLIC CHURCH<small>MOTOWOH DISTRICT</small></span></a>
  <nav id="main-navigation" aria-label="Main navigation">
    <a href="#home">Home</a>
    <a href="#about">About us</a>
    <a href="#outreach">Outreach</a>
    <a href="#vision">Our vision</a>
    <a href="#contact">Contact</a>
  </nav>
  <div class="header-actions">
    <div class="language-switch" data-language-switch role="group" aria-label="Language / Langue">
      <button type="button" data-language="en" lang="en" aria-pressed="true" aria-label="English">ENG</button>
      <button type="button" data-language="fr" lang="fr" aria-pressed="false" aria-label="Français">FR</button>
    </div>
    <button class="menu-toggle" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="main-navigation"><span aria-hidden="true">☰</span></button>
  </div>
</header>`;
html=html.replace(/<header\b[\s\S]*?<\/header>/,header).replace('<link rel="stylesheet" href="gallery.css">','<link rel="stylesheet" href="gallery.css"><link rel="stylesheet" href="navigation.css">');fs.writeFileSync(root+'index.html',html);
