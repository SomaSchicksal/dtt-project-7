<template>
  <nav>
    <router-link to="/" class="nav-link">Home</router-link> |
    <router-link to="/favoritesList" class="nav-link">Favorites</router-link> |
    <router-link to="/about" class="nav-link">About</router-link>
  </nav>
  <router-view/>
</template>

<style>

:root {
  --element-primary-color:#EB5440;
  --element-secondary-color:#4A4B4C;
  --element-tertiary-color1:#E8E8E8;
  --element-tertiary-color2:#C3C3C3;
  --element-background-color1:#F6F6F6;
  --element-background-color2:#FFFFFF;

  --text-primary-color:#000000;
  --text-secondary-color:#4A4B4C;
  --text-hyperlink-color:#067BC2;
  --font-monserrat:'Montserrat';
  --font-open-sans:"Open Sans";

  --font-montserrat-bold: 'Montserrat Bold', sans-serif;
  --font-montserrat-semibold: 'Montserrat Semibold', sans-serif;
  --font-montserrat-medium: 'Montserrat Medium', sans-serif;
  --font-montserrat-medium-italic: 'Montserrat Medium Italic', sans-serif;

  --font-open-sans-semibold: 'Open Sans Semibold', sans-serif;
  --font-open-sans-regular: 'Open Sans Regular', sans-serif;

  --font-size-h1-desktop: 32px;
  --font-size-h1-mobile: 18px;
  --font-size-back-button-label-desktop: 16px;
  --font-size-desktop-header-inactive-menu: 18px;
  --font-size-empty-state-message-desktop: 18px;
  --font-size-empty-state-message-mobile: 14px;
  --font-size-input-field-title-desktop: 14px;
  --font-size-input-field-title-mobile: 12px;
  --font-size-h2-desktop: 22px;
  --font-size-h2-mobile: 14px;
  --font-size-desktop-header-active-menu: 18px;
  --font-size-buttons-and-tabs-desktop: 18px;
  --font-size-buttons-and-tabs-mobile: 12px;
  --font-size-error-message-desktop: 14px;
  --font-size-error-message-mobile: 12px;

  --font-size-listing-information-desktop: 16px;
  --font-size-listing-information-mobile: 12px;

  --font-size-body-text-desktop: 18px;
  --font-size-body-text-mobile: 12px;

  --font-size-input-field-desktop: 14px;
  --font-size-input-field-mobile: 12px;

  --font-weight-bold: bold;
  --font-weight-semibold: 600;
  --font-weight-medium: 500;
}

* {
  box-sizing: border-box;
}

body, html {
  margin: 0;
  padding: 0;
}

#app {
  
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--text-primary-color);
  
  min-height: 100vh;
  
  
}

#app h1 {
  font-family: "Montserrat";
  font-weight: 700;
  
  
  
  font-size: var(--font-size-h1-desktop);
  color:var(--text-primary-color);
}

#app h2 {
  font-family: "Montserrat";
  font-weight: 600;
  font-size: var(--font-size-h2-desktop);
  color:var(--text-primary-color);
}



.button {
  border-radius: 5px;
  background-color: var(--element-primary-color);
  font-family:var(--font-montserrat-bold);
  font-weight: var(--font-weight-bold);
  font-size:var(--font-size-buttons-and-tabs-desktop);
  color:white;
  padding: 0.5em 3em 0.5em 3em;
  border:none;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: rgba(235, 84, 64, 0.7);
}



nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: var(--element-primary-color)
}

.nav-link {
  text-decoration: none;
}
</style>
