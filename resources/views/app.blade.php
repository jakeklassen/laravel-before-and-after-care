<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    {{-- https://github.com/laravel/vite-plugin/blob/e57a940c22f90e72002380d3dad1a2c6f1921983/UPGRADE.md#react --}}
    @viteReactRefresh
    @vite('resources/js/app.tsx')
    @inertiaHead
    <style type="text/css">
      @view-transition {
        navigation: auto;
      }
    </style>
  </head>
  <body class="dark:bg-black">
    @inertia
  </body>
</html>
