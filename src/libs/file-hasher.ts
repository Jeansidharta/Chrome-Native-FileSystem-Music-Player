function escapeFileName (name: string) {
	name = name.replace(/\|/g, '\\|');
	return name.replace(/\\/g, '\\');
}

function hashFile (file: File) {
	return `${escapeFileName(file.name)}|${file.size}`;
}

export default hashFile;