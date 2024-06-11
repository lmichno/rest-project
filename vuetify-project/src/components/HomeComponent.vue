<template>
    <template>
        <div>
            <v-card v-for="photo in photos" :key="photo.id" class="mb-4">
                <v-img :src="photo.url" height="300"></v-img>
                <v-card-text>
                    <div class="mb-2">{{ photo.user }}</div>
                    <div class="mb-2">{{ photo.description }}</div>
                    <div>
                        <v-chip v-for="tag in photo.tags" :key="tag" class="mr-2">{{ tag }}</v-chip>
                    </div>
                </v-card-text>
            </v-card>
        </div>
    </template>

    <script setup>
    import { ref } from 'vue';

    const photos = ref([
        {
            id: 1,
            url: 'path/to/photo1.jpg',
            user: 'John Doe',
            description: 'Beautiful sunset',
            tags: ['nature', 'sunset', 'landscape']
        },
        {
            id: 2,
            url: 'path/to/photo2.jpg',
            user: 'Jane Smith',
            description: 'Cute puppy',
            tags: ['animals', 'pets', 'cute']
        },
        // Add more photo objects here
    ]);
    </script>

    <style scoped>
    </style>