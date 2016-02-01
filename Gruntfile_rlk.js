module.exports = function(grunt){
	'use strict';

	var srcs = [
		'src/relaylinker/main.header.tpl',

		'src/common.define.js',
		'src/common.js',

		'src/relaylinker.static.js',

		'src/relaylinker/main.footer.tpl'
	];

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: [
			'dist/rlk.js','dist/rlk.min.js'
		],
		concat: {
			options: {
				banner: "/*!\n * Relay-Linker ver <%= pkg.version %> - rlk.js\n * (c) any-js - <%= pkg.homepage %>\n * Released under the MIT license\n */\n",
				process: function(src, filepath) {
					return src.replace(/^\s*["']use\s+strict["'];\s*\n/, '');
				}
			},
			js: {
				src: srcs,
				dest: 'dist/rlk.js'
			}
		},
		uglify: {
			options: {
				banner: "/*!\n * Relay-Linker ver <%= pkg.version %> - rlk.js\n * (c) any-js - <%= pkg.homepage %>\n * Released under the MIT license\n */\n"
			},
			dist: {
				files: {
					'dist/rlk.min.js': ['<%= concat.js.dest %>']
				}
			}
		},
		jshint: {
			files: ['src/*.js'],
			options: {
				jshintrc: '.jshintrc'
			}
		},
		watch: {
			files: ['<%= jshint.files %>'],
			tasks: ['jshint']
		}
	});

	process.chdir('/usr/lib/');

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-jsdoc');

	process.chdir(__dirname);

	grunt.registerTask('test', ['jshint']);

	grunt.registerTask('default', ['clean', 'jshint', 'concat', 'uglify']);
};
