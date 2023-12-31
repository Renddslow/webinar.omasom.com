CREATE TABLE IF NOT EXISTS `people` (
    `id` integer PRIMARY KEY AUTOINCREMENT,
    `name` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL,
    `title` varchar(255) NOT NULL,
    `org` varchar(255) NOT NULL,
    `created_at` datetime NOT NULL,
    `updated_at` datetime NOT NULL
);

CREATE TABLE IF NOT EXISTS `webinar_people` (
    `id` integer PRIMARY KEY AUTOINCREMENT,
    `webinar_id` integer NOT NULL,
    `person_id` integer NOT NULL,
    `role` integer NOT NULL,
    `created_at` datetime NOT NULL,
    `updated_at` datetime NOT NULL,
    FOREIGN KEY (`webinar_id`) REFERENCES `webinars` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`person_id`) REFERENCES `people` (`id`) ON DELETE CASCADE
);