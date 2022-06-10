<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="MultiTool WebProyect based on Laravel 9 + Inertia + Vue 3 - TailwindCss">
        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap">

        <!-- Styles -->
        <link rel="stylesheet" href="{{ mix('/css/app.css') }}">
        <link rel="canonical" href="https://wwww.christianpasinrey.es"
        <!-- App -->
        @routes
        <script src="{{ mix('/js/app.js') }}" defer></script>
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia

        @env ('local')

        @endenv
    </body>
</html>
