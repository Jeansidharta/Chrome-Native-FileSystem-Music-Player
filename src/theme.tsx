import { ThemeProvider, DefaultTheme } from 'styled-components';

declare module "styled-components" {
  export interface DefaultTheme {
		colors: {
			primary: {
				main: string,
			},
			secondary: {
				main: string,
			},
		},
		shadows: {
			small: string,
			medium: string,
			large: string,
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
	},
	shadows: {
		small: '-2px 2px 4px rgba(0,0,0,0.2)',
		medium: '-3px 3px 3px rgba(0,0,0,0.3)',
		large: '-2px 2px 4px rgba(0,0,0,0.2)',
	},
};

function FilledThemeProvider ({ ...props }) {
	return <ThemeProvider theme={theme} {...props} />
}

export default FilledThemeProvider;