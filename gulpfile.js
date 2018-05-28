var gulp = require('gulp');
var argv = require('yargs').argv;
var _ = require('lodash');
var fs = require('fs');
var yaml = require('js-yaml');
var vimeo = require('vimeo-downloader');

gulp.task('url', function () {
	var url = argv.url;
	var filename = argv.filename;
	if (url && filename) {
		vimeo(url, { quality: 'highest' })
			.pipe(fs.createWriteStream(filename + '.flv'));
	}
});

gulp.task('yaml', function () {
	var filename = argv.yaml || 'download.yml';
	var nameParts = filename.split('.');
	var yamlSuffix = nameParts.pop();

	if (yamlSuffix != 'yml') {
		console.error('Error: yaml file required');
	}

	var directoryName = nameParts.join('_');

	if (!fs.existsSync('./' + directoryName)) {
		fs.mkdirSync('./' + directoryName);
	}

	var file = yaml.safeLoad(fs.readFileSync('./' + filename, 'utf8'));
	_.each(file.urls, function (url, name) {
		var fullName = file.prefix + name + '.flv';
		vimeo(url).pipe(fs.createWriteStream('./' + directoryName + '/' + fullName));
	});
});
