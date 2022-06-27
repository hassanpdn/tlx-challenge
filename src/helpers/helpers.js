const numberSeperator = (number) => {
      return new Intl.NumberFormat().format(number);
}

export { numberSeperator }