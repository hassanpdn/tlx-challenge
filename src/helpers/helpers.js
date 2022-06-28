const priceSeperator = (number) => {
      return new Intl.NumberFormat().format(number);
}

const generateUniqueId = () => Math.random().toString(16).slice(2);

export { priceSeperator, generateUniqueId }