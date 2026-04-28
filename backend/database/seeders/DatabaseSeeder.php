<?php

namespace Database\Seeders;

use App\Models\Categorie;
use App\Models\Genre;
use App\Models\Film;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        //Posible error solución
        //https://stackoverflow.com/questions/31192207/laravel-5-1-migration-and-seeding-cannot-truncate-a-table-referenced-in-a-foreig
        // SQLSTATE[42000]: Syntax error or access violation: 1701 Cannot truncate a table referenced in a foreign key constraint (`netflix-clone`.`films`, CONSTRAINT `films_provider_id_foreign` FOREIGN KEY (`provider_id`) REFERENCES `netflix-clone`.`users` (`id`)) (SQL: truncate table `users`)

        //Add solution
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        //remove table
        DB::table('users')->truncate();
        DB::table('films')->truncate();
        DB::table('categories')->truncate();
        DB::table('genres')->truncate();
        DB::table('genre_film')->truncate();

        //Create data
        User::factory()->create([
            'name' => 'romacode',
            'email' => 'romacode@gmail.com',
            'password' => bcrypt('romacode'),
            'role' => 'provider',
        ]);
        User::factory()->create([
            'name' => 'test',
            'email' => 'test@gmail.com',
            'password' => bcrypt('romacode'),
            'role' => 'client',
        ]);
        User::factory(4)->create();
        Categorie::factory(2)->create();
        Genre::factory(10)->create();
        Film::factory(200)->create();

        // Link films to genres
        $filmIds = Film::pluck('id');
        $genreIds = Genre::pluck('id');

        foreach ($filmIds as $filmId) {
            $randomGenres = $genreIds->random(rand(1, 3));
            foreach ($randomGenres as $genreId) {
                DB::table('genre_film')->insert([
                    'film_id' => $filmId,
                    'genre_id' => $genreId,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
