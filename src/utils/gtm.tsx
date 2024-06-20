import ReactGA from "react-ga4";

class GTM {
  constructor() {
    const containerId = process.env.REACT_APP_GTM_CONTAINER_ID;
    if (containerId) {
      ReactGA.initialize(containerId);
    } else {
      console.error("REACT_APP_GTM_CONTAINER_ID is not defined");
    }
  }

  push(page: string) {
    ReactGA.send({ hitType: "pageview", page });
  }
}

// Singleton
const gtm = new GTM();
export default gtm;
