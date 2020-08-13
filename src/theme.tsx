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
			success: {
				lighter: string,
				light: string,
				normal: string,
				dark: string,
			},
			error: {
				lighter: string,
				light: string,
				normal: string,
				dark: string,
			},
			warning: {
				light: string,
				normal: string,
				dark: string,
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
		},
		success: {
			lighter: '#a7d7a9',
			light: '#81c784',
			normal: '#4caf50',
			dark: '#388e3c',
		},
		error: {
			lighter: '#eb9393',
			light: '#e57373',
			normal: '#f44336',
			dark: '#d32f2f',
		},
		warning: {
			light: '#ffb74d',
			normal: '#ff9800',
			dark: '#f57c00',
		},
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