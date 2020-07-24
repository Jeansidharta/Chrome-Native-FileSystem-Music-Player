import { RawYoutubeVideoInfo, YoutubeVideoInfo } from "./types";

const noCorsAPI = 'https://cors-anywhere.herokuapp.com/';
const getVideoInfoAPI = 'http://youtube.com/get_video_info';

async function fetchWithoutCors (url: string, init?: RequestInit) {
	const noCorsUrl = noCorsAPI + url;
	return fetch(noCorsUrl, init);
}

async function fetchVideoInfo (videoId: string): Promise<YoutubeVideoInfo> {
	const response = await fetchWithoutCors(`${getVideoInfoAPI}?video_id=${videoId}`);
	const data = await response.formData();

	// Convert formData to object
	const dataObject: RawYoutubeVideoInfo = {} as any;
	for (const entry of data.entries()) {
		dataObject[entry[0] as keyof RawYoutubeVideoInfo] = entry[1] as string;
	}

	// Extract the playerResponse
	const playerResponse = JSON.parse(dataObject.player_response);

	dataObject.player_response = playerResponse;
	return dataObject as unknown as YoutubeVideoInfo;
}

export async function fetchRelevantVideoInfo (videoId: string) {
	const info = await fetchVideoInfo(videoId);

	const streammingFormats = info.player_response.streamingData.adaptiveFormats
		.filter(format => format.mimeType.includes('audio'))
		.sort((a, b) => Number(a.contentLength) - Number(b.contentLength));

	const duration = info.player_response.streamingData.adaptiveFormats[0].approxDurationMs;

	return {
		streammingFormats,
		duration,
	};
}