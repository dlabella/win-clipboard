'use strict';

const addon = require('bindings')('clipboard')

module.exports = {
	getAvailableFormats: function () {
		var formats = [
			"CF_BITMAP",
			"CF_DIB",
			"CF_DIBV5",
			"CF_DIF",
			"CF_DSPBITMAP",
			"CF_DSPENHMETAFILE",
			"CF_DSPMETAFILEPICT",
			"CF_DSPTEXT",
			"CF_ENHMETAFILE",
			"CF_GDIOBJFIRST",
			"CF_GDIOBJLAST",
			"CF_HDROP",
			"CF_LOCALE",
			"CF_METAFILEPICT",
			"CF_OEMTEXT",
			"CF_OWNERDISPLAY",
			"CF_PALETTE",
			"CF_PENDATA",
			"CF_PRIVATEFIRST",
			"CF_PRIVATELAST",
			"CF_RIFF",
			"CF_SYLK",
			"CF_TEXT",
			"CF_TIFF",
			"CF_UNICODETEXT",
			"CF_WAVE"
		]
		return formats;
	},

	getFormat(){
		var formats = this.getAvailableFormats();
		for(var i=0;i<formats.length;i++){
			if (this.containsFormat(formats[i])){
				return formats[i];
			}
		}
		return "";
	},

	containsText: function () {
		return this.containsFormat('CF_TEXT') || this.containsFormat('CF_UNICODETEXT') || this.containsFormat('CF_OEMTEXT');
	},

	getText: function (format, encoding) {
		format = format || 'CF_UNICODETEXT';

		let bytes = this.getData(format),
			ret = '';

		if (!bytes) {
			return bytes;
		}

		if (format === 'CF_TEXT') {
			for (let i = 0; i < bytes.length; i++) {
				ret += String.fromCharCode(bytes[i]);
			}
		} else {
			const StringDecoder = require('string_decoder').StringDecoder;
			const decoder = new StringDecoder(encoding || 'utf-16le');

			ret = decoder.write(bytes);
		}

		// Windows keeps tailing NULL byte for strings.
		/* istanbul ignore else */
		if (ret[ret.length - 1] == '\0') {
			ret = ret.substr(0, ret.length - 1);
		}

		return ret;
	},

	setText: function (text, format, encoding) {
		format = format || 'CF_UNICODETEXT';

		if (!encoding && format === 'CF_TEXT') {
			encoding = 'ascii';
		} else if (!encoding && format === 'CF_UNICODETEXT') {
			encoding = 'utf-16le';
		}

		let buffer = Buffer.from(text + '\0', encoding || 'utf-8'),
			stringView = new Int8Array(buffer);

		return this.setData(stringView.buffer, format);
	},

	containsImage: function () {
		return this.containsFormat('CF_BITMAP') || this.containsFormat('CF_DIBV5') || this.containsFormat('CF_DIB') || this.containsFormat('CF_TIFF');
	},

	getImage: function () {
		return this.getData('CF_DIBV5');
	},

	setImage: function (arrayBuffer) {
		return this.setData('CF_DIBV5', arrayBuffer);
	},

	getData: addon.getData,
	setData: addon.setData,
	containsFormat: addon.containsFormat,
	clear: addon.clear,
};