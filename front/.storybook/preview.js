import '!style-loader!css-loader!../src/styles/common/reset.css';
import '!style-loader!css-loader!../src/styles/index.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
