<?php

return [
    'name' => 'CPR PWA',
    'manifest' => [
        'name' => env('APP_NAME', 'App'),
        'short_name' => 'PWA',
        'start_url' => '/',
        'background_color' => '#ffffff',
        'theme_color' => '#000000',
        'display' => 'browser',
        'orientation'=> 'any',
        'status_bar'=> 'black',
        'icons' => [
            '512x512' => [
                'path' => 'storage/app-svgrepo-com.png',
                'purpose' => 'any'
            ],
        ],
        'custom' => []
    ]
];
