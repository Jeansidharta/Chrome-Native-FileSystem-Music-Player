import { RawYoutubeVideoInfo, YoutubeVideoInfo } from "../../models/api/youtube-info";
import { YoutubeEntry } from "../../models/music";

const noCorsAPI = 'https://cors-anywhere.herokuapp.com/';
const getVideoInfoAPI = 'http://youtube.com/get_video_info';

async function fetchWithoutCors (url: string, init?: RequestInit) {
	const noCorsUrl = noCorsAPI + url;
	return fetch(noCorsUrl, init);
}

function formData2JSON<T>(formData: FormData) {
	// Convert formData to object
	const dataObject: T = {} as any;
	for (const entry of formData.entries()) {
		(dataObject as any)[entry[0] as keyof T] = entry[1] as string;
	}
	return dataObject;
}

async function fetchVideoInfo (videoId: string): Promise<YoutubeVideoInfo> {
	const response = await fetchWithoutCors(`${getVideoInfoAPI}?video_id=${videoId}`);
	const data = await response.formData();
	const dataObject: RawYoutubeVideoInfo = formData2JSON(data);

	// Extract the playerResponse
	const playerResponse = JSON.parse(dataObject.player_response);

	dataObject.player_response = playerResponse;
	return dataObject as unknown as YoutubeVideoInfo;
}

const errorMessage = `I couldn't load this video. Some youtube videos cannot currently be loaded. This is a known issue, and my creator is already trying to solve it.`;

export async function fetchRelevantVideoInfo (videoId: string) {
	const info = await fetchVideoInfo(videoId);

	if (!info.player_response.streamingData) throw new Error(`${errorMessage} Error type: EMPTY_STREAMING_DATA_ERROR`);

	const streammingFormats = info.player_response.streamingData.adaptiveFormats
		.filter(format => format.mimeType.includes('audio'))
		.sort((a, b) => Number(a.contentLength) - Number(b.contentLength));

	if (streammingFormats.every(stream => !stream.url)) {
		throw new Error(`${errorMessage} Error type: NO_URL_FOUND_ERROR`);
	}

	const duration = info.player_response.streamingData.adaptiveFormats[0].approxDurationMs;
	const name = info.player_response.videoDetails.title;
	return {
		streammingFormats,
		/** Measured in seconds */
		duration: Number(duration) / 1000,
		name,
	};
}

export function makeMusicEntryFromURL (link: string) {
	let url: URL;
	try {
		url = new URL(link);
	} catch (e) {
		throw new Error('Whoops, it seems this is not a valid link!');
	}
	if (url.hostname !== 'www.youtube.com') {
		throw new Error('Sorry, but I can only work with Youtube links');
	}
	if (url.pathname !== '/watch') {
		throw new Error('You must give me the link of a Youtube video.');
	}
	const videoId = url.searchParams.get('v');
	if (!videoId) {
		throw new Error(`I could not identify what video you are watching... Make sure your URL has the '?v=somelargestring' thing in it`);
	}

	// This "external variable" is here to prevent making multiple requests to youtube's servers.
	let fetchingPromise: null | ReturnType<typeof fetchRelevantVideoInfo> = null;

	const infoFetcher = () => {
		if (fetchingPromise) return fetchingPromise;

		fetchingPromise = fetchRelevantVideoInfo(videoId).then(info => {
			entry.duration = info.duration;
			entry.audioStreams = info.streammingFormats;
			entry.name = info.name;
			return info;
		});

		entry.duration = fetchingPromise.then(info => info.duration).catch(e => e);
		entry.audioStreams = fetchingPromise.then(info => info.streammingFormats).catch(e => e);
		entry.name = fetchingPromise.then(info => info.name).catch(e => e);

		return fetchingPromise;
	}

	const entry: YoutubeEntry = {
		id: videoId,
		duration: () => infoFetcher().then(info => info.duration),
		audioStreams: () => infoFetcher().then(info => info.streammingFormats),
		name: () => infoFetcher().then(info => info.name),
	};

	return entry;
}