import { RawYoutubeVideoInfo, YoutubeVideoInfo } from "../../models/api/youtube-info";

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