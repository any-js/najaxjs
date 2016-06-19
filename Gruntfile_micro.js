module.exports = function(grunt){
	'use strict';

	var srcs = [
		'src/micro/main.header.tpl',

		'src/common.define.js',
		'src/common_nx.js',
		'src/micro/najax-micro.js',

		'src/micro/main.footer.tpl'
	];

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: [
			'dist/*-micro.js','dist/*-micro.min.js'
		],
		concat: {
			options: {
				banner: "/*!\n * najaxjs micro ver <%= pkg.version %> - najax-micro.js\n * (c) any-js - <%= pkg.homepage %>\n * Released under the MIT license\n */\n",
				process: function(src, filepath) {
					return src.replace(/^\s*["']use\s+strict["'];\s*\n/, '');
				}
			},
			js: {
				src: srcs,
				dest: 'dist/najax-micro.js'
			}
		},
		uglify: {
			options: {
				banner: "/*!\n * najaxjs micro ver <%= pkg.version %> - najax-micro.js\n * (c) any-js - <%= pkg.homepage %>\n * Released under the MIT license\n */\n"
			},
			dist: {
				files: {
					'dist/najax-micro.min.js': ['<%= concat.js.dest %>']
				}
			}
		},
		jshint: {
			files: ['src/*.js', 'src/micro/*.js'],
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
