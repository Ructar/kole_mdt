fx_version 'adamant'
game 'gta5'

ui_page 'ui/dist/index.html'

files {
	'ui/dist/**/*.css',
	'ui/dist/**/*.js',
	'ui/dist/**/*.png',
	'ui/dist/index.html',
}

dependencies {
	'GHMattiMySQL',
}

shared_scripts {
	'scripts/sh_config.lua',
}

client_scripts {
	'scripts/cl_mdt.lua',
}

server_scripts {
	'scripts/sv_config.lua',
	'scripts/sv_mdt.lua',
}