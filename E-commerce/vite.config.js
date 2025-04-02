import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import reactRefresh from 'react-refresh';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/js/app.jsx',
            ],
            refresh: true,
            server: { 
                hmr: {
                    host: 'localhost:8000',
                },
                usePolling: true
            },
        }),
        // reactRefresh()
    ],
});
