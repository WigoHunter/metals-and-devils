const fs = require('fs');
const setting = require('./setting.json');
const WordExtractor = require('word-extractor');
const extractor = new WordExtractor();
const file = extractor.extract(setting.path);

file.then(doc => {
	let chapters = doc.getBody().split("##");
	chapters.shift();
	chapters = chapters.map(c => {
		let index = c.indexOf(`\n`);
		return {
			title: c.substring(0, index),
			content: c.substring(index + 1, c.length)
		}
	})

	const json = JSON.stringify({
		title: setting.title,
		chapters
	});

	fs.writeFile(
		'src/doc.json',
		json,
		'utf8',
		() => console.log('success!')
	);
}).catch(e => {
	console.log(e);
});