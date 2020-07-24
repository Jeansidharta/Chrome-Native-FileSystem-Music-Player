module.exports = {
	exportPathMap: async function (
		defaultPathMap,
		{ dev, dir, outDir, distDir, buildId }
	) {
		return {
		...defaultPathMap,
		'/': { page: '/home' },
		}
	},
}