const passiveSupportMixin = {
      methods: {
            doesBrowserSupportPassiveScroll() {
                  let passiveSupported = false;
                  try {
                        const options = {
                              get passive() {
                                    passiveSupported = true;
                                    return false;
                              }
                        };

                        window.addEventListener("test", null, options);
                        window.removeEventListener("test", null, options);
                  } catch (err) {
                        passiveSupported = false;
                  }
                  return passiveSupported;
            }
      }
};
export default passiveSupportMixin
