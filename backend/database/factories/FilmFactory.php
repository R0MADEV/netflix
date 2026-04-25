<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class FilmFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            "title" => $this->faker->title(),
            "description" => $this->faker->text(400),
            "provider_id" => random_int(1, 4),
            "categorie_id" => random_int(1, 2),
            // "backdrop_path" => 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTcyMjA0MzczNV5BMl5BanBnXkFtZTgwNTIyODA5NTE@._V1_SY1000_SX1500_AL_.jpg',
            // "poster_path" => 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTc2ODg0MzMzM15BMl5BanBnXkFtZTgwODYxODA5NTE@._V1_SY1000_SX1500_AL_.jpg', 
            "backdrop_path" => 'https://picsum.photos/seed/' . $this->faker->uuid() . '/700/400',
            "poster_path" => 'https://picsum.photos/seed/' . $this->faker->uuid() . '/150/220',
            "movieStatus" => $this->faker->boolean(),
            "duration" => $this->faker->name(),
            "studio" => $this->faker->streetAddress(),
            "protagonists" => ["Roma","Ramiro","Nicolas"],
            "country" => $this->faker->country(),
            "premiere" => $this->faker->date(),
            "genre" => ["Action","Adventure","Animated"],
            "rating" =>random_int(1, 5),
            "director" =>$this->faker->name(),
            "producer" =>$this->faker->company(),
            "award" =>$this->faker->year(),
        ];
    }
}
