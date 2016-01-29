module.exports = function(grunt){
	'use strict';

	var srcs = [
		'src/tiny/main.header.tpl',

		'src/common.define.js',
		'src/common.js',
		'src/common_base.js',

		'src/relaylinker.static.js',
		'src/najax-core.js',

		'src/najax-helper.static.js',
		'src/najax.static.js',
		'src/najax-read.static.js',

		'src/tiny/main.footer.tpl'
	];

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: [
			'dist/*-tiny.js','dist/*-tiny.min.js'
		],
		concat: {
			options: {
				banner: "/*!\n * najaxjs tiny  ver <%= pkg.version %> - najax-tiny.js\n * <%= pkg.description %>\n */\n",
				process: function(src, filepath) {
					return src.replace(/^\s*["']use\s+strict["'];\s*\n/, '');
				}
			},
			js: {
				src: srcs,
				dest: 'dist/najax-tiny.js'
			}
		},
		uglify: {
			options: {
				banner: "/*!\n * najaxjs tiny  ver <%= pkg.version %> - najax-tiny.js\n * <%= pkg.description %>\n */\n"
			},
			dist: {
				files: {
					'dist/najax-tiny.min.js': ['<%= concat.js.dest %>']
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
