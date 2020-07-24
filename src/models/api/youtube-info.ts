interface CommandMetadata {
	webCommandMetadata: {
		apiUrl?: string,
		sendPost?: boolean,
		rootVe?: number,
		webPageType?: string,
		url: string,
	},
};

interface SimpleTextContainer {
	simpleText: string,
};

interface ActionButtonText {
	runs: {
		text: string,
	}[]
};

interface Thumbnails {
	thumbnails: {
		height: number,
		url: string,
		width: number,
	}[],
};

interface BaseURLContainer {
	baseUrl: string,
	elapsedMediaTimeSeconds?: number,
}

interface WebPlayerActionsPorting {
	clickTrackingParams: string,
	commandMetadata: CommandMetadata,
	playlistEditEndpoint: {
		actions: {
			action: string,
			addedVideoId: string,
		}[],
		playlistId: string,
	},
}

export interface AdaptiveFormat {
	audioChannels?: 2,
	audioQuality?: string,
	/** This string is actually a number */
	audioSampleRate?: string,

	fps?: number,
	height?: number,
	width?: number,
	qualityLabel?: string,

	/** This string is actually a number */
	approxDurationMs: string,
	averageBitrate: number,
	bitrate: number,
	contentLength: string,
	indexRange: {
		end: string,
		start: string,
	},
	initRange: {
		end: string,
		start: string,
	},
	itag: number,
	lastModified: string,
	mimeType: string,
	projectionType: string,
	quality: string,
	url: string,
}

