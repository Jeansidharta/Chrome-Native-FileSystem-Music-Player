import { NextPageContext } from "next";

function redirect (context: NextPageContext, path: string) {
	if (context.res) {
		context.res.statusCode = 302;
		context.res.setHeader('Location', path);
		context.res.end();
	} else {
		document.location.pathname = path;
	}
}

export default redirect;