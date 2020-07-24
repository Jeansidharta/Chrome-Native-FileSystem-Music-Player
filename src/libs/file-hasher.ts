import xxHash from 'xxhashjs';

const seed = 123;

const hasher = xxHash.h64(seed);

async function hashFile (file: File) {
	return hasher.update(await file.arrayBuffer()).digest().toString(64);
}

export default hashFile;