module.exports = function(grunt){
	'use strict';

	var srcs = [
		'src/default/main.header.tpl',

		'src/common.define.js',
		'src/common.js',
		'src/common_base.js',

		'src/relaylinker.static.js',
		'src/najax-core.js',

		'src/najax-helper.static.js',
		'src/najax.static.js',
		'src/najax-read.static.js',

		'src/default/najax-core-tag.js',
		'src/default/najax-ex.static.js',
		'src/default/najax-class.static.js',
		'src/default/history.static.js',

		'src/default/main.footer.tpl'
	];

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: [
			'dist/najax.*', 'docs/'
		],
		concat: {
			options: {
				banner: "/*!\n * najaxjs ver <%= pkg.version %> - najax.js\n * (c) any-js - <%= pkg.homepage %>\n * Released under the MIT license\n */\n",
				process: function(src, filepath) {
					return src.replace(/^\s*["']use\s+strict["'];\s*\n/, '');
				}
			},
			js: {
				src:srcs,
				dest: 'dist/najax.js'
			},
			css: {
				/*
				src: [
					'src/css/*.css'
				],
				dest: 'dist/najax.css'
				*/
			}
		},
		cssmin : {
			dist: {
				files: {
					//'dist/najax.min.css': ['dist/najax.css']
				}
			}
		},
		uglify: {
			options: {
				banner: "/*!\n * najaxjs ver <%= pkg.version %> - najax.js\n * (c) any-js - <%= pkg.homepage %>\n * Released under the MIT license\n */\n"
			},
			dist: {
				files: {
					'dist/najax.min.js': ['<%= concat.js.dest %>']
				}
			}
		},
		jshint: {
			files: ['src/*.js', 'src/default/*.js'],
			options: {
				jshintrc: '.jshintrc'
			}
		},
		jsdoc: {
			dist: {
				src: [srcs, 'resources/*.md'],
				options: {
					configure: 'jsdoc.json',
					recurse: true,
					destination: './docs/',
					tutorials: './resources/tutorials/',
					verbose: true
				}
			}
		},
		copy:{
			tutorials: {
				expand: true,
				cwd:'./resources/tutorials/',
				src: ['includes/*'],
				dest: 'docs/'
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
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-jsdoc');

	process.chdir(__dirname);

	grunt.registerTask('test', ['jshint']);

	grunt.registerTask('default', ['clean', 'jshint', 'concat', 'copy', 'cssmin', 'uglify', 'jsdoc']);
};

