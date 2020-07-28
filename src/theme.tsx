import { ThemeProvider, DefaultTheme } from 'styled-components';

type ShadowSize = {
	normal: string,
	hover: string,
	active: string,
}

declare module "styled-components" {
  export interface DefaultTheme {
		colors: {
			primary: {
				main: string,
			},
			secondary: {
				main: string,
			},
			gray: {
				light: string,
			},
		},
		shadows: {
			small: ShadowSize
			medium: ShadowSize,
			large: ShadowSize,
		}
  }
}

const theme: DefaultTheme = {
	colors: {
		primary: {
			main: '#98fb98',
		},
		secondary: {
			main: '#98fb98',
		},
		gray: {
			light: '#dddddd',
		}
	},
	shadows: {
		small: {
			hover: '-3px 3px 3px rgba(0, 0, 0, 0.1)',
			normal: '-2px 2px 2px rgba(0, 0, 0, 0.2)',
			active: '-1px 1px 1px rgba(0, 0, 0, 0.4)',
		},
		medium: {
			hover: '-3px 3px 3px rgba(0, 0, 0, 0.3)',
			normal: '-3px 3px 3px rgba(0, 0, 0, 0.3)',
			active: '-3px 3px 3px rgba(0, 0, 0, 0.3)',
		},
		large: {
			hover: '-2px 2px 4px rgba(0, 0, 0, 0.2)',
			normal: '-2px 2px 4px rgba(0, 0, 0, 0.2)',
			active: '-2px 2px 4px rgba(0, 0, 0, 0.2)',
		},
	},
};

function FilledThemeProvider ({ ...props }) {
	return <ThemeProvider theme={theme} {...props} />
}

export default FilledThemeProvider;