interface PlayerResponse {
	attestation: {
		playerAttestationRenderer: {
			botguardData: {
				interpreterUrl: string,
				program: string,
			},
			challenge: string,
		}
	},
	captions: {
		playerCaptionsRenderer: {
			baseUrl: string,
			visibility: string,
		},
		playerCaptionsTracklistRenderer: {
			audioTracks: {
				captionTrackIndices: unknown[],
			}[],
			captionTracks: {
				baseUrl: string,
				isTranslatable: boolean,
				kind: string,
				languageCode: string,
				name: SimpleTextContainer,
				vssId: string,
			}[],
			defaultAudioTrackIndex: number,
			translationLanguages: {
				languageCode: string,
				languageName: SimpleTextContainer,
			}[],
		}
	},
	cards: {
		cardCollectionRenderer: {
			allowTeaserDismiss: boolean,
			cards: {
				cardRenderer: {
					cardId: string,
					content: {
						videoInfoCardContentRenderer: {
							action: {
								clickTrackingParams: string,
								commandMetadata: CommandMetadata,
								watchEndpoint: {
									videoId: string,
								},
							},
							channelName: SimpleTextContainer,
							lengthString: {
								accessibility: {
									accessibilityData: {
										label: string,
									},
								},
								simpleText: string,
							},
							trackingParams: string,
							videoThumbnail: Thumbnails,
							videoTitle: SimpleTextContainer,
							viewCountText: SimpleTextContainer,
						},
					},
					cueRanges: {
						endCardActiveMs: string,
						iconAfterTeaserMs: string,
						startCardActiveMs: string,
						teaserDurationMs: string,
					}[],
					feature: string,
					icon: {
						infoCardIconRenderer: {
							trackingParams: string,
						},
					},
					teaser: {
						simpleCardTeaserRenderer: {
							logVisibilityUpdates: boolean,
							message: SimpleTextContainer,
							prominent: boolean,
							trackingParams: string,
						},
					},
					trackingParams: string,
				},
			}[],
			closeButton: {
				infoCardIconRenderer: {
					trackingParams: string,
				}
			},
			headerText: SimpleTextContainer,
			icon: {
				infoCardIconRenderer: SimpleTextContainer,
				logIconVisibilityUpdates: boolean,
				trackingParams: string,
			},
			logIconVisibilityUpdates: boolean,
			trackingParams: string,
		},
	},
	endscreen: {
		endscreenRenderer: {
			elements: {
				endscreenElementRenderer: {
					aspectRatio: number
					endMs: string,
					endpoint: {
						clickTrackingParams: string,
						commandMetadata: CommandMetadata,
						watchEndpoint: {
							videoId: string,
						},
					},
					id: string,
					image: Thumbnails,
					left: number,
					metadata: {
						simpleText: string
					},
					startMs: string,
					style: string,
					title: {
						accessibility: {
							accessibilityData:{
								label: string,
							},
						},
						simpleText: string,
					},
					top: number,
					trackingParams: string,
					videoDuration: SimpleTextContainer,
					width: string,
				},
			}[],
			startMs: string,
			trackingParams: string,
		},
	},
	messages: {
		mealbarPromoRenderer: {
			actionButton: {
				buttonRenderer: {
					navigationEndpoint: {
						clickTrackingParams: string,
						commandMetadata: CommandMetadata,
						urlEndpoint: {
							target: string,
							url: string,
						},
					},
					serviceEndpoint: {
						clickTrackingParams: string,
						commandMetadata: CommandMetadata,
						feedbackEndpoint: {
							feedbackToken: string,
							uiActions: {
								hideEnclosingContainer: boolean,
							},
						},
					},
					size: string,
					style: string,
					text: ActionButtonText,
					trackingParams: string,
				},
			},
			dismissButton: {
				buttonRenderer: {
					serviceEndpoint: {
						clickTrackingParams: string,
						commandMetadata: CommandMetadata,
						feedbackEndpoint: {
							feedbackToken: string,
							uiActions: {
								hideEnclosingContainer: boolean,
							},
						},
					},
					size: string,
					style: string,
					text: ActionButtonText,
					trackingParams: string,
				},
			},
			impressionEndpoints: {
				clickTrackingParams: string,
				commandMetadata: CommandMetadata,
				feedbackEndpoint: {
					feedbackToken: string,
					uiActions: {
						hideEnclosingContainer: boolean,
					},
				},
			}[],
			isVisible: boolean,
			messageTexts: ActionButtonText,
			messageTitle: ActionButtonText,
			style: string,
			trackingParams: string,
			triggerCondition: string,
		},
	}[],
	microformat: {
		playerMicroformatRenderer: {
			availableCountries: string[],
			category: string,
			description: SimpleTextContainer,
			embed: {
				flashSecureUrl: string,
				flashUrl: string,
				height: number
				iframeUrl: string,
				width: number,
			},
			externalChannelId: string,
			hasYpcMetadata: boolean,
			isUnlisted: boolean,
			lengthSeconds: string,
			ownerChannelName: string,
			ownerProfileUrl: string,
			publishDate: string,
		},
		thumbnail: Thumbnails,
		title: SimpleTextContainer,
		uploadDate: string,
		viewCount: string,
	},
	playabilityStatus: {
		contextParams: string,
		miniplayer: {
			miniplayerRenderer: {
				playbackMode: string,
			},
		}
		playableInEmbed: boolean,
		status: string,
	},
	playbackTracking: {
		atrUrl: BaseURLContainer,
		ptrackingUrl: BaseURLContainer,
		qoeUrl: BaseURLContainer,
		setAwesomeUrl: BaseURLContainer,
		videostatsDelayplayUrl: BaseURLContainer,
		videostatsPlaybackUrl: BaseURLContainer,
		videostatsWatchtimeUrl: BaseURLContainer,
	},
	playerConfig: {
		audioConfig: {
			enablePerFormatLoudness: boolean,
			loudnessDb: number,
			perceptualLoudnessDb: number,
		},
		daiConfig: {
			enableServerStitchedDai: boolean,
		},
		mediaCommonConfig: {
			dynamicReadaheadConfig: {
				maxReadAheadMediaTimeMs: number,
				minReadAheadMediaTimeMs: number,
				readAheadGrowthRateMs: number,
			},
		},
		streamSelectionConfig: {
			maxBitrate: string,
		},
		webPlayerConfig: {
			webPlayerActionsPorting: {
				addToWatchLaterCommand: WebPlayerActionsPorting,
				getSharePanelCommand: WebPlayerActionsPorting,
				removeFromWatchLaterCommand: WebPlayerActionsPorting,
				subscribeCommand: WebPlayerActionsPorting,
				unsubscribeCommand: WebPlayerActionsPorting,
			},
		},
	},
	responseContext: {
		serviceTrackingParams: {
			service: string,
			params: {
				key: string,
				value: string,
			}[],
		}[],
		webResponseContextExtensionData: {
			hasDecorated: boolean,
		},
	},
	storyboards: {
		playerStoryboardSpecRenderer: {
			spec: string,
		},
	},
	streamingData: {
		expiresInSeconds: string,
		formats: {
			approxDurationMs: string,
			audioChannels: number,
			audioQuality: string,
			audioSampleRate: string,
			averageBitrate: number,
			bitrate: number,
			contentLength: string,
			fps: number,
			height: number,
			itag: number,
			lastModified: string,
			mimeType: string,
			projectionType: string,
			quality: string,
			qualityLabel: string,
			url: string,
			width: number,
		}[],
		adaptiveFormats: AdaptiveFormat[],
	},
	trackingParams: string,
	videoDetails: {
		allowRatings: boolean,
		author: string,
		averageRating: number,
		channelId: string,
		isCrawlable: boolean,
		isLiveContent: boolean,
		isOwnerViewing: boolean,
		isPrivate: boolean,
		isUnpluggedCorpus: boolean,
		keywords: string[],
		lengthSeconds: string,
		shortDescription: string,
		thumbnail: Thumbnails,
		title: string,
		videoId: string,
		viewCount: string,
	},
	videoQualityPromoSupportedRenderers: {
		videoQualityPromoRenderer: {
			endpoint: {
				clickTrackingParams: string,
				commandMetadata: CommandMetadata,
				urlEndpoint: {
					target: string,
					url: string,
				},
			},
			snackbar: {
				notificationActionRenderer: {
					actionButton: {
						buttonRenderer: {
							navigationEndpoint: {
								clickTrackingParams: string,
								commandMetadata: CommandMetadata,
								urlEndpoint: {
									target: string,
									url: string,
								},
							},
							text: ActionButtonText,
							trackingParams: string,
						},
					},
					responseText: ActionButtonText,
					trackingParams: string,
				},
			},
			text: ActionButtonText,
			trackingParams: string,
			triggerCriteria: {
				connectionWhitelists: string[],
				joinLatencySeconds: number,
				rebufferTimeSeconds: number,
				refractorySeconds: number,
				watchTimeWindowSeconds: number,
			},
		},
	},
};

interface BaseYoutubeVideoInfo {
	c: string,
	cbr: string,
	cbrver: string,
	cos: string,
	cosver: string,
	cr: string,
	csi_page_type: string,
	csn: string,
	cver: string,
	enablecsi: string,
	fexp: string,
	fflags: string,
	gapi_hint_params: string,
	hl: string,
	host_language: string,
	innertube_api_key: string,
	innertube_api_version: string,
	innertube_context_client_version: string,
	player_response: string | PlayerResponse,
	ps: string,
	root_ve_type: string,
	status: string,
	use_miniplayer_ui: string,
	vss_host: string,
	watermark: string,
};

export interface RawYoutubeVideoInfo extends BaseYoutubeVideoInfo {
	player_response: string,
}

export interface YoutubeVideoInfo extends BaseYoutubeVideoInfo {
	player_response: PlayerResponse,
}