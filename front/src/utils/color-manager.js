class ColorManager {
  colors = {
    red: '#FF98A5',
    orenge: '#FFC8A8',
    yellow: '#FEFF84',
    blue: '#ACE8FF',
    green: '#B9FFBD',
    purple: '#D4B4FF',
    pink: '#FED9FF',
  };

  convert = (input = '') => {
    if (input.includes('#')) {
      return this.toText(input);
    }
    return this.toText(input);
  };

  toHex = (text) => {
    return this.colors[text];
  };

  toName = (hex) => {
    return Object.keys(this.colors).find((key) => this.colors[key] === hex);
  };

  getRandomHex = () => {
    const values = Object.values(this.colors);
    const randomIndex = Math.floor(Math.random() * values.length);
    return values[randomIndex];
  };
}

const colorManager = new ColorManager();

export default colorManager;
