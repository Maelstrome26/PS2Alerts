<?php

return [
    'environment' => $_ENV['ENV'],
    'base_url'    => $_ENV['BASE_URL'],
    'asset_url'   => $_ENV['BASE_URL'] . '/assets',
    'api_url'     => $_ENV['API_URL'],
    'database'    => [
        'host'     => $_ENV['DB_HOST'],
        'user'     => $_ENV['DB_USER'],
        'password' => $_ENV['DB_PASS'],
        'schema'   => $_ENV['DB_NAME']
    ]
];
