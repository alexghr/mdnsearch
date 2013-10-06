var MDN_SEARCH_URL = "https://developer.mozilla.org/en-US/search?q=";

chrome.omnibox.setDefaultSuggestion({
	description: 'Search Mozilla Developer Network for <match>%s</match>'
});

var prevSearch = MDN_TOPICS || null;
chrome.omnibox.onInputChanged.addListener(function(text, suggest) {
	if (typeof prevSearch == 'undefined' || prevSearch === null) {
		console.log('Topics not loaded');
		return;
	}

	var regex = new RegExp('^' + text, 'i');
	var keys = Object.keys(prevSearch).filter(function(topic) {
		return regex.test(topic);
	});

	var search = keys.reduce(function(accumulator, key) {
		accumulator[key] = prevSearch[key];
		return accumulator;
	}, {});

	var suggestions =
		Object.keys(search).map(function(key) {
			return {
				'content': search[key],
				'description': key
			};
		}).sort(function(a, b) {
			var ad = a['description'], bd = b['description'];
			return ad > bd ? 1 : ad == bd ? 0 : -1;
		});

	suggest(suggestions);
});

var loadUrl = function(url) {
	chrome.tabs.getSelected(null, function(tab) {
		chrome.tabs.update(tab.id, {
			url: url
		});
	});
}

chrome.omnibox.onInputEntered.addListener(function(text) {
	loadUrl(/http/i.test(text) ? text : MDN_SEARCH_URL + text);
});