declare module 'xxhashjs' {
	type UInt = {
		/** @argument radix Must be a number between 2 and 36 */
		toString(radix: number): string,
		toNumber(): number,
	};

	type Data = string | ArrayBuffer | Buffer;
	type Seed = number | UInt;

	class XXHClass {
		update (data: Data): XXHClass;
		init(seed: Seed): XXHClass;
		digest(): UInt;
	}

	function XXH (data: string | ArrayBuffer | Buffer, seed: Seed): UInt;
	function XXH (seed: number): XXHClass;

	export default {
		h32: XXH,
		h64: XXH,
	};
}