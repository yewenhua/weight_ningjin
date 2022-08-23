<?php

namespace App\Repositories;

use JasonGuru\LaravelMakeRepository\Repository\BaseRepository;
use App\User;

/**
 * Class UserRepository.
 */
class UserRepository extends BaseRepository
{
    /**
     * @return string
     *  Return the model
     */
    public function model()
    {
        return User::class;
    }
}
