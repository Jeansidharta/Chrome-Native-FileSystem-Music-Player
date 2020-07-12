import React from 'react';

/**
* This hook functions almost exactly like the `React.useEffect` hook, but won't
* trigger on the first render.
*/
const useUpdate: typeof React.useEffect = (effect, deps) => {
	const hasFirstRenderHappened = React.useRef(false);

	React.useEffect(() => {
		if (hasFirstRenderHappened.current) return effect();
		else hasFirstRenderHappened.current = true;
	}, deps);
}

export default useUpdate;