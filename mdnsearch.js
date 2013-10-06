var MDN_SEARCH_URL = "https://developer.mozilla.org/en-US/search?q=";

chrome.omnibox.setDefaultSuggestion({
	description: 'Search Mozilla Developer Network for <match>%s</match>'
});

chrome.omnibox.onInputEntered.addListener(function(text) {
	chrome.tabs.getSelected(null, function(tab) {
		chrome.tabs.update(tab.id, {
			url: MDN_SEARCH_URL + text
		});
	});
